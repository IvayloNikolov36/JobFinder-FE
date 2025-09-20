import { Component, computed, Input, Signal, signal, WritableSignal } from '@angular/core';
import { CompanyAd, JobApplicationInfo } from '../../models';
import { rxResource } from '@angular/core/rxjs-interop';
import { CompanyJobAdApplicationsService } from '../../services';
import { LifycycleStatusEnum } from '../../enums';

@Component({
  selector: 'jf-ad-applications-panel',
  templateUrl: './ad-applications-panel.component.html',
  standalone: false
})
export class AdApplicationsPanelComponent {

  @Input() jobAd!: CompanyAd;

  isExpanded: boolean = false;
  activeStatus: number = LifycycleStatusEnum.Active;

  constructor(private jobAdApplicationsService: CompanyJobAdApplicationsService) { }

  private readonly jobAdId: WritableSignal<number | undefined> = signal<number | undefined>(undefined);

  readonly applicationsDataResource = rxResource({
    params: () => ({
      currentJobAdId: this.jobAdId()
    }),
    stream: ({ params }) => {
      return this.jobAdApplicationsService
        .getJobAllApplicationsData(params.currentJobAdId);
    }
  });

  applicationsData: Signal<JobApplicationInfo[]> = computed(() => this.applicationsDataResource?.value() ?? []);

  onOpenApplicationsPanel = (jobAdId: number): void => {
    this.isExpanded = true;
    this.jobAdId.set(jobAdId);
  }

  onCloseApplicationsPanel = (): void => {
    this.isExpanded = false;
  }
}
