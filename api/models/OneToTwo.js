/**
 * OneToTwo.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	frames: {
  		collection: 'frame',
  		via: 'oneToTwos'
  	},
  	questionText: {
  		collection: 'ressourceText',
  		via: 'oneToTwo'
  	},
  	answerText: {
  		collection: 'ressourceText',
  		via: 'oneToTwo'
  	},
  	questionPercent: {
			collection: 'ressourcePercent',
			via: 'oneToTwo'
  	},
  	answerPercent: {
  		collection: 'ressourcePercent',
  		via: 'oneToTwo'
  	}
  }
};

