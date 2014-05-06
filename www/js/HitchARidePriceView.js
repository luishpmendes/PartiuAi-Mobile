console.log("HitchARidePriceView.js");

function HitchARidePriceView (template) {
    View.call(this, template);

    console.log("HitchARidePriceView");

    self = this;

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
}

// inherit View
HitchARidePriceView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARidePriceView.prototype.constructor = HitchARidePriceView;
// set super class
HitchARidePriceView.prototype.parent = View.prototype;

