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
    var questionTexts = req.param('questionTexts');
    var questionPercents = req.param('questionPercents');
    var answerTexts = req.param('answerTexts');
    var answerPercents = req.param('answerPercents');
    console.log('Started building');
    console.log(req.param('questionTexts') + req.param('questionPercents') +
      req.param('answerTexts') + req.param('answerPercents'));
      ResourceText.find().exec(function(err, resourceTexts) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        async.times(questionTexts, function(n, next) {
          if(questionTexts < 1) {
            next();
          } else {
            questionOptions.push(_.sample(resourceTexts));
            console.log('Added text to question');
            next();
          }
        }, function(err) {
          if (err) {
            console.error(err);
            return res.negotiate(err);
          }
        ResourcePercent.find().exec(function(err, resourcePercents) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          async.times(questionPercents, function(n, next) {
            if (questionPercents < 1) {
              next();
            } else {
              questionOptions.push(_.sample(resourcePercents));
              console.log('Added percents to question');
              next();
            }
        }, function(err) {
            if(err) {
              console.error(err);
              return res.negotiate(err);
            }
            ResourceText.buildEmptyResourceTexts(answerTexts, function(emptyTexts) {
              ResourcePercent.buildEmptyResourcePercents(answerPercents, function(emptyPercents){
                answerOptions = emptyTexts.concat(emptyPercents);
                ContentRow.buildQuestionHtml(questionOptions, function(questionHtml) {
                  ContentRow.buildAnswerHtml(answerOptions, function(answerHtml) {
                    console.log('About to send response');
                    return res.ok(questionHtml.concat(answerHtml));
                    // return res.send(questionHtml.concat(answerHtml));
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

