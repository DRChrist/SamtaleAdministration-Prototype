/**
 * ResourcePercent.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	number: {
  		type: 'integer'
  	},
    html: {
  	  type: 'string',
      defaultsTo: '<input type="number">'
    },
    answer: {
      model: 'contentRow'
    },
    getHtml: function(cb) {
  	  return cb(null, '<input type="number">');
    }
  },

  buildEmptyResourcePercents: function(numberOfResources, cb) {
    var returnArray = [];
    if(numberOfResources < 1) {
      return cb(null, []);
    } else {
      async.times(numberOfResources, function (n, next) {
        ResourceAnswerPercent.create().exec(function (err, createdResourcePercent) {
          if (err) return next(err);
          returnArray.push(createdResourcePercent.id);
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


