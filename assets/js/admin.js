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
	$('#upcomingrounds').removeClass('active');
	$('#currentround').addClass('active');
	io.socket.get('/round?state=active', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
	$('#headline').text('Meetings');
		showArrayOfObjects(resData[0].meetings, 'meeting');
		
	});
});

$('#upcomingrounds').click(function() {
	$('#currentround').removeClass('active');
	$('#upcomingrounds').addClass('active');
	io.socket.get('/round?state=upcoming', function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		$('#headline').text('Rounds');
		showArrayOfObjects(resData, 'round');
	});
});

//Gets all instances of a model and shows them
function showModel(model) {
	$('#headline').text(model);
	io.socket.get('/' + model, function(resData, jwres) {
		if(jwres.statusCode !== 200) {
			console.error(jwres);
			return;
		}
		showArrayOfObjects(resData, model);
	});
}

//Shows an array of objects that links to their json
function showArrayOfObjects(array, model) {
	$('.data').empty();
	_.forEach(array, function(obj) {
		$('.data').append('<a href="/' + model + '?id=' + obj.id + 
			'" style="display:block;"><div class="row bg-warning"><div class="col-md-6 cola' + 
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
}




});