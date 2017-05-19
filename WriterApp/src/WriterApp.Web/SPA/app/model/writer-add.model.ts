export class WriterAddModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public biography: string
    ) { }

    static fromJSON(object: any): WriterAddModel {
        return new WriterAddModel(
            object['firstName'],
            object['lastName'],
            object['dateOfBirth'],
            object['biography']
        );
    }
    static fromJSONArray(array: Array<Object>): WriterAddModel[] {
        return array.map(obj => WriterAddModel.fromJSON(obj));
    }
}
