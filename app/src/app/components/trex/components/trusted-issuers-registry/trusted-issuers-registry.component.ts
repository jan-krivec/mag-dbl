import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrexFactoryService} from "../../../../services/trex-factory.service";

@Component({
  selector: 'app-trusted-issuers-registry',
  templateUrl: './trusted-issuers-registry.component.html'
})
export class TrustedIssuersRegistryComponent implements OnInit, AfterViewInit{

  trustedIssuers: string[] = [];

  addTrustedIssuerGroup = new FormGroup({
    address: new FormControl('', [Validators.required]),
    addClaimTopic: new FormControl(null, [Validators.required]),
    claimTopics: new FormControl([], [Validators.required])
  });

  get tiClaimTopics(): number[] {
    return this.addTrustedIssuerGroup.get('claimTopics').value
  }

  set tiClaimTopics(value: number[]) {
    this.addTrustedIssuerGroup.get('claimTopics').setValue(value);
  }

  constructor(private trexFactoryService: TrexFactoryService) { };

  addTrustedIssuerForm= new FormGroup({
    topic: new FormControl(null, [Validators.required])
  });

  removeTrustedIssuerForm= new FormGroup({
    topic: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this.trexFactoryService.checkIsConected();
  }

  ngAfterViewInit() {
    this.getTrustedIssuers();
  }

  addClaimTopic() {
    if (this.addTrustedIssuerGroup.get('addClaimTopic').value) {
      this.tiClaimTopics = [... this.tiClaimTopics, this.addTrustedIssuerGroup.get('addClaimTopic').value];
      this.addTrustedIssuerGroup.get('addClaimTopic').setValue(null);
    }
  }

  async getTrustedIssuers() {
    this.trustedIssuers = await this.trexFactoryService.getTrustedIssuers();
  }

  async isTrustedIssuer() {
    await this.trexFactoryService.isTrustedIssuer();
  }

  async getTrustedIssuerClaimTopics(address: string) {
    this.trustedIssuers = await this.trexFactoryService.getTrustedIssuerClaimTopics(address);
  }

  async addTrustedIssuer() {
    await this.trexFactoryService.addTrustedIssuer(this.addTrustedIssuerGroup.get('address').value, this.addTrustedIssuerGroup.get('claimTopics').value);
  }

  async removeTrustedIssuer(address: string) {
    await this.trexFactoryService.removeTrustedIssuer(address);
  }

  deleteClaimTopic(claimTopic: number) {
    this.tiClaimTopics = this.tiClaimTopics.filter(x => x !== claimTopic);
  }

}
