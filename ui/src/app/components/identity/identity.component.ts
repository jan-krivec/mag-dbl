import { Component } from '@angular/core';
import {IdentityService} from "../../services/identity.service";

const { IdentitySDK } = require('@onchain-id/identity-sdk');

@Component({
  selector: 'app-identity',
  templateUrl: './identity.component.html',
  styleUrl: './identity.component.css'
})
export class IdentityComponent {
  constructor(private identityService: IdentityService) {
  }

  createIdentity() {
    this.identityService.createIdentity();
  }

}
