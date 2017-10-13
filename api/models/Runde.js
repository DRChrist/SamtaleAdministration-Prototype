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
      via: 'runde'
  	}
  },

  afterCreate: function(newlyInsertedRecord, cb) {
  	Runde.findOne(newlyInsertedRecord.id)
  	.exec(function (err, runde) {
      if(err) {
        console.error(err);
        return cb(err);
      }
      Samtaleforloeb.find().exec(function(err, samtaleforløb) {
        if(err) {
          console.error(err);
          return cb(err);
        }
        runde.samtaleforloeb.add(_.sample(samtaleforløb).id);

        if(newlyInsertedRecord.status === 'aktiv') {
      		Samtale.find().exec(function(err, samtaler) {
            if(err) {
              return cb(err);
            }
            async.forEachSeries(samtaler, function(samtale, next) {
              runde.samtaler.add(samtale.id);
              next();
            }, function(err) {
              if(err) {
                console.error(err);
                return cb(err);
              }
              runde.save(function(err) {
                if(err) {
                  console.error(err);
                  return cb(err);
                }
                return cb();
              });
            });
          });
        } else {
          runde.save(function(err) {
            if(err) {
              return cb(err);
            }
            return cb();
          });
         }
      });
  	});
  }

  
};

