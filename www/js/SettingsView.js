var SettingsView = function (template) {

    this.initialize = function () {
        // Define a div wrapper for the view. The div wrapper is used to attach events.
        this.el = $('<div/>');
        this.el.on('click', '#backButton', this.back);
        this.el.on('click', '#logoutButton', this.logout);
    }

    this.back = function () {
        history.go(-1);
    }

    this.logout = function () {
        if (confirm("Deseja mesmo sair?")) {
            window.localStorage.clear();
            
            try {
                FB.logout(function(response) {

                });
            } catch (e) {

            }

            window.location.replace('main.html');
        }
    }

    this.render = function() {
        this.el.html(template());
        return this;
    }
 
    this.initialize();

}
