$(document).ready(function() {

io.socket.get('/samtaleforloeb', function(resData, jwres) {
	if(jwres.statusCode !== 200) {
		console.error(jwres);
		return;
	}
	_.forEach(resData, function(samtaleforløb) {
		$('#add-dropdown').append('<option value="' + samtaleforløb.titel + '">' + samtaleforløb.titel + '</option>');
	});
});

$('#add-btn').click(function() {
	var $select = $('#add-dropdown').val();
	io.socket.put('/samtaleforloeb/addRunde', {titel: $select}, function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		console.log('added');
	});

});

$('#currentround').click(function() {
	$('.samtaleforloeb').empty();
	io.socket.get('/runde?status=aktiv', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData[0].samtaleforloeb, function(samtaleforløb) {
			io.socket.get('/samtaleforloeb?id=' + samtaleforløb.id, function(samtaleforløb, jwres) {
				if(jwres.statusCode !== 200) {
					console.error(jwres);
					return;
				}
				if(!samtaleforløb) {
					$('.samtaleforloeb').append('Ingen samtaleforløb tilknyttet denne runde.');
				}
				$('.samtaleforloeb').append('<div class="row"><div class="col-md-8">'	+ 
					samtaleforløb.titel + '<br>' + 
					'<p>' + samtaleforløb.beskrivelse + '<p>' + 
					'Invitationsinterval: ' + samtaleforløb.invitationsInterval + ' dage' +
					'        Invitationsfrist: ' + samtaleforløb.invitationsFrist + ' dage</div>' + 
					'<div class="col-md-4">' + 'Afdeling: ' + samtaleforløb.afdelinger[0].afsnitskode + '<br>' + 
					'Stillingskategori: ' + samtaleforløb.stillingskategorier[0].titel + '<br><br><br>');
				// $('.samtaleforloeb').append(samtaleforløb.titel + '<br>');
				// $('.samtaleforloeb').append('<p>' + samtaleforløb.beskrivelse + '<p>');
				// $('.samtaleforloeb').append('Invitationsinterval: ' + samtaleforløb.invitationsInterval + ' dage');
				// $('.samtaleforloeb').append('        Invitationsfrist: ' + samtaleforløb.invitationsFrist + ' dage<br>');
				// $('.samtaleforloeb2').append('Afdeling: ' + samtaleforløb.afdelinger[0].afsnitskode + '<br>');
				// $('.samtaleforloeb2').append('Stillingskategori: ' + samtaleforløb.stillingskategorier[0].titel + '<br>');
				// $('.samtaleforloeb').append('<br><br>');
			});
		});
	});
});

});