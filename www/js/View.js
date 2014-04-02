console.log("View.js");

function View (template) {
    console.log("View");
    this.template = template;
    this.el = $('<div/>');
}

View.prototype.render = function() {
    console.log("View render");
    this.el.html(this.template());
    return this;
};

View.prototype.load = function () {
    console.log("View load");
}
