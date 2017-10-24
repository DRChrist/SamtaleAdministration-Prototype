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
				createTestJobs(callback);
      },
      function(callback) {
        createTestMeetings(callback);
      },
      function(callback) {
        createTestUsers(callback);
      },
			function(callback) {
				createTestAgendas(callback);
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


  function createTestUsers(callback) {
    console.log('createTestUsers');
    async.times(30, function(n, next) {
      User.create({
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.email(),
        state: faker.random.arrayElement(['active', 'inactive'])
      }).exec(function(err, createdUser) {
        if(err) {
          return callback(err);
        }
        Job.find().exec(function(err, jobs) {
          if(err) {
            return callback(err);
          }
          createdUser.jobs.add(_.sample(jobs).id);
          Department.find().exec(function(err, departments) {
            if(err) {
              return callback(err);
            }
            createdUser.departments.add(_.sample(departments).id);
            Meeting.find().exec(function(err, meetings) {
              if(err) {
                return callback(err);
              }
              createdUser.meetings.add(_.sample(meetings).id);
              createdUser.save(function(err) {
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


  function createTestAgendas(callback) {
    console.log('createTestAgendas');
    async.times(10, function(n, next) {
      Agenda.create({
        title: faker.company.bsNoun(),
        description: faker.lorem.sentence(6),
        inviteInterval: faker.random.number({ min:100, max:350 }),
        invitePeriod: faker.random.number({ min:14, max:60 }),
        state: faker.random.arrayElement(['active', 'inactive', 'archived', 'approved'])
      }).exec(function(err, createdAgenda) {
        if(err) {
          return callback(err);
        }
        Job.find().exec(function(err, jobs) {
          if(err) {
            return callback(err);
          }
          createdAgenda.jobs.add(_.sample(jobs).id);
          Department.find().exec(function(err, departments) {
            if(err) {
              return callback(err);
            }
            createdAgenda.departments.add(_.sample(departments).id);
            Ressource.find().exec(function(err, ressourcer) {
              if(err) {
                console.error(err);
                return callback(err);
              }
              createdAgenda.ressourcer.add(_.sample(ressourcer).id);
              Meeting.find().populate('agenda').exec(function(err, meetings) {
                if(err) {
                  return callback(err);
                }
              
                if(createdAgenda.state === 'active') {
                  async.forEachSeries(meetings, function(meeting, next) {
                    if(Math.random() > 0.4) {
                      createdAgenda.meetings.add(meeting.id);
                    }
                    next();
                  }, function(err) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdAgenda.save(function(err) {
                      if(err) {
                        console.error(err);
                        return callback(err);
                      }
                      next();
                    });
                  });
                } else {
                  createdAgenda.save(function(err) {
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
        sectionCode: faker.helpers.replaceSymbolWithNumber('#####'),
        location: faker.lorem.words(1)
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
              Agenda.find({state: 'active'}).exec(function(err, agendas) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
              async.forEachSeries(agendas, function(sf, next) {
                createdRunde.agendas.add(sf.id);
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
              Meeting.find().exec(function(err, meetings) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                async.forEachSeries(meetings, function(meeting, next) {
                  createdRunde.meetings.add(meeting.id);
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
        Agenda.find().exec(function(err, agendas) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          createdRunde.agendas.add(_.sample(agendas).id);
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


  function createTestMeetings(callback) {
    console.log('createTestMeetings');
    async.times(30, function(n, next) {
    var state = faker.random.arrayElement(['pending', 'invited', 'handled', 'finished']);
      if(state === 'pending' || state === 'invited') {
        Meeting.create({
          meetingTime: faker.date.future(),
          inviteTime: faker.date.future(),
          room: faker.lorem.words(1),
          state: state
        }).exec(function(err, createdMeeting) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          next(err);
        });
      } else {
        Meeting.create({
          meetingTime: faker.date.past(),
          inviteTime: faker.date.past(),
          room: faker.lorem.words(1),
          state: state
        }).exec(function(err, createdMeeting) {
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


  function createTestJobs(callback) {
    console.log('createTestJobs');
    async.times(10, function(n, next) {
      Job.create({
        title: faker.lorem.words(1)
      }).exec(function(err, createdJob) {
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
