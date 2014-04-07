console.log("LoginView.js");

function LoginView (template) {
    View.call(this, template);

    console.log("LoginView");

    function login () {
        console.log("LoginView login");
        var usernameInput = $('#username');
        var passwordInput = $('#password');

        if (!usernameInput || !passwordInput) {
            alert('ERROR!');
        } else if (!usernameInput.val().match(usernameInput.attr('pattern'))) {
            alert('Invalid Email!');
        } else if (passwordInput.val() == '') {
            alert('Invalid Password!');
        } else {
            var username = usernameInput.val();
            var password = passwordInput.val();

            $.ajax({
                beforeSend: function (jqXHR, settings) {
                    $('body').addClass("loading");
                },
                crossDomain: true,
                data: {
                    username : username,
                    password : password,
                },
                type: 'POST',
                url: this.serverURL + 'token/',
            }).done(function (data, textStatus, jqXHR) {
                console.log("login done");
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                
                window.localStorage.setItem('app_token', data.app_token);
                window.localStorage.setItem('username', data.username);

                window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("login fail");
                console.log(jqXHR);
                console.log(textStatus);
                console.log(errorThrown);

                alert(jqXHR);

                alert("Não foi possível conectar com o servidor!");
            }).always(function (jqXHR, textStatus) {
                $('body').removeClass("loading");
            });
        }
    }

    function FBlogin () {
        console.log("LoginView FBlogin");
        try {
            FB.login (
                function(response) {
                    console.log("FB.login response");
                    console.log(response);
                    if (response.status == 'connected') {
                        console.log("FB.login connected");
                        $.ajax({
                            beforeSend: function (jqXHR, settings) {
                                $('body').addClass("loading");
                            },
                            crossDomain: true,
                            type: 'GET',
                            url: this.serverURL + 'register-by-access-token/facebook/?access_token='+response.authResponse.accessToken,
                        }).done(function(data, textStatus, jqXHR) {
                            console.log("FB.login done");
                            console.log(data);
                            window.localStorage.setItem('app_token', data.app_token);
                            window.localStorage.setItem('username', data.username);
                            console.log(textStatus);
                            console.log(jqXHR);
                            window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("FB.login fail");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);

                            alert(jqXHR);

                            alert("Não foi possível conectar com o servidor!");
                        }).always(function (jqXHR, textStatus) {
                            $('body').removeClass("loading");
                        });
                    }
                },
                { scope: 'basic_info,email,user_birthday,user_hometown,user_location' }
            );
        } catch (e) {
        }
    }

    function register () {
        console.log("LoginView register");
        window.location.hash = 'register';
    }

    this.el.on('load', '.scroller', this.scroll);
    this.el.on('click', '#loginButton', login);
    this.el.on('click', '#FBloginButton', FBlogin);
    this.el.on('click', '#registerButton', register);
}

LoginView.prototype = new View();

LoginView.prototype.constructor = LoginView;
