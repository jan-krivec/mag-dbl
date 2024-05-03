import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TokenFactoryService} from "../../../../services/token-factory.service";

@Component({
  selector: 'app-token-factory',
  templateUrl: './token-factory.component.html'
})
export class TokenFactoryComponent {

  agentTypes = ["Identity", "Token", "DBL",]

  constructor() {

  };

  editAgentForm= new FormGroup({
    agentAddress: new FormControl('', [Validators.required]),
    agentType: new FormControl('', [Validators.required])
  });

  onSubmit(event: any) {
    console.log(event);
  }

}
