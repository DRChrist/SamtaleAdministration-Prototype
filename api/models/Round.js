/**
 * Round.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string'
  	},
    state: {
      type: 'string',
      enum: ['active', 'upcoming', 'archived']
    },
  	meetings: {
  		collection: 'meeting',
  		via: 'round'
  	},
  	// agendas: {
  	// 	collection: 'agenda',
   //    via: 'round'
  	// }
  },
  
};

