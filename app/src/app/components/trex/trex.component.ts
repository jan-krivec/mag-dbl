import { Component } from '@angular/core';
import {TokenFactoryDTO} from "./trex.model";
import {FormBuilder, Validators} from "@angular/forms";
import {TrexFactoryService} from "../../services/trex-factory.service";

@Component({
  selector: '',
  templateUrl: './trex.component.html'
})
export class TrexComponent {
  public tokenFactory: TokenFactoryDTO;
  public selectedView: string = 'Claim Topics Registry';
  public views: string[] = ['Factory', 'Agents', 'Identity Registry', 'Claim Topics Registry', 'Trusted Issuers Registry'];

  constructor() { };

  changeView(value: string) {
    this.selectedView = value;
  }

}
