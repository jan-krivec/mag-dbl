import {AfterViewInit, Component, OnDestroy} from '@angular/core';
import * as dat from 'three/examples/jsm/libs/lil-gui.module.min';
import * as WEBIFC from "web-ifc";
import * as OBC from "openbim-components";


@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrls: ['./ifc-viewer.component.css']
})
export class IfcViewerComponent implements AfterViewInit, OnDestroy{

  components: any;
  fragments: any;
  fragmentIfcLoader: any;
  toolbar: any;
  scene: any
  mainToolbar: any;

  container: any;

  constructor() {

  }


  ngAfterViewInit() {
    this.container = document.getElementById('viewer-container');

    this.components = new OBC.Components();
    this.components.scene = new OBC.SimpleScene(this.components);
    this.components.renderer = new OBC.SimpleRenderer(this.components, this.container);
    this.components.camera = new OBC.SimpleCamera(this.components);
    this.components.raycaster = new OBC.SimpleRaycaster(this.components);
    this.components.init();

    this.components.scene.setup();

    this.toolbar = new OBC.Toolbar(this.components);
    this.components.ui.addToolbar(this.toolbar);

    // this.fragments = new OBC.FragmentManager(this.components);
    this.fragmentIfcLoader = new OBC.FragmentIfcLoader(this.components);

    // this.fragmentIfcLoaderSetup();


    this.scene = this.components.scene.get();
    const grid = new OBC.SimpleGrid(this.components);


    this.mainToolbar = new OBC.Toolbar(this.components, {name: 'Main Toolbar', position: 'bottom'});
    this.components.ui.addToolbar(this.mainToolbar);
    const ifcButton = this.fragmentIfcLoader.uiElement.get("main");
    this.mainToolbar.addChild(ifcButton);

    const gui = new dat.GUI();



    // const boxMaterial = new THREE.MeshStandardMaterial({ color: '#6528D7' });
    // const boxGeometry = new THREE.BoxGeometry(3, 3, 3);
    // const cube = new THREE.Mesh(boxGeometry, boxMaterial);
    // cube.position.set(0, 1.5, 0);
    // this.scene.add(cube);



  }

  ngOnDestroy() {
    this.disposeFragments();
  }

  fragmentIfcLoaderSetup() {
    this.fragmentIfcLoader.setup();

    const excludedCats = [
      WEBIFC.IFCTENDONANCHOR,
      WEBIFC.IFCREINFORCINGBAR,
      WEBIFC.IFCREINFORCINGELEMENT,
    ];
    for (const cat of excludedCats) {
      this.fragmentIfcLoader.settings.excludedCategories.add(cat);
    }

    this.fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
    this.fragmentIfcLoader.settings.webIfc.OPTIMIZE_PROFILES = true;
  }

  disposeFragments() {
    this.fragments.dispose();
  }
}
