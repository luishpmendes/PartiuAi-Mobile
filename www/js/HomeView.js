var HomeView = function (adapter, template, listItemTemplate) {

    self = this;

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.findByName = function() {
        adapter.findByName($('.search-key').val()).done(function(employees) {
            $('.employee-list').html(listItemTemplate(employees));
            if (self.iscroll) {
                console.log('Refresh iScroll');
                self.iscroll.refresh();
            } else {
                console.log('New iScroll');
                self.iscroll = new iScroll($('.scroller', self.el)[0], {hScrollbar: false, vScrollbar: false, bounce: false });
            }
        });
    };
 
    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('keyup', '.search-key', this.findByName);
    };
 
    this.initialize();

}
