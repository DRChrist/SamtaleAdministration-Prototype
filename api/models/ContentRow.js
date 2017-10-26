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
  		via: 'contentRow',
  	},
  	answerTexts: {
  		collection: 'resourceText',
  		via: 'contentRow',
  	},
  	questionPercents: {
  		collection: 'resourcePercent',
  		via: 'contentRow',
  	},
  	answerPercents: {
  		collection: 'resourcePercent',
  		via: 'contentRow',
  	}

  }
};

