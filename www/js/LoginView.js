var LoginView = function (template) {

    self = this;

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.scroll = function() {
        if (self.iscroll) {
            console.log('Refresh iScroll');
            self.iscroll.refresh();
        } else {
            console.log('New iScroll');
            self.iscroll = new IScroll($('.scroller', self.el)[0], {bounce: false });
        }
        return true;
    }
 
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.load('ready', this.scroll);
    };
 
    this.initialize();

}
