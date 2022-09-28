import { Injectable } from '@angular/core';
import fragmentShaderSrc from '../../assets/fragment-shader.glsl';
import vertexShaderSrc from '../../assets/vertex-shader.glsl';
import { SensorModel } from '../Sensors/SensorModel/SensorModel';
import { Face } from '../WebGL/Face';
import { Vertex } from '../WebGL/Vertex';
import { mat4 } from 'gl-matrix';


@Injectable({
  providedIn: 'root'
})
export class WebglService {

  constructor() { }
  private _renderingContext: RenderingContext;
  private programInfo:any;
  private facesbuffer:WebGLBuffer;
  private vertexbuffer:WebGLBuffer;
  private colorbuffer:WebGLBuffer;
  private projectionMatrix = mat4.create();
  private modelViewMatrix = mat4.create();
  private productmatrix = mat4.create();
  private get gl(): WebGLRenderingContext {
    return this._renderingContext as WebGLRenderingContext;
  }
  private get clientCanvas(): Element {
    return this.gl.canvas as Element
  }

  initialiseWebGLContext(canvas: HTMLCanvasElement): WebGLRenderingContext {
    this._renderingContext = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!this.gl) {
      alert('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }

    this.setWebGLCanvasDimensions(canvas);
    this.initialiseWebGLCanvas();

    let shaderProgram = this.initializeShaders();

    this.programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: this.gl.getAttribLocation(
          shaderProgram,
          'position'
        ),
        vertexColor: this.gl.getAttribLocation(shaderProgram, 'aColor'),
      },
      uniformLocations: {
        matrix: this.gl.getUniformLocation(
          shaderProgram,
          'matrix'
        ),
      },
    };

    this.drawsensor(0,0,0,false);

