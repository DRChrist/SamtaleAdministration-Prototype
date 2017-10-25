/**
 * ResourcePercentController
 *
 * @description :: Server-side logic for managing contentpercents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	findResourcesWithNumber: function(req, res) {
		ResourcePercent.find().exec(function(err, records) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			return res.json(_.filter(records, function(o) { return o.number; }));
		});
	}
	
};

