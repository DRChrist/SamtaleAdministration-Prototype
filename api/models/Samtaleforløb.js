/**
 * Samtaleforløb.js
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
  	aktiveret: {
  		type: 'boolean'
  	},
  	godkendt: {
  		type: 'boolean'
  	},
  	arkiveret: {
  		type: 'boolean'
  	},
  	runder: {
  		collection: 'runde',
  		via: 'samtaleforløb'
  	},
  	afdelinger: {
  		collection: 'afdeling',
  		via: 'samtaleforløb',
  		dominant: true
  	},
  	stillingskategorier: {
  		collection: 'stillingskategori',
  		via: 'samtaleforløb',
  		dominant: true
  	},
  	skemaer: {
  		collection: 'skema',
  		via: 'samtaleforløb',
  		dominant: true
  	},
  	planer: {
  		collection: 'plan',
  		via: 'samtaleforløb',
  		dominant: true
  	},
    samtaler: {
      collection: 'samtale',
      via: 'samtaleforløb'
    }
  },

  // afterCreate: function(newlyInsertedRecord, cb) {
  // 	Samtaleforløb.findOne(newlyInsertedRecord.id)
  // 	.populate('stillingskategorier')
  // 	.populate('afdelinger')
  // 	.populate('skemaer')
  // 	.populate('planer')
  // 	.exec(function(err, samtaleforløb) {
  // 		if(err) {
  // 			return cb(err);
  // 		}
  //     if(!samtaleforløb) {
  //       console.error('Samtaleforløb not properly created');
  //       return cb(err);
  //     }
  //     var rand = Math.floor(Math.random() * 10);
  //     console.log(samtaleforløb.titel);
  //     console.log(rand);
  // 		samtaleforløb.stillingskategorier.add(rand);
  // 		samtaleforløb.afdelinger.add(rand);
  // 		// samtaleforløb.skemaer.add(Math.floor(Math.random() * 10));
  // 		// samtaleforløb.planer.add(Math.floor(Math.random() * 10));
  // 		samtaleforløb.save(function(err) {
  // 			if(err) {
  //         console.log('Error after creating samtaleforløb: ' + samtaleforløb.titel);
  //         console.error(err);
  // 				return cb(err);
  // 			}
  // 			return cb();
  // 		});
  // 	});
  // }

  
};

