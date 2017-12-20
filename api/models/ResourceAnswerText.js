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
    answer: {
      model: 'contentRow'
    },
    //callback has parameters (err, htmlString);
    getHtml: function(cb) {
  	  return cb(null, '<input type="text">');
    }
  },

  //Create a number of objects with an empty text attribute
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
  }

};

