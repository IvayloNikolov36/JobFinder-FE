import { Component, Input, signal, WritableSignal } from '@angular/core';
import { CompanyAd } from '../../models';
import { rxResource } from '@angular/core/rxjs-interop';
import { CompanyJobAdApplicationsService } from '../../services';

@Component({
  selector: 'jf-ad-applications-panel',
  templateUrl: './ad-applications-panel.component.html',
  standalone: false
})
export class AdApplicationsPanelComponent {

  @Input() jobAd!: CompanyAd;

  isExpanded: boolean = false;

  constructor(private jobAdApplicationsService: CompanyJobAdApplicationsService) { }

  private readonly jobAdId: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

  readonly applicationsDataResource = rxResource({
    request: () => ({
      currentJobAdId: this.jobAdId()
    }),
    loader: ({ request }) => {
      return this.jobAdApplicationsService
        .getJobAllApplicationsData(request.currentJobAdId);
    }
  });

  onOpenApplicationsPanel = (jobAdId: number): void => {
    this.isExpanded = true;
    this.jobAdId.set(jobAdId);
  }

  onCloseApplicationsPanel = (): void => {
    this.isExpanded = false;
  }
}
