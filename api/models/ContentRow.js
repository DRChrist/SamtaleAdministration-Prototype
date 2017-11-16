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
  		collection: 'resourceText',
  		via: 'contentRow'
  	},
  	answerTexts: {
  		collection: 'resourceText',
  		via: 'contentRow'
  	},
  	questionPercents: {
  		collection: 'resourcePercent',
  		via: 'contentRow'
  	},
  	answerPercents: {
  		collection: 'resourcePercent',
  		via: 'contentRow'
  	}

  },

  //Builds the answer side of a contentRow object. options is expected to be an array of resources
  buildAnswerHtml: function(options, cb) {
    if(Object.keys(options).length > 3) {
      err = new Error();
      err.message = require('util').format('Too many elements in answer');
      return cb(err);
    }
    var answerHtml = '';
    // var firstElement = '';
    // var secondElement = '';
    // var thirdElement = '';
    async.each(options, function(resource, next) {
      if(resource.type === 'ResourceText') {//resource instanceof ResourceText) {
        answerHtml += answerHtml + '<textField></textField>';
      } else if(resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
        answerHtml += answerHtml + '<number></number>';
      }
      next()
    }, function(err) {
      if(err) {
        console.error(err);
        return cb(err)
      }
      return cb(answerHtml.concat('</div>'));
    });
  },

  buildQuestionHtml: function(options, cb) {
    if(Object.keys(options).length > 3) {
      err = new Error();
      err.message = 'Too many elements in question';
      return cb(err);
    }
    console.log(options);
    var questionHtml = '<div class="row">';
    async.each(options, function(resource, next) {
      if (resource.type === 'ResourceText') {//resource instanceof ResourceText) {
        questionHtml += questionHtml + resource.text;
        console.log(resource.type + resource.text);
      } else if (resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
        questionHtml.concat('<p>' + resource.number + '</p>');
        questionHtml += questionHtml + resource.number;
        console.log(resource.type + resource.number);
      }
      next();
    }, function(err) {
      if(err) {
        console.error(err);
        return cb(err);
      }
      return cb(questionHtml);
    });
  }

};

