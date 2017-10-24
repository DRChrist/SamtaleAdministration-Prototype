/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	firstName: {
  		type: 'string'
  	},
  	lastName: {
  		type: 'string'
  	},
  	email: {
  		type: 'string'
  	},
  	password: {
  		type: 'string'
  	},
  	state: {
  		type: 'string',
  		enum: ['active', 'inactive']
  	},
  	jobs: {
  		collection: 'job',
  		via: 'users',
  		dominant: true
  	},
  	departments: {
  		collection: 'department',
  		via: 'users',
  		dominant: true
  	},
  	meetings: {
  		collection: 'meeting',
  		via: 'user'
  	}
  },

  
};

