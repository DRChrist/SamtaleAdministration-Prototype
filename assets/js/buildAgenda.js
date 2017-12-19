$(document).ready(function() {

  $('#buildAgendaBtn').click(function() {
    var selectedContents = $('.contentChecks:checkbox:checked').map(function(){
      return $(this).val();
    }).get();
    var selectedDepartments = $('.departmentChecks:checkbox:checked').map(function() {
      return $(this).val();
    }).get();
    var selectedJobs = $('.jobChecks:checkbox:checked').map(function() {
      return $(this).val();
    }).get();
    io.socket.post('/Agenda/buildAgenda', {
      title: $('#agendaTitle').val(),
      description: $('#agendaDesc').val(),
      inviteInterval: $('#agendaInterval').val(),
      invitePeriod: $('#agendaPeriod').val(),
      contentIds: selectedContents,
      departmentIds: selectedDepartments,
      jobIds: selectedJobs
    }, function(resAgenda, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      $('#agendaId').val(resAgenda.id);
    });
  });

  $('#showAgendaBtn').click(function() {
    io.socket.get('/Agenda/' + $('#agendaId').val(), function(resData, jwres) {
        if(jwres.statusCode !== 200) {
          console.error(jwres);
          return;
        }
        console.log(resData);
        $('#agendaShowPlace').html(resData);
      }
    )
  });

});
