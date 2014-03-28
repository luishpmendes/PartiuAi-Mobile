var HomeView = function (template) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '#menuButton', this.menu);
        this.el.on('click', '#logout', this.logout);
        this.el.on('click', '#hitchARideButton', this.hitchARide);
    }

    this.render = function() {
        this.el.html(template());
        return this;
    }

    this.menu = function () {
        $('#menu').toggle('fast');
    }

    this.logout = function () {
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

    this.hitchARide = function () {
        window.location.hash = "hitchARide";
    }
 
    this.initialize();

}
