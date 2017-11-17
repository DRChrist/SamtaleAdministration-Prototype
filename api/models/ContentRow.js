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
    // console.log('Answeroptions length: ' + options.length);
    // console.log(options);
    async.eachSeries(options, function(resource, next) {
      if(resource.type === 'ResourceText') {//resource instanceof ResourceText) {
        answerHtml += '<input type="text"> text </input>';
      } else if(resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
        answerHtml += '<input type="number"> number </input>';
      }
      next()
    }, function(err) {
      if(err) {
        console.error(err);
        return cb(err)
      }
      return cb(null, answerHtml.concat('</form></div>'));
    });
  },

  buildQuestionHtml: function(options, cb) {
    if(Object.keys(options).length > 3) {
      err = new Error();
      err.message = 'Too many elements in question';
      return cb(err);
    }
    var questionHtml = '<div class="row"><form>';
    console.log('QuestionOptions length: ' + options.length);
    console.log(options);
    async.eachSeries(options, function(resource, next) {
      if (resource.type === 'ResourceText') {//resource instanceof ResourceText) {
        questionHtml += resource.text;
        console.log(resource.type + resource.text);
      } else if (resource.type === 'ResourcePercent') {//resource instanceof ResourcePercent) {
        questionHtml.concat('<p>' + resource.number + '</p>');
        questionHtml += resource.number;
        console.log(resource.type + resource.number);
      }
      next();
    }, function(err) {
      if(err) {
        console.error(err);
        return cb(err);
      }
      // var startHtml = '<div class="row"><form>';
      return cb(null, questionHtml);
    });
  }

};

