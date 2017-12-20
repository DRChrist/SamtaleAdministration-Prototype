$(document).ready(function() {

  $('#buildButton').click(function() {
    //Grab the number of resources from the dropdowns
    var $questionTexts = $('#ResourceQuestionText').val();
    var $questionHeads = $('#ResourceQuestionHead').val();
    var $questionLinks = $('#ResourceQuestionLink').val();
    var $answerTexts = $('#ResourceAnswerText').val();
    var $answerPercents = $('#ResourceAnswerPercent').val();
    var $answerLongTexts = $('#ResourceAnswerLongText').val();
    var $answerCheckboxes = $('#ResourceAnswerCheckbox').val();
    var $answerRadios = $('#ResourceAnswerRadio').val();

    //Map the texts from the checkbox inputs to an array
    var $checkboxTexts = $('.checkboxTexts').map(function() {
      return $(this).val();
    }).get();

    //Map the texts from the radio inputs to an array
    var $radioTexts = $('.radioTexts').map(function() {
      return $(this).val();
    }).get();

    //Send the request to create a contentRow
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
      console.log(resContentRow);
      $('#contentRowId').val(resContentRow.id);
    });
  });

  $('#showButton').click(function() {
    io.socket.get('/ContentRow/getHtml', {'id': $('#contentRowId').val() }, function(resData, jwres) {
      if(jwres.statusCode !== 200) {
        console.error(jwres);
        return;
      }
      console.log(resData);
      $('#contentRowShow').html(resData);
    });
  });

  var $checkboxSelect = $('#ResourceAnswerCheckbox');
  //When the checkbox dropdown changes, create text inputs
  $checkboxSelect.change(function(){
    $('#checkboxTexts').html('');
    for(var i = 0; i < $checkboxSelect.val(); i++) {
      $('#checkboxTexts').append(i+1 + ': <input type="text" class="checkboxTexts"> <br>');
    }
  });

  var $radioSelect = $('#ResourceAnswerRadio');
  //When the radio dropdown changes, create radio inputs
  $radioSelect.change(function(){
    $('#radioTexts').html('');
    for(var i = 0; i < $radioSelect.val(); i++) {
      $('#radioTexts').append(i+1 + ': <input type="text" class="radioTexts"> <br>');
    }
  });


});
