import { Component } from '@angular/core';
import {TokenFactoryDTO} from "./trex.model";
import {FormBuilder, Validators} from "@angular/forms";
import {TokenFactoryService} from "../../services/token-factory.service";

@Component({
  selector: '',
  templateUrl: './trex.component.html'
})
export class TrexComponent {
  public tokenFactory: TokenFactoryDTO;
  public selectedView: string = 'Claim Topics Registry';
  public views: string[] = ['Factory', 'Agents', 'Identity Registry', 'Claim Topics Registry'];

  constructor(private tokenFactoryService: TokenFactoryService) { };

  changeView(value: string) {
    this.selectedView = value;
  }

}
