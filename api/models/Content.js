/**
 * Content.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string'
  	},
  	description: {
  		type: 'string'
  	},
    deletedAt: {
      type: 'datetime'
    },
  	agendas: {
  		collection: 'agenda',
  		via: 'contents'
  	},
  	contentFrames: {
  		collection: 'contentFrame',
  		via: 'contents',
  		dominant: true
  	},
    getHtml: function(cb) {
      var contentHtml = '';
      contentHtml += '<h2>' + this.title + '</h2>';
      contentHtml += '<p>' + this.description + '</p>';
      //Loop through each of the contentFrames associated with this content, calling getHtml
      async.eachSeries(this.contentFrames, function(contentFrame, next) {
        ContentFrame.findOne(contentFrame.id)
          .populate('contentRows')
          .exec(function (err, foundContentFrame) {
            foundContentFrame.getHtml(function (err, contentFrameHtml) {
              if (err) {
                next(err);
              }
              contentHtml += '<br> <br>' + contentFrameHtml
              next();
            });
          });
      }, function (err) {
        if (err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, contentHtml);
      });
    }


  }

};

