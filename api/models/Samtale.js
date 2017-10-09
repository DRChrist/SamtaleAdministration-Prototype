/**
 * Samtale.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	mødeTidspunkt: {
  		type: 'datetime'
  	},
  	indkaldelsesTidspunkt: {
  		type: 'datetime'
  	},
  	lokale: {
  		type: 'string'
  	},
  	status: {
  		type: 'string',
  		enum: ['pending', 'invited', 'handled', 'afsluttet']
  	},
  	medarbejder: {
  		model: 'bruger'
  	},
  	runde: {
  		model: 'runde'
  	},
    samtaleforløb: {
      model: 'samtaleforløb'
    }
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  //   Samtale.findOne(newlyInsertedRecord.id)
  //   .populate('medarbejder')
  //   .populate('runde')
  //   .populate('samtaleforløb')
  //   .exec(function(err, samtale) {
  //     if(err) {
  //       return cb(err);
  //     }
  //     samtale.medarbejder.add(Math.floor(Math.random() * 30));
  //     samtale.runde.add(Math.floor(Math.random() * 10));
  //     samtale.samtaleforløb.add(Math.floor(Math.random() * 10));
  //     samtale.save(function(err) {
  //       if(err) {
  //         return cb(err);
  //       }
  //       return cb();
  //     });
  //   });
  // }

  
};

