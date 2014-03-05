var RideNowView = function (template) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('load', '#map-canvas', this.loadMap);
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#menuButton', this.menu);
        this.el.on('click', '#logout', this.logout);
    }

    this.render = function() {
        this.el.html(template());

        return this;
    }

    this.loadMap = function () {
        var mapOptions = {
            center: new google.maps.LatLng(-34.397, 150.644),
            zoom: 8
        };

        var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
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
