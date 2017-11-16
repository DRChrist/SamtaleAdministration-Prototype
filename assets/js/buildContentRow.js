$(document).ready(function() {

  $('#buildButton').click(function() {
    var $questionTexts = $('#ResourceTextQuestion').val();
    var $questionPercents = $('#ResourcePercentQuestion').val();
    var $answerTexts = $('#ResourceTextAnswer').val();
    var $answerPercents = $('#ResourcePercentAnswer').val();
    console.log($questionTexts + $questionPercents + $answerTexts + $answerPercents);

    io.socket.put('/ContentRow/buildContentRow', {
      'questionTexts': $questionTexts,
      'questionPercents': $questionPercents,
      'answerTexts': $answerTexts,
      'answerPercents': $answerPercents
    }, function(resData, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
        console.log(jwres.statusCode);
        console.log(resData);
      $('#contentRowShow').append(resData);
    });
  });

});
