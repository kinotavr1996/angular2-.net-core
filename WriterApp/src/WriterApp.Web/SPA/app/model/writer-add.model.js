"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WriterAddModel = (function () {
    function WriterAddModel(firstName, lastName, dateOfBirth, biography) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.dateOfBirth = dateOfBirth;
        this.biography = biography;
    }
    WriterAddModel.fromJSON = function (object) {
        return new WriterAddModel(object['firstName'], object['lastName'], object['dateOfBirth'], object['biography']);
    };
    WriterAddModel.fromJSONArray = function (array) {
        return array.map(function (obj) { return WriterAddModel.fromJSON(obj); });
    };
    return WriterAddModel;
}());
exports.WriterAddModel = WriterAddModel;
//# sourceMappingURL=writer-add.model.js.map