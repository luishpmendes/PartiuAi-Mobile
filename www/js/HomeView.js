var HomeView = function (template) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#settingsButton', this.settings);
    }

    this.back = function () {
        history.go(-1);
    }

    this.settings = function () {
        window.location.hash = 'settings';
    }

    this.render = function() {
        this.el.html(template());
        return this;
    }
 
    this.initialize();

}
