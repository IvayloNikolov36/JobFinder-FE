import { Component, Input } from '@angular/core';
import { CompanyListing } from '../../models/company-listing.model';

@Component({
  selector: 'jf-company-card',
  templateUrl: './company-card.component.html',
  standalone: false,
})
export class CompanyCardComponent {

  @Input() company!: CompanyListing;
}
