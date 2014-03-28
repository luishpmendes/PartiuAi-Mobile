console.log("RegisterView.js");

var RegisterView = function (template) {

    self = this;

    this.initialize = function () {
        console.log("RegisterView initialize");
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('load', '.scroller', this.scroll);
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#registerButton', this.register);
    };

    this.render = function() {
        console.log("RegisterView render");
        this.el.html(template());
        return this;
    };

    this.load = function () {
        console.log("RegisterView load");
    }

    this.scroll = function() {
        console.log("RegisterView scroll");
        if (self.iscroll) {
            console.log('Refresh iScroll');
            self.iscroll.refresh();
        } else {
            console.log('New iScroll');
            self.iscroll = new IScroll($('.scroller', self.el)[0], {
                bounce: false
            });
        }
        return true;
    }

    this.back = function () {
        console.log("RegisterView back");
        history.go(-1);
    }

    this.validate = function () {
        console.log("RegisterView validate");
        emailInput = $('#email')[0];
        passwordInput = $('#password')[0];
        confirmPasswordInput = $('#confirmPassword')[0];
        nameInput = $('#name')[0];

        if (!emailInput || !passwordInput || !confirmPasswordInput || !nameInput) {
            alert('ERROR!');
        } else if (!emailInput.value.match(emailInput.pattern)) {
            alert('Invalid Email!');
        } else if (passwordInput.value == '') {
            alert('Invalid Password!');
        } else if (confirmPasswordInput.value != passwordInput.value) {
            alert('Check your Password!');
        } else if (nameInput.value == '') {
            alert('Invalid Name!');
        } else {
            return true;
        }
        return false;
    }

    this.register = function () {
        console.log("RegisterView register");
        if (self.validate()) {
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        }
    }
 
    this.initialize();

}
