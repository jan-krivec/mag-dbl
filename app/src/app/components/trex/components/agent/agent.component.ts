import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html'
})
export class AgentComponent {

  agentTypes = ["Identity", "Token", "DBL",]

  constructor() { };

  editAgentForm= new FormGroup({
    agentAddress: new FormControl('', [Validators.required]),
    agentType: new FormControl('', [Validators.required])
  });

  onSubmit(event: any) {
    console.log(event);
  }

}
