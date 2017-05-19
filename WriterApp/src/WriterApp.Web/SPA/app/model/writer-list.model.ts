import { WriterModel } from './writer.model';
export class WriterListModel {
    constructor(
        public filter: string,
        public column: string,
        public direction: string,
        public hasNextPage: boolean,
        public hasPrePage: boolean,
        public pageSize: number,
        public totalPage: number,
        public page: number,
        public writerModel: WriterModel[]
    ) { }

    static fromJSON(object: any): WriterListModel {
        return new WriterListModel(
            object['filter'],
            object['order']['column'],
            object['order']['direction'],
            object['hasNextPage'],
            object['hasPreviousPage'],
            object['pageSize'],
            object['totalPages'],
            object['page'],
            WriterModel.fromJSONArray(object['items'])
        );
    }

    static fromJSONArray(array: Array<Object>): WriterListModel[] {
        return array.map(obj => WriterListModel.fromJSON(obj));
    }
}
