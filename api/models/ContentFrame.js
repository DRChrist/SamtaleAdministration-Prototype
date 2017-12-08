/**
 * Frame.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	title: {
  		type: 'string'
  	},
    deletedAt: {
      type: 'datetime'
    },
  	contents: {
  		collection: 'content',
  		via: 'contentFrames'
  	},
    contentRows: {
      collection: 'contentRow',
      via: 'contentFrames',
      dominant: true
    },
    getHtml: function(cb) {
      var contentFrameHtml = '';
      contentFrameHtml += '<h3>' + this.title + '</h3>';

      //Loop through each of the contentRows associated with this contentFrame, calling getHtml
      async.eachSeries(this.contentRows, function(contentRow, next) {
        ContentRow.findOne(contentRow.id)
          .populate('questionTexts')
          .populate('questionLinks')
          .populate('questionHeads')
          .populate('answerTexts')
          .populate('answerPercents')
          .populate('answerLongTexts')
          .populate('answerCheckboxes')
          .populate('answerRadios')
          .exec(function (err, foundContentRow) {
            foundContentRow.getHtml(function (err, contentRowHtml) {
              if (err) {
                next(err);
              }
              contentFrameHtml += '<br>' + contentRowHtml
              next();
            });
          });
          }, function (err) {
            if (err) {
              console.error(err);
              return cb(err);
            }
            return cb(null, contentFrameHtml);
          });
    }
  }



};

