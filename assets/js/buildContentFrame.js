$(document).ready(function() {

  $('#buildFrameBtn').click(function() {
    //Map the checked checkboxes to an array
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

  $('#showFrameBtn').click(function() {
    io.socket.get('/ContentFrame/getHtml', { 'id': $('#contentFrameId').val() }, function(resData, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      console.log(resData);
      $('#frameShowPlace').html(resData);
      }
    )
  });

});
