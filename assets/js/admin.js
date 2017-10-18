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

$('.modelbtn').click(function() {
	var $model = $(this).attr('value');
	showModel($model);
});

$('#currentround').click(function() {
	$('.data').empty();
	$('#upcomingrounds').removeClass('active');
	$('#currentround').addClass('active');
	$('#headline').text('Samtaleforløb');
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
					$('.data').append('Ingen samtaleforløb tilknyttet denne runde.');
				}
				$('.data').append('<div class="row bg-warning"><div class="col-md-8">'	+ 
					'<a href="/samtaleforloeb?id=' + samtaleforløb.id + '">' + samtaleforløb.titel + '</a><br>' + 
					'<p>' + samtaleforløb.beskrivelse + '<p>' + 
					'Invitationsinterval: ' + samtaleforløb.invitationsInterval + ' dage' +
					'        Invitationsfrist: ' + samtaleforløb.invitationsFrist + ' dage</div>' + 
					'<div class="col-md-4">' + 'Afdeling: ' + samtaleforløb.afdelinger[0].afsnitskode + '<br>' + 
					'Stillingskategori: ' + samtaleforløb.stillingskategorier[0].titel + '</div></div><br><br>');
			});
		});
	});
});

$('#upcomingrounds').click(function() {
	$('.data').empty();
	$('#currentround').removeClass('active');
	$('#upcomingrounds').addClass('active');
	$('#headline').text('Runder');
	io.socket.get('/runde?status=kommende', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		_.forEach(resData, function(runde) {
			$('.data').append('<div class="row bg-warning"><div class="col-md-6">'	+ 
					'<a href="/runde?id=' + runde.id + '">' + runde.titel + '</a><br>' + 
					runde.status + '<br></div>' + 
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
		console.log(resData);
		_.forEach(resData, function(obj) {
			$('.data').append('<a href="/' + model + '?id=' + obj.id + '" style="display:block;"><div class="row bg-warning"><div class="col-md-6 cola' + 
				obj.id + '"></div><div class="col-md-6 colb' + obj.id + '"></div></div></a><br><br>');
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