/**
 * RessourcePercentController
 *
 * @description :: Server-side logic for managing ressourcepercents
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	findRessourcerMedNumber: function(req, res) {
		RessourcePercent.find().exec(function(err, records) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			return res.json(_.filter(records, function(o) { return o.number; }));
		});
	}
	
};

