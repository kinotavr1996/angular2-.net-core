"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Validator = (function () {
    function Validator() {
        this.submitted = false;
    }
    Validator.prototype.submit = function () {
        this.submitted = true;
    };
    Validator.prototype._validate = function (validationProperty, control, modelProperty) {
        this._setValid(validationProperty);
        return (control && control.touched) || this.submitted || this._isNotEmptyOrWhitespace(modelProperty);
    };
    Validator.prototype._getValue = function (control, modelProperty) {
        return control && control.value ? control.value : modelProperty;
    };
    Validator.prototype._setValid = function (obj) {
        obj.isValid = true;
        obj.message = '';
        return obj;
    };
    Validator.prototype._isNotEmptyOrWhitespace = function (value) {
        if (typeof value === 'undefined') {
            return false;
        }
        if (typeof value === 'string') {
            value = value.trim();
            return !!value && value.length > 0;
        }
        if (typeof value === 'number') {
            return !isNaN(value);
        }
        return !!value;
    };
    Validator.prototype._isMinLengthValid = function (value, min) {
        if (min === void 0) { min = 6; }
        if (typeof value === 'string') {
            value = value.trim();
            return !!value && value.length >= min;
        }
        return false;
    };
    Validator.prototype._isPhoneNumber = function (phone) {
        var phoneRegExp = /([0-9])\w/;
        return phoneRegExp.test(phone);
    };
    Validator.prototype._isEmailValid = function (email) {
        var emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return emailRegExp.test(email);
    };
    return Validator;
}());
exports.Validator = Validator;
//# sourceMappingURL=validator.js.map