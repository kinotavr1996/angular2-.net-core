"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WriterEditModel = (function () {
    function WriterEditModel(firstName, lastName, dateOfBirth, biography) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.biography = biography;
    }
    WriterEditModel.fromJSON = function (object) {
        return new WriterEditModel(object['firstName'], object['lastName'], object['dateOfBirth'], object['biography']);
    };
    WriterEditModel.fromJSONArray = function (array) {
        return array.map(function (obj) { return WriterEditModel.fromJSON(obj); });
    };
    return WriterEditModel;
}());
exports.WriterEditModel = WriterEditModel;
//# sourceMappingURL=writer-edit.model.js.map