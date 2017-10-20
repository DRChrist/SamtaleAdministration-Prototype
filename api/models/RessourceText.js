/**
 * RessourceText.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	text: {
  		type: 'string'
  	},
    line: {
      model: 'line'
    },
  	oneToOne: {
  		model: 'oneToOne'
  	},
  	oneToTwo: {
  		model: 'oneToTwo'
  	},
  	twoToOne: {
  		model: 'twoToOne'
  	},
  	twoToTwo: {
  		model: 'twoToTwo'
  	}
  }
};

