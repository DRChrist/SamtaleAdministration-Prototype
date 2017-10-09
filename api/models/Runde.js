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
  	samtaler: {
  		collection: 'samtale',
  		via: 'runde'
  	},
  	samtaleforløb: {
  		model: 'samtaleforløb'
  	}
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  // 	Runde.findOne(newlyInsertedRecord.id)
  // 	.populate('samtaleforløb')
  // 	.exec(function (err, runde) {
  // 		runde.samtaleforløb.add(Math.floor(Math.random() * 10));
  // 		runde.save(function(err) {
  // 			if(err) {
  // 				return cb(err);
  // 			}
  // 			return cb();
  // 		});
  // 	});
  // }

  
};

