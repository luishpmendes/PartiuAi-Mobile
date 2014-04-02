console.log("RegisterView.js");

function RegisterView (template) {
    View.call(this, template);

    console.log("RegisterView");

    function scroll () {
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

    function back () {
        console.log("RegisterView back");
        history.go(-1);
    }

    function validate () {
        console.log("RegisterView validate");
        emailInput = $('#username')[0];
        passwordInput = $('#password');
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

    function register () {
        console.log("RegisterView register");
        if (validate()) {
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        }
    }

    this.el.on('load', '.scroller', scroll);
    this.el.on('click', '#backButton', back);
    this.el.on('click', '#registerButton', register);
}

// inherit View
RegisterView.prototype = new View();
// correct the constructor pointer because it points to View
RegisterView.prototype.constructor = RegisterView;
// set super class
RegisterView.prototype.parent = View.prototype;
