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
      contentFrameHtml += '<h2>' + this.title + '</h2>';

      //Loop through each of the contentRows associated with this contentFrame, calling getHtml
      async.eachSeries(this.contentRows, function(contentRow, next) {
        console.log(contentRow);
        //NOT WORKING. Maybe not populating dependencies properly
        contentRow.getHtml(function(err, contentRowHtml) {
          if(err) {
            next(err);
          }
          console.log(contentRowHtml);
          contentFrameHtml += '<br>' + contentRowHtml;
        });
        next()
      }, function(err) {
        if(err) {
          console.error(err);
          return cb(err);
        }
        return cb(null, contentFrameHtml);
      })
    }
  }



};

