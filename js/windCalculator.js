/**
 * Created by Maxim Moinat.
 */

require(['lib/knockout-3.4.2'], function(ko) {
    appViewModel = function appViewModel() {
        this.events = ko.observableArray([{'name':'100m'},{'name':'200m'},{'name':'110mH'},{'name':'Long Jump'},{'name':'Triple Jump'}]);
    };
    ko.applyBindings(new appViewModel());
});