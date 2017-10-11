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
    status: {
      type: 'string',
      enum: ['aktiv', 'kommende', 'arkiveret']
    },
  	samtaler: {
  		collection: 'samtale',
  		via: 'runde'
  	},
  	samtaleforloeb: {
  		collection: 'samtaleforloeb',
      via: 'runder'
  	}
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Runde.findOne(newlyInsertedRecord.id)
  	.exec(function (err, runde) {
  		Samtale.find().exec(function(err, samtaler) {
        if(err) {
          return cb(err);
        }
        runde.samtaler.add(_.sample(samtaler).id);
        runde.save(function(err) {
          if(err) {
            return cb(err);
          }
          return cb();
        });
      });
  	});
  }

  
};

