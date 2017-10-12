/**
 * SamtaleforløbController
 *
 * @description :: Server-side logic for managing samtaleforløbs
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addRunde: function(req, res) {
		Samtaleforloeb.findOne({titel: req.param('titel')})
		.exec(function(err, samtaleforløb) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			Runde.findOne({status: 'aktiv'}).exec(function(err, runde) {
				if(err) {
					console.error(err);
					return res.negotiate(err);
				}
				samtaleforløb.runder.add(runde.id);
				samtaleforløb.save(function(err) {
					return res.ok();
				});
			});
		});
	}


};

