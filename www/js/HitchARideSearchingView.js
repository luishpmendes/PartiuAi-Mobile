console.log("HitchARideSearchingView.js");

function HitchARideSearchingView (template) {
    View.call(this, template);

    console.log("HitchARideSearchingView");

    self = this;

    this.counter = 10;

    this.timer = $.timer(function () {
        $('#countdown').html(--self.counter);

        if (self.counter <= 0) {
            window.location.hash = "rideFound";

            self.timer.stop();
        }
    });

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
}

// inherit View
HitchARideSearchingView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARideSearchingView.prototype.constructor = HitchARideSearchingView;
// set super class
HitchARideSearchingView.prototype.parent = View.prototype;

HitchARideSearchingView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("HitchARideSearchingView load");

    self.timer.set({ time : 1000, autostart : true });
}
