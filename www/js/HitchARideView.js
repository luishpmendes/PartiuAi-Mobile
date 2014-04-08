console.log("HitchARideView.js");

function HitchARideView (template) {
    View.call(this, template);

    console.log("HitchARideView");

    self = this;

    function source () {
        console.log("HitchARideView source");
        window.location.hash = "sourceLocationSelector";
    }

    function destination () {
        console.log("HitchARideView destination");
        window.location.hash = "destinationLocationSelector";
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#source', source);
    this.el.on('click', '#destination', destination);
}

// inherit View
HitchARideView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARideView.prototype.constructor = HitchARideView;
// set super class
HitchARideView.prototype.parent = View.prototype;

HitchARideView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("HitchARideView load");

    $('#date').pickadate({
        editable: true,
        format: 'dd/mm/yyyy'
    });
    $('#time').pickatime({
        editable: true,
        format: 'H:i'
    });
    
    if (window.localStorage.getItem('sourceLocation') != null) {
        $("#source").val(JSON.parse(window.localStorage.getItem('sourceLocation')).name);
    }
    if (window.localStorage.getItem('destinationLocation') != null) {
        $("#destination").val(JSON.parse(window.localStorage.getItem('destinationLocation')).name);
    }
}
