$(document).ready(function() {

$('#currentround').click(function() {
	io.socket.get('/runde?status=aktiv', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		// console.log(resData);
		_.forEach(resData[0].samtaleforloeb, function(samtaleforløb) {
			io.socket.get('/samtaleforloeb?id=' + samtaleforløb.id, function(samtaleforløb, jwres) {
				if(jwres.statusCode !== 200) {
					console.error(jwres);
					return;
				}
				console.log(samtaleforløb);
				$('.samtaleforloeb').append(samtaleforløb.titel + '<br>');
				$('.samtaleforloeb').append('<p>' + samtaleforløb.beskrivelse + '<p>');
				$('.samtaleforloeb').append('Invitationsinterval: ' + samtaleforløb.invitationsInterval + ' dage');
				$('.samtaleforloeb').append('        Invitationsfrist: ' + samtaleforløb.invitationsFrist + ' dage<br>');
				$('.samtaleforloeb2').append('Afdeling: ' + samtaleforløb.afdelinger[0].afsnitskode + '<br>');
				$('.samtaleforloeb2').append('Stillingskategori: ' + samtaleforløb.stillingskategorier[0].titel + '<br>');
				$('.samtaleforloeb').append('<br><br>');
			});
		});
	});
});

});