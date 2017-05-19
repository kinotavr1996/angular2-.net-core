export class WriterModel {
    constructor(
        public id: number,
        public fullName: string,
        public dateOfBirth: Date,
        public biography: string
    ) { }

    static fromJSON(object: any): WriterModel {
        return new WriterModel(
            object['id'],
            object['fullName'],
            object['dateOfBirth'],
            object['biography']
        );
    }
    static fromJSONArray(array: Array<Object>): WriterModel[] {
        return array.map(obj => WriterModel.fromJSON(obj));
    }
}
