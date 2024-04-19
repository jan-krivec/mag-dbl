import { Component } from '@angular/core';
import {TokenFactoryDTO} from "./token-factory.model";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-token-factory',
  templateUrl: './token-factory.component.html'
})
export class TokenFactoryComponent {
  public tokenFactory: TokenFactoryDTO;

  constructor() { };

  onSubmit() {
    console.log(this.tokenFactory);
  }

}
