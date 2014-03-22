var RideNowView = function (template) {

    self = this;

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#menuButton', this.menu);
        this.el.on('click', '#logout', this.logout);
    }

    this.render = function() {
        this.el.html(template());
        return this;
    }

    this.load = function () {
        self.loadMap();
    }

    this.loadMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng(-22.816252, -47.069836),
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        var marker = new google.maps.Marker({
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

        if (navigator.geolocation) {
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

    this.back = function () {
        history.go(-1);
    }

    this.menu = function () {
        $('#menu').toggle('fast');
    }

    this.logout = function () {
        if (navigator.notification) {
            navigator.notification.confirm (
                'Deseja mesmo sair?',
                function (x) {
                    if (x == 1) {
                        window.localStorage.clear();

                        try {
                            FB.logout(function(response) {

                            });
                        } catch (e) {
                        }

                        window.location.replace('main.html');
                    }
                },
                'PartiuAí'
            );
        } else {
            if (confirm('Deseja mesmo sair?')) {
                window.localStorage.clear();
                
                try {
                    FB.logout(function(response) {

                    });
                } catch (e) {
                }

                window.location.replace('main.html');
            }
        }
    }
 
    this.initialize();

}
