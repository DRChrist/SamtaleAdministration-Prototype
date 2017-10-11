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
      enum: ['aktiv', 'inaktiv', 'arkiveret']
  	},
  	godkendt: {
  		type: 'boolean'
  	},
  	runder: {
  		collection: 'runde',
  		via: 'samtaleforloeb'
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
  	skemaer: {
  		collection: 'skema',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
  	planer: {
  		collection: 'plan',
  		via: 'samtaleforloeb',
  		dominant: true
  	},
    samtaler: {
      collection: 'samtale',
      via: 'samtaleforloeb'
    }
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Samtaleforloeb.findOne(newlyInsertedRecord.id)
  	.exec(function(err, samtaleforloeb) {
  		if(err) {
  			return cb(err);
  		}
      if(!samtaleforloeb) {
        console.error('Samtaleforloeb not properly created');
        return cb(err);
      }
      Stillingskategori.find().exec(function(err, stillingskategorier) {
        if(err) {
          return cb(err);
        }
        samtaleforloeb.stillingskategorier.add(_.sample(stillingskategorier).id);
        Afdeling.find().exec(function(err, afdelinger) {
          if(err) {
            return cb(err);
          }
          samtaleforloeb.afdelinger.add(_.sample(afdelinger).id);
          Samtale.find().exec(function(err, samtaler) {
            if(err) {
              return cb(err);
            }
            samtaleforloeb.samtaler.add(_.sample(samtaler).id);
            Runde.find().exec(function(err, runder) {
              if(err) {
                return cb(err);
              }
              samtaleforloeb.runder.add(_.sample(runder).id);
              samtaleforloeb.save(function(err) {
                if(err) {
                  return cb(err);
                }
                return cb();
              });
            });
          });
        });
      });
  	});
  }

  
};

