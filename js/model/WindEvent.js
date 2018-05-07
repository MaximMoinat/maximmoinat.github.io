/**
 * Created by Maxim on 31-10-2017.
 */
define(['lib/knockout-3.4.2'], function(ko) {
    return function (data) {
        var self = this;
        this.name = data.name;
        this.a = data.a;
        this.b = data.b;
        this.cp = data.cp || 0;

        this.performanceIn = ko.observable(data.default);

        this.wind = ko.observable(0);

        this.correction = function(performance, wind) {
            return (this.a + this.cp * performance) * wind + this.b * Math.pow(wind, 2);
        }

        this.performanceZero = ko.pureComputed(function() {
            return Number(this.performanceIn()) + this.correction(this.performanceIn(), this.wind());
        },this);

        this.maxPerformanceLegal = ko.pureComputed(function() {
            var correctionZeroToTwo = this.correction(this.performanceIn(), 2.0);
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