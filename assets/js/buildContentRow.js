$(document).ready(function() {

  $('#buildButton').click(function() {
    var $questionTexts = $('#ResourceQuestionText').val();
    var $questionHeads = $('#ResourceQuestionHead').val();
    var $questionLinks = $('#ResourceQuestionLink').val();
    var $answerTexts = $('#ResourceAnswerText').val();
    var $answerPercents = $('#ResourceAnswerPercent').val();
    var $answerLongTexts = $('#ResourceAnswerLongText').val();
    var $answerCheckboxes = $('#ResourceAnswerCheckbox').val();
    var $answerRadios = $('#ResourceAnswerRadio').val();
    var $checkboxTexts = $('.checkBoxTests').val();
    var $radioTexts = $('.radioTexts').val();
    console.log($checkboxTexts);
    console.log($radioTexts);

    io.socket.post('/ContentRow/buildContentRow', {
      'questionTexts': $questionTexts,
      'questionHeads': $questionHeads,
      'questionLinks': $questionLinks,
      'answerTexts': $answerTexts,
      'answerPercents': $answerPercents,
      'answerLongTexts': $answerLongTexts,
      'answerCheckboxes': $answerCheckboxes,
      'answerRadios': $answerRadios,
      'checkboxTexts': $checkboxTexts,
      'radioTexts': $radioTexts
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

  var $checkboxSelect = $('#ResourceAnswerCheckbox');
  $checkboxSelect.change(function(){
    $('#checkboxTexts').html('');
    for(var i = 0; i < $checkboxSelect.val(); i++) {
      $('#checkboxTexts').append(i+1 + ': <input type="text" class="checkboxTexts"> <br>');
    }
  });

  var $radioSelect = $('#ResourceAnswerRadio');
  $radioSelect.change(function(){
    $('#radioTexts').html('');
    for(var i = 0; i < $radioSelect.val(); i++) {
      $('#radioTexts').append(i+1 + ': <input type="text" class="radioTexts"> <br>');
    }
  });

});
