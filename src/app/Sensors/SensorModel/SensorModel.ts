import { HttpClient, HttpXhrBackend } from '@angular/common/http';
import { Face } from 'src/app/WebGL/Face';
import { Material } from 'src/app/WebGL/Material';
import { Vertex } from 'src/app/WebGL/Vertex';

export class SensorModel {
    private verticesList:Vertex[];
    private facesList:Face[];
    private materials: Map<String, Material>;

    constructor(modelname:string){
        this.materials = new Map();
        this.verticesList = [];
        this.facesList = [];
        const httpClient = new HttpClient(new HttpXhrBackend({ build: () => new XMLHttpRequest() }));
        httpClient.get(`assets/${modelname}/${modelname}.mtl`, {responseType: 'text'}).subscribe(mtldata => {
            let mtllines:string[] = mtldata.split("\n");
            var materialname:string = "";
            for(let line of mtllines){
                if(line.startsWith("newmtl ")) {
                    materialname = line.split(" ")[1];
                }else if(line.startsWith("Kd ")) {
                    let colorvalues:String[] = line.split(" ");
                    this.materials.set(materialname, new Material(materialname,Number(colorvalues[1])
                            ,Number(colorvalues[2]),Number(colorvalues[3])));
                }
            }

            httpClient.get(`assets/${modelname}/${modelname}.obj`, {responseType: 'text'}).subscribe(objdata => {
                let objlines:string[] = objdata.split("\n");
                var currmat:Material = null;
                for(let line of objlines){
                    if(line.startsWith("v ")) {
                        let coords:string[] = line.split(" "); // Split by space
                        let x:number = Number(coords[1]);
                        let y:number = Number(coords[2]);
                        let z:number = Number(coords[3]);
                        this.verticesList.push(new Vertex(x,y,z));
                    } else if(line.startsWith("f ")) {
                        let vertexIndices:string[] = line.split(" ");
                        let vertex1:number = Number(vertexIndices[1]);
                        let vertex2:number = Number(vertexIndices[2]);
                        let vertex3:number = Number(vertexIndices[3]);
                        let face:Face = new Face((vertex1 - 1),
                                (vertex2 - 1),(vertex3 - 1));
                        this.facesList.push(face);
                        this.verticesList[face.getVertix1index()].setmaterial(currmat);
                        this.verticesList[face.getVertix2index()].setmaterial(currmat);
                        this.verticesList[face.getVertix3index()].setmaterial(currmat);
                    } else if(line.startsWith("usemtl ")) {
                        currmat = this.materials.get(line.split(" ")[1]);
                    }
                }                
            });

        });
    }

    getverticeslist():Vertex[] {
        return this.verticesList;
    }

    getfaceslist():Face[]{
        return this.facesList;
    }
}
