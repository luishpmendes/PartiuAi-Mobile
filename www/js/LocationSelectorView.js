console.log("LocationSelectorView.js");

function LocationSelectorView (template, type) {
    View.call(this, template);

    console.log("LocationSelectorView");

    self = this;

    this.type = type;

    this.hitchARideOriginType = 0;
    this.hitchARideDestinationType = 1;
    this.offerARideOriginType = 2;
    this.offerARideDestinationType = 3;
    this.passengerScheduleARideOriginType = 4;
    this.passengerScheduleARideDestinationType = 5;

    var marker;

    function selectAll () {
        console.log("LocationSelectorView selectAll");

        $('#searchbox').select();
    }

    this.ok = function () {
        console.log("LocationSelectorView ok");

        if (self.type == self.hitchARideOriginType) {
            window.localStorage.setItem('hitchARideOriginLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
        } else if (self.type == self.hitchARideDestinationType) {
            window.localStorage.setItem('hitchARideDestinationLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
            window.location.hash = "hitchARidePrice";
        } else if (self.type == self.offerARideOriginType) {
            window.localStorage.setItem('offerARideOriginLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
        } else if (self.type == self.offerARideDestinationType) {
            window.localStorage.setItem('offerARideDestinationLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
        } else if (self.type == self.passengerScheduleARideOriginType) {
            window.localStorage.setItem('passengerScheduleARideOriginLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
            self.back();
        } else if (self.type == self.passengerScheduleARideDestinationType) {
            window.localStorage.setItem('passengerScheduleARideDestinationLocation', JSON.stringify({
                'name': $('#searchbox').val(),
                'position': {
                    'latitude': marker.getPosition().lat(),
                    'longitude': marker.getPosition().lng()
                }
            }));
            self.back();
        }

        //self.back();
    }

    this.loadMap = function () {
        console.log("LocationSelectorView loadMap");

        var mapOptions = {
            center: new google.maps.LatLng(-22.9099384, -47.06263319999999),
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

        if (self.type == self.hitchARideOriginType && window.localStorage.getItem('hitchARideOriginLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('hitchARideOriginLocation')).position.latitude, JSON.parse(window.localStorage.getItem('hitchARideOriginLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if (self.type == self.hitchARideDestinationType && window.localStorage.getItem('hitchARideDestinationLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('hitchARideDestinationLocation')).position.latitude, JSON.parse(window.localStorage.getItem('hitchARideDestinationLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if (self.type == self.offerARideOriginType && window.localStorage.getItem('offerARideOriginLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('offerARideOriginLocation')).position.latitude, JSON.parse(window.localStorage.getItem('offerARideOriginLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if (self.type == self.offerARideDestinationType && window.localStorage.getItem('offerARideDestinationLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('offerARideDestinationLocation')).position.latitude, JSON.parse(window.localStorage.getItem('offerARideDestinationLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if (self.type == self.passengerScheduleARideOriginType && window.localStorage.getItem('passengerScheduleARideOriginLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('passengerScheduleARideOriginLocation')).position.latitude, JSON.parse(window.localStorage.getItem('passengerScheduleARideOriginLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if (self.type == self.passengerScheduleARideDestinationType && window.localStorage.getItem('passengerScheduleARideDestinationLocation') != null) {
            marker.setVisible(false);
            var location = new google.maps.LatLng(JSON.parse(window.localStorage.getItem('passengerScheduleARideDestinationLocation')).position.latitude, JSON.parse(window.localStorage.getItem('passengerScheduleARideDestinationLocation')).position.longitude);
            map.setCenter(location);
            map.setZoom(17);
            marker.setPosition(location);
            marker.setVisible(true);
            $('body').removeClass("loading");
        } else if ((self.type == self.hitchARideOriginType || self.type == self.offerARideOriginType) && navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
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
                        $('body').removeClass("loading");
                    });
                },
                function (positionError) {
                    $('body').removeClass("loading");
                }
            );
        } else if ((self.type == self.hitchARideDestinationType || self.type == self.offerARideDestinationType || self.type == self.passengerScheduleARideOriginType || self.type == self.passengerScheduleARideDestinationType) && navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    marker.setVisible(false);
                    map.setCenter(latlng);

                    $('body').removeClass("loading");
                },
                function (positionError) {
                    $('body').removeClass("loading");
                },
                {
                    enableHighAccuracy: false
                }
            );
        }
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#okButton', this.ok);
    this.el.on('click', '#searchbox', selectAll);
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
    
    $('body').addClass("loading");

    if (this.type == this.hitchARideOriginType) {
        if (window.localStorage.getItem('hitchARideOriginLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('hitchARideOriginLocation')).name);
        }
    } else if (this.type == this.hitchARideDestinationType) {
        if (window.localStorage.getItem('hitchARideDestinationLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('hitchARideDestinationLocation')).name);
        }
    } else if (this.type == this.offerARideOriginType) {
        if (window.localStorage.getItem('offerARideOriginLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('offerARideOriginLocation')).name);
        }
    } else if (this.type == this.offerARideDestinationType) {
        if (window.localStorage.getItem('offerARideDestinationLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('offerARideDestinationLocation')).name);
        }
    } else if (this.type == this.passengerScheduleARideOriginType) {
        if (window.localStorage.getItem('passengerScheduleARideOriginLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('passengerScheduleARideOriginLocation')).name);
        }
    } else if (this.type == this.passengerScheduleARideDestinationType) {
        if (window.localStorage.getItem('passengerScheduleARideDestinationLocation') != null) {
            $("#searchbox").val(JSON.parse(window.localStorage.getItem('passengerScheduleARideDestinationLocation')).name);
        }
    }

    this.loadMap();
}
