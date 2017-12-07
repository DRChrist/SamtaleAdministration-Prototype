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
  },

  buildContentFrame: function(req, res) {
    ContentFrame.create({
      title: req.param('title'),
      contentRows: req.param('contentRowIds')
    }).exec(function(err, createdContentFrame) {
      if(err) {
        console.error(err);
        return res.negotiate(err);
      }
      return res.ok(createdContentFrame);
    });
  },

  getHtml: function(req, res) {
    ContentFrame.findOne(req.param('id'))
      .populate('contentRows')
      .exec(function(err, foundContentFrame) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        if(!foundContentFrame) {
          console.error('ContentFrame does not exist');
          return res.notFound();
        }
        foundContentFrame.getHtml(function(err, contentFrameHtml) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          return res.ok(contentFrameHtml);
        })
      })
  }




};

