/**
 * RessourceTextController
 *
 * @description :: Server-side logic for managing ressourcetexts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	findRessourcerMedText: function(req, res) {
		RessourceText.find().exec(function(err, records) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			return res.json(_.filter(records, function(o) { return o.text; }));
		});
	}

};

