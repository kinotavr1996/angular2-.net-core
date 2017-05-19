"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var validator_1 = require("./../../shared-component/validator/validator");
var validator_property_model_1 = require("./../../model/validator-property.model");
var WriterValidatior = (function (_super) {
    __extends(WriterValidatior, _super);
    function WriterValidatior(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.dateOfBirth = new validator_property_model_1.ValidationPropertyModel();
        _this.firstName = new validator_property_model_1.ValidationPropertyModel();
        _this.lastName = new validator_property_model_1.ValidationPropertyModel();
        return _this;
    }
    WriterValidatior.prototype.isDateOfBirthValid = function (control, modelProperty) {
        this._setValid(this.dateOfBirth);
        var value = this._getValue(control, modelProperty);
        if (this._validate(this.dateOfBirth, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.dateOfBirth.isValid = false;
                this.dateOfBirth.message = 'Input normal date';
            }
        }
        return this.dateOfBirth;
    };
    WriterValidatior.prototype.isFirstnameValid = function (control, modelProperty) {
        this._setValid(this.firstName);
        var value = this._getValue(control, modelProperty);
        if (this._validate(this.firstName, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.firstName.isValid = false;
                this.firstName.message = 'First name must be not empty';
            }
        }
        return this.firstName;
    };
    WriterValidatior.prototype.isLastnameValid = function (control, modelProperty) {
        this._setValid(this.lastName);
        var value = this._getValue(control, modelProperty);
        if (this._validate(this.lastName, control, modelProperty)) {
            if (!this._isNotEmptyOrWhitespace(value)) {
                this.lastName.isValid = false;
                this.lastName.message = 'Last name must be not empty';
            }
        }
        return this.lastName;
    };
    WriterValidatior.prototype.isFormValid = function () {
        this.isDateOfBirthValid(null, this.model.dateOfBirth);
        this.isFirstnameValid(null, this.model.firstName);
        this.isLastnameValid(null, this.model.lastName);
        return this.dateOfBirth.isValid && this.firstName.isValid && this.lastName.isValid;
    };
    return WriterValidatior;
}(validator_1.Validator));
exports.WriterValidatior = WriterValidatior;
//# sourceMappingURL=writer.validator.js.map