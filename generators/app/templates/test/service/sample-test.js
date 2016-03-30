'use strict';

const expect = require('chai').expect;
const sinon = require('sinon');
const sample = require('../../services/sample');

describe('sample', () => {

  beforeEach(() => {
    // mockup Express.Reponse
    this.response = {
      send: sinon.spy(),
      sendStatus: sinon.spy()
    };
  });

  it('defined who function', () => {
    expect(sample.who).to.be.a('function');
  });

  it('should call resp.send with status 200', () => {
    const res = this.response;
    const context = {
      'user': {
        'uuid': 'aaa'
      }
    };

    sample.who(context, null, null, res);
    // console.log(resp.send.firstCall.args);

    expect(res.sendStatus.called).to.be.false;
    expect(res.send.firstCall.args[0]).to.eq(200);
    expect(res.send.firstCall.args[1]).to.eql({
      'uuid': 'aaa'
    });
  });
});
