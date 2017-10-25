/**
 * agendas.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string'
  	},
  	description: {
  		type: 'string'
  	},
  	inviteInterval: {
  		// in days
  		type: 'integer'
  	},
  	invitePeriod: {
  		// in days
  		type: 'integer'
  	},
  	state: {
  		type: 'string',
      enum: ['active', 'inactive', 'archived', 'approved']
  	},
  	// round: {
  	// 	model: 'round'
  	// },
  	departments: {
  		collection: 'department',
  		via: 'agendas',
  		dominant: true
  	},
  	jobs: {
  		collection: 'job',
  		via: 'agendas',
  		dominant: true
  	},
  	contents: {
      collection: 'content',
      via: 'agendas',
      dominant: true
    },
    meetings: {
      collection: 'meeting',
      via: 'agenda',
      dominant: true
    }
  },
  
};

