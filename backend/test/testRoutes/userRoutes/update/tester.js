const expect = require('chai').expect;
const superagent = require('superagent');

const userRoutesUpdateTestLib = require('./cases');
const testAddress = 'http://127.0.0.1:8001';

describe('Test userRoutes update', () => {
  describe('#update()', () => {
    it('testMissingId', (done) => {
      superagent.put(`${testAddress}/v1/user`)
      .send(userRoutesUpdateTestLib.testMissingId)
      .end((e, res) => {
        expect(e).to.not.eql(null);
        expect(e.status).to.eql(404);
        done();
      })
    })
    it('testUpdateSucceed', (done) => {
      const _id = userRoutesUpdateTestLib.testUpdateSucceed._id;
      superagent.put(`${testAddress}/v1/user/${_id}`)
      .send(userRoutesUpdateTestLib.testUpdateSucceed)
      .end((e, res) => {
        const dataRet = res.body;
        expect(e).to.eql(null);
        expect(typeof dataRet).to.eql('object');
        expect(dataRet).to.have.property('_id');
        expect(dataRet).to.have.property('name');
        expect(dataRet).to.have.property('dob');
        expect(dataRet).to.have.property('address');
        expect(dataRet).to.have.property('description');
        done();
      })
    })
    it('testIllegalName', (done) => {
      const _id = userRoutesUpdateTestLib.testIllegalName._id;
      superagent.put(`${testAddress}/v1/user/${_id}`)
      .send(userRoutesUpdateTestLib.testIllegalName)
      .end((e, res) => {
        expect(e).to.not.eql(null);
        expect(e.status).to.eql(400);
        done();
      })
    })
  })
})