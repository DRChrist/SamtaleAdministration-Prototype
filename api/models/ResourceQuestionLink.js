/**
 * ResourceQuestionLink.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    url: {
      type: 'string'
    },
    linkText: {
      type: 'string'
    },
    question: {
      model: 'contentRow'
    },
    getHtml: function(cb) {
      return cb(null, '<a href="' + this.url + '">' + this.linkText + '</a>');
    }
  }
};

