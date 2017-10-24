/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addRunde: function(req, res) {
		Agenda.findOne({titel: req.param('titel')})
		.exec(function(err, agenda) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			Runde.findOne({status: 'aktiv'}).exec(function(err, runde) {
				if(err) {
					console.error(err);
					return res.negotiate(err);
				}
				agenda.runder.add(runde.id);
				agenda.save(function(err) {
					return res.ok();
				});
			});
		});
	},

	show: function(req, res) {
		Agenda.findOne({titel: req.param('titel')})
		.populate('runde')
		.populate('departments')
		.populate('jobs')
		.populate('meetings')
		.populate('ressourcer')
		.exec(function(err, agenda) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			if(!agenda) {
				console.log('Agenda not found');
				return res.notFound();
			}
			return res.view('agenda');
		});
	}


};

