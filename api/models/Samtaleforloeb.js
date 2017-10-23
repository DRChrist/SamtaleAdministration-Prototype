/**
 * Samtaleforloeb.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	titel: {
  		type: 'string'
  	},
  	beskrivelse: {
  		type: 'string'
  	},
  	invitationsInterval: {
  		// in days
  		type: 'integer'
  	},
  	invitationsFrist: {
  		// in days
  		type: 'integer'
  	},
  	status: {
  		type: 'string',
      enum: ['aktiv', 'inaktiv', 'arkiveret', 'godkendt']
  	},
  	runde: {
  		model: 'runde'
  	},
  	afdelinger: {
  		collection: 'afdeling',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
  	stillingskategorier: {
  		collection: 'stillingskategori',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
  	ressourcer: {
      collection: 'ressource',
      via: 'samtaleforloeb',
      dominant: true
    },
    samtaler: {
      collection: 'samtale',
      via: 'samtaleforloeb',
      dominant: true
    }
  },
  
};

