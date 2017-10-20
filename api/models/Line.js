/**
 * Line.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

  	frames: {
  		collection: 'frame',
  		via: 'lines'
  	},
  	questionTexts: {
  		collection: 'ressourceText',
  		via: 'line',
  	},
  	answerTexts: {
  		collection: 'ressourceText',
  		via: 'line',
  	},
  	questionPercents: {
  		collection: 'ressourcePercent',
  		via: 'line',
  	},
  	answerPercents: {
  		collection: 'ressourcePercent',
  		via: 'line',
  	}

  }
};

