console.log("HomeView.js");

function HomeView (template) {
    View.call(this, template);

    console.log("HomeView");

    function hitchARide () {
        console.log("HomeView hitchARide");
        window.location.hash = "hitchARide";
    }

    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#hitchARideButton', hitchARide);
}

// inherit View
HomeView.prototype = new View();
// correct the constructor pointer because it points to View
HomeView.prototype.constructor = HomeView;
// set super class
HomeView.prototype.parent = View.prototype;
