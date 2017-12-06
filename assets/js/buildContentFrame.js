$(document).ready(function() {

  $('#buildFrameBtn').click(function() {
    var selectedRows = $('.rowChecks:checkbox:checked').map(function(){
      return $(this).val();
    }).get();
    io.socket.post('/ContentFrame/buildContentFrame', {
      title: $('#contentFrameTitle').val(),
      contentRowIds: selectedRows
    }, function(resContentFrame, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      $('#contentFrameId').val(resContentFrame.id);
    });
  });

});
