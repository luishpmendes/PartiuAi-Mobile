console.log("DriverHomeView.js");

function DriverHomeView (template) {
    View.call(this, template);

    console.log("DriverHomeView");

    self = this;

    function passengerMode () {
        console.log("DriverHomeView passengerMode");

        window.location.replace('main.html#passengerHome');
    }

    function offerARide () {
        console.log("DriverHomeView offerARide");

        window.location.hash = "hitchARideDestination";
    }

    function scheduleARide () {
        console.log("DriverHomeView scheduleARide");

        window.location.hash = "scheduleARide";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#passengerMode', passengerMode);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#offerARideButton', offerARide);
    this.el.on('click', '#scheduleARideButton', scheduleARide);
}

// inherit View
DriverHomeView.prototype = new View();
// correct the constructor pointer because it points to View
DriverHomeView.prototype.constructor = DriverHomeView;
// set super class
DriverHomeView.prototype.parent = View.prototype;
