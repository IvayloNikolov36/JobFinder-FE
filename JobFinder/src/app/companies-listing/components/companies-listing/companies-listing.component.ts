import { Component, Signal } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CompanyListing } from '../../models/company-listing.model';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jf-companies-listing',
  templateUrl: './companies-listing.component.html',
  standalone: false
})
export class CompaniesListingComponent {

  companies!: Signal<CompanyListing[]>;

  constructor(private companiesService: CompaniesService) {
    this.companies = toSignal(this.companiesService.getAll(), { initialValue: [] });
   }
}
