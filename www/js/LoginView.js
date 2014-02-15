var LoginView = function (template) {

    self = this;

    this.render = function() {
        this.el.html(template());
        return this;
    };
 
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
    };
 
    this.initialize();

}
