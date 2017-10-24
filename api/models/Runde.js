/**
 * Runde.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	titel: {
  		type: 'string'
  	},
    status: {
      type: 'string',
      enum: ['aktiv', 'kommende', 'arkiveret']
    },
  	meetings: {
  		collection: 'meeting',
  		via: 'runde'
  	},
  	agendas: {
  		collection: 'agenda',
      via: 'runde'
  	}
  },
  
};

