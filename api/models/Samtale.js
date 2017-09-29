/**
 * Samtale.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	mødeTidspunkt: {
  		type: 'datetime'
  	},
  	indkaldelsesTidspunkt: {
  		type: 'datetime'
  	},
  	lokale: {
  		type: 'string'
  	},
  	status: {
  		type: 'string',
  		enum: ['pending', 'invited', 'handled', 'afsluttet']
  	},
  	medarbejder: {
  		model: 'bruger'
  	},
  	runde: {
  		model: 'runde'
  	}
  }
};

