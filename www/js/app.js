// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var loginTpl = Handlebars.compile($("#login-tpl").html());
    var registerTpl = Handlebars.compile($("#register-tpl").html());
    var homeTpl = Handlebars.compile($("#home-tpl").html());

    /* --------------------------------- Event Registration -------------------------------- */

    document.addEventListener('deviceready', function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert (
                    message,    // message
                    null,       // callback
                    "PartiuAi", // title
                    'OK'        // buttonName
                );
            };
            window.confirm = function (message) {
                navigator.notification.confirm (
                    message,    // message
                    null,       // callback
                    "PartiuAi"  // title
                );
            };
            window.prompt = function (message) {
                navigator.notification.prompt (
                    message,    // message
                    null,       // callback
                    "PartiuAi"  // title
                );
            };
        }

        FastClick.attach(document.body);

        $.ajax({
            cache: true,
            crossDomain: true,
            dataType: 'script',
            //url: 'http://connect.facebook.net/en_US/all.js',
            url: 'http://connect.facebook.net/en_US/all/debug.js',
        }).done(function(data, textStatus, jqXHR) {
            FB.init({
                appId: '1471555153071551',
                cookie: true,
                status: true,
                xfbml: true,
                nativeInterface: CDV.FB,
                useCachedDialogs: false,
            });
        });
    }, false);

    $(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */

    function route() {
        var hash = window.location.hash;

        if (hash == '#register') {
            console.log("register");
            $('body').html(new RegisterView(registerTpl).render().el);            
        } else if (hash == '#home') {
            console.log("home");
            $('body').html(new HomeView(homeTpl).render().el);            
        } else {
            console.log("login");
            $('body').html(new LoginView(loginTpl).render().el);
        }
    }

    route();

}());
