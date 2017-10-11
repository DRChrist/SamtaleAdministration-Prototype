$(document).ready(function() {
	'use strict';

	io.socket.get('/samtale', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		// var reducedSamtaler = _.map(resData, function(samtale) {
		// 	delete samtale.mødeTidspunkt;
		// 	delete samtale.indkaldelsesTidspunkt;
		// });
		// var reducedSamtaler = [];
		for(var samtale of resData) {
			$('.samtaler').append('Lokale: ' + samtale.lokale + '<br>');
			$('.samtaler').append('Status: ' + samtale.status + '<br>');
			$('.samtaler').append('<br>');
		}
	});


	io.socket.get('/runde', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		for(var runde of resData) {
			$('.runder').append('Titel: ' + runde.titel + '<br>');
			$('.runder').append('Status: ' + runde.status + '<br>');
			$('.runder').append('<br>');
		}
	});

	io.socket.get('/samtaleforloeb', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(samtaleforløb) {
			$('.samtaleforløb').append('Titel: ' + samtaleforløb.titel + '<br>');
			$('.samtaleforløb').append('Status: ' + samtaleforløb.status + '<br>');
			$('.samtaleforløb').append('<br>');
		});
	});

	io.socket.get('/bruger', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(bruger) {
			$('.brugere').append('Fornavn: ' + bruger.fornavn + '<br>');
			$('.brugere').append('Efternavn: ' + bruger.efternavn + '<br>');
			$('.brugere').append('Email: ' + bruger.email + '<br>');
			$('.brugere').append('<br>');
		});
	});

	io.socket.get('/stillingskategori', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(stillingskategori) {
			$('.stillingskategorier').append('Titel: ' + stillingskategori.titel + '<br>');
			$('.stillingskategorier').append('<br>');
		});
	});

	io.socket.get('/afdeling', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(afdeling) {
			$('.afdelinger').append('Afsnitskode: ' + afdeling.afsnitskode + '<br>');
			$('.afdelinger').append('Lokation: ' +  afdeling.lokation + '<br>');
			$('.afdelinger').append('<br>');
		});
	});

});