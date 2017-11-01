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

        this.correction = ko.pureComputed(function() {
            return this.a * this.wind() + this.b * Math.pow(this.wind(), 2);
        },this);

        this.performanceZero = ko.pureComputed(function() {
            return Number(this.performance()) + this.correction();
        },this);

        this.maxPerformanceLegal = ko.pureComputed(function() {
            var correctionZeroToTwo = this.a * 2 + this.b * (2 ^ 2);
            return this.performanceZero() - correctionZeroToTwo;
        },this);

        this.performanceZeroDisplay = ko.pureComputed(function() {
            return this.getDisplayValue(this.performanceZero());
        },this);

        this.maxLegalPerformanceDisplay = ko.pureComputed(function() {
            return this.getDisplayValue(this.maxPerformanceLegal());
        },this);

        this.getDisplayValue = function(value) {
            return value.toFixed(2);
        }
    };
});