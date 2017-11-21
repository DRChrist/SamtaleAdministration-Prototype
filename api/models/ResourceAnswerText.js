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
    type: {
  	  type: 'string',
      defaultsTo: 'ResourceText'
    },
    contentRow: {
      model: 'contentRow'
    }
  },

  buildEmptyResourceTexts: function(numberOfResources, cb) {
    var returnArray = [];
    if(numberOfResources < 1) {
      return cb(null, []);
    } else {
      async.times(numberOfResources, function (n, next) {
        ResourceText.create().exec(function (err, createdResourceText) {
          if (err) return next(err);
          returnArray.push(createdResourceText);
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

  //Used to exclude empty resources, like the ones in answers
  findResourcesWithText: function(cb) {
    ResourceText.find().exec(function(err, records) {
      if(err) {
        console.error(err);
        return cb(err);
      }
      return cb(null, _.filter(records, function(o) { return o.text; }));
    });
  }
};

