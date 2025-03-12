import { Component, OnInit } from '@angular/core';
import { BasicModel } from '../../../models';
import { NomenclatureService } from '../../../core/services';
import { Observable } from 'rxjs';
import { SubscriptionsService } from '../../../services';

@Component({
  selector: 'jf-jobs-subscription',
  templateUrl: './jobs-subscription.component.html',
  standalone: false
})
export class JobsSubscriptionComponent implements OnInit {

  reccuringTypes$!: Observable<BasicModel[]>;

  constructor(
    private nomenclatureService: NomenclatureService,
    private subscriptionService: SubscriptionsService
  ) { }

  ngOnInit(): void {
    this.reccuringTypes$ = this.nomenclatureService.getReccuringTypes();
  }
}
