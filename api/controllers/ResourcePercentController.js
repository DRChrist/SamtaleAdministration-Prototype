/**
 * ResourcePercentController
 *
 * @description :: Server-side logic for managing contentpercents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//Used to exclude resources without numbers, like the ones in answers
	findResourcesWithNumber: function(req, res) {
		ResourcePercent.findResourcesWithNumber(function(err, records) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			return res.json(records);
		});
	}

};

