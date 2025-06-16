import { Component, Input } from '@angular/core';
import { AnonymousProfileListingModel } from '../../models';

@Component({
  selector: 'jf-related-anonymous-profiles-listing',
  templateUrl: './related-anonymous-profiles-listing.component.html',
  standalone: false
})
export class RelatedAnonymousProfilesListingComponent {

  @Input() anonymousProfilesData: AnonymousProfileListingModel[] | undefined;
  @Input() jobAdId!: number;

  readonly displayedColumns: string[] = ['id', 'activateDate', 'actions'];
}
