/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	addRound: function(req, res) {
		Agenda.findOne({titel: req.param('titel')})
		.exec(function(err, agenda) {
			if(err) {
				console.error(err);
				return res.negotiate(err);
			}
			Round.findOne({status: 'aktiv'}).exec(function(err, round) {
				if(err) {
					console.error(err);
					return res.negotiate(err);
				}
				agenda.rounds.add(round.id);
				agenda.save(function(err) {
					return res.ok();
				});
			});
		});
	},

	show: function(req, res) {
		Agenda.findOne({titel: req.param('titel')})
		.populate('round')
		.populate('departments')
		.populate('jobs')
		.populate('meetings')
		.populate('contents')
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

