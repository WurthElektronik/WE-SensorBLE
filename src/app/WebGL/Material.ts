export class Material {
    private matname:string;
    private r:number;
    private g:number;
    private b:number;

    constructor(matname:string, r:number, g:number, b:number) {
        this.matname = matname;
        this.r = r;
        this.g = g;
        this.b = b;
    }

    getR():number {
        return this.r;
    }

    getG():number {
        return this.g;
    }

    getB():number {
        return this.b;
    }

}
