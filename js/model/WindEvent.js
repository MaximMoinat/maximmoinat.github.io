/**
 * Created by Maxim on 31-10-2017.
 */
define(['lib/knockout-3.4.2'], function(ko) {
    return function (data) {
        var self = this;
        this.name = data.name;
        this.a = data.a;
        this.b = data.b;

        this.performance = ko.observable(data.default);

        this.wind = ko.observable(0);

        this.correction = ko.computed(function() {
            return this.a * this.wind() + this.b * (this.wind() ^ 2);
        },this);

        this.performanceZero = ko.computed(function() {
            return Number(this.performance()) + this.correction();
        },this);

        this.performanceZeroRounded = ko.computed(function() {
            return this.performanceZero().toFixed(2);
        },this);

        this.maxPerformanceLegal = ko.computed(function() {
            var correctionZeroToTwo = this.a * 2 + this.b * (2 ^ 2);
            return this.performanceZero() - correctionZeroToTwo;
        },this);

        this.maxLegalPerformanceRounded = ko.computed(function() {
            return this.maxPerformanceLegal().toFixed(2);
        },this);

    };
});