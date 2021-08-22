void main() {
  // Testing environment for THREE.Points()
	//vec3 pos = position;
	//vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  //gl_PointSize = 300.0 * (1.0 / - mvPosition.z);
  //gl_Position = projectionMatrix * mvPosition;
  
	gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
