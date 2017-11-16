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
    type: {
  	  type: 'string',
      defaultsTo: 'ResourcePercent'
    },
    contentRow: {
      model: 'contentRow'
    }
  },

  buildEmptyResourcePercents: function(numberOfResources, cb) {
    var returnArray = [];
    async.times(numberOfResources, function(n, next) {
      ResourcePercent.create().exec(function(err, createdResourcePercent) {
        if(err) return next(err);
        returnArray.push(createdResourcePercent);
        next();
      });
    }, function(err) {
      if(err){
        console.error(err);
        return cb(err);
      }
      return cb(returnArray);
    });
  }
};


