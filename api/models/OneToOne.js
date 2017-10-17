/**
 * OneToOne.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	frames: {
  		collection: 'frame',
  		via: 'oneToOnes'
  	},
  	questionText: {
  		collection: 'ressourceText',
  		via: 'oneToOne'
  	},
  	answerText: {
  		collection: 'ressourceText',
  		via: 'oneToOne'
  	},
  	questionPercent: {
			collection: 'ressourcePercent',
			via: 'oneToOne'
  	},
  	answerPercent: {
  		collection: 'ressourcePercent',
  		via: 'oneToOne'
  	}

  }
};

