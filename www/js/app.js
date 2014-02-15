// We use an "Immediate Function" to initialize the application to avoid leaving anything behind in the global scope
(function () {

    /* ---------------------------------- Local Variables ---------------------------------- */

    var homeTpl = Handlebars.compile($("#home-tpl").html());
    var employeeLiTpl = Handlebars.compile($("#employee-li-tpl").html());
    var employeeTpl = Handlebars.compile($("#employee-tpl").html());
    var detailsURL = /^#employees\/(\d{1,})/;
    var slider = new PageSlider($('body'));

    /* --------------------------------- Event Registration -------------------------------- */

    document.addEventListener('deviceready', function () {
        if (navigator.notification) { // Override default HTML alert with native dialog
            window.alert = function (message) {
                navigator.notification.alert(
                    "NATIVE " + message,    // message
                    null,       // callback
                    "Workshop", // title
                    'OK'        // buttonName
                );
            };
        }
        FastClick.attach(document.body);
    }, false);

    $(window).on('hashchange', route);

    /* ---------------------------------- Local Functions ---------------------------------- */

    function route() {
        slider.slidePage(new HomeView(homeTpl).render().el);
    }

    route();

}());
