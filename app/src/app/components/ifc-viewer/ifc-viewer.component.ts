import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import * as WEBIFC from "web-ifc";
import * as BUI from "@thatopen/ui";
import * as OBC from '@thatopen/components';
import * as OBCF from "@thatopen/components-front";
import Stats from 'three/examples/jsm/libs/stats.module.js';
import {IfcViewerService} from "./ifc-viewer.service";
import * as FRAGS from "@thatopen/fragments";
import {DomSanitizer} from "@angular/platform-browser";
import * as CUI from "./tables";

interface ElementPropertiesUIState {
  components: OBC.Components;
  fragmentIdMap: FRAGS.FragmentIdMap;
}

type UpdateFunction<S extends Record<string, any>> = (state?: Partial<S>) => S;

@Component({
  selector: 'app-ifc-viewer',
  templateUrl: './ifc-viewer.component.html',
  styleUrls: ['./ifc-viewer.component.css']
})
export class IfcViewerComponent implements OnInit{
  private container: HTMLElement;
  private components: OBC.Components;
  private world: any;
  private highlighter: OBCF.Highlighter;
  public attributesTable: any;
  public updateAttributesTable: UpdateFunction<any>;
  public propertiesTable: any;
  public updatePropertiesTable: UpdateFunction<any>;
  public indexer: OBC.IfcRelationsIndexer;
  public relationsTree: any;
  public fragmentsManager: OBC.FragmentsManager;




  baseStyle: Record<string, string> = {
    padding: "0.25rem",
    borderRadius: "0.25rem",
  };

  @ViewChild('table', { static: false }) tableElement!: ElementRef;
  @ViewChild('relationsTree', { static: false }) relationsTreeElement!: ElementRef;

  constructor(private el: ElementRef, private ifcViewerService: IfcViewerService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    this.container = document.getElementById("container")!;

    this.components = new OBC.Components();

    const worlds = this.components.get(OBC.Worlds);

    this.world = worlds.create<
      OBC.SimpleScene,
      OBC.SimpleCamera,
      OBCF.PostproductionRenderer
      >();

    this.world.scene = new OBC.SimpleScene(this.components);
    this.world.renderer = new OBCF.PostproductionRenderer(this.components, this.container);
    this.world.camera = new OBC.SimpleCamera(this.components);

    this.components.init();

    this.world.renderer.postproduction.enabled = true;

    this.world.camera.controls.setLookAt(12, 6, 8, 0, 0, -10);

    this.world.scene.setup();

    const grids = this.components.get(OBC.Grids);
    const grid = grids.create(this.world);
    this.world.renderer.postproduction.customEffects.excludedMeshes.push(grid.three);

    const ifcLoader = this.components.get(OBC.IfcLoader);
    await ifcLoader.setup();
    const file = await fetch(
      "https://thatopen.github.io/engine_ui-components/resources/small.ifc",
    );
    const buffer = await file.arrayBuffer();
    const typedArray = new Uint8Array(buffer);
    const model = await ifcLoader.load(typedArray);

    this.indexer = this.components.get(OBC.IfcRelationsIndexer);
    await this.indexer.process(model);
    this.world.scene.three.add(model);

    this.highlighter = this.components.get(OBCF.Highlighter);
    this.highlighter.setup({ world: this.world });
    this.highlighter.zoomToSelection = true;



    this.setPropertiesTable();
    this.setRelationsTree(model);


    this.highlighter.events['select'].onHighlight.add(async (fragmentIdMap) => {
      await this.updatePropertiesTable({ fragmentIdMap });
    });

    this.highlighter.events['select'].onClear.add(() =>
      this.updatePropertiesTable({ fragmentIdMap: {} }),
    );
  }

  onAttributesChange(e: Event) {
    const dropdown = e.target as BUI.Dropdown;
    this.updateAttributesTable({
      attributesToInclude: () => {
        const attributes: any[] = [
          ...dropdown.value,
          (name: string) => name.includes("Value"),
          (name: string) => name.startsWith("Material"),
          (name: string) => name.startsWith("Relating"),
          (name: string) => {
            const ignore = ["IsGroupedBy", "IsDecomposedBy"];
            return name.startsWith("Is") && !ignore.includes(name);
          },
        ];
        return attributes;
      },
    });
  };

  setPropertiesTable() {
    const [propertiesTable, updatePropertiesTable] = CUI.tables.elementProperties({
      components: this.components,
      fragmentIdMap: {},
    });

    this.propertiesTable = propertiesTable;
    this.updatePropertiesTable = updatePropertiesTable;

    propertiesTable.preserveStructureOnFilter = true;
    propertiesTable.indentationInText = false;

    this.tableElement.nativeElement.appendChild(this.propertiesTable);
  }

  setRelationsTree(model: any) {
    const [relationsTree] = CUI.tables.relationsTree({
      components: this.components,
      models: [model],
    });

    this.relationsTree = relationsTree;
    this.relationsTree.preserveStructureOnFilter = true;
    this.relationsTreeElement.nativeElement.appendChild(this.relationsTree);
  }

  onSearchInput(e: Event) {
    const input = e.target as BUI.TextInput;
    this.attributesTable.queryString = input.value;
  };

  onPreserveStructureChange(e: Event) {
    const checkbox = e.target as BUI.Checkbox;
    this.attributesTable.preserveStructureOnFilter = checkbox.checked;
  };

  onExportJSON() {
    this.attributesTable.downloadData("entities-attributes");
  };

  async onCopyTSV() {
    await navigator.clipboard.writeText(this.attributesTable.tsv);
    alert(
      "Table data copied as TSV in clipboard! Try to paste it in a spreadsheet app.",
    );
  };

  onTextInput(e: Event) {
    const input = e.target as BUI.TextInput;
    this.propertiesTable.queryString = input.value !== "" ? input.value : null;
  }

  expandTable(e: Event){
    const button = e.target as BUI.Button;
    this.propertiesTable.expanded = !this.propertiesTable.expanded;
    button.label = this.propertiesTable.expanded ? "Collapse" : "Expand";
  };

  copyAsTSV = async () => {
    await navigator.clipboard.writeText(this.propertiesTable.tsv);
  }

  getTableDefinition() {
    return {
      Entity: (entity) => {
        let style = {};
        if (entity === OBC.IfcCategoryMap[WEBIFC.IFCPROPERTYSET]) {
          style = {
            ...this.baseStyle,
            backgroundColor: "purple",
            color: "white",
          };
        }
        if (String(entity).includes("IFCWALL")) {
          style = {
            ...this.baseStyle,
            backgroundColor: "green",
            color: "white",
          };
        }
        return BUI.html`<bim-label style=${BUI.styleMap(style)}>${entity}</bim-label>`;
      },
      PredefinedType: (type) => {
        const colors = ["#1c8d83", "#3c1c8d", "#386c19", "#837c24"];
        const randomIndex = Math.floor(Math.random() * colors.length);
        const backgroundColor = colors[randomIndex];
        const style = { ...this.baseStyle, backgroundColor, color: "white" };
        return BUI.html`<bim-label style=${BUI.styleMap(style)}>${type}</bim-label>`;
      },
      NominalValue: (value) => {
        let style = {};
        if (typeof value === "boolean" && value === false) {
          style = { ...this.baseStyle, backgroundColor: "#b13535", color: "white" };
        }
        if (typeof value === "boolean" && value === true) {
          style = { ...this.baseStyle, backgroundColor: "#18882c", color: "white" };
        }
        return BUI.html`<bim-label style=${BUI.styleMap(style)}>${value}</bim-label>`;
      },
    };
  }

}
