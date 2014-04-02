console.log("HomeView.js");

function HomeView (template) {
    View.call(this, template);

    console.log("HomeView");

    function menu () {
        console.log("HomeView menu");
        $('#menu').toggle('fast');
    }

    function logout () {
        console.log("HomeView logout");
        if (navigator.notification) {
            navigator.notification.confirm (
                'Deseja mesmo sair?',
                function (x) {
                    if (x == 1) {
                        $.ajax({
                            beforeSend: function (jqXHR, settings) {
                                $('body').addClass("loading");
                            },
                            crossDomain: true,
                            headers: {
                                'Authorization': 'Token' + window.localStorage.getItem('app_token')
                            },
                            type: 'GET',
                            url: 'http://www.partiuai.com.br/accounts/logout/',
                        }).done(function(data, textStatus, jqXHR) {
                            console.log("FB.login done");
                            console.log(data);
                            console.log(textStatus);
                            console.log(jqXHR);
                            window.localStorage.clear();
                            window.location.replace('main.html'); /* current page will NOT be saved in session history */
                        }).fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("FB.login fail");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                        }).always(function (jqXHR, textStatus) {
                            $('body').removeClass("loading");
                        });

                        window.localStorage.clear();
/*
                        try {
                            FB.logout(function(response) {

                            });
                        } catch (e) {
                        }
*/
                    }
                },
                'Partiu Aí'
            );
        } else {
            if (confirm('Deseja mesmo sair?')) {
                $.ajax({
                    beforeSend: function (jqXHR, settings) {
                        $('body').addClass("loading");
                    },
                    crossDomain: true,
                    headers: {
                        'Authorization': 'Token' + window.localStorage.getItem('app_token')
                    },
                    type: 'GET',
                    url: 'http://www.partiuai.com.br/accounts/logout/',
                }).done(function(data, textStatus, jqXHR) {
                    console.log("FB.login done");
                    console.log(data);
                    console.log(textStatus);
                    console.log(jqXHR);
                    window.localStorage.clear();
                    window.location.replace('main.html'); /* current page will NOT be saved in session history */
                }).fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("FB.login fail");
                    console.log(jqXHR);
                    console.log(textStatus);
                    console.log(errorThrown);
                }).always(function (jqXHR, textStatus) {
                    $('body').removeClass("loading");
                });
/*
                try {
                    FB.logout(function(response) {

                    });
                } catch (e) {
                }
*/
            }
        }
    }

    function hitchARide () {
        console.log("HomeView hitchARide");
        window.location.hash = "hitchARide";
    }

    this.el.on('click', '#menuButton', menu);
    this.el.on('click', '#logout', logout);
    this.el.on('click', '#hitchARideButton', hitchARide);
}

// inherit View
HomeView.prototype = new View();
// correct the constructor pointer because it points to View
HomeView.prototype.constructor = HomeView;
// set super class
HomeView.prototype.parent = View.prototype;
