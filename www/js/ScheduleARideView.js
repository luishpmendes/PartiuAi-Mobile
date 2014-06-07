console.log("ScheduleARideView.js");

function ScheduleARideView (template) {
    View.call(this, template);

    console.log("ScheduleARideView");

    self = this;

    function origin () {
        console.log("ScheduleARideView origin");

        window.location.hash = "scheduleARideOrigin";
    }

    function destination () {
        console.log("ScheduleARideView destination");

        window.location.hash = "scheduleARideDestination";
    }

    function validate () {
        console.log("ScheduleARideView validate");

        originInput = $('#origin')[0];
        destinationInput = $('#destination')[0];
        dateInput = $('#date')[0];
        timeInput = $('#time')[0];

        if (!originInput || !destinationInput || !dateInput || !timeInput) {
            alert('ERROR!');
        } else if (originInput == "" || window.localStorage.getItem('passengerScheduleARideOriginLocation') == null) {
            alert('Selecione um local de origem!');
        } else if (destinationInput == "" || window.localStorage.getItem('passengerScheduleARideDestinationLocation') == null) {
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

    function ok () {
        console.log("ScheduleARideView ok");

        if (validate()) {
            var originLocation = JSON.parse(window.localStorage.getItem('originLocation'));
            var destinationLocation = JSON.parse(window.localStorage.getItem('destinationLocation'));
            var year = $('#date').val().split('/')[2];
            var month = $('#date').val().split('/')[1];
            var day = $('#date').val().split('/')[0];
            var hour = $('#time').val().split(':')[1];
            var minute = $('#time').val().split(':')[0];
            console.log("url: " + self.serverURL + 'api/rides/');
/*
            $.ajax({
                beforeSend: function (jqXHR, settings) {
                    $('body').addClass("loading");
                },
                crossDomain: true,
                data: {
                    orig_lat: originLocation.position.latitude, 
                    orig_long: originLocation.position.longitude, 
                    orig_address: originLocation.name, 
                    dest_lat: destinationLocation.position.latitude, 
                    dest_long: destinationLocation.position.longitude, 
                    dest_address: destinationLocation.name, 
                    date_time: year + '-' + month + '-' + day + 'T' + hour + ':' + minute + ':00.000Z', // AAAA-MM-DDTHH:mm:ss.000Z
                    offers: false,
                },
                headers: {
                    'Authorization': 'Token' + window.localStorage.getItem('app_token')
                },
                type: 'POST',
                url: self.serverURL + 'api/rides/',
            }).done(function (data, textStatus, jqXHR) {
                console.log("hitchARide done");
                console.log(data);
                console.log(textStatus);
                console.log(jqXHR);
                
                window.localStorage.setItem('app_token', data.app_token);
                window.localStorage.setItem('username', data.username);

                window.location.hash = "rideFound";
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
*/
            window.location.hash = "passengerHome";
        }
    }

    function cancel () {
        window.location.hash = "passengerHome";
    }

    this.el.on('click', '#backButton', this.back);
    this.el.on('click', '#menuButton', this.menu);
    this.el.on('click', '#logout', this.logout);
    this.el.on('click', '#origin', origin);
    this.el.on('click', '#destination', destination);
    this.el.on('click', '#ok', ok);
    this.el.on('click', '#cancel', cancel);
}

// inherit View
ScheduleARideView.prototype = new View();
// correct the constructor pointer because it points to View
ScheduleARideView.prototype.constructor = ScheduleARideView;
// set super class
ScheduleARideView.prototype.parent = View.prototype;

ScheduleARideView.prototype.load = function () {
    this.parent.load.call(this);

    console.log("ScheduleARideView load");

    $('#date').outerWidth(($('#date').parent().width() - 10) * (1/2));
    $('#time').outerWidth(($('#time').parent().width() - 10) * (1/2));

    $('#date').pickadate({
        format: 'dd/mm/yyyy'
    });
    $('#time').pickatime({
        format: 'HH:i'
    });
    
    if (window.localStorage.getItem('passengerScheduleARideOriginLocation') != null) {
        $("#origin").val(JSON.parse(window.localStorage.getItem('passengerScheduleARideOriginLocation')).name);
    }
    if (window.localStorage.getItem('passengerScheduleARideDestinationLocation') != null) {
        $("#destination").val(JSON.parse(window.localStorage.getItem('passengerScheduleARideDestinationLocation')).name);
    }
}
