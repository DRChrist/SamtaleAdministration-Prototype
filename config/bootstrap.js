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
        createTestResourceTexts(callback);
      },
      function(callback) {
        createTestResourcePercents(callback);
      },
      function(callback) {
        createTestContentRows(callback);
      },
      function(callback) {
        createTestContentFrames(callback);
      },
      function(callback) {
        createTestContents(callback);
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
        createTestRounds(callback);
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
            Content.find().exec(function(err, contents) {
              if(err) {
                console.error(err);
                return callback(err);
              }
              createdAgenda.contents.add(_.sample(contents).id);
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


  function createTestRounds(callback) {
    Round.create({
      title: faker.lorem.words(2),
      state: 'active'
    }).exec(function(err, createdRound){
      if(err) {
        console.error(err);
        return callback(err);
      }
      async.series([ //Needs to be refactored, async.series is unnecessary
            // function(callback) {
            //   //add active agendas to the active round
            //   Agenda.find({state: 'active'}).exec(function(err, agendas) {
            //     if(err) {
            //       console.error(err);
            //       return callback(err);
            //     }
            //   async.forEachSeries(agendas, function(agenda, next) {
            //     createdRound.agendas.add(agenda.id);
            //     next();
            //   }, function(err) {
            //     if(err) {
            //       console.error(err);
            //       return callback(err);
            //     }
            //     callback();
            //     });
            //   });
            // },
            function(callback) {
              Meeting.find().exec(function(err, meetings) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                async.forEachSeries(meetings, function(meeting, next) {
                  createdRound.meetings.add(meeting.id);
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
            createdRound.save(function(err) {
              if(err) {
                console.error(err);
                return callback(err);
              }
            });
          });
      });
    async.times(10, function(n, next) {
      Round.create({
        title: faker.lorem.words(2),
        state: faker.random.arrayElement(['upcoming', 'archived'])
      }).exec(function(err, createdRound) {
        if(err) {
          return callback(err);
        }
        // Agenda.find().exec(function(err, agendas) {
        //   if(err) {
        //     console.error(err);
        //     return callback(err);
        //   }
        //   createdRound.agendas.add(_.sample(agendas).id);
          createdRound.save(function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            next(err);
          // });
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

  function createTestResourceTexts(callback) {
    console.log('createTestResourceText');
    async.times(10, function(n, next) {
      ResourceText.create({
        text: faker.lorem.words(8)
      }).exec(function(err, createdResourceText) {
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

  function createTestResourcePercents(callback) {
    console.log('createTestResourcePercent');
    async.times(10, function(n, next) {
      ResourcePercent.create({
        number: faker.random.number(100)
      }).exec(function(err, createdResourcePercent) {
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

  function createTestContentFrames(callback) {
    console.log('createTestContentFrames');
    async.times(10, function(n, next) {
      ContentFrame.create({
        title: faker.lorem.words(2)
      }).exec(function(err, createdContentFrame) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        ContentRow.find().exec(function(err, contentRows) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          createdContentFrame.contentRows.add(_.sample(contentRows).id);
          createdContentFrame.save(function(err) {
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

  function createTestContents(callback) {
    console.log('createTestContents');
    async.times(10, function(n, next) {
      Content.create({
        title: faker.lorem.words(1),
        description: faker.lorem.words(7)
      }).exec(function(err, createdContent) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        ContentFrame.find().exec(function(err, contentFrames) {
          if(err) {
            console.error(err);
            return cb(err);
          }
          createdContent.contentFrames.add(_.sample(contentFrames).id);
          createdContent.save(function(err) {
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

  function createTestContentRows(callback) {
    console.log('createTestContentRows');
    async.times(10, function(n, next) {
      ContentRow.create().exec(function(err, createdContentRow) {
        if(err) {
          console.error(err);
          return callback(err);
        }
        ResourceText.find().exec(function(err, texts) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          var zeroToTwo = faker.random.number(2);
          async.times(zeroToTwo, function(n, next) {
            createdContentRow.questionTexts.add(_.sample(texts).id);
            next();
        }, function(err) {
          if(err) {
            console.error(err);
            return callback(err);
          }
          ResourcePercent.find().exec(function(err, numbers) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            var zeroOrOne = faker.random.number(1);
            async.times(zeroOrOne, function(n, next) {
              createdContentRow.questionPercents.add(_.sample(numbers).id);
              next();
          }, function(err) {
            if(err) {
              console.error(err);
              return callback(err);
            }
            zeroToTwo = faker.random.number(2);
            async.times(zeroToTwo, function(n, next) {
              ResourceText.create().exec(function(err, text) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                createdContentRow.answerTexts.add(text.id);
              });
                next();
              }, function(err) {
                if(err) {
                  console.error(err);
                  return callback(err);
                }
                zeroOrOne = faker.random.number(1);
                async.times(zeroOrOne, function(n, next) {
                  ResourcePercent.create().exec(function(err, number) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdContentRow.answerPercents.add(number.id);
                  });
                    next();
                  }, function(err) {
                    if(err) {
                      console.error(err);
                      return callback(err);
                    }
                    createdContentRow.save(function(err) {
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
