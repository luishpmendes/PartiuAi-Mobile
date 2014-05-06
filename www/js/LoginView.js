console.log("LoginView.js");

function LoginView (template) {
    View.call(this, template);

    console.log("LoginView");

    self = this;

    function FBlogin () {
        console.log("LoginView FBlogin");
        try {
            FB.login (
                function(response) {
                    console.log("FB.login response");
                    console.log(response);
                    if (response.status == 'connected') {
                        console.log("FB.login connected");
                        console.log(self.serverURL + 'register-by-access-token/facebook/?access_token=');
                        console.log(response.authResponse.accessToken);
                        $.ajax({
                            beforeSend: function (jqXHR, settings) {
                                $('body').addClass("loading");
                            },
                            crossDomain: true,
                            type: 'GET',
                            url: self.serverURL + 'register-by-access-token/facebook/?access_token='+response.authResponse.accessToken,
                        }).done(function(data, textStatus, jqXHR) {
                            console.log("FB.login done");
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            window.localStorage.setItem('app_token', data.app_token);
                            window.localStorage.setItem('username', data.username);
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
            console.log("LoginView FBlogin catch");
            console.log(e);
        }
    }

    this.el.on('click', '#FBloginButton', FBlogin);
}

LoginView.prototype = new View();

LoginView.prototype.constructor = LoginView;

