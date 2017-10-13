/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */
var faker = require('faker');

module.exports.bootstrap = function(cb) {

	Bruger.count().exec(function(err, numBrugere) {
		if(err) {
			return cb(err);
		}
		if(numBrugere > 0) {
			return cb();
		}

		async.series([
			function(callback) {
				createTestAfdelinger(callback);
			},
			function(callback) {
				createTestStillingskategorier(callback);
      },
      function(callback) {
        createTestSamtaler(callback);
      },
      function(callback) {
        createTestBrugere(callback);
      },
			function(callback) {
				createTestSamtaleforloeb(callback);
			},
      function(callback) {
        createTestRunder(callback);
      }
			], function(err) {
				if(err) {
					return cb(err);
				}
				return cb();
			});
	});


  function createTestBrugere(callback) {
    async.times(30, function(n, next) {
      Bruger.create({
        fornavn: faker.name.firstName(),
        efternavn: faker.name.lastName(),
        email: faker.internet.email(),
        adgangskode: faker.internet.email(),
        status: faker.random.arrayElement(['aktiv', 'inaktiv'])
      }).exec(function(err, createdBruger) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestSamtaleforloeb(callback) {
    async.times(10, function(n, next) {
      Samtaleforloeb.create({
        titel: faker.company.bsNoun(),
        beskrivelse: faker.lorem.sentence(6),
        invitationsInterval: faker.random.number({min:100, max:350}),
        invitationsFrist: faker.random.number({min:14, max:60}),
        status: faker.random.arrayElement(['aktiv', 'inaktiv', 'arkiveret', 'godkendt'])
      }).exec(function(err, createdSamtaleforloeb) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestAfdelinger(callback) {
    async.times(10, function(n, next) {
      Afdeling.create({
        afsnitskode: faker.helpers.replaceSymbolWithNumber('#####'),
        lokation: faker.lorem.words(1)
      }).exec(function(err, createdAfdeling) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestRunder(callback) {
    Runde.create({
      titel: faker.lorem.words(2),
      status: 'aktiv'
    }).exec(function(err, createdRunde){
      console.log('Aktiv runde kreeret');
      });
    async.times(10, function(n, next) {
      Runde.create({
        titel: faker.lorem.words(2),
        status: faker.random.arrayElement(['kommende', 'arkiveret'])
      }).exec(function(err, createdRunde) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestSamtaler(callback) {
    async.times(30, function(n, next) {
      Samtale.create({
        mødeTidspunkt: faker.date.future(),
        indkaldelsesTidspunkt: faker.date.future(),
        lokale: faker.lorem.words(1),
        status: faker.random.arrayElement(['pending', 'invited', 'handled', 'afsluttet'])
      }).exec(function(err, createdSamtale) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestStillingskategorier(callback) {
    async.times(10, function(n, next) {
      Stillingskategori.create({
        titel: faker.lorem.words(1)
      }).exec(function(err, createdStillingskategori) {
        if(err) {
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }
};
