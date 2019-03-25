var map;
var markers = [];
var polazna_position = {lat: 58.294980, lng: 56.405154};
var distances = [];
var textrow = '';

function initMap() {
	map = new google.maps.Map(document.getElementById('map'), {
		center: polazna_position,
		zoom: 15		
	});	
}

function setLabel() {	
	for (var i = 0; i < markers.length; i++) {
		markers[i].setMap(null);
	}
	textrow = "";

	var select = document.getElementById('selector').value;
	
	var requestURL = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+polazna_position.lat+','+polazna_position.lng+'&radius=5000&keyword='+select+'&key=АПИ_ВСТАВИТЬ_СЮДА';
	var request = new XMLHttpRequest ();
	request.open('GET', requestURL, true);
	request.responseType = 'json';
	request.send();
	
	request.onload = function() {
		var myjson = request.response;	
		
		if(myjson['status'] == 'OK') {						
			for(var i = 0; i < myjson['results'].length; i++) {
				var obj = myjson['results'][i];
				var position = obj.geometry.location;
						
				
				var marker = new google.maps.Marker({
					position: position,
					map: map,
					title: obj.name
				});			
				
				markers.push(marker);
				
				var p1 = new google.maps.LatLng(polazna_position.lat, polazna_position.lng);
				var p2 = new google.maps.LatLng(position.lat, position.lng);
				
				
				textrow = textrow + '<br>' + obj.name + ': ' + google.maps.geometry.spherical.computeDistanceBetween(p1, p2).toFixed(0) + " метров";
			}			
			
			document.getElementById('text_output').innerHTML = textrow;
			document.getElementById('output_label').innerHTML = 'OK';
		}
		else
			document.getElementById('output_label').innerHTML = 'Nope';			
	}
}