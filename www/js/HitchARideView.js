console.log("HitchARideView.js");

function HitchARideView (template) {
    View.call(this, template);

    console.log("HitchARideView");

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
}

// inherit View
HitchARideView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARideView.prototype.constructor = HitchARideView;
// set super class
HitchARideView.prototype.parent = View.prototype;
