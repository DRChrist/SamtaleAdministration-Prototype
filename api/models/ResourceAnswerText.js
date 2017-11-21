/**
 * ResourceText.js
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
      defaultsTo: '<input type="text">'
    },
    answer: {
      model: 'contentRow'
    }
  },

  buildEmptyResourceTexts: function(numberOfResources, cb) {
    var returnArray = [];
    if(numberOfResources < 1) {
      return cb(null, []);
    } else {
      async.times(numberOfResources, function (n, next) {
        ResourceAnswerText.create().exec(function (err, createdResourceText) {
          if (err) return next(err);
          returnArray.push(createdResourceText.id);
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
  },

};

