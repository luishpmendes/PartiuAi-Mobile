var LoginView = function (template) {

    self = this;

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('load', '.scroller', this.scroll);
        this.el.on('click', '#loginButton', this.login);
        this.el.on('click', '#FBloginButton', this.FBlogin);
        this.el.on('click', '#registerButton', this.register);
    };

    this.render = function() {
        this.el.html(template());
        return this;
    };

    this.load = function () {
    }

    this.scroll = function () {
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

    this.login = function () {
        var emailInput = $('#email');
        var passwordInput = $('#password');

        if (!emailInput || !passwordInput) {
            alert('ERROR!');
        } else if (!emailInput.val().match(emailInput.attr('pattern'))) {
            alert('Invalid Email!');
        } else if (passwordInput.val() == '') {
            alert('Invalid Password!');
        } else {
            var email = emailInput.val();
            var password = passwordInput.val();

            $.ajax({
                crossDomain: true,
                data: {
                    username : email,
                    password : password,
                },
                type: 'POST',
                url: 'http://www.partiuai.com.br/token/',
            }).done(function(data, textStatus, jqXHR) {
                console.log("login done");
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                window.localStorage.setItem('email') = email;
                window.localStorage.getItem('password') = password;

                window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
            }).fail(function(jqXHR, textStatus, errorThrown) {
                console.log("login fail");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);
            });
        }
    }

    this.FBlogin = function () {
        try {
            FB.login (
                function(response) {
                    console.log("FB.login response");
                    console.log(response);
                    if (response.status == 'connected') {
                        console.log("FB.login connected");
                        $.ajax({
                            crossDomain: true,
                            type: 'GET',
                            url: 'http://www.partiuai.com.br/register-by-access-token/facebook/?accessToken='+response.authResponse.accessToken
                        }).done(function(data, textStatus, jqXHR) {
                            console.log("FB.login done");
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("FB.login fail");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        });
                    }
                },
                { scope: 'basic_info,email,user_birthday,user_hometown,user_location' }
            );
        } catch (e) {
        }
    }

    this.register = function () {
        window.location.hash = 'register';
    }

    this.initialize();

}
