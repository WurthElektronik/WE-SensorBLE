export class Face {
    private vertix1index:number;
    private vertix2index:number;
    private vertix3index:number;

    constructor(vertix1index:number, vertix2index:number, vertix3index:number) {
        this.vertix1index = vertix1index;
        this.vertix2index = vertix2index;
        this.vertix3index = vertix3index;
    }

    getVertix1index():number {
        return this.vertix1index;
    }

    getVertix2index():number {
        return this.vertix2index;
    }

    getVertix3index():number {
        return this.vertix3index;
    }

}
