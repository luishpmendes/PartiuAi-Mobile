console.log("RideFoundView.js");

function RideFoundView (template) {
    View.call(this, template);

    console.log("RideFoundView");

    self = this;

    function ok () {
        window.location.hash = 'waitDriver';
    }

    function cancel () {
        self.back();
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#ok', ok);
    this.el.on('click', '#cancel', cancel);
}

// inherit View
RideFoundView.prototype = new View();
// correct the constructor pointer because it points to View
RideFoundView.prototype.constructor = RideFoundView;
// set super class
RideFoundView.prototype.parent = View.prototype;
