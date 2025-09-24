import { Component, Input } from '@angular/core';
import { CompanyListing } from '../../models/company-listing.model';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-company-card',
  templateUrl: './company-card.component.html',
  standalone: false,
})
export class CompanyCardComponent {

  @Input() company!: CompanyListing;

  constructor(private router: Router) { }

  viewCompanyDetails = (): void => {
    this.router.navigate(['companies-listing', this.company.id]);
  }
}
