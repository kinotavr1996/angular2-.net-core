"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var KeyValueModel = (function () {
    function KeyValueModel(key, value) {
        this.key = key;
        this.value = value;
    }
    KeyValueModel.fromJSON = function (object) {
        return new KeyValueModel(object['key'], object['value']);
    };
    KeyValueModel.fromJSONArray = function (array) {
        return array.map(function (obj) {
            return KeyValueModel.fromJSON(obj);
        });
    };
    return KeyValueModel;
}());
exports.KeyValueModel = KeyValueModel;
//# sourceMappingURL=key-value.model.js.map