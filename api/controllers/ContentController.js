/**
 * ContentController
 *
 * @description :: Server-side logic for managing contents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

  showBuildPage: function(req, res) {
    ContentFrame.find()
      .populate('contentRows')
      .exec(function(err, foundContentFrames) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        return res.view('buildContent', {
          contentFrames: foundContentFrames
        });
      });
  },

  buildContent: function(req, res) {
    Content.create({
      title: req.param('title'),
      description: req.param('description'),
      contentFrames: req.param('contentFrameIds')
    }).exec(function(err, createdContent) {
      if(err) {
        console.error(err);
        return res.negotiate(err);
      }
      return res.ok(createdContent);
    });
  },

  getHtml: function(req, res) {
    Content.findOne(req.param('id'))
      .populate('contentFrames')
      .exec(function(err, foundContent) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        if(!foundContent) {
          console.error('Content does not exist');
          return res.notFound();
        }
        foundContent.getHtml(function(err, contentHtml) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          return res.ok(contentHtml);
        })
      })
  }

};

