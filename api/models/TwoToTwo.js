/**
 * TwoToTwo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	frames: {
  		collection: 'frame',
  		via: 'twoToTwos'
  	},
  	questionText: {
  		collection: 'ressourceText',
  		via: 'twoToTwo'
  	},
  	answerText: {
  		collection: 'ressourceText',
  		via: 'twoToTwo'
  	},
  	questionPercent: {
			collection: 'ressourcePercent',
			via: 'twoToTwo'
  	},
  	answerPercent: {
  		collection: 'ressourcePercent',
  		via: 'twoToTwo'
  	}
  }
};

