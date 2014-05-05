console.log("View.js");

function View (template) {
    console.log("View");

    self = this;

    this.template = template;
    this.serverURL = 'http://www.partiuai.com.br/';
    //this.serverURL = 'http://127.0.0.1:8000/';
    this.el = $('<div/>');

    this.scroll = function () {
        console.log("View scroll");
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

    this.back = function () {
        console.log("View back");
        history.go(-1);
    }

    this.menu = function () {
        console.log("View menu");
        $('#menu').toggle('fast');
    }

    this.logout = function () {
        console.log("View logout");
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
                            url: self.serverURL + 'logout/',
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
                    url: this.serverURL + 'logout/',
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
}

View.prototype.render = function() {
    console.log("View render");
    this.el.html(this.template());
    return this;
};

View.prototype.load = function () {
    console.log("View load");

    $('.quarter').each(function (index) {
        $(this).outerWidth($(this).parent().width() * (1/4));
    });

    $('.half').each(function (index) {
        $(this).outerWidth($(this).parent().width() * (1/2));
    });

    $('.three-quarters').each(function (index) {
        $(this).outerWidth($(this).parent().width() * (3/4));
    });

    $('.third').each(function (index) {
        $(this).outerWidth($(this).parent().width() * (1/3));
    });

    $('.two-thirds').each(function (index) {
        $(this).outerWidth($(this).parent().width() * (2/3));
    });

    $('.full').each(function (index) {
        $(this).outerWidth($(this).parent().width());
    });

    $('.vCenter').each(function (index) {
        $(this).css('top', $(this).parent().height()/2);
        $(this).css('margin-top', -$(this).outerHeight()/2);
    });
}
