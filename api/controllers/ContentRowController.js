/**
 * ContentRowController
 *
 * @description :: Server-side logic for managing ContentRows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  // buildContentRow: function(req, res) {
  //   var questionOptions = {};
  //   var answerOptions = {};
  //   var questionTexts = +req.param('questionTexts');
  //   var questionPercents = +req.param('questionPercents');
  //   var answerTexts = +req.param('answerTexts');
  //   var answerPercents = +req.param('answerPercents');
  //   console.log('Started building');
  //   console.log(req.param('questionTexts') + req.param('questionPercents') +
  //     req.param('answerTexts') + req.param('answerPercents'));
  //     ResourceText.findResourcesWithText(function(err, resourceTexts) {
  //       if(err) {
  //         console.error(err);
  //         return res.negotiate(err);
  //       }
  //       async.times(questionTexts, function(n, next) {
  //         //Check if the loop is supposed to run zero times
  //         if(questionTexts < 1) {
  //           next();
  //         } else {
  //           var randomText = _.sample(resourceTexts);
  //           questionOptions.resourceText.push(randomText.id);
  //           next();
  //         }
  //       }, function(err) {
  //         if (err) {
  //           console.error(err);
  //           return res.negotiate(err);
  //         }
  //       ResourcePercent.findResourcesWithNumber(function(err, resourcePercents) {
  //         if(err) {
  //           console.error(err);
  //           return res.negotiate(err);
  //         }
  //         async.times(questionPercents, function(n, next) {
  //           //Check if the loop is supposed to run zero times
  //           if (questionPercents < 1) {
  //             next();
  //           } else {
  //             questionOptions.resourcePercent.push(_.sample(resourcePercents).id);
  //             next();
  //           }
  //       }, function(err) {
  //           if(err) {
  //             console.error(err);
  //             return res.negotiate(err);
  //           }
  //           ResourceText.buildEmptyResourceTexts(answerTexts, function(err, emptyTexts) {
  //             if(err) {
  //               console.error(err);
  //               return res.negotiate(err);
  //             }
  //             ResourcePercent.buildEmptyResourcePercents(answerPercents, function(err, emptyPercents) {
  //               if(err) {
  //                 console.error(err);
  //                 return res.negotiate(err);
  //               }
  //               answerOptions = emptyTexts.concat(emptyPercents);
  //               ContentRow.buildQuestionHtml(questionOptions, function(err, questionHtml) {
  //                 if(err) {
  //                   console.error(err);
  //                   return res.negotiate(err);
  //                 }
  //                 ContentRow.buildAnswerHtml(answerOptions, function(err, answerHtml) {
  //                   if(err) {
  //                     console.error(err);
  //                     return res.negotiate(err);
  //                   }
  //                   console.log('About to send response');
  //                   return res.ok(questionHtml.concat(answerHtml));
  //                 });
  //               });
  //             });
  //           });
  //         });
  //       });
  //     });
  //   });
  // },

  buildContentRow: function(req, res) {
    var questionTexts = +req.param('questionTexts');
    var questionHeads = +req.param('questionHeads');
    var questionLinks = +req.param('questionLinks');
    var answerTexts = +req.param('answerTexts');
    var answerPercents = +req.param('answerPercents');
    var answerLongTexts = +req.param('answerLongTexts');
    var answerCheckboxes = +req.param('answerCheckboxes');
    var answerRadios = +req.param('answerRadios');
    ContentRow.create().exec(function(err, createdContentRow) {
      ResourceQuestionText.find().exec(function(err, foundQuestionTexts) {
        async.times(questionTexts, function(n, next) {
          if(questionTexts < 1) {
            next();
          } else {
            var randomText = _.sample(foundQuestionTexts);
            createdContentRow.questionTexts.add(randomText.id);
            next();
          }
        }, function(err) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          ResourceQuestionHead.find().exec(function(err, foundQuestionHeads) {
            async.times(questionHeads, function(n, next) {
              if(questionTexts < 1) {
                next();
              } else {
                var randomHead = _.sample(foundQuestionHeads);
                createdContentRow.questionHeads.add(randomHead.id);
                next();
              }
            }, function(err) {
              if(err) {
                console.error(err);
                return res.negotiate(err);
              }
              ResourceQuestionLink.find().exec(function(err, foundQuestionLinks) {
                async.times(questionLinks, function(n,next) {
                  if(questionLinks < 1) {
                    next();
                  } else {
                    var randomLink = _.sample(foundQuestionLinks);
                    createdContentRow.questionLinks.add(randomLink.id);
                    next();
                  }
                }, function(err) {
                  if(err) {
                    console.error(err);
                    return res.negotiate(err);
                  }
                  ResourceAnswerText.buildEmptyResourceTexts(answerTexts, function(err, emptyTextIds) {
                    if(err) {
                      console.error(err);
                      return res.negotiate(err);
                    }
                    createdContentRow.answerTexts.add(emptyTextIds);
                    ResourceAnswerPercent.buildEmptyResourcePercents(answerPercents, function(err, emptyPercentIds) {
                      if(err) {
                        console.error(err);
                        return res.negotiate(err);
                      }
                      createdContentRow.answerPercents.add(emptyPercentIds);
                      ResourceAnswerLongText.buildEmptyResourceLongTexts(answerLongTexts, function(err, emptyLongTextIds) {
                        if(err) {
                          console.error(err);
                          return res.negotiate(err);
                        }
                        createdContentRow.answerLongTexts.add(emptyLongTextIds);
                        ResourceAnswerCheckbox
                          .buildEmptyResourceCheckbox(
                            answerCheckboxes,
                            req.param('checkboxTexts'),
                            function(err, emptyCheckboxId) {
                          if(err) {
                            console.error(err);
                            return res.negotiate(err);
                          }
                          createdContentRow.answerCheckboxes.add(emptyCheckboxId);
                          ResourceAnswerRadio
                            .buildEmptyResourceRadio(
                              answerRadios,
                              req.param('radioTexts'),
                              function(err, emptyRadioId) {
                            if(err) {
                              console.error(err);
                              return res.negotiate(err);
                            }
                            createdContentRow.answerRadios.add(emptyRadioId);
                            createdContentRow.save(function(err) {
                              if(err) {
                                console.error(err);
                                return res.negotiate(err);
                              }
                              return res.ok(createdContentRow);
                            });
                          });
                        });
                      });
                    });
                  });
                });
              });
            });
          });
        });
      });
    });
  },

  getHtml: function(req, res) {
    var contentRowHtml = '<div class="row"><div class="col-md-6">';
    ContentRow.findOne(req.param('id'))
      .populate('questionTexts')
      .populate('answerTexts')
      .populate('answerPercents')
      .exec(function (err, foundContentRow) {
        async.eachSeries(foundContentRow.questionTexts, function(questionText, next) {
          contentRowHtml += questionText.text;
          next();
        }, function(err) {
          if(err){
            console.error(err);
            return res.negotiate(err);
          }
          contentRowHtml += '</div><div class="col-md-6">';
          async.eachSeries(foundContentRow.answerTexts, function(answerText, next) {
            contentRowHtml += answerText.html;
            next();
          }, function(err) {
            if(err) {
              console.error(err);
              return res.negotiate(err);
            }
            async.eachSeries(foundContentRow.answerPercents, function(answerPercent, next) {
              contentRowHtml += answerPercent.html;
              next();
            }, function(err) {
              if(err) {
                console.error(err);
                return res.negotiate(err);
              }
              return res.ok(contentRowHtml + '</div></div>');
            });
          });
        });
    });
  }



};

