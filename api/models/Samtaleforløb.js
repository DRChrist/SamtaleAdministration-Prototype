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
  		collection: 'stilingskategori',
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
  	}
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Samtaleforløb.findOne(newlyInsertedRecord.id)
  	.populate('runder')
  	.populate('stillingskategorier')
  	.populate('afdelinger')
  	.populate('skemaer')
  	.populate('planer')
  	.exec(function(err, samtaleforløb) {
  		if(err) {
  			return cb(err);
  		}
  		samtaleforløb.runder.add(Math.floor(Math.random() * 30));
  		samtaleforløb.stillingskategorier.add(Math.floor(Math.random() * 30));
  		samtaleforløb.afdelinger.add(Math.floor(Math.random() * 30));
  		samtaleforløb.skemaer.add(Math.floor(Math.random() * 30));
  		samtaleforløb.planer.add(Math.floor(Math.random() * 30));
  		samtaleforløb.save(function(err) {
  			if(err) {
  				return cb(err);
  			}
  			return cb();
  		});
  	});
  }
};

