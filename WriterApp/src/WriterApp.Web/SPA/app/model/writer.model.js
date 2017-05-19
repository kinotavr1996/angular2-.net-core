"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WriterModel = (function () {
    function WriterModel(id, fullName, dateOfBirth, biography) {
        this.id = id;
        this.fullName = fullName;
        this.dateOfBirth = dateOfBirth;
        this.biography = biography;
    }
    WriterModel.fromJSON = function (object) {
        return new WriterModel(object['id'], object['fullName'], object['dateOfBirth'], object['biography']);
    };
    WriterModel.fromJSONArray = function (array) {
        return array.map(function (obj) { return WriterModel.fromJSON(obj); });
    };
    return WriterModel;
}());
exports.WriterModel = WriterModel;
//# sourceMappingURL=writer.model.js.map