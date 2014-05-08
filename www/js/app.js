console.log("app.js");

// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var loginTpl = Handlebars.compile($('#login-tpl').html());
    var homeTpl = Handlebars.compile($('#home-tpl').html());
    var hitchARideTpl = Handlebars.compile($('#hitchARide-tpl').html());
    var locationSelectorTpl = Handlebars.compile($('#locationSelector-tpl').html());
    var hitchARidePriceTpl = Handlebars.compile($('#hitchARidePrice-tpl').html());
    var hitchARideSearchingTpl = Handlebars.compile($('#hitchARideSearching-tpl').html());
    var rideFoundTpl = Handlebars.compile($('#rideFound-tpl').html());

    /* --------------------------------- Event Registration -------------------------------- */

    document.addEventListener('deviceready', onDeviceReady, false);

    document.addEventListener('backbutton', onBackButton, false);

    $(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */

    function onDeviceReady () {
        console.log("app.js onDeviceReady");
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert (
                    message,    // message
                    null,       // callback
                    'PartiuAi', // title
                    'OK'        // buttonName
                );
            };
        }

        try {
            FB.init({
                appId: '1471555153071551',
                cookie: true,
                status: true,
                xfbml: true,
                nativeInterface: CDV.FB,
                useCachedDialogs: false,
            });
        } catch (e) {
            console.log("FB.init exception");
            console.log(e);
        }

        if (window.localStorage.getItem('username') != null && window.localStorage.getItem('app_token') != null) {
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        } else {
            try {
                FB.getLoginStatus(function (response) {
                    if (response.status == 'connected') {
                        window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
                    }
                });
            } catch (e) {
                console.log("FB.getLoginStatus exception");
                console.log(e);
            }
        }

        FastClick.attach(document.body);
    }

    function onBackButton () {
        console.log("app.js onBackButton");
        var hash = window.location.hash;

        if (hash == '' || hash == '#' || hash == 'home' || hash == '#home') {
            navigator.app.exitApp();
        } else {
            history.go(-1);
        }
    }

    function route () {
        console.log("app.js route");
        var view;
        var hash = window.location.hash;

        if (hash == 'home' || hash == '#home') {
            view = new HomeView(homeTpl);
        } else if (hash == 'hitchARide' || hash == '#hitchARide') {
            view = new HitchARideView(hitchARideTpl);
        } else if (hash == 'hitchARideDestination' || hash == '#hitchARideDestination') {
            view = new LocationSelectorView(locationSelectorTpl, 1);
        } else if (hash == 'hitchARidePrice' || hash == '#hitchARidePrice') {
            view = new HitchARidePriceView(hitchARidePriceTpl);
        } else if (hash == 'hitchARideSearching' || hash == '#hitchARideSearching') {
            view = new HitchARideSearchingView(hitchARideSearchingTpl);
        } else if (hash == 'originLocationSelector' || hash == '#originLocationSelector') {
            view = new LocationSelectorView(locationSelectorTpl, 0);
        } else if (hash == 'destinationLocationSelector' || hash == '#destinationLocationSelector') {
            view = new LocationSelectorView(locationSelectorTpl, 1);
        } else if (hash == 'rideFound' || hash == '#rideFound') {
            view = new RideFoundView(rideFoundTpl);
        } else {
            view = new LoginView(loginTpl);
        }

        $('body').fadeOut("fast", function () {
            $('body').html(view.render().el);

            $('body').fadeIn({
                duration: 0,
                complete: function () {
                    view.load();
                    $('body').fadeOut({
                        duration: 0,
                        complete: function () {
                            $('body').fadeIn("fast");
                        }
                    });
                }
            });

            /*$('body').fadeIn("fast", function () {
                view.load();
            });*/
        });
    }

    route();

} ());
