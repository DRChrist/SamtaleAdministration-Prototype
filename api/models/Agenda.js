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
    //how long there is between meetings
  	inviteInterval: {
  		// in days
  		type: 'integer'
  	},
    //how long before a meeting that an invitation should be sent out
  	invitePeriod: {
  		// in days
  		type: 'integer'
  	},
  	state: {
  		type: 'string',
      enum: ['active', 'inactive', 'upcoming'],
      defaultsTo: 'inactive'
  	},
    approved: {
      type: 'boolean',
      defaultsTo: 'false'
    },
  	deletedAt: {
      type: 'datetime'
    },
  	departments: {
  		collection: 'department',
  		via: 'agendas'
  	},
  	jobs: {
  		collection: 'job',
  		via: 'agendas'
  	},
  	contents: {
      collection: 'content',
      via: 'agendas'
    },
    meetings: {
      collection: 'meeting',
      via: 'agenda'
    }
  }

};

