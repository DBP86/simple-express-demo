const expect = require('chai').expect;
const superagent = require('superagent');

const userRoutesRemoveTestLib = require('./cases');
const testAddress = 'http://127.0.0.1:8001';

describe('Test userRoutes remove', () => {
  describe('#remove()', () => {
    it('testMissingId', (done) => {
      superagent.delete(`${testAddress}/v1/user`)
      .send(userRoutesRemoveTestLib.testMissingId)
      .end((e, res) => {
        expect(e).to.not.eql(null);
        expect(e.status).to.eql(404);
        done();
      })
    })
    it('testRemoveSucceed', (done) => {
      const _id = userRoutesRemoveTestLib.testRemoveSucceed._id;
      superagent.delete(`${testAddress}/v1/user/${_id}`)
      .send()
      .end((e, res) => {
        expect(e).to.eql(null);
        done();
      })
    })
  })
})