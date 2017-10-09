/**
 * Afdeling.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	afsnitskode: {
  		type: 'string'
  	},
  	lokation: {
  		type: 'string'
  	},
  	medarbejdere: {
  		collection: 'bruger',
  		via: 'afdelinger'
  	},
  	samtaleforløb: {
  		collection: 'samtaleforløb',
  		via: 'afdelinger'
  	}
  }
};

