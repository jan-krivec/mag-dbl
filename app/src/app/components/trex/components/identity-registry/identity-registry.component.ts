import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TrexFactoryService} from "../../../../services/trex-factory.service";

@Component({
  selector: 'app-identity-registry',
  templateUrl: './identity-registry.component.html'
})
export class IdentityRegistryComponent implements OnInit{

  checkGroup = new FormGroup({
    check: new FormControl('', [Validators.required])
  })

  getGroup = new FormGroup({
    get: new FormControl('', [Validators.required])
  })

  isVerifiedGroup = new FormGroup({
    isVerified: new FormControl('', [Validators.required])
  })

  registerIdentiyGroup = new FormGroup({
    address: new FormControl('', [Validators.required])
  });

  deleteIdentiyGroup = new FormGroup({
    address: new FormControl('', [Validators.required])
  });


  constructor(private trexFactoryService: TrexFactoryService) { };

  ngOnInit() {
    this.trexFactoryService.checkIsConected();
  }

  editAgentForm= new FormGroup({
    agentAddress: new FormControl('', [Validators.required]),
    agentType: new FormControl('', [Validators.required])
  });

  check() {
    this.trexFactoryService.checkIfRegistered(this.checkGroup.get('check').value);
  }

  get() {
    this.trexFactoryService.getIdentiy(this.getGroup.get('get').value);
  }

  isVerified() {
    this.trexFactoryService.isVerified(this.isVerifiedGroup.get('isVerified').value);
  }

  registerIdentity() {
    this.trexFactoryService.registerIdentity(this.registerIdentiyGroup.get('address').value);
  }

  deleteIdentity() {
    this.trexFactoryService.deleteIdentity(this.deleteIdentiyGroup.get('address').value);
  }

}
