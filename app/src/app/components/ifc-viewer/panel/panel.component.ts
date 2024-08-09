// custom-panel.component.ts
import {Component, OnInit} from '@angular/core';
import * as OBC from "@thatopen/components";
import * as WEBIFC from "web-ifc";
import {IfcViewerService} from "../ifc-viewer.service";

interface PanelSectionUIState {
  label: string;
  counter: number;
}

@Component({
  selector: 'ifc-viewer-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
})
export class PanelComponent implements OnInit{
  statelessPanelSection = this.createStatelessPanelSection();
  statefulPanelState: PanelSectionUIState = {
    label: 'Stateful Panel Section',
    counter: 0,
  };
  expanded = false;


  toggleExpand() {
    this.expanded = !this.expanded;
    // Logic to expand/collapse the properties table
  }

  copyAsTSV() {
    // Implement functionality to copy data as TSV
  }

  updateQuery(query: string) {
    // Update search query for properties table
  }

  excludedCats = [
    WEBIFC.IFCTENDONANCHOR,
    WEBIFC.IFCREINFORCINGBAR,
    WEBIFC.IFCREINFORCINGELEMENT,
  ];

  components: OBC.Components
  fragments: OBC.FragmentsManager
  fragmentIfcLoader: OBC.IfcLoader

  constructor(private ifcViewerService: IfcViewerService) {
    this.components = new OBC.Components();
    this.fragments = this.components.get(OBC.FragmentsManager);
    this.fragmentIfcLoader = this.components.get(OBC.IfcLoader);
  }

  async ngOnInit() {
    await this.fragmentIfcLoader.setup();

    for (const cat of this.excludedCats) {
      this.fragmentIfcLoader.settings.excludedCategories.add(cat);
    }

    this.fragmentIfcLoader.settings.webIfc.COORDINATE_TO_ORIGIN = true;
  }

  updateStatefulPanelSection(state: Partial<PanelSectionUIState>) {
    this.statefulPanelState = { ...this.statefulPanelState, ...state };
  }

  async loadIfc() {
    const file = await fetch(
      "https://thatopen.github.io/engine_components/resources/small.ifc",
    );
    const data = await file.arrayBuffer();
    const buffer = new Uint8Array(data);
    const model = await this.fragmentIfcLoader.load(buffer);
    model.name = "example";
    this.ifcViewerService.model = model;
    //world.scene.three.add(model);
  }

  createStatelessPanelSection() {
    return `
      <bim-panel-section label="Stateless Panel Section">
        <bim-color-input label="Color"></bim-color-input>
      </bim-panel-section>
    `;
  }

  onUpdateBtnClick() {
    let { counter } = this.statefulPanelState;
    counter++;
    if (counter >= 5) {
      this.updateStatefulPanelSection({
        label: 'Powered Stateful Panel Section 💪',
        counter,
      });
    } else {
      this.updateStatefulPanelSection({ counter });
    }
  }
}
