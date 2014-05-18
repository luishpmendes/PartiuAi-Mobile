console.log("WaitDriverView.js");

function WaitDriverView (template) {
    View.call(this, template);

    console.log("WaitDriverView");

    self = this;

    var driverMarker;
    var passengerMarker;

    this.loadMap = function () {
        console.log("WaitDriverView loadMap");

        var mapOptions = {
            center: new google.maps.LatLng(-22.9099384, -47.06263319999999),
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
        
        driverMarker = new google.maps.Marker({
            map: map,
            icon: 'assets/img/car.png'
        });

        passengerMarker = new google.maps.Marker({
            map: map,
            icon: 'assets/img/man.png'
        });

        if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var passengerLatLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                    var driverLatLng = new google.maps.LatLng(position.coords.latitude + 0.017966306, position.coords.longitude + 0.017966306);

                    var bounds = new google.maps.LatLngBounds(passengerLatLng, passengerLatLng);
                    bounds.extend(driverLatLng);

                    passengerMarker.setVisible(false);
                    driverMarker.setVisible(false);

                    map.setCenter(passengerLatLng);
                    map.fitBounds(bounds);

                    passengerMarker.setPosition(passengerLatLng);
                    driverMarker.setPosition(driverLatLng);

                    passengerMarker.setVisible(true);
                    driverMarker.setVisible(true);

                    $('body').removeClass("loading");
                },
                function (positionError) {
                    var passengerLatLng = new google.maps.LatLng(-22.9099384, -47.06263319999999);
                    var driverLatLng = new google.maps.LatLng(-22.9099384 + 0.017966306, -47.06263319999999 + 0.017966306);

                    var bounds = new google.maps.LatLngBounds(passengerLatLng, passengerLatLng);
                    bounds.extend(driverLatLng);

                    passengerMarker.setVisible(false);
                    driverMarker.setVisible(false);

                    map.setCenter(passengerLatLng);
                    map.fitBounds(bounds);

                    passengerMarker.setPosition(passengerLatLng);
                    driverMarker.setPosition(driverLatLng);

                    passengerMarker.setVisible(true);
                    driverMarker.setVisible(true);

                    $('body').removeClass("loading");
                }
            );
        } else {
            var passengerLatLng = new google.maps.LatLng(-22.9099384, -47.06263319999999);
            var driverLatLng = new google.maps.LatLng(-22.9099384 + 0.017966306, -47.06263319999999 + 0.017966306);

            var bounds = new google.maps.LatLngBounds(passengerLatLng, passengerLatLng);
            bounds.extend(driverLatLng);

            passengerMarker.setVisible(false);
            driverMarker.setVisible(false);

            map.setCenter(passengerLatLng);
            map.fitBounds(bounds);

            passengerMarker.setPosition(passengerLatLng);
            driverMarker.setPosition(driverLatLng);

            passengerMarker.setVisible(true);
            driverMarker.setVisible(true);

            $('body').removeClass("loading");
        }
    }

    function ok () {
        console.log("WaitDriverView ok");
        window.location.hash = "";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#ok', ok);
}

// inherit View
WaitDriverView.prototype = new View();
// correct the constructor pointer because it points to View
WaitDriverView.prototype.constructor = WaitDriverView;
// set super class
WaitDriverView.prototype.parent = View.prototype;

WaitDriverView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("WaitDriverView load");

    this.loadMap();
}
