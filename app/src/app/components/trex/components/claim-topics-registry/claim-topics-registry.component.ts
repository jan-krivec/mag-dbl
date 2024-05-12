import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TrexFactoryService} from "../../../../services/trex-factory.service";

@Component({
  selector: 'app-claim-topics-registry',
  templateUrl: './claim-topics-registry.component.html'
})
export class ClaimTopicsRegistryComponent implements OnInit, AfterViewInit{

  claimTopics: number[] = [];

  constructor(private trexFactoryService: TrexFactoryService) { };

  addTopicForm= new FormGroup({
    topic: new FormControl(null, [Validators.required])
  });

  removeTopicForm= new FormGroup({
    topic: new FormControl(null, [Validators.required])
  });

  ngOnInit() {
    this.trexFactoryService.checkIsConected();
  }

  ngAfterViewInit() {
    this.getClaimTopics();
  }

  async getClaimTopics() {
    this.claimTopics = await this.trexFactoryService.getClaimTopics();
  }

  async addClaimTopic() {
    await this.trexFactoryService.addClaimTopic(this.addTopicForm.get('topic').value);
    this.getClaimTopics();
  }

  async removeClaimTopic() {
    await this.trexFactoryService.removeClaimTopic(this.removeTopicForm.get('topic').value);
    this.getClaimTopics();
  }
}
