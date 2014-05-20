console.log("PassengerTrackerView.js");

function PassengerTrackerView (template) {
    View.call(this, template);

    console.log("PassengerTrackerView");

    self = this;

    var marker;

    this.loadMap = function () {
        console.log("PassengerTrackerView loadMap");

        var mapOptions = {
            center: new google.maps.LatLng(-22.9099384, -47.06263319999999),
            zoom: 13,
            streetViewControl: false,
            mapTypeControl: false,
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);

        marker = new google.maps.Marker({
            map: map,
            icon: 'assets/img/car.png'
        });

        if (navigator && navigator.geolocation && navigator.geolocation.getCurrentPosition) {
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    var latlng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                    marker.setVisible(false);

                    map.setCenter(latlng);

                    marker.setPosition(latlng);

                    marker.setVisible(true);

                    $('body').removeClass("loading");
                },
                function (positionError) {
                    var latlng = new google.maps.LatLng(-22.9099384, -47.06263319999999);

                    marker.setVisible(false);

                    map.setCenter(latlng);

                    marker.setPosition(latlng);

                    marker.setVisible(true);

                    $('body').removeClass("loading");
                }
            );
        } else {
            var latlng = new google.maps.LatLng(-22.9099384, -47.06263319999999);

            marker.setVisible(false);

            map.setCenter(latlng);

            marker.setPosition(latlng);

            marker.setVisible(true);

            $('body').removeClass("loading");
        }
    }

    function ok () {
        console.log("PassengerTrackerView ok");
        window.location.hash = 'rateDriver';
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#okButton', ok);
}

// inherit View
PassengerTrackerView.prototype = new View();
// correct the constructor pointer because it points to View
PassengerTrackerView.prototype.constructor = PassengerTrackerView;
// set super class
PassengerTrackerView.prototype.parent = View.prototype;

PassengerTrackerView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("PassengerTrackerView load");

    this.loadMap();
}
