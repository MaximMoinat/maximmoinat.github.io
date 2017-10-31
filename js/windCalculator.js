/**
 * Created by Maxim Moinat.
 */

require(['lib/knockout-3.4.2', 'model/WindEvent'], function (ko, WindEvent) {
    var input = [
        {'name': '100m',        'a':0.071, 'b':-0.0042, 'default':9.61},
        {'name': '200m',        'a':0.090, 'b':-0.010, 'default':19.19},
        {'name': '100/110mH',   'a':0.093, 'b':-0.010, 'default':11.71},
        {'name': 'Long Jump',   'a':0.032, 'b':-0.0012, 'default':8.96},
        {'name': 'Triple Jump', 'a':0.069, 'b':-0.009, 'default':17.88}
    ];

    appViewModel = function appViewModel() {
        this.events = ko.observableArray();
        for(var i in input) {
            this.events.push(new WindEvent(input[i]));
        }

        this.wind = ko.observable(0);
        this.wind.subscribe(function(wind) {
            ko.utils.arrayForEach(this.events(), function(windEvent) {
                windEvent.wind(wind);
            });
        }, this);
    };

    ko.applyBindings(new appViewModel());
});