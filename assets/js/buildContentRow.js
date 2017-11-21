$(document).ready(function() {

  $('#buildButton').click(function() {
    var $questionTexts = $('#ResourceTextQuestion').val();
    var $answerTexts = $('#ResourceTextAnswer').val();
    var $answerPercents = $('#ResourcePercentAnswer').val();
    console.log($questionTexts + $answerTexts + $answerPercents);

    io.socket.post('/ContentRow/buildContentRow', {
      'questionTexts': $questionTexts,
      'answerTexts': $answerTexts,
      'answerPercents': $answerPercents
    }, function(resContentRow, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      io.socket.get('/ContentRow/getHtml', {'id': resContentRow.id }, function(resData, jwres) {
        if(jwres.statusCode !== 200) {
          console.error(jwres);
          return;
        }
        console.log(resData);
        $('#contentRowShow').html(resData);
      });
    });
  });

});
