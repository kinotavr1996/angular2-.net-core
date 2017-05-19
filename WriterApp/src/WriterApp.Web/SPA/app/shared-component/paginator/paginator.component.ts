export class PagerService {
    range(start, count) {
        return Array.apply(0, Array(count))
            .map(function (element, index) {
                return index + start;
            });
    }
    getPager(currentPage: number = 1, pageSize: number = 5, totalPages: number) {

        let startPage: number = 1, endPage: number;
        let startIndex = (currentPage - 1) * pageSize;
        let endIndex = startIndex + pageSize;
        let pages = this.range(startPage, totalPages);

        return {
            currentPage: currentPage,
            pageSize: pageSize,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
}