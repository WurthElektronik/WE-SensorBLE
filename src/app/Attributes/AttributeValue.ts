export class AttributeValue {
    private timestamp:number;
    private data:any;

    constructor(timestamp:number,data:any) {
        this.timestamp = timestamp;
        this.data = data;
    }

    getTimestamp():number {
        return this.timestamp;
    }

    getData():any {
        return this.data;
    }

    setData(data:any) {
        this.data = data;
    }
}
