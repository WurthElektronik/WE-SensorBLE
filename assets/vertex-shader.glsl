attribute vec4 position;
uniform mat4 matrix;
attribute vec4 aColor;
varying vec4 vColor;
void main() {
    gl_Position = matrix * position;
    vColor = aColor;
}