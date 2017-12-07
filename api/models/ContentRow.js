/**
 * contentRow.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    deletedAt: {
      type: 'datetime'
    },
  	contentFrames: {
  		collection: 'contentFrame',
  		via: 'contentRows'
  	},
  	questionTexts: {
  		collection: 'resourceQuestionText',
  		via: 'question'
  	},
    questionHeads: {
      collection: 'resourceQuestionHead',
      via: 'question'
    },
    questionLinks: {
      collection: 'resourceQuestionLink',
      via: 'question'
    },
  	answerTexts: {
  		collection: 'resourceAnswerText',
  		via: 'answer'
  	},
    answerLongTexts: {
      collection: 'resourceAnswerLongText',
      via: 'answer'
    },
  	answerPercents: {
  		collection: 'resourceAnswerPercent',
  		via: 'answer'
  	},
    answerRadios: {
      collection: 'resourceAnswerRadio',
      via: 'answer'
    },
    answerCheckboxes: {
      collection: 'resourceAnswerCheckbox',
      via: 'answer'
    },
    getHtml: function(cb) {
      var contentRowHtml = '<div class="row"><div class="col-md-6">';

      //Delete the attributes that are not associations with resources
      //This is purely so that we are able to loop through the contentRow object
      delete this.createdAt;
      delete this.updatedAt;
      delete this.id;
      delete this.contentFrames;

      //Loop through the resource associations in the ContentRow
      async.eachOfSeries(this, function (resourceArray, resourceName, next) {
        if(resourceName === 'answerTexts') {
          contentRowHtml += '</div><div class="col-md-6">';
        }
        //Loop through the individual resources in a resource association array
        //In many cases, there will be only one element in the array
        async.eachOfSeries(resourceArray, function (resource, index, next) {
          if (resource) {
            resource.getHtml(function (err, htmlString) {
              if (err) {
                next(err);
              }
              contentRowHtml += htmlString;
            })
          }
          next();
        }, function (err) {
          if (err) {
            next(err);
          }
          next();
        });
      }, function (err) {
        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, contentRowHtml + '</div></div>');
      });
    }


  }

  //Builds the answer side of a contentRow object. options is expected to be an array of resources
  // buildAnswerHtml: function(options, cb) {
  //   if(Object.keys(options).length > 3) {
  //     err = new Error();
  //     err.message = require('util').format('Too many elements in answer');
  //     return cb(err);
  //   }
  //   var answerHtml = '<div class="col-md-6">';
  //   // var firstElement = '';
  //   // var secondElement = '';
  //   // var thirdElement = '';
  //   // console.log('Answeroptions length: ' + options.length);
  //   // console.log(options);
  //   async.eachSeries(options, function(resource, next) {
  //     if(resource.type === 'ResourceText') {//resource instanceof ResourceText) {
  //       answerHtml += '<input type="text">';
  //     } else if(resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
  //       answerHtml += '<input type="number">';
  //     }
  //     next()
  //   }, function(err) {
  //     if(err) {
  //       console.error(err);
  //       return cb(err)
  //     }
  //     return cb(null, answerHtml.concat('</form></div></div>'));
  //   });
  // },

  // buildQuestionHtml: function(options, cb) {
  //   if(Object.keys(options).length > 3) {
  //     err = new Error();
  //     err.message = 'Too many elements in question';
  //     return cb(err);
  //   }
  //   var questionHtml = '<div class="row"><div class="col-md-6"><form>';
  //   console.log('QuestionOptions length: ' + options.length);
  //   console.log(options);
  //   async.eachSeries(options, function(resource, next) {
  //     if (resource.type === 'ResourceText') {//resource instanceof ResourceText) {
  //       questionHtml += resource.text;
  //       console.log(resource.type + resource.text);
  //     } else if (resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
  //       questionHtml.concat('<p>' + resource.number + '</p>');
  //       questionHtml += resource.number;
  //       console.log(resource.type + resource.number);
  //     }
  //     next();
  //   }, function(err) {
  //     if(err) {
  //       console.error(err);
  //       return cb(err);
  //     }
  //     // var startHtml = '<div class="row"><form>';
  //     return cb(null, questionHtml + '</div>');
  //   });
  // },

  // options should be of the form: { resourceType: id, resourceType: id }
  // buildQuestionHtml: function(options, cb) {
  //   var questionHtml = '<div class="row"><div class="col-md-6"><form>';
  //   async.eachOfSeries(options, function(id, resourceType, next) {
  //     if(resourceType === 'ResourceText') {
  //       ResourceText.findOne(id).exec(function(err, foundResourceText) {
  //         if(err) {
  //           console.error(err);
  //           return next(err);
  //         }
  //         questionHtml += foundResourceText.text;
  //       })
  //     } else if(resourceType === 'ResourcePercent') {
  //       ResourcePercent.findOne(id).exec(function(err, foundResourcePercent) {
  //         if(err) {
  //           console.error(err);
  //           return next(err);
  //         }
  //         questionHtml += foundResourcePercent.number;
  //       })
  //     }
  //     next();
  //   }, function(err) {
  //     if(err) {
  //       console.error(err);
  //       return cb(err);
  //     }
  //     return cb(null, questionHtml + '</div>');
  //   });
  // },
  //
  //
  // buildAnswerHtml: function(options, cb) {
  //   var answerHtml = '<div class="col-md-6">';
  //   async.eachOfSeries(options, function(id, resourceType, next) {
  //     if(resourceType === 'ResourceText') {
  //       answerHtml += '<input type="text">';
  //     } else if(resourceType === 'ResourcePercent') {
  //       answerHtml += '<input type="number">';
  //     }
  //     next();
  //   }, function(err) {
  //     if(err) {
  //       console.error(err);
  //       return cb(err);
  //     }
  //     return cb(null, answerHtml + '</div>');
  //   });
  // }

};

