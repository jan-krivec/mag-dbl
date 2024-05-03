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
  public selectedView: string = 'factory';
  public views: string[] = ['factory', 'agents'];

  constructor(private tokenFactoryService: TokenFactoryService) { };

  changeView(value: string) {
    this.selectedView = value;
  }

}
