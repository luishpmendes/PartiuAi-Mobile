console.log("PassengerHomeView.js");

function PassengerHomeView (template) {
    View.call(this, template);

    console.log("PassengerHomeView");

    self = this;

    function driverMode () {
        console.log("PassengerHomeView driverMode");

        window.location.replace('main.html#driverHome');
    }

    function hitchARide () {
        console.log("PassengerHomeView hitchARide");

        window.location.hash = "hitchARideDestination";
    }

    function scheduleARide () {
        console.log("PassengerHomeView scheduleARide");

        window.location.hash = "scheduleARide";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#driverMode', driverMode);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#hitchARideButton', hitchARide);
    this.el.on('click', '#scheduleARideButton', scheduleARide);
}

// inherit View
PassengerHomeView.prototype = new View();
// correct the constructor pointer because it points to View
PassengerHomeView.prototype.constructor = PassengerHomeView;
// set super class
PassengerHomeView.prototype.parent = View.prototype;
