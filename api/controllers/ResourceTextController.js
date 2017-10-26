/**
 * ResourceTextController
 *
 * @description :: Server-side logic for managing contenttexts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	//Used to exclude empty ressources, like the ones in answers
	findResourcesWithText: function(req, res) {
		ResourceText.find().exec(function(err, records) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			return res.json(_.filter(records, function(o) { return o.text; }));
		});
	}

};

