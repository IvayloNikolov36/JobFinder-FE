import { Component, OnInit } from '@angular/core';
import { CompaniesService } from '../../services/companies.service';
import { CompanyListing } from '../../models/company-listing.model';

@Component({
  selector: 'jf-companies-listing',
  templateUrl: './companies-listing.component.html',
  standalone: false
})
export class CompaniesListingComponent implements OnInit {

  companies: CompanyListing[] = [];

  constructor(private companiesService: CompaniesService) { }

  ngOnInit(): void {
    this.loadCompaniesData();
  }

  private loadCompaniesData = (): void => {
    this.companiesService.getAll()
      .subscribe({
        next: (data: CompanyListing[]) => {
          this.companies = data;
          console.log(data);
        }
      });
  }
}