    return this.gl;
  }

  setWebGLCanvasDimensions(canvas: HTMLCanvasElement) {
    // set width and height based on canvas width and height - good practice to use clientWidth and clientHeight
    this.gl.canvas.width = canvas.clientWidth;
    this.gl.canvas.height = canvas.clientHeight;
  }

  initialiseWebGLCanvas() {
    // Set clear colour to black, fully opaque
    this.gl.clearColor(0.0, 0.0, 0.0, 0.0);
    // Enable depth testing
    this.gl.enable(this.gl.DEPTH_TEST);
    // Near things obscure far things
    this.gl.depthFunc(this.gl.LEQUAL);
    // Clear the colour as well as the depth buffer.
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

  }

  private determineShaderType(shaderMimeType: string): number {
    if (shaderMimeType) {
      if (shaderMimeType === 'x-shader/x-vertex') {
        return this.gl.VERTEX_SHADER;
      } else if (shaderMimeType === 'x-shader/x-fragment') {
        return this.gl.FRAGMENT_SHADER;
      } else {
        console.log('Error: could not determine the shader type');
      }
    }
    return -1;
  }

  private loadShader(shaderSource: string, shaderType: string): WebGLShader {
    const shaderTypeAsNumber = this.determineShaderType(shaderType);
    if (shaderTypeAsNumber < 0) {
      return null;
    }
    // Create the gl shader
    const glShader = this.gl.createShader(shaderTypeAsNumber);
    // Load the source into the shader
    this.gl.shaderSource(glShader, shaderSource);
    // Compile the shaders
    this.gl.compileShader(glShader);
    // Check the compile status
    const compiledShader = this.gl.getShaderParameter(
      glShader,
      this.gl.COMPILE_STATUS
    );
    return this.checkCompiledShader(compiledShader) ? glShader : null;
  }

  private checkCompiledShader(compiledShader: any): boolean {
    if (!compiledShader) {
      // shader failed to compile, get the last error
      const lastError = this.gl.getShaderInfoLog(compiledShader);
      console.log("couldn't compile the shader due to: " + lastError);
      this.gl.deleteShader(compiledShader);
      return false;
    }
    return true;
  }

  initializeShaders(): WebGLProgram {
    // 1. Create the shader program
    let shaderProgram = this.gl.createProgram();
    // 2. compile the shaders
    const compiledShaders = [];
    let fragmentShader = this.loadShader(
      fragmentShaderSrc,
      'x-shader/x-fragment'
    );
    let vertexShader = this.loadShader(
      vertexShaderSrc,
      'x-shader/x-vertex'
    );
    compiledShaders.push(fragmentShader);
    compiledShaders.push(vertexShader);
    // 3. attach the shaders to the shader program using our WebGLContext
    if (compiledShaders && compiledShaders.length > 0) {
      for (let i = 0; i < compiledShaders.length; i++) {
        const compiledShader = compiledShaders[i];
        if (compiledShader) {
          this.gl.attachShader(shaderProgram, compiledShader);
        }
      }
    }
    // 4. link the shader program to our gl context
    this.gl.linkProgram(shaderProgram);
    // 5. check if everything went ok
    if (!this.gl.getProgramParameter(shaderProgram, this.gl.LINK_STATUS)) {
      console.log(
        'Unable to initialize the shader program: ' +
          this.gl.getProgramInfoLog(shaderProgram)
      );
    }
    // 6. return shader
    return shaderProgram;
  }

  setsensormodel(model:SensorModel){

    //each vertex needs 4 bytes rgba
    let facearray = new Uint16Array(model.getfaceslist().length * 3);
    for(let i=0;i<model.getfaceslist().length;i++){
      let face:Face = model.getfaceslist()[i];
      facearray[3*i] = face.getVertix1index();
      facearray[3*i+1] = face.getVertix2index();
      facearray[3*i+2] = face.getVertix3index();
    }

    let vertexarray = new Float32Array(model.getverticeslist().length * 3);
    let colorsarray = new Float32Array(model.getverticeslist().length * 4);
    for(let i=0;i<model.getverticeslist().length;i++){
      let vertex:Vertex = model.getverticeslist()[i];
      vertexarray[3*i] = vertex.getX();
      vertexarray[3*i+1] = vertex.getY();
      vertexarray[3*i+2] = vertex.getZ();
      colorsarray[4*i] = vertex.getmaterial().getR();
      colorsarray[4*i+1] = vertex.getmaterial().getG();
      colorsarray[4*i+2] = vertex.getmaterial().getB();
      colorsarray[4*i+3] = 1.0;
    }

    this.facesbuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.facesbuffer);
    this.gl.bufferData(
      this.gl.ELEMENT_ARRAY_BUFFER,
      facearray,
      this.gl.STATIC_DRAW
    );

    this.vertexbuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexbuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      vertexarray,
      this.gl.STATIC_DRAW
    );

    this.colorbuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorbuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      colorsarray,
      this.gl.STATIC_DRAW
    );

  }


  resizeWebGLCanvas() {
    const width = this.clientCanvas.clientWidth;
    const height = this.clientCanvas.clientHeight;
    if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
      this.gl.canvas.width = width;
      this.gl.canvas.height = height;
    }
  }

  updateWebGLCanvas(offset:boolean) {
    this.initialiseWebGLCanvas();
    this.projectionMatrix = mat4.create();
    mat4.frustum(
      this.projectionMatrix,
      -1,1,
      -1,1,
      1,10
    );
    this.modelViewMatrix = mat4.create();
    if(offset){
      mat4.lookAt(
        this.modelViewMatrix,
        new Float32Array([0,3,0]),
        new Float32Array([0,0,0]),
        new Float32Array([-1,0,0])
      );
    }else{
      mat4.lookAt(
        this.modelViewMatrix,
        new Float32Array([3,0,0]),
        new Float32Array([0,0,0]),
        new Float32Array([0,1,0])
      );
    }
  }

  bindVertexPosition() {
    const bufferSize = 3;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 3 * 4;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexbuffer);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexPosition,
      bufferSize,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexPosition);
  }

  bindVertexColor() {
    const bufferSize = 4;
    const type = this.gl.FLOAT;
    const normalize = false;
    const stride = 4 * 4;
    const offset = 0;
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorbuffer);
    this.gl.vertexAttribPointer(
      this.programInfo.attribLocations.vertexColor,
      bufferSize,
      type,
      normalize,
      stride,
      offset
    );
    this.gl.enableVertexAttribArray(this.programInfo.attribLocations.vertexColor);
  }

  drawsensor(x:number, y:number , z:number, offset:boolean) {
    this.resizeWebGLCanvas();
    this.updateWebGLCanvas(offset);

    this.bindVertexPosition();
    this.bindVertexColor();

    this.gl.useProgram(this.programInfo.program);

    mat4.multiply(this.productmatrix,this.projectionMatrix,this.modelViewMatrix);

    mat4.rotate(this.productmatrix,this.productmatrix,z,new Float32Array([0.0,0.0,1.0]));
    mat4.rotate(this.productmatrix,this.productmatrix,x,new Float32Array([1.0,0.0,0.0]));
    mat4.rotate(this.productmatrix,this.productmatrix,y,new Float32Array([0.0,1.0,0.0]));

    this.gl.uniformMatrix4fv(
      this.programInfo.uniformLocations.matrix,
      false,
      this.productmatrix
    );
  }

  updateViewport() {
    if (this.gl) {
      this.gl.viewport(
        0,
        0,
        this.gl.drawingBufferWidth,
        this.gl.drawingBufferHeight
      );
      this.initialiseWebGLCanvas();
    } else {
      alert(
        'Error! WebGL has not been initialised! Ignoring updateViewport() call...'
      );
    }
  }


}

