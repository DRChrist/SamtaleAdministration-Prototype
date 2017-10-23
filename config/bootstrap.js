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
        createTestRessourceText(callback);
      },
      function(callback) {
        createTestRessourcePercent(callback);
      },
      function(callback) {
        createTestLines(callback);
      },
      function(callback) {
        createTestFrames(callback);
      },
      function(callback) {
        createTestRessourcer(callback);
      },
			function(callback) {
				createTestDepartments(callback);
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
    console.log('createTestBrugere');
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
        Stillingskategori.find().exec(function(err, stillingskategorier) {
          if(err) {
            return callback(err);
          }
          createdBruger.stillingskategorier.add(_.sample(stillingskategorier).id);
          Department.find().exec(function(err, departments) {
            if(err) {
              return callback(err);
            }
            createdBruger.departments.add(_.sample(departments).id);
            Samtale.find().exec(function(err, samtaler) {
              if(err) {
                return callback(err);
              }
              createdBruger.samtaler.add(_.sample(samtaler).id);
              createdBruger.save(function(err) {
                if(err) {
                  return callback(err);
                }
                next(err);
              });
            });
          });
        });
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestSamtaleforloeb(callback) {
    console.log('createTestSamtaleforloeb');
    async.times(10, function(n, next) {
      Samtaleforloeb.create({
        titel: faker.company.bsNoun(),
        beskrivelse: faker.lorem.sentence(6),
        invitationsInterval: faker.random.number({ min:100, max:350 }),
        invitationsFrist: faker.random.number({ min:14, max:60 }),
        status: faker.random.arrayElement(['aktiv', 'inaktiv', 'arkiveret', 'godkendt'])
      }).exec(function(err, createdSamtaleforloeb) {
        if(err) {
          return callback(err);
        }
        Stillingskategori.find().exec(function(err, stillingskategorier) {
          if(err) {
            return callback(err);
          }
          createdSamtaleforloeb.stillingskategorier.add(_.sample(stillingskategorier).id);
          Department.find().exec(function(err, departments) {
            if(err) {
              return callback(err);
            }
            createdSamtaleforloeb.departments.add(_.sample(departments).id);
            Ressource.find().exec(function(err, ressourcer) {
              if(err) {
                console.error(err);
                return callback(err);
              }
              createdSamtaleforloeb.ressourcer.add(_.sample(ressourcer).id);
              Samtale.find().populate('samtaleforloeb').exec(function(err, samtaler) {
                if(err) {
                  return callback(err);
                }
              
                if(createdSamtaleforloeb.status === 'aktiv') {
                  async.forEachSeries(samtaler, function(samtale, next) {
                    if(Math.random() > 0.4) {
                      createdSamtaleforloeb.samtaler.add(samtale.id);
                    }
                    next();
                  }, function(err) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdSamtaleforloeb.save(function(err) {
                      if(err) {
                        console.error(err);
                        return callback(err);
                      }
                      // return callback();
                      next();
                    });
                  });
                } else {
                  createdSamtaleforloeb.save(function(err) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    next();
                  });
                }
              });
            });
          });
       });
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestDepartments(callback) {
    console.log('createTestDepartments');
    async.times(10, function(n, next) {
      Department.create({
        afsnitskode: faker.helpers.replaceSymbolWithNumber('#####'),
        lokation: faker.lorem.words(1)
      }).exec(function(err, createdDepartment) {
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
      if(err) {
        console.error(err);
        return callback(err);
      }
      async.series([
            function(callback) {
              Samtaleforloeb.find({status: 'aktiv'}).exec(function(err, samtaleforløb) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
              async.forEachSeries(samtaleforløb, function(sf, next) {
                createdRunde.samtaleforloeb.add(sf.id);
                next();
              }, function(err) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                callback();
                });
              });
            },
            function(callback) {
              Samtale.find().exec(function(err, samtaler) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                async.forEachSeries(samtaler, function(samtale, next) {
                  createdRunde.samtaler.add(samtale.id);
                  next();
                }, function(err) {
                  if(err) {
                    console.error(err);
                    return callback(err);
                  }
                  callback();
                });
              });
            }
          ], function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            createdRunde.save(function(err) {
              if(err) {
                console.error(err);
                return callback(err);
              }
            });
          });
      });
    async.times(10, function(n, next) {
      Runde.create({
        titel: faker.lorem.words(2),
        status: faker.random.arrayElement(['kommende', 'arkiveret'])
      }).exec(function(err, createdRunde) {
        if(err) {
          return callback(err);
        }
        Samtaleforloeb.find().exec(function(err, samtaleforløb) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          createdRunde.samtaleforloeb.add(_.sample(samtaleforløb).id);
          createdRunde.save(function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            next(err);
          });
        });
      });
    }, function(err) {
      if(err) {
        return callback(err);
      }
      return callback();
    });
  }


  function createTestSamtaler(callback) {
    console.log('createTestSamtaler');
    async.times(30, function(n, next) {
    var status = faker.random.arrayElement(['pending', 'invited', 'handled', 'afsluttet']);
      if(status === 'pending' || status === 'invited') {
        Samtale.create({
          mødeTidspunkt: faker.date.future(),
          indkaldelsesTidspunkt: faker.date.future(),
          lokale: faker.lorem.words(1),
          status: status
        }).exec(function(err, createdSamtale) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          next(err);
        });
      } else {
        Samtale.create({
          mødeTidspunkt: faker.date.past(),
          indkaldelsesTidspunkt: faker.date.past(),
          lokale: faker.lorem.words(1),
          status: status
        }).exec(function(err, createdSamtale) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          next(err);
        });
      }
    }, function(err) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        return callback();
      });
  }


  function createTestStillingskategorier(callback) {
    console.log('createTestStillingskategorier');
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

  function createTestRessourceText(callback) {
    console.log('createTestRessourceText');
    async.times(10, function(n, next) {
      RessourceText.create({
        text: faker.lorem.words(8)
      }).exec(function(err, createdRessourceText) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        console.error(err);
        return callback(err);
      }
      return callback();
    });
  }

  function createTestRessourcePercent(callback) {
    console.log('createTestRessourcePercent');
    async.times(10, function(n, next) {
      RessourcePercent.create({
        number: faker.random.number(100)
      }).exec(function(err, createdRessourcePercent) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        next(err);
      });
    }, function(err) {
      if(err) {
        console.error(err);
        return callback(err);
      }
      return callback();
    });
  }

  function createTestFrames(callback) {
    console.log('createTestFrames');
    async.times(10, function(n, next) {
      Frame.create({
        titel: faker.lorem.words(2)
      }).exec(function(err, createdFrame) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        Line.find().exec(function(err, lines) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          createdFrame.lines.add(_.sample(lines).id);
          createdFrame.save(function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            next(err);
          });
        });
      });
    }, function(err) {
      if(err) {
        console.error(err);
        return callback(err);
      }
      return callback();
    });
  }

  function createTestRessourcer(callback) {
    console.log('createTestRessourcer');
    async.times(10, function(n, next) {
      Ressource.create({
        titel: faker.lorem.words(1),
        beskrivelse: faker.lorem.words(7)
      }).exec(function(err, createdRessource) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        Frame.find().exec(function(err, frames) {
          if(err) {
            console.error(err);
            return cb(err);
          }
          createdRessource.frames.add(_.sample(frames).id);
          createdRessource.save(function(err) {
            if(err) {
              console.error(err);
              return cb(err);
            }
            next(err);
          });
        });
      });
    }, function(err) {
      if(err) {
        console.error(err);
        return callback(err);
      }
      return callback();
    });
  }

  function createTestLines(callback) {
    console.log('createTestLines');
    async.times(10, function(n, next) {
      Line.create().exec(function(err, createdLine) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        RessourceText.find().exec(function(err, texts) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          var zeroToTwo = faker.random.number(2);
          async.times(zeroToTwo, function(n, next) {
            createdLine.questionTexts.add(_.sample(texts).id);
            next();
        }, function(err) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          RessourcePercent.find().exec(function(err, numbers) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            var zeroOrOne = faker.random.number(1);
            async.times(zeroOrOne, function(n, next) {
              createdLine.questionPercents.add(_.sample(numbers).id);
              next();
          }, function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            zeroToTwo = faker.random.number(2);
            async.times(zeroToTwo, function(n, next) {
              RessourceText.create().exec(function(err, text) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                createdLine.answerTexts.add(text.id);
              });
                next();
              }, function(err) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                zeroOrOne = faker.random.number(1);
                async.times(zeroOrOne, function(n, next) {
                  RessourcePercent.create().exec(function(err, number) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdLine.answerPercents.add(number.id);
                  });
                    next();
                  }, function(err) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdLine.save(function(err) {
                      if(err) {
                        console.error(err);
                        return callback(err);
                      }
                      next();
                    });
                  });
                });
              });
            });
          });
          });
        });
        }, function(err) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          return callback();
        });
    //   });
    // });
  }

};
