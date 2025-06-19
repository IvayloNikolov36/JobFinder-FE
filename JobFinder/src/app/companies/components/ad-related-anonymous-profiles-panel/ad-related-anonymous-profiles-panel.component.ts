import { Component, Input, signal, WritableSignal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CompanyJobAdsService } from '../../services';

@Component({
  selector: 'jf-ad-related-anonymous-profiles-panel',
  templateUrl: './ad-related-anonymous-profiles-panel.component.html',
  standalone: false
})
export class AdRelatedAnonymousProfilesPanelComponent {

  @Input() jobAdId!: number;

  constructor(private jobAdsService: CompanyJobAdsService) { }

  private readonly selectedAdId: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

  readonly relatedAnonymousProfilesDataResource = rxResource({
    request: () => ({
      currentJobAdId: this.selectedAdId()
    }),
    loader: ({ request }) => {
      return this.jobAdsService.getRelatedAnonymousProfiles(request.currentJobAdId);
    }
  });

  openRelatedAnonymousProfilesPanel = (jobAdId: number) => {
    this.selectedAdId.set(jobAdId);
  }
}
