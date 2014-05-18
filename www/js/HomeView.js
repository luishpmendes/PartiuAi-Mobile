console.log("HomeView.js");

function HomeView (template) {
    View.call(this, template);

    console.log("HomeView");

    self = this;

    function hitchARide () {
        console.log("HomeView hitchARide");

        window.location.hash = "hitchARideDestination";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#hitchARideButton', hitchARide);
    this.el.on('click', '#offerARideButton', hitchARide);
}

// inherit View
HomeView.prototype = new View();
// correct the constructor pointer because it points to View
HomeView.prototype.constructor = HomeView;
// set super class
HomeView.prototype.parent = View.prototype;
