/**
 * ContentRowController
 *
 * @description :: Server-side logic for managing ContentRows
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  buildContentRow: function(req, res) {
    var questionOptions = [];
    var answerOptions = [];
    var questionTexts = +req.param('questionTexts');
    var questionPercents = +req.param('questionPercents');
    var answerTexts = +req.param('answerTexts');
    var answerPercents = +req.param('answerPercents');
    console.log('Started building');
    console.log(req.param('questionTexts') + req.param('questionPercents') +
      req.param('answerTexts') + req.param('answerPercents'));
      ResourceText.findResourcesWithText(function(err, resourceTexts) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        async.times(questionTexts, function(n, next) {
          //Check if the loop is supposed to run zero times
          if(questionTexts < 1) {
            next();
          } else {
            questionOptions.push(_.sample(resourceTexts));
            next();
          }
        }, function(err) {
          if (err) {
            console.error(err);
            return res.negotiate(err);
          }
        ResourcePercent.findResourcesWithNumber(function(err, resourcePercents) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          async.times(questionPercents, function(n, next) {
            //Check if the loop is supposed to run zero times
            if (questionPercents < 1) {
              next();
            } else {
              questionOptions.push(_.sample(resourcePercents));
              next();
            }
        }, function(err) {
            if(err) {
              console.error(err);
              return res.negotiate(err);
            }
            ResourceText.buildEmptyResourceTexts(answerTexts, function(err, emptyTexts) {
              if(err) {
                console.error(err);
                return res.negotiate(err);
              }
              ResourcePercent.buildEmptyResourcePercents(answerPercents, function(err, emptyPercents) {
                if(err) {
                  console.error(err);
                  return res.negotiate(err);
                }
                answerOptions = emptyTexts.concat(emptyPercents);
                ContentRow.buildQuestionHtml(questionOptions, function(err, questionHtml) {
                  if(err) {
                    console.error(err);
                    return res.negotiate(err);
                  }
                  ContentRow.buildAnswerHtml(answerOptions, function(err, answerHtml) {
                    if(err) {
                      console.error(err);
                      return res.negotiate(err);
                    }
                    console.log('About to send response');
                    return res.ok(questionHtml.concat(answerHtml));
                  });
                });
              });
            });
          });
        });
      });
    });
  }



};

