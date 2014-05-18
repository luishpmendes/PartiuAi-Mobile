console.log("HitchARidePriceView.js");

function HitchARidePriceView (template) {
    View.call(this, template);

    console.log("HitchARidePriceView");

    function minus () {
        if ($('#price').val() > 0) {
            $('#price').val($('#price').val()-1);
        }
    }

    function plus () {
        $('#price').val($('#price').val()-(-1));
    }

    function ok () {
        window.location.hash = "hitchARideSearching";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#minus', minus);
    this.el.on('click', '#plus', plus);
    this.el.on('click', '#ok', ok);
}

// inherit View
HitchARidePriceView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARidePriceView.prototype.constructor = HitchARidePriceView;
// set super class
HitchARidePriceView.prototype.parent = View.prototype;
