let visitorCtrl = {}
let moment = require('moment-timezone')
let helpers = require('../utilities/helper')
let _ = require('lodash')

visitorCtrl.getVisitorStat = async (req, res, next) => {
  try {
    let queryData = JSON.parse(JSON.stringify(req.query))
    if (isNaN(queryData.date)) {
      return res
        .status(400)
        .json({ status: 400, message: 'Please send the valid date' })
    } else {
      let date = new Date(Number(queryData.date)).toISOString()
      date = date.split('Z')[0]
      let visitorData = await getLACityData(date)
      let minNumber,
        maxNumber,
        total = 0
      if (visitorData && visitorData.length > 0) {
        visitorData = JSON.parse(JSON.stringify(visitorData[0]))
        let keys = _.keys(visitorData)
        let count = _.values(visitorData)

        let attendance = {
          month: moment(date).format('MMM'),
          year: moment(date).format('YYYY')
        }
        keys.map((item, index) => {
          if (item !== 'month') {
            let visitorCount = Number(visitorData[item])
            if (index == 1) {
              minNumber = visitorCount
              maxNumber = visitorCount
            }
            if (
              visitorCount > maxNumber &&
              (!queryData.ignore ||
                (queryData.ignore && item !== queryData.ignore))
            ) {
              maxNumber = visitorCount
              attendance['highest'] = {
                museum: keys[index],
                visitors: visitorCount
              }
            }
            if (
              visitorCount < minNumber &&
              (!queryData.ignore ||
                (queryData.ignore && item !== queryData.ignore))
            ) {
              minNumber = visitorCount
              attendance['lowest'] = {
                museum: keys[index],
                visitors: visitorCount
              }
            }
            if (queryData.ignore && item === queryData.ignore) {
              attendance['ignored'] = {
                museum: keys[index],
                visitors: visitorCount
              }
            } else {
              total += visitorCount
            }

            return item
          } else {
            return item
          }
        })
        attendance['total'] = total

        return res.status(200).json({ status: 'success', data: { attendance } })
      } else {
        return res.status(200).json({
          status: 'success',
          data: {},
          message: 'Data is not available at the moment'
        })
      }
    }
  } catch (error) {
    console.log('Error: ', error)
    return res
      .status(400)
      .json({ status: 'failed', message: 'Error getting visitor details' })
  }
}

function getLACityData (date) {
  try {
    let formObj = {
      method: 'get',
      url: 'https://data.lacity.org/resource/trxm-jn3c.json?month=' + date,
      headers: { 'Content-Type': 'application/json' }
    }

    return helpers.requestData(formObj)
  } catch (error) {
    console.log('Error getting city data')
    return []
  }
}

module.exports = visitorCtrl
