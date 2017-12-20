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
    //callback has parameters (err, htmlString);
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
              next();
            })
          } else {
            next();
          }
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


};

