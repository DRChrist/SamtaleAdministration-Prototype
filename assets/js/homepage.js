$(document).ready(function() {
	'use strict';

	io.socket.get('/meeting', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		for(var meeting of resData) {
			$('.meetings').append('Lokale: ' + meeting.room + '<br>');
			$('.meetings').append('Status: ' + meeting.state + '<br>');
			$('.meetings').append('<br>');
		}
	});


	io.socket.get('/round', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		for(var round of resData) {
			$('.rounds').append('Titel: ' + round.title + '<br>');
			$('.rounds').append('Status: ' + round.state + '<br>');
			$('.rounds').append('<br>');
		}
	});

	io.socket.get('/agenda', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(agenda) {
			$('.agendas').append('Titel: ' + agenda.title + '<br>');
			$('.agendas').append('Status: ' + agenda.state + '<br>');
			$('.agendas').append('<br>');
		});
	});

	io.socket.get('/user', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(user) {
			$('.users').append('First Name: ' + user.firstName + '<br>');
			$('.users').append('Last Name: ' + user.lastName + '<br>');
			$('.users').append('Email: ' + user.email + '<br>');
			$('.users').append('<br>');
		});
	});

	io.socket.get('/job', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(job) {
			$('.jobs').append('Titel: ' + job.title + '<br>');
			$('.jobs').append('<br>');
		});
	});

	io.socket.get('/department', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(department) {
			$('.departments').append('Section Code: ' + department.sectionCode + '<br>');
			$('.departments').append('Location: ' +  department.location + '<br>');
			$('.departments').append('<br>');
		});
	});

});