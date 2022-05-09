const expect = require('chai').expect;
const superagent = require('superagent');

const cases = require('./cases');
const testAddress = 'http://127.0.0.1:8001';

describe('Test userRoutes create', () => {
  describe('#create()', () => {
    it('testMissingParam', (done) => {
      superagent.post(`${testAddress}/v1/user`)
      .send(cases.testMissingParam)
      .end((e, res) => {
        expect(e).to.not.eql(null);
        expect(e.status).to.eql(400);
        done();
      })
    })
    it('testCreateSucceed', (done) => {
      superagent.post(`${testAddress}/v1/user`)
      .send(cases.testCreateSucceed)
      .end((e, res) => {
        const dataRet = res.body;
        expect(e).to.eql(null);
        expect(res.status).to.eql(200);
        expect(typeof dataRet).to.eql('object');
        expect(dataRet).to.have.property('_id');
        expect(dataRet).to.have.property('name');
        expect(dataRet).to.have.property('dob');
        expect(dataRet).to.have.property('address');
        expect(dataRet).to.have.property('description');
        done();
      })
    })
  })
})
