"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PagerService = (function () {
    function PagerService() {
    }
    PagerService.prototype.range = function (start, count) {
        return Array.apply(0, Array(count))
            .map(function (element, index) {
            return index + start;
        });
    };
    PagerService.prototype.getPager = function (currentPage, pageSize, totalPages) {
        if (currentPage === void 0) { currentPage = 1; }
        if (pageSize === void 0) { pageSize = 5; }
        var startPage = 1, endPage;
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = startIndex + pageSize;
        var pages = this.range(startPage, totalPages);
        return {
            currentPage: currentPage,
            pageSize: pageSize,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    };
    return PagerService;
}());
exports.PagerService = PagerService;
//# sourceMappingURL=paginator.component.js.map