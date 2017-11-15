$(document).ready(function() {

  $('#buildButton').click(function() {

    io.socket.put('/contentRow/buildContentRow', {
      'questionTexts': $('#ResourceTextQuestion'),
      'questionPercents': $('#ResourcePercentQuestion'),
      'answerTexts': $('#ResourceTextAnswer'),
      'answerPercents': $('#ResourcePercentAnswer')
    }, function(resData, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      $('#contentRowShow').append(resData);
    })
  });

});
