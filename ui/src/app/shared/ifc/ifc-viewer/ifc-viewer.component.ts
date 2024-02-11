import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as OBC from 'openbim-components';
import * as THREE from 'three';

@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrl: './ifc-viewer.component.css'
})
export class IfcViewerComponent implements OnInit, AfterViewInit{
  // fragments: OBC.FragmentManager;
  // fragmentIfcLoader: OBC.FragmentIfcLoader;
  components: OBC.Components |null;
  scene: any;
  grid: OBC.SimpleGrid | null;
  container: any;

  @ViewChild('viewerContainer')
  viewerContainer!: ElementRef;



  constructor() {
    this.container = null;
    this.components = null;
    // this.fragments = new OBC.FragmentManager(this.components);
    // this.fragmentIfcLoader = new OBC.FragmentIfcLoader(this.components);
    // this.fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    // this.fragmentIfcLoader.settings.wasm = {
    //   path: "https://unpkg.com/web-ifc@0.0.46/",
    //   absolute: true
    // };
    this.grid = null;
    this.scene = null;
  }

 ngOnInit() {
 }

 ngAfterViewInit() {
   this.container = this.viewerContainer.nativeElement;
   this.components = new OBC.Components();
   this.components.scene = new OBC.SimpleScene(this.components);
   this.components.renderer = new OBC.SimpleRenderer(this.components, this.container);
   this.components.camera = new OBC.SimpleCamera(this.components);
   this.components.raycaster = new OBC.SimpleRaycaster(this.components);

   this.grid = new OBC.SimpleGrid(this.components);

   const x = new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2);
   (this.components.renderer as OBC.SimpleRenderer).resize(x);
   this.components.init();

   this.scene = this.components.scene.get();
   const geometry = new THREE.BoxGeometry(3, 3, 3);
   const material = new THREE.MeshStandardMaterial({ color: "red" });
   const cube = new THREE.Mesh(geometry, material);
   cube.position.set(0, 1.5, 0);
   this.scene.add(cube);

   const directionalLight = new THREE.DirectionalLight();
   directionalLight.position.set(5, 10, 3);
   directionalLight.intensity = 0.5;
   this.scene.add(directionalLight);

   const ambientLight = new THREE.AmbientLight();
   ambientLight.intensity = 0.5;
   this.scene.add(ambientLight);
 }

  // async loadIfcAsFragments() {
  //   const file = await fetch('../../../resources/small.ifc');
  //   const data = await file.arrayBuffer();
  //   const buffer = new Uint8Array(data);
  //   const model = await this.fragmentIfcLoader.load(buffer, "example");
  //   scene.add(model);
  // }
}
