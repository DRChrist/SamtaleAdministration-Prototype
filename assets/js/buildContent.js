$(document).ready(function() {

  $('#buildContentBtn').click(function() {
    var selectedRows = $('.frameChecks:checkbox:checked').map(function(){
      return $(this).val();
    }).get();
    io.socket.post('/Content/buildContent', {
      title: $('#contentTitle').val(),
      description: $('#contentDesc').val(),
      contentFrameIds: selectedRows
    }, function(resContent, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      $('#contentId').val(resContent.id);
    });
  });

  $('#showContentBtn').click(function() {
    io.socket.get('/Content/getHtml', { 'id': $('#contentId').val() }, function(resData, jwres) {
        if(jwres.statusCode !== 200) {
          console.error(jwres);
          return;
        }
        console.log(resData);
        $('#contentShowPlace').html(resData);
      }
    )
  });

});
