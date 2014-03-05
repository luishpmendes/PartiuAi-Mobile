var RegisterView = function (template) {

    self = this;

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('load', '.content', this.scroll);
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#registerButton', this.register);
    };

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
            self.iscroll = new IScroll($('.content', self.el)[0], {
                bounce: false
            });
        }
        return true;
    }

    this.back = function () {
        history.go(-1);
    }

    this.validate = function () {
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
        if (self.validate()) {
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        }
    }
 
    this.initialize();

}
