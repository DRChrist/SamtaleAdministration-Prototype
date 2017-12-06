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
    // getHtml: function(req, res) {
    //   var contentFrameHtml = '';
    //   ContentFrame.find(req.param('id'))
    //     .populate('contentRows')
    //     .populate('contents')
    //     .exec(function(err, foundContentFrame) {
    //       contentFrameHtml += '<h2>' + foundContentFrame.title + '</h2>';
    //       async.eachOfSeries(foundContentFrame.contentRows, function(contentRow, next) {
    //
    //       })
    //     })
    // }
  }



};

