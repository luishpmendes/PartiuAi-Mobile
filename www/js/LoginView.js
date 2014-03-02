var LoginView = function (template) {

    self = this;

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('ready', this.scroll);
        this.el.on('click', '#loginButton', this.login);
        this.el.on('click', '#registerButton', this.register);

        if(window.localStorage['email'] != undefined && window.localStorage['password'] != undefined) {
            var email = window.localStorage['email'];
            var password = window.localStorage['password'];

            self.auth(email, password);
        }
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
        var emailInput = $('#email');
        var passwordInput = $('#password');

        if (!emailInput || !passwordInput) {
            alert('ERROR!');
        } else if (!emailInput.val().match(emailInput.pattern)) {
            alert('Invalid Email!');
        } else if (passwordInput.val() == '') {
            alert('Invalid Password!');
        } else {
            var email = emailInput.val();
            var password = passwordInput.val();

            self.auth(email, password);
        }
    }

    this.auth = function (email, password) {
        var jqxhr = $.ajax({
            crossDomain: true,
            data: {
                email : email,
                password : password,
            },
            type: 'POST',
            url: 'http://partiuai.com.br/login/',
        }).done(function(data, textStatus, jqXHR) {
            alert("Done! data: " + data + " textStatus: " + textStatus + " jqXHR: " + jqXHR);

            window.localStorage['email'] = email;
            window.localStorage['password'] = password;

            window.location.replace('index.html#home'); /* current page will NOT be saved in session history */
        }).fail(function(jqXHR, textStatus, errorThrown) {
            alert("Fail! jqXHR: " + jqXHR + " textStatus: " + textStatus + " errorThrown: " + errorThrown);
        });
    }

    function FBlogin() {
        FB.login(
            function(response) {
                if (response.session) {
                    alert('logged in');
                } else {
                    alert('not logged in');
                }
            },
            {
                scope: 'email'
            }
        );
    }

    this.register = function () {
        window.location.hash = 'register';
    }
 
    this.initialize();

}
