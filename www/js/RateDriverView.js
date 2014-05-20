console.log("RateDriverView.js");

function RateDriverView (template) {
    View.call(this, template);

    console.log("RateDriverView");

    self = this;

    function ok () {
        window.location.hash = '';
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
RateDriverView.prototype = new View();
// correct the constructor pointer because it points to View
RateDriverView.prototype.constructor = RateDriverView;
// set super class
RateDriverView.prototype.parent = View.prototype;
