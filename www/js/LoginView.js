var LoginView = function (template) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('ready', this.scroll);
        this.el.on('click', '#loginButton', this.login);
        this.el.on('click', '#registerButton', this.register);
    };

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.scroll = function () {
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

    this.login = function () {
        var emailInput = $('#email')[0];
        var passwordInput = $('#password')[0];

        if (!emailInput || !passwordInput) {
            alert('ERROR!');
        } else if (!emailInput.value.match(emailInput.pattern)) {
            alert('Invalid Email!');
        } else if (passwordInput.value == '') {
            alert('Invalid Password!');
        } else {
            window.location.hash = 'home';
        }

        var email = emailInput.value;
        var password = passwordInput.value;

        var jqxhr = $.ajax({
            crossDomain: true,
            data: {
                username : email,
                password : password,
            },
            type: "POST",
            url: "http://partiuai.com.br/api-auth/login/",
        }).done(function(data, textStatus, jqXHR) {
            alert("Done! data: " + data + " textStatus: " + textStatus + " jqXHR: " + jqXHR);
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Fail! jqXHR: " + jqXHR + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
        });
    }

    this.register = function () {
        window.location.hash = 'register';
    }
 
    this.initialize();

}
