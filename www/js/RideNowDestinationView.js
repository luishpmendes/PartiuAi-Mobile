console.log("RideNowDestinationView.js");

function RideNowDestinationView (template) {
    View.call(this, template);

    console.log("RideNowDestinationView");

    function back () {
        console.log("RideNowDestinationView back");
        history.go(-1);
    }

    function menu () {
        console.log("RideNowDestinationView menu");
        $('#menu').toggle('fast');
    }

    function logout () {
        console.log("RideNowDestinationView logout");
        if (navigator.notification) {
            navigator.notification.confirm (
                'Deseja mesmo sair?',
                function (x) {
                    if (x == 1) {
                        $.ajax({
                            beforeSend: function (jqXHR, settings) {
                                $('body').addClass("loading");
                            },
                            crossDomain: true,
                            headers: {
                                'Authorization': 'Token' + window.localStorage.getItem('app_token')
                            },
                            type: 'GET',
                            url: 'http://www.partiuai.com.br/accounts/logout/',
                        }).done(function(data, textStatus, jqXHR) {
                            console.log("FB.login done");
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            window.localStorage.clear();
                            window.location.replace('main.html'); /* current page will NOT be saved in session history */
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("FB.login fail");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }).always(function (jqXHR, textStatus) {
                            $('body').removeClass("loading");
                        });

                        window.localStorage.clear();
/*
                        try {
                            FB.logout(function(response) {

                            });
                        } catch (e) {
                        }
*/
                    }
                },
                'Partiu Aí'
            );
        } else {
            if (confirm('Deseja mesmo sair?')) {
                $.ajax({
                    beforeSend: function (jqXHR, settings) {
                        $('body').addClass("loading");
                    },
                    crossDomain: true,
                    headers: {
                        'Authorization': 'Token' + window.localStorage.getItem('app_token')
                    },
                    type: 'GET',
                    url: 'http://www.partiuai.com.br/accounts/logout/',
                }).done(function(data, textStatus, jqXHR) {
                    console.log("FB.login done");
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    window.localStorage.clear();
                    window.location.replace('main.html'); /* current page will NOT be saved in session history */
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("FB.login fail");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }).always(function (jqXHR, textStatus) {
                    $('body').removeClass("loading");
                });
/*
                try {
                    FB.logout(function(response) {

                    });
                } catch (e) {
                }
*/
            }
        }
    }

    function ok () {
        console.log("RideNowDestinationView ok");
    }

    this.loadMap = function () {
        console.log("RideNowDestinationView loadMap");
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


    this.el.on('click', '#backButton', back);
    this.el.on('click', '#menuButton', menu);
    this.el.on('click', '#logout', logout);
    this.el.on('click', '#okButton', ok);
}

// inherit View
RideNowDestinationView.prototype = new View();
// correct the constructor pointer because it points to View
RideNowDestinationView.prototype.constructor = RideNowDestinationView;
// set super class
RideNowDestinationView.prototype.parent = View.prototype;

RideNowDestinationView.prototype.load = function () {
    this.parent.load.call(this);
    this.loadMap();
}
