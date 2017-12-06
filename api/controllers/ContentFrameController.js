/**
 * FrameController
 *
 * @description :: Server-side logic for managing frames
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  showBuildPage: function(req, res) {
    ContentRow.find()
      .populate('questionTexts')
      .populate('questionLinks')
      .populate('questionHeads')
      .populate('answerTexts')
      .populate('answerPercents')
      .populate('answerLongTexts')
      .populate('answerCheckboxes')
      .populate('answerRadios')
      .exec(function(err, foundContentRows) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        return res.view('buildContentFrame', {
          contentRows: foundContentRows
        });
      });
  }


};

