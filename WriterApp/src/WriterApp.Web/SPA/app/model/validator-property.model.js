"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ValidationPropertyModel = (function () {
    function ValidationPropertyModel(isValid, message) {
        if (isValid === void 0) { isValid = true; }
        if (message === void 0) { message = ''; }
        this.isValid = isValid;
        this.message = message;
    }
    return ValidationPropertyModel;
}());
exports.ValidationPropertyModel = ValidationPropertyModel;
//# sourceMappingURL=validator-property.model.js.map