process.env.NODE_ENV = 'test';
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../bin/www');
let should = chai.should();
chai.use(chaiHttp);

describe('Visitor Api', () => {
describe('GET api/visitors', () => {
    it('it should return visitor statistics for the month', (done) => {
      chai.request(server)
          .get('/api/visitors')
          .query({ date: '1580515200000' })
          .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.eql(0);
            done();
          });
    });
});
});