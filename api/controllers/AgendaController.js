/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	showAgenda: function(req, res) {

	  Agenda.findOne(req.param('id')).exec(function(err, foundAgenda) {
	    if(err) return res.negotiate(err);
      if(!foundAgenda) return res.notFound();

	    return res.view('agenda', {
	      agenda: foundAgenda
      });
    });
  }


};

