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
  		via: 'medarbejder'
  	}
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Bruger.findOne(newlyInsertedRecord.id)
  	.exec(function(err, bruger) {
  		if(err) {
  			return cb(err);
  		}
      Stillingskategori.find().exec(function(err, stillingskategorier) {
        if(err) {
          return cb(err);
        }
        bruger.stillingskategorier.add(_.sample(stillingskategorier).id);
        Afdeling.find().exec(function(err, afdelinger) {
          if(err) {
            return cb(err);
          }
          bruger.afdelinger.add(_.sample(afdelinger).id);
          Samtale.find().exec(function(err, samtaler) {
            if(err) {
              return cb(err);
            }
            bruger.samtaler.add(_.sample(samtaler).id);
      		  bruger.save(function(err) {
        			if(err) {
        				return cb(err);
        			}
      			return cb();
      		  });
          });
        });
    	});
    });
  }

  
};

