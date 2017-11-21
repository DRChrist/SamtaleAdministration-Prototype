/**
 * Meeting.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	meetingTime: {
  		type: 'datetime'
  	},
  	inviteTime: {
  		type: 'datetime'
  	},
  	room: {
  		type: 'string'
  	},
  	state: {
  		type: 'string',
  		enum: ['pending', 'invited', 'handled', 'finished']
  	},
  	user: {
  		model: 'user'
  	},
  	round: {
  		model: 'round'
  	},
    agenda: {
      model: 'agenda'
    }
  }



};

