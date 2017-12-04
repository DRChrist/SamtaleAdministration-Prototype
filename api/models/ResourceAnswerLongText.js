/**
 * ResourceAnswerLongText.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    text: {
      type: 'string'
    },
    html: {
      type: 'string',
      defaultsTo: '<textarea></textarea>'
    },
    answer: {
      model: 'contentRow'
    }
  },

  buildEmptyResourceLongTexts: function(numberOfResources, cb) {
    var returnArray = [];
    if(numberOfResources < 1) {
      return cb(null, []);
    } else {
      async.times(numberOfResources, function (n, next) {
        ResourceAnswerLongText.create().exec(function (err, createdResourceLongText) {
          if (err) return next(err);
          returnArray.push(createdResourceLongText.id);
          next();
        });
      }, function (err) {
        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, returnArray);
      });
    }
  }
};

