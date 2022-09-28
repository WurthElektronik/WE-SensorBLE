import { Material } from "./Material";

export class Vertex {
    private x:number;
    private y:number;
    private z:number;
    private mat:Material;
    constructor(x:number, y:number, z:number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setmaterial(mat:Material){
        this.mat = mat;
    }

    getmaterial():Material{
       return this.mat;
    }

    getX():number {
        return this.x;
    }

    getY():number {
        return this.y;
    }

    getZ():number {
        return this.z;
    }


}
