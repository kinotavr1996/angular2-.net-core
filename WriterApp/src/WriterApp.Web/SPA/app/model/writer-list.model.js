"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var writer_model_1 = require("./writer.model");
var WriterListModel = (function () {
    function WriterListModel(filter, column, direction, hasNextPage, hasPrePage, pageSize, totalPage, page, writerModel) {
        this.filter = filter;
        this.column = column;
        this.direction = direction;
        this.hasNextPage = hasNextPage;
        this.hasPrePage = hasPrePage;
        this.pageSize = pageSize;
        this.totalPage = totalPage;
        this.page = page;
        this.writerModel = writerModel;
    }
    WriterListModel.fromJSON = function (object) {
        return new WriterListModel(object['filter'], object['order']['column'], object['order']['direction'], object['hasNextPage'], object['hasPreviousPage'], object['pageSize'], object['totalPages'], object['page'], writer_model_1.WriterModel.fromJSONArray(object['items']));
    };
    WriterListModel.fromJSONArray = function (array) {
        return array.map(function (obj) { return WriterListModel.fromJSON(obj); });
    };
    return WriterListModel;
}());
exports.WriterListModel = WriterListModel;
//# sourceMappingURL=writer-list.model.js.map