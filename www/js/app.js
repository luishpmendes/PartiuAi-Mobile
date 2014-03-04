// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var loginTpl = Handlebars.compile($("#login-tpl").html());
    var registerTpl = Handlebars.compile($("#register-tpl").html());
    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var settingsTpl = Handlebars.compile($("#settings-tpl").html());

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

        if(window.localStorage['email'] != undefined && window.localStorage['password'] != undefined) {
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

    document.addEventListener('backbutton', function () {
        var hash = window.location.hash;

        if (hash == '' || hash == '#') {
            navigator.app.exitApp();
        } else {
            history.go(-1);
        }
    }, false);

    $(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */

    function route () {
        var hash = window.location.hash;

        if (hash == 'register' || hash == '#register') {
            $('body').html(new RegisterView(registerTpl).render().el);            
        } else if (hash == 'home' || hash == '#home') {
            $('body').html(new HomeView(homeTpl).render().el);            
        } else if (hash == 'settings' || hash == '#settings') {
            $('body').html(new SettingsView(settingsTpl).render().el);            
        } else {
            $('body').html(new LoginView(loginTpl).render().el);
        }
    }

    route();

} ());
