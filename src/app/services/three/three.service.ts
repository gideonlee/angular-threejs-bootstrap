import { Injectable, NgZone, ElementRef } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import fragmentShader from '../../../assets/fragment-shader.glsl';
import vertexShader from '../../../assets/vertex-shader.glsl';

@Injectable({
  providedIn: 'root'
})
export class ThreeService {
  private camera?: any;
  private scene?: any;
  private renderer?: any;
  private cameraControls: any;
  private frameId: number | null = null;

  constructor(private ngZone: NgZone) { }

  // Components will call createScene to pass the canvas and begin the scene.
  public createScene(canvas?: ElementRef<HTMLCanvasElement>) {
    this.init(canvas?.nativeElement);
  }

  // Instantiates canvas.
  private init(canvas?: HTMLCanvasElement) {
    // Instantiate Scene
    this.scene = new THREE.Scene();

    // Instantiate Stable camera and position
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this.camera.position.z = 1000;

    // Instantiate renderer using provided canvas, set size to window.
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      canvas: canvas, 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight-20);

    // Set Orbit Camera Controls and disable movement.
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.cameraControls.enabled = false;

    this.sampleMesh();
  }

  // Components will call the animate function to perform renders.
  public animateScene(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== "loading") {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        })
      }

      window.addEventListener('resize', () => {
        this.resize();
      })
    })
  }

  // Render Loop
  public render() {
    this.frameId = requestAnimationFrame((n) => {
      this.render();
    })
    this.renderer.render(this.scene, this.camera);
  }

  // Resize scene to match canvas.
  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight-20;
    this.camera.aspect = width/height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  // Sphere with custom GLSL shaders.
  public sampleMesh() {
    let greenSphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32), 
      new THREE.ShaderMaterial({
        uniforms: {},
        vertexShader: vertexShader.toString(),
        fragmentShader: fragmentShader.toString()
      })
    );

    this.scene.add(greenSphere);
  }
}
