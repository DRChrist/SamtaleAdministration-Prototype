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
	},

	show: function(req, res) {
		Samtaleforloeb.findOne({titel: req.param('titel')})
		.populate('runde')
		.populate('afdelinger')
		.populate('stillingskategorier')
		.populate('samtaler')
		.populate('ressourcer')
		.exec(function(err, samtaleforløb) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			if(!samtaleforløb) {
				console.log('Samtaleforløb not found');
				return res.notFound();
			}
			return res.view('samtaleforloeb');
		});
	}


};

