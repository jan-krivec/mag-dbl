import { Component } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-identity-registry',
  templateUrl: './identity-registry.component.html'
})
export class IdentityRegistryComponent {

  checkGroup = new FormGroup({
    check: new FormControl('', [Validators.required])
  })

  getGroup = new FormGroup({
    get: new FormControl('', [Validators.required])
  })

  isVerifiedGroup = new FormGroup({
    isVerified: new FormControl('', [Validators.required])
  })


  constructor() { };

  editAgentForm= new FormGroup({
    agentAddress: new FormControl('', [Validators.required]),
    agentType: new FormControl('', [Validators.required])
  });

  check() {

  }

  get() {

  }

  isVerified() {

  }

}
