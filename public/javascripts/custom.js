const accessToken = '4456656211.e029fea.1b8ac743235f4bea9aefc4289dc730d9';


function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 6,
        center: { lat: -34.397, lng: 150.644 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('find').addEventListener('click', function() {
        geocodeAddress(geocoder, map);
    });
}

function geocodeAddress(geocoder, resultsMap) {
    var address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });
            document.getElementById('lng-lat').value = results[0].geometry.location.lng() + ' - ' + results[0].geometry.location.lat();
            getListLocation(results[0].geometry.location.lng(), results[0].geometry.location.lat());
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}


function getListLocation(lng, lat) {
    $.ajax({
        url: 'https://api.instagram.com/v1/locations/search?lng=' + lng + '&lat=' + lat + '&access_token=' + accessToken,
        type: 'GET',
        dataType: 'jsonp',
        success: function(result) {
            var output = "";
            for (var key in result.data) {
                output += '<li><a href="#" onclick="getListMedia(' + result.data[key].id + ')"><strong>' + result.data[key].name + '</strong></a></li>';
            }
            $('#list-location').empty();

            $('#list-location').append('<li class="list-group-item active">Coordinates</p>');

            $('#list-location').append(output);
        }
    });
}
//https://btcn02-api1412505.herokuapp.com/#
function getListMedia(locationId) {
    $.ajax({
        url: 'https://api.instagram.com/v1/locations/' + locationId + '/media/recent?access_token=' + accessToken,
        type: 'GET',
        dataType: 'jsonp',
        success: function(result) {
            var output = "";
            for (var key in result.data) {
                console.log('location :', result.data[key].images.thumbnail.url);
                output += '<li><img src="' +
                    result.data[key].images.thumbnail.url + '"></li>';
                if (result.data[key].videos) {
                    output += '<li><video width="400" height = "300" controls><source src="' + result.data[key].videos.standard_resolution.url +
                        '"type="video/mp4"></video></li>';
                }
            }
            $('#list-media').empty();

            $('#list-media').append('<p class="list-group-item active">List Media</p>');

            $('#list-media').append(output);
        }
    });
}