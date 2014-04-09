console.log("HitchARideView.js");

function HitchARideView (template) {
    View.call(this, template);

    console.log("HitchARideView");

    self = this;

    function origin () {
        console.log("HitchARideView origin");
        window.location.hash = "originLocationSelector";
    }

    function destination () {
        console.log("HitchARideView destination");
        window.location.hash = "destinationLocationSelector";
    }

    function validate () {
        console.log("HitchARideView validate");
        originInput = $('#origin')[0];
        destinationInput = $('#destination')[0];
        dateInput = $('#date')[0];
        timeInput = $('#time')[0];

        if (!originInput || !destinationInput || !dateInput || !timeInput) {
            alert('ERROR!');
        } else if (originInput == "" || window.localStorage.getItem('originLocation') == null) {
            alert('Selecione um local de origem!');
        } else if (destinationInput == "" || window.localStorage.getItem('destinationLocation') == null) {
            alert('Selecione um local de destino!');
        } else if (!dateInput.value.match(dateInput.pattern)) {
            alert('Selecione uma data válida!');
        } else if (!timeInput.value.match(timeInput.pattern)) {
            alert('Selecione um horário válido!');
        } else {
            return true;
        }
        return false;
    }

    function hitchARide () {
        console.log("HitchARideView hitchARide");

        if (validate()) {
            var originLocation = JSON.parse(window.localStorage.getItem('originLocation'));
            var destinationLocation = JSON.parse(window.localStorage.getItem('destinationLocation'));
            $.ajax({
                beforeSend: function (jqXHR, settings) {
                    $('body').addClass("loading");
                },
                crossDomain: true,
                data: {
                    orig_lat: originLocation.position.latitude, 
                    orig_long: originLocation.position.longitude, 
                    orig_address: originLocation.position.name, 
                    dest_lat: destinationLocation.position.latitude, 
                    dest_long: destinationLocation.position.longitude, 
                    dest_address: destinationLocation.position.name, 
                    date_time: null, /* AAAA-MM-DDTHH:mm:ss.000Z */
                    offers: false
                },
                type: 'POST',
                url: self.serverURL + 'rides/',
            }).done(function (data, textStatus, jqXHR) {
                console.log("hitchARide done");
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                
                window.localStorage.setItem('app_token', data.app_token);
                window.localStorage.setItem('username', data.username);

                window.location.replace('main.html#home'); /* current page will NOT be saved in session history */
            }).fail(function (jqXHR, textStatus, errorThrown) {
                console.log("hitchARide fail");
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

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#origin', origin);
    this.el.on('click', '#destination', destination);
    this.el.on('click', '#hitchARideButton', hitchARide);
}

// inherit View
HitchARideView.prototype = new View();
// correct the constructor pointer because it points to View
HitchARideView.prototype.constructor = HitchARideView;
// set super class
HitchARideView.prototype.parent = View.prototype;

HitchARideView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("HitchARideView load");

    $('#date').outerWidth(($('#date').parent().width() - 10) * (1/2));
    $('#time').outerWidth(($('#time').parent().width() - 10) * (1/2));

    $('#date').pickadate({
        format: 'dd/mm/yyyy'
    });
    $('#time').pickatime({
        format: 'HH:i'
    });
    
    if (window.localStorage.getItem('originLocation') != null) {
        $("#origin").val(JSON.parse(window.localStorage.getItem('originLocation')).name);
    }
    if (window.localStorage.getItem('destinationLocation') != null) {
        $("#destination").val(JSON.parse(window.localStorage.getItem('destinationLocation')).name);
    }
}
