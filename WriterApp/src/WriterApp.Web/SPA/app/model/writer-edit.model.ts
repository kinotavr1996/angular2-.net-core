export class WriterEditModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: Date,
        public biography: string
    ) { }

    static fromJSON(object: any): WriterEditModel {
        return new WriterEditModel(
            object['firstName'],
            object['lastName'],
            object['dateOfBirth'],
            object['biography']
        );
    }
    static fromJSONArray(array: Array<Object>): WriterEditModel[] {
        return array.map(obj => WriterEditModel.fromJSON(obj));
    }
}
