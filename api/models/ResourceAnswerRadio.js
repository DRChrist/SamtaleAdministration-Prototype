/**
 * ResourceAnswerRadio.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    radios: {
      type: 'json'
    },
    answer: {
      model: 'contentRow'
    }
  },

  buildEmptyResourceRadio: function(numberOfResources, arrayOfTexts, cb) {
    if(numberOfResources < 1) {
      return cb(null, [])
    } else {
      var radios = {};
      counter = 0;
      //TODO: find a better way of doing this
      async.times(numberOfResources, function(n, next) {
        radios[arrayOfTexts[counter]] = false;
        counter++;
        next();
      }, function(err) {
        if(err) {
          console.error(err);
          return cb(err);
        }
        ResourceAnswerRadio.create({radios: radios}).exec(function(err, createdRadio) {
          if(err) {
            console.error(err);
            return cb(err);
          }
          return cb(null, createdRadio.id);
        });
      });
    }
  }
};

