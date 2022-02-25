import { Injectable, NgZone, ElementRef } from '@angular/core';
import * as THREE from 'three';
import * as dat from 'dat.gui';
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
  private time: number = 0; 

  private material: THREE.ShaderMaterial = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
  })

  private settings: any;
  private gui: any;

  constructor(private ngZone: NgZone) { }

  // Components will call createScene to pass the canvas and begin the scene.
  public createScene(canvas?: ElementRef<HTMLCanvasElement>) {
    this.init(canvas?.nativeElement);
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

  // Instantiates canvas.
  private init(canvas?: HTMLCanvasElement) {
    // Instantiate Scene
    this.scene = new THREE.Scene();

    // Instantiate Stable camera and position
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000 );
    this.camera.position.z = 1;

    // Instantiate renderer using provided canvas, set size to window.
    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      canvas: canvas, 
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight-20);

    // Set Orbit Camera Controls and disable movement.
    this.cameraControls = new OrbitControls(this.camera, this.renderer.domElement);
    this.cameraControls.enabled = false;

    // Testing Control
    this.settingsControl();

    this.sampleMesh();
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

  // Testing Environment Control
  public settingsControl() {
    this.settings = {
      scale: 1,
      progress: 1,
    };

    this.gui = new dat.GUI();
    this.gui.add(this.settings, "scale", -5, 5, 0.01);
    this.gui.add(this.settings, "progress", 0, 1, 0.01);
  }
}
