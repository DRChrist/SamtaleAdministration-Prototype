/**
 * ContentRowController
 *
 * @description :: Server-side logic for managing ContentRows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

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
              if(questionHeads < 1) {
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
    ContentRow.findOne(req.param('id'))
      .populate('questionTexts')
      .populate('questionLinks')
      .populate('questionHeads')
      .populate('answerTexts')
      .populate('answerPercents')
      .populate('answerLongTexts')
      .populate('answerCheckboxes')
      .populate('answerRadios')
      .exec(function(err, foundContentRow) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        if(!foundContentRow) {
          console.error('ContentRow does not exist');
          return res.notFound();
        }
        foundContentRow.getHtml(function(err, contentRowHtml) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          return res.ok(contentRowHtml);
        })
      })
    // var contentRowHtml = '<div class="row"><div class="col-md-6">';
    // ContentRow.findOne(req.param('id'))
    //   .populate('questionTexts')
    //   .populate('questionLinks')
    //   .populate('questionHeads')
    //   .populate('answerTexts')
    //   .populate('answerPercents')
    //   .populate('answerLongTexts')
    //   .populate('answerCheckboxes')
    //   .populate('answerRadios')
    //   .exec(function (err, foundContentRow) {
    //     if(err) {
    //       console.error(err);
    //       return res.negotiate(err);
    //     }
    //     if(!foundContentRow) {
    //       console.error('ContentRow does not exist');
    //       return res.notFound();
    //     }
    //     console.log(foundContentRow.id);
    //     //Delete the attributes that are not associations with resources
    //     //This is purely so that we are able to loop through the contentRow object
    //     delete foundContentRow.createdAt;
    //     delete foundContentRow.updatedAt;
    //     delete foundContentRow.id;
    //     delete foundContentRow.contentFrames;
    //
    //     //Loop through the resource associations in foundContentRow
    //     async.eachOfSeries(foundContentRow, function (resourceArray, resourceName, next) {
    //       if(resourceName === 'answerTexts') {
    //         contentRowHtml += '</div><div class="col-md-6">';
    //       }
    //       //Loop through the individual resources in a resource association array
    //       //In many cases, there will be only one element in the array
    //       async.eachOfSeries(resourceArray, function (resource, index, next) {
    //         if (resource) {
    //           console.log('Resource is ' + resource);
    //           resource.getHtml(function (err, htmlString) {
    //             if (err) {
    //               next(err);
    //             }
    //             contentRowHtml += htmlString;
    //           })
    //         }
    //         next();
    //       }, function (err) {
    //         if (err) {
    //           next(err);
    //         }
    //         next();
    //       });
    //     }, function (err) {
    //       if (err) {
    //         console.error(err);
    //         return res.negotiate(err);
    //       }
    //       return res.ok(contentRowHtml + '</div></div>');
    //     });
    //   });
  }



};

