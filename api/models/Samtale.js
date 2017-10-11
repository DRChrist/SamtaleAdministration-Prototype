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
    samtaleforloeb: {
      model: 'samtaleforloeb'
    }
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  //   Samtale.findOne(newlyInsertedRecord.id)
  //   .populate('medarbejder')
  //   .populate('runde')
  //   .populate('samtaleforloeb')
  //   .exec(function(err, samtale) {
  //     if(err) {
  //       return cb(err);
  //     }
  //     Bruger.find().exec(function(err, brugere) {
  //       if(err) {
  //         return cb(err);
  //       }
  //       samtale.medarbejder.add(_.sample(brugere).id);
  //       Runde.find().exec(function(err, runder) {
  //         if(err) {
  //           return cb(err);
  //         }
  //         samtale.runde.add(_.sample(runder).id);
  //         Samtaleforloeb.find().exec(function(err, samtaleforløb){
  //           if(err) {
  //             return cb(err);
  //           }
  //           samtale.samtaleforloeb.add(_.sample(samtaleforløb).id);
  //           samtale.save(function(err) {
  //             if(err) {
  //               return cb(err);
  //             }
  //             return cb();
  //           });
  //         });
  //       });
  //     });
  //   });
  // }

  
};

