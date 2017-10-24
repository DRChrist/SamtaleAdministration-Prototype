/**
 * Ressource.js
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
  	agendas: {
  		collection: 'agenda',
  		via: 'ressourcer'
  	},
  	frames: {
  		collection: 'frame',
  		via: 'ressourcer',
  		dominant: true
  	}
  },

};

