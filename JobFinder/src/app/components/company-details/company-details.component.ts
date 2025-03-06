import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SubscriptionsService } from '../../services';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'jf-company-details',
  standalone: false,
  templateUrl: './company-details.component.html',
  styleUrl: './company-details.component.css'
})
export class CompanyDetailsComponent implements OnInit {

  id!: number;

  constructor(
    private route: ActivatedRoute,
    private subscriptionService: SubscriptionsService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.id = parseInt(params['id']);
    });
  }

  subscribeForCompanyJobs = (): void => {
    this.subscriptionService.subscribeForCompanyJobs(this.id)
      .subscribe({
        next: () => this.toastr.success('You are subscribed for job advertisements from this company.')
      });
  }
}
