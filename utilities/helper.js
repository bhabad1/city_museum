let axios = require('axios')

let requestData = async function (options) {
    try {
      let resData = await axios(options);
      if(resData.data){
          return resData.data;
      }else{
          return resData.errors
      }
      return resData;
  
    } catch (error) {
      console.log('Error: ', error)
      return error;
    }
  }


  module.exports = {
      requestData
  }