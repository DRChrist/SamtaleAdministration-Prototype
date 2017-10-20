/**
 * Frame.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	titel: {
  		type: 'string'
  	},
  	ressourcer: {
  		collection: 'ressource',
  		via: 'frames'
  	},
    lines: {
      collection: 'line',
      via: 'frames',
      dominant: true
    },
  	oneToOnes: {
  		collection: 'oneToOne',
  		via: 'frames',
  		dominant: true
  	},
  	oneToTwos: {
  		collection: 'oneToTwo',
  		via: 'frames',
  		dominant: true
  	},
  	twoToOnes: {
  		collection: 'twoToOne',
  		via: 'frames',
  		dominant: true
  	},
  	twoToTwos: {
  		collection: 'twoToTwo',
  		via: 'frames',
  		dominant: true
  	}
  },

  	//Super-smelly function, will need to be rewritten and possibly split into fragments.
  // afterCreate: function(newlyInsertedRecord, cb) {
  // 	Frame.findOne(newlyInsertedRecord.id).exec(function(err, frame) {
  // 		if(err) {
  // 			console.error(err);
  // 			return cb(err);
  // 		}
  // 		async.times(10, function(n, next) {
  // 			var rand = Math.random();
  // 			if(rand < 0.25) {
  // 				OneToOne.create().exec(function(err, oneToOne) {
  // 					if(err) {
  // 						console.error(err);
  // 						return cb(err);
  // 					}
  // 					RessourceText.find().exec(function(err, texts) {
  // 						if(err) {
  // 							console.error(err);
  // 							return cb(err);
  // 						}
  // 						RessourceText.create().exec(function(err, newText) {
  // 							if(err) {
  // 								console.error(err);
  // 								return cb(err);
  // 							}
		//   					oneToOne.questionText.add(_.sample(texts).id);
		//   					oneToOne.answerText.add(newText.id);
		//   					oneToOne.save(function(err) {
		//   						if(err) {
		//   							console.error(err);
		//   							return cb(err);
		//   						}
		//   						frame.oneToOnes.add(oneToOne.id);
		//   						frame.save(function(err) {
		//   							if(err) {
		//   								console.error(err);
		//   								return cb(err);
		//   							}
		//   							next();
		//   						});
		//   					});
  // 						});
  // 					});
  // 				});
  // 			} else if(rand > 0.25 && rand < 0.5) {
  // 				OneToTwo.create().exec(function(err, oneToTwo) {
  // 					if(err) {
  // 						console.error(err);
  // 						return cb(err);
  // 					}
  // 					RessourceText.find().exec(function(err, texts) {
  // 						if(err) {
  // 							console.error(err);
  // 							return cb(err);
  // 						}
  // 						RessourceText.create().exec(function(err, newText1) {
  // 							RessourceText.create().exec(function(err, newText2) {
  // 								if(err) {
  // 									console.error(err);
  // 									return cb(err);
  // 								}
  // 								oneToTwo.questionText.add(_.sample(texts).id);
  // 								oneToTwo.answerText.add(newText1.id);
  // 								oneToTwo.answerText.add(newText2.id);
  // 								oneToTwo.save(function(err) {
  // 									if(err) {
  // 										console.error(err);
  // 										return cb(err);
  // 									}
  // 									frame.oneToTwos.add(oneToTwo.id);
  // 									frame.save(function(err) {
  // 										if(err) {
  // 											console.error(err);
  // 											return cb(err);
  // 										}
  // 										next();
  // 									});
  // 								});
  // 							});
  // 						});
  // 					});
  // 				});
  // 			} else if(rand > 0.5 && rand < 0.75) {
  // 				TwoToOne.create().exec(function(err, twoToOne) {
  // 					if(err) {
  // 						console.error(err);
  // 						return cb(err);
  // 					}
  // 					RessourceText.find().exec(function(err, texts) {
  // 						if(err) {
  // 							console.error(err);
  // 							return cb(err);
  // 						}
  // 						RessourcePercent.create().exec(function(err, newNumber) {
  // 							if(err) {
  // 								console.error(err);
  // 								return cb(err);
  // 							}
  // 							twoToOne.questionText.add(_.sample(texts).id);
  // 							twoToOne.questionText.add(_.sample(texts).id);
  // 							twoToOne.answerPercent.add(newNumber.id);
  // 							twoToOne.save(function(err) {
  // 								if(err) {
  // 									console.error(err);
  // 									return cb(err);
  // 								}
  // 								frame.twoToOnes.add(twoToOne.id);
  // 								frame.save(function(err) {
  // 									if(err) {
  // 										console.error(err);
  // 										return cb(err);
  // 									}
  // 									next();
  // 								});
  // 							});
  // 						});
  // 					});
  // 				});
  // 			} else {
  // 				TwoToTwo.create().exec(function(err, twoToTwo) {
  // 					if(err) {
  // 						console.error(err);
  // 						return cb(err);
  // 					}
  // 					RessourceText.find().exec(function(err, texts) {
  // 						if(err) {
  // 							console.error(err);
  // 							return cb(err);
  // 						}
  // 						RessourcePercent.create().exec(function(err, newNumber) {
  // 							RessourceText.create().exec(function(err, newText) {
	 //  							if(err) {
	 //  								console.error(err);
	 //  								return cb(err);
	 //  							}
		// 							twoToTwo.questionText.add(_.sample(texts).id);
		// 							twoToTwo.questionText.add(_.sample(texts).id);
		// 							twoToTwo.answerPercent.add(newNumber.id);
		// 							twoToTwo.answerText.add(newText.id);
		// 							twoToTwo.save(function(err) {
		// 								if(err) {
		// 									console.error(err);
		// 									return cb(err);
		// 								}
		// 								frame.twoToTwos.add(twoToTwo.id);
		// 								frame.save(function(err) {
		// 									if(err) {
		// 										console.error(err);
		// 										return cb(err);
		// 									}
		// 									next();
		// 								});
		// 							});  								
  // 							});
  // 						});
  // 					});
  // 				});
  // 			}
  // 		}, function(err) {
	 //  			if(err) {
	 //  				console.error(err);
	 //  				return cb(err);
	 //  			}
  // 				return cb();
  // 		});
  // 	});
  // }

};

