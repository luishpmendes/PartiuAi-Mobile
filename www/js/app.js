// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var loginTpl = Handlebars.compile($("#login-tpl").html());
    var registerTpl = Handlebars.compile($("#register-tpl").html());
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var rideNowTpl = Handlebars.compile($("#rideNow-tpl").html());

    /* --------------------------------- Event Registration -------------------------------- */

    document.addEventListener('deviceready', function () {
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

        FastClick.attach(document.body);

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
        }

        if (window.localStorage.getItem('email') != null && window.localStorage.getItem('password') != null) {
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        } else {
            try {
                FB.getLoginStatus(function (response) {
                    if (response.status == 'connected') {
                        window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
                    }
                });
            } catch (e) {
            }
        }
    }, false);

    document.addEventListener('backbutton', function (e) {
        var hash = window.location.hash;

        if (hash == '' || hash == '#' || hash == 'home' || hash == '#home') {
            navigator.app.exitApp();
        } else {
            history.go(-1);
        }
    }, false);

    $(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */

    function route () {
        var htmlString;
        var hash = window.location.hash;

        if (hash == 'register' || hash == '#register') {
            htmlString = (new RegisterView(registerTpl)).render().el;
        } else if (hash == 'home' || hash == '#home') {
            htmlString = (new HomeView(homeTpl)).render().el;
        } else if (hash == 'rideNow' || hash == '#rideNow') {
            htmlString = (new RideNowView(rideNowTpl)).render().el;
        } else {
            htmlString = (new LoginView(loginTpl)).render().el;
        }

        $('body').fadeOut("fast", function () {
            $('body').html(htmlString);
            $('body').fadeIn("fast");
        });
    }

    route();

} ());
