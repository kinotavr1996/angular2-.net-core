"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var validator_property_model_1 = require("../../../model/validator-property.model");
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return CustomInputComponent; }),
    multi: true
};
var CustomInputComponent = (function () {
    function CustomInputComponent() {
        this.disabled = false;
        // The internal data model
        this.innerValue = '';
        // Placeholders for the callbacks which are later providesd
        // by the Control Value Accessor
        this.onTouchedCallback = Function;
        this.onChangeCallback = Function;
    }
    Object.defineProperty(CustomInputComponent.prototype, "value", {
        // get accessor
        get: function () {
            return this.innerValue;
        },
        // set accessor including call the onchange callback
        set: function (v) {
            if (v !== this.innerValue) {
                this.innerValue = v;
                this.onChangeCallback(v);
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(CustomInputComponent.prototype, "placeholderValue", {
        get: function () {
            return this.placeholder;
        },
        enumerable: true,
        configurable: true
    });
    // Set touched on blur
    CustomInputComponent.prototype.onBlur = function () {
        this.onTouchedCallback();
    };
    // From ControlValueAccessor interface
    CustomInputComponent.prototype.writeValue = function (value) {
        if (value !== this.innerValue) {
            this.innerValue = value;
        }
    };
    // From ControlValueAccessor interface
    CustomInputComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    // From ControlValueAccessor interface
    CustomInputComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    return CustomInputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomInputComponent.prototype, "type", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomInputComponent.prototype, "name", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomInputComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomInputComponent.prototype, "placeholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CustomInputComponent.prototype, "page", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", validator_property_model_1.ValidationPropertyModel)
], CustomInputComponent.prototype, "validator", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CustomInputComponent.prototype, "disabled", void 0);
CustomInputComponent = __decorate([
    core_1.Component({
        selector: 'custom-input',
        templateUrl: './input.component.html',
        styleUrls: ['./input.component.less',
            './input-shared/input-for-admin-add-popup.less',
            './input-shared/input-for-login.less',
            './input-shared/input-for-admin-details.less'],
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
    })
], CustomInputComponent);
exports.CustomInputComponent = CustomInputComponent;
//# sourceMappingURL=input.component.js.map