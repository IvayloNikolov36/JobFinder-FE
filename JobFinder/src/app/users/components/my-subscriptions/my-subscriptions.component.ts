import { Component, OnInit } from '@angular/core';
import { SubscriptionsService } from '../../../services/subscriptions.service';
import { CompanySubscription } from '../../models';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jf-my-subscriptions',
  standalone: false,
  templateUrl: './my-subscriptions.component.html',
  styleUrl: './my-subscriptions.component.css'
})
export class MySubscriptionsComponent implements OnInit {

  companysubscriptions!: CompanySubscription[];

  constructor(
    private subscriptionsService: SubscriptionsService,
    private toastr: ToastrService) {

  }

  ngOnInit(): void {
    this.subscriptionsService.getMyCompanySubscriptions().subscribe((data: CompanySubscription[]) => {
      this.companysubscriptions = data;
    })
  }

  unsubscribe(companyId: number, companyName: string): void {
    this.subscriptionsService.unsubscribeForCompanyJobs(companyId).subscribe({
      next: () => this.toastr.success(`Successfully unsubscribed from company ${companyName}.`)
    });
  }
}
