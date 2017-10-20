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
  	samtaleforloeb: {
  		collection: 'samtaleforloeb',
  		via: 'ressourcer'
  	},
  	frames: {
  		collection: 'frame',
  		via: 'ressourcer',
  		dominant: true
  	}
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  // 	Ressource.findOne(newlyInsertedRecord.id).exec(function(err, ressource) {
  // 		if(err) {
  // 			console.error(err);
  // 			return cb(err);
  // 		}
  // 		Frame.find().exec(function(err, frames) {
  // 			if(err) {
  // 				console.error(err);
  // 				return cb(err);
  // 			}
  // 			ressource.frames.add(_.sample(frames).id);
  // 			ressource.save(function(err) {
  // 				if(err) {
  // 					console.error(err);
  // 					return cb(err);
  // 				}
  // 				return cb();
  // 			});
  // 		});
  // 	});
  // }


};

