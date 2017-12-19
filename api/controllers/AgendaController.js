/**
 * AgendaController
 *
 * @description :: Server-side logic for managing Agendas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	showAgenda: function(req, res) {

	  Agenda.findOne(req.param('id'))
      .populate('departments')
      .populate('jobs')
      .populate('meetings')
      .exec(function(err, foundAgenda) {
	    if(err) return res.negotiate(err);
      if(!foundAgenda) return res.notFound();

	    return res.view('agenda', {
	      agenda: foundAgenda
      });
    });
  },

  showBuildPage: function(req, res) {
	  Content.find().exec(function(err, foundContents) {
	    if(err) {
	      console.error(err);
	      return res.negotiate(err);
      }
      Department.find().exec(function(err, foundDepartments) {
        if(err) {
          console.error(err);
          return res.negotiate(err);
        }
        Job.find().exec(function(err, foundJobs) {
          if(err) {
            console.error(err);
            return res.negotiate(err);
          }
          return res.view('buildAgenda', {
            contents: foundContents,
            departments: foundDepartments,
            jobs: foundJobs
          });
        });
      });
    });
  },

  buildAgenda: function(req, res) {
	  Agenda.create({
      title: req.param('title'),
      description: req.param('description'),
      invitePeriod: req.param('invitePeriod'),
      inviteInterval: req.param('inviteInterval'),
      jobs: req.param('jobIds'),
      departments: req.param('departmentIds'),
      contents: req.param('contentIds')
    }).exec(function(err, createdAgenda) {
      if(err) {
        console.error(err);
        return res.negotiate(err);
      }
      return res.ok(createdAgenda);
    });
  }


};

