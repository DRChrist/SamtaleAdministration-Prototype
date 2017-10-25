$(document).ready(function() {

io.socket.get('/agenda', function(resData, jwres) {
	if(jwres.statusCode !== 200) {
		console.error(jwres);
		return;
	}
	_.forEach(resData, function(agenda) {
		$('#add-dropdown').append('<option value="' + agenda.titel + '">' + agenda.titel + '</option>');
	});
});

$('#add-btn').click(function() {
	var $select = $('#add-dropdown').val();
	io.socket.put('/agenda/addRound', {titel: $select}, function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		console.log('added');
	});

});

$('.modelbtn').click(function() {
	var $model = $(this).attr('value');
	showModel($model);
});

$('#currentround').click(function() {
	$('.data').empty();
	$('#upcomingrounds').removeClass('active');
	$('#currentround').addClass('active');
	$('#headline').text('Samtaleforløb');
	io.socket.get('/round?state=active', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData[0].agendas, function(agenda) {
			io.socket.get('/agenda?id=' + agenda.id, function(agenda, jwres) {
				if(jwres.statusCode !== 200) {
					console.error(jwres);
					return;
				}
				if(!agenda) {
					$('.data').append('Ingen agenda tilknyttet denne runde.');
				}
				$('.data').append('<div class="row bg-warning"><div class="col-md-8">'	+ 
					'<a href="/Agenda?id=' + agenda.id + '">' + agenda.title + '</a><br>' + 
					'<p>' + agenda.description + '<p>' + 
					'Invitationsinterval: ' + agenda.inviteInterval + ' dage' +
					'        Invitationsfrist: ' + agenda.invitePeriod + ' dage</div>' + 
					'<div class="col-md-4">' + 'Departments: ' + agenda.departments[0].sectionCode + '<br>' + 
					'Stillingskategori: ' + agenda.jobs[0].titel + '</div></div><br><br>');
			});
		});
	});
});

$('#upcomingrounds').click(function() {
	$('.data').empty();
	$('#currentround').removeClass('active');
	$('#upcomingrounds').addClass('active');
	$('#headline').text('rounds');
	io.socket.get('/round?state=upcoming', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(round) {
			$('.data').append('<div class="row bg-warning"><div class="col-md-6">'	+ 
					'<a href="/round?id=' + round.id + '">' + round.title + '</a><br>' + 
					round.state + '<br></div>' + 
					'<div class="col-md-6">' + 'Samtaleforløb: ' + '</div></div><br><br>');
		});
	});
});

function showModel(model) {
	$('.data').empty();
	$('#headline').text(model);
	io.socket.get('/' + model, function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(obj) {
			if(model === 'agenda') {
				$('.data').append('<a href="/' + model + '/' + obj.titel + '" style="display:block;"><div class="row bg-warning"><div class="col-md-6 cola' + 
				obj.id + '"></div><div class="col-md-6 colb' + obj.id + '"></div></div></a><br><br>');
			} else {
			$('.data').append('<a href="/' + model + '?id=' + obj.id + '" style="display:block;"><div class="row bg-warning"><div class="col-md-6 cola' + 
				obj.id + '"></div><div class="col-md-6 colb' + obj.id + '"></div></div></a><br><br>');
			}
			var shift = false;
			_.forEach(obj, function(value, key) {
				if(shift) {
					$('.cola' + obj.id).append(key + ': ' + value + '<br>');
					shift = false;
				} else {
					$('.colb' + obj.id).append(key + ': ' + value + '<br>');
					shift = true;
				}
			});
		});
	});
}




});