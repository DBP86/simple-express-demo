const expect = require('chai').expect;
const superagent = require('superagent');

const cases = require('./cases');
const routesLib = require('../../lib');
const testAddress = 'http://127.0.0.1:8001';

describe('Test userRoutes getList', () => {
  describe('#getList()', () => {
    it ('testMissingLimit', (done) => {
      const param = routesLib.json2Param(cases.testMissingLimit);
      superagent.get(`${testAddress}/v1/user${param}`)
      .send()
      .end((e, res) => {
        expect(e).to.not.eql(null);
        expect(e.status).to.eql(400);
        done();
      })
    })
    it ('testResult', (done) => {
      const param = routesLib.json2Param(cases.testResult);
      superagent.get(`${testAddress}/v1/user${param}`)
      .send()
      .end((e, res) => {
        const dataRet = res.body;
        expect(e).to.eql(null);
        expect(dataRet).to.have.property('total');
        expect(typeof dataRet.total).to.eql('number');
        expect(dataRet.total).to.least(0);
        expect(dataRet).to.have.property('data');
        expect(typeof dataRet.data).to.eql('object');
        expect(dataRet.data.length).to.least(0);
        done()
      })
    })
  })
})