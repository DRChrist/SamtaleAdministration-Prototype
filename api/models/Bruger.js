/**
 * Bruger.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	fornavn: {
  		type: 'string'
  	},
  	efternavn: {
  		type: 'string'
  	},
  	email: {
  		type: 'string'
  	},
  	adgangskode: {
  		type: 'string'
  	},
  	status: {
  		type: 'string',
  		enum: ['aktiv', 'inaktiv']
  	},
  	stillingskategorier: {
  		collection: 'stillingskategori',
  		via: 'medarbejdere',
  		dominant: true
  	},
  	afdelinger: {
  		collection: 'afdeling',
  		via: 'medarbejdere',
  		dominant: true
  	},
  	samtaler: {
  		collection: 'samtale',
  		via: 'medarbejder',
  		dominant: true
  	}
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Bruger.findOne(newlyInsertedRecord.id)
  	.populate('stillingskategorier')
  	.populate('afdelinger')
  	.populate('samtaler')
  	.exec(function(err, bruger) {
  		if(err) {
  			return cb(err);
  		}
  		bruger.stillingskategorier.add(Math.floor(Math.random() * 30));
  		bruger.afdelinger.add(Math.floor(Math.random() * 30));
  		bruger.samtaler.add(Math.floor(Math.random() * 30));
  		bruger.save(function(err) {
  			if(err) {
  				return cb(err);
  			}
  			return cb();
  		});
  	});
  }
};

