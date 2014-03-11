var LoginView = function (template) {

    self = this;

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('load', '.content', this.scroll);
        this.el.on('click', '#loginButton', this.login);
        this.el.on('click', '#FBloginButton', this.FBlogin);
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
/*
            var jqxhr = $.ajax({
                crossDomain: true,
                data: {
                    email : email,
                    password : password,
                },
                type: 'POST',
                url: 'http://www.partiuai.com.br/login/',
            }).done(function(data, textStatus, jqXHR) {
                window.localStorage.setItem('email') = email;
                window.localStorage.getItem('password') = password;

                window.location.replace('main.html#home'); /* current page will NOT be saved in session history 
            }).fail(function(jqXHR, textStatus, errorThrown) {
            });
*/
            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
        }
    }

    this.FBlogin = function () {
        try {
            FB.login(
                function(response) {
                    if (response.status == 'connected') {
                        alert(response);
                        alert(response.authResponse);
                        alert(response.authResponse.accessToken);
                        window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
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
