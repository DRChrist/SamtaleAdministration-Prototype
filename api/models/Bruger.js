/**
 * Bruger.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	fornavn: {
  		type: 'string'
  	},
  	efternavn: {
  		type: 'string'
  	},
  	email: {
  		type: 'string'
  	},
  	adgangskode: {
  		type: 'string'
  	},
  	status: {
  		type: 'string',
  		enum: ['aktiv', 'inaktiv']
  	},
  	stillingskategorier: {
  		collection: 'stillingskategori',
  		via: 'medarbejdere',
  		dominant: true
  	},
  	departments: {
  		collection: 'department',
  		via: 'medarbejdere',
  		dominant: true
  	},
  	samtaler: {
  		collection: 'samtale',
  		via: 'medarbejder'
  	}
  },

  
};

