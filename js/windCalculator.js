/**
 * Created by Maxim Moinat.
 */

require(['lib/knockout-3.4.2', 'model/WindEvent'], function (ko, WindEvent) {
    var input = [
        {"name": "100m",        "a":-0.0449, "b":-0.0042, "cp":0.009459, "default":9.58},
        {"name": "200m",        "a":0.090, "b":-0.010,  "default":19.19},
        {"name": "100mH",       "a":0.093, "b":-0.010,  "default":12.20},
        {"name": "110mH",       "a":0.093, "b":-0.010,  "default":12.80},
        {"name": "Long Jump",   "a":-0.029, "b":0, "default":8.95},
        {"name": "Triple Jump", "a":-0.069, "b":-0.009,  "default":18.29}
    ];

    appViewModel = function appViewModel() {
        this.events = ko.observableArray();
        for(var i in input) {
            this.events.push(new WindEvent(input[i]));
        }

        this.windRaw = ko.observable(0);

        this.wind = ko.pureComputed(function() {
            return this.windRaw()/10;
        },this);

        this.windDisplay = ko.computed(function() {
            var wind = this.wind().toFixed(1);
            if (this.wind() >= 0) {
                return "+" + wind;
            }
            return wind;
        },this);

        this.wind.subscribe(function(wind) {
            ko.utils.arrayForEach(this.events(), function(windEvent) {
                windEvent.wind(wind);
            });
        }, this);
    };

    ko.applyBindings(new appViewModel());
});