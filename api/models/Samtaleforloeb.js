/**
 * Samtaleforloeb.js
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
  	invitationsInterval: {
  		// in days
  		type: 'integer'
  	},
  	invitationsFrist: {
  		// in days
  		type: 'integer'
  	},
  	status: {
  		type: 'string',
      enum: ['aktiv', 'inaktiv', 'arkiveret', 'godkendt']
  	},
  	runde: {
  		model: 'runde'
  	},
  	afdelinger: {
  		collection: 'afdeling',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
  	stillingskategorier: {
  		collection: 'stillingskategori',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
  	ressourcer: {
      collection: 'ressource',
      via: 'samtaleforloeb',
      dominant: true
    },
    samtaler: {
      collection: 'samtale',
      via: 'samtaleforloeb',
      dominant: true
    }
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  // 	Samtaleforloeb.findOne(newlyInsertedRecord.id)
  // 	.exec(function(err, samtaleforloeb) {
  // 		if(err) {
  // 			return cb(err);
  // 		}
  //     if(!samtaleforloeb) {
  //       console.error('Samtaleforloeb not properly created');
  //       return cb(err);
  //     }
  //     Stillingskategori.find().exec(function(err, stillingskategorier) {
  //       if(err) {
  //         return cb(err);
  //       }
  //       samtaleforloeb.stillingskategorier.add(_.sample(stillingskategorier).id);
  //       Afdeling.find().exec(function(err, afdelinger) {
  //         if(err) {
  //           return cb(err);
  //         }
  //         samtaleforloeb.afdelinger.add(_.sample(afdelinger).id);
  //         Ressource.find().exec(function(err, ressourcer) {
  //           if(err) {
  //             console.error(err);
  //             return cb(err);
  //           }
  //           samtaleforloeb.ressourcer.add(_.sample(ressourcer).id);
  //           Samtale.find().populate('samtaleforloeb').exec(function(err, samtaler) {
  //             if(err) {
  //               return cb(err);
  //             }
            
  //             if(samtaleforloeb.status === 'aktiv') {
  //               async.forEachSeries(samtaler, function(samtale, next) {
  //                 if(Math.random() > 0.4) {
  //                   samtaleforloeb.samtaler.add(samtale.id);
  //                 }
  //                 next();
  //               }, function(err) {
  //                 if(err) {
  //                   console.error(err);
  //                   return cb(err);
  //                 }
  //                 samtaleforloeb.save(function(err) {
  //                   if(err) {
  //                     console.error(err);
  //                     return cb(err);
  //                   }
  //                   return cb();
  //                 });
  //               });
  //             } else {
  //               samtaleforloeb.save(function(err) {
  //                 if(err) {
  //                   console.error(err);
  //                   return cb(err);
  //                 }
  //                 return cb();
  //               });
  //             }
  //           });
  //         });
  //       });
  //     });
  // 	});
  // }

  
};

