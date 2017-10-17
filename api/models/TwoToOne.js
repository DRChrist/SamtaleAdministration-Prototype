/**
 * TwoToOne.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	frames: {
  		collection: 'frame',
  		via: 'twoToOnes'
  	},
  	questionText: {
  		collection: 'ressourceText',
  		via: 'twoToOne'
  	},
  	answerText: {
  		collection: 'ressourceText',
  		via: 'twoToOne'
  	},
  	questionPercent: {
			collection: 'ressourcePercent',
			via: 'twoToOne'
  	},
  	answerPercent: {
  		collection: 'ressourcePercent',
  		via: 'twoToOne'
  	}
  }
};

