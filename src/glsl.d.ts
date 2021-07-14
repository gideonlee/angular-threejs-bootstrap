// Declare a module to read OpenGL Shading Language (.glsl)
// Read directly as a string since that's what THREE.ShaderMaterial({ fragmentShader: string, vertexShader: string }) is expecting
declare module '*.glsl' {
  const value: string; 
  export default value;
}