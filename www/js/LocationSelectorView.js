console.log("LocationSelectorView.js");

function LocationSelectorView (template, type) {
    View.call(this, template);

    self = this;

    console.log("LocationSelectorView");

    this.type = type;

    this.sourceType = 0;
    this.destinationType = 1;

    var marker;

    this.ok = function () {
        console.log("LocationSelectorView ok");

        if (self.type == self.sourceType) {
            window.localStorage.setItem('sourceLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
        } else if (self.type == self.destinationType) {
            window.localStorage.setItem('destinationLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
        }

        history.go(-1);
    }

    this.loadMap = function () {
        console.log("LocationSelectorView loadMap");
        var mapOptions = {
            center: new google.maps.LatLng(-22.816252, -47.069836),
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        marker = new google.maps.Marker({
            map: map
        });
        var input = document.getElementById('searchbox');
        var autoCompleteOptions = {
            componentRestrictions: {country: 'br'}
        };
        var autocomplete = new google.maps.places.Autocomplete(input, autoCompleteOptions);

        google.maps.event.addListener(map, 'click', function(e) {
            marker.setVisible(false);
            marker.setPosition(e.latLng);
            marker.setVisible(true);

            var geocoder = new google.maps.Geocoder();

            var request = {
                location: e.latLng,
                radius: '500'
            };

            geocoder.geocode({'latLng': e.latLng}, function(results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        $('#searchbox').val(results[0].formatted_address)
                    }
                }
            });
        });

        google.maps.event.addListener(autocomplete, 'place_changed', function() {
            marker.setVisible(false);
            var place = autocomplete.getPlace();
            if (!place.geometry) {
                return;
            }

            // If the place has a geometry, then present it on a map.
            if (place.geometry.viewport) {
                map.fitBounds(place.geometry.viewport);
            } else {
                map.setCenter(place.geometry.location);
                map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(place.geometry.location);
            marker.setVisible(true);
        });

        if (self.type == self.sourceType && window.localStorage.getItem('sourceLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('sourceLocation')).position.latitude, JSON.parse(window.localStorage.getItem('sourceLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
        } else if (self.type == self.destinationType && window.localStorage.getItem('destinationLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('destinationLocation')).position.latitude, JSON.parse(window.localStorage.getItem('destinationLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
        } else if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                var request = {
                    location: latlng,
                    radius: '500'
                };

                geocoder.geocode({'latLng': latlng}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            marker.setVisible(false);
                            
                            map.setCenter(latlng);
                            map.setZoom(17);  // Why 17? Because it looks good.

                            marker.setPosition(latlng);
                            marker.setVisible(true);

                            $('#searchbox').val(results[0].formatted_address)
                        }
                    }
                });
            });
        }
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#okButton', this.ok);
}

// inherit View
LocationSelectorView.prototype = new View();
// correct the constructor pointer because it points to View
LocationSelectorView.prototype.constructor = LocationSelectorView;
// set super class
LocationSelectorView.prototype.parent = View.prototype;

LocationSelectorView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("LocationSelectorView load");

    if (this.type == this.sourceType) {
        if (window.localStorage.getItem('sourceLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('sourceLocation')).name);
        }
    } else if (this.type == this.destinationType) {
        if (window.localStorage.getItem('destinationLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('destinationLocation')).name);
        }
    }

    this.loadMap();
}
