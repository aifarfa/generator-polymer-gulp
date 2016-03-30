'use strict';

var SampleService = function () {
  this.who = function (context, payload, req, res) {
    res.send(200, {
      uuid: encodeURIComponent(context.user.uuid)
    });
  };
};

module.exports = new SampleService();
