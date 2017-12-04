/**
 * ResourceAnswerCheckbox.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    checkboxes: {
      type: 'json'
    },
    answer: {
      model: 'contentRow'
    }
  },

  buildEmptyResourceCheckboxes: function(numberOfResources, arrayOfTexts, cb) {
    if(numberOfResources < 1) {
      return cb(null, [])
    } else {
      var checkboxes = {};
      counter = 0;
      //TODO: find a better way of doing this
      async.times(numberOfResources, function(n, next) {
        checkboxes.arrayOfTexts[counter] = false;
        counter++;
        next();
      }, function(err) {
        if(err) {
          console.error(err);
          return cb(err);
        }
        ResourceAnswerCheckbox.create({checkboxes: checkboxes}).exec(function(err, createdCheckbox) {
          if(err) {
            console.error(err);
            return cb(err);
          }
          return cb(null, createdCheckbox.id);
        });
      });
    }
  }
};

