import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CompanyAd } from '../../models';
import { LifycycleStatusEnum } from '../../enums';

@Component({
  selector: 'jf-job-ad-card',
  templateUrl: './job-ad-card.component.html',
  standalone: false,
})
export class JobAdCardComponent implements OnInit {

  @Input() jobAd!: CompanyAd;
  @Input() isEven: boolean = false;
  @Output() onClicked: EventEmitter<void> = new EventEmitter;

  cardClass: object = {};
  activeStatusId: number = LifycycleStatusEnum.Active;

  ngOnInit(): void {
    this.setCardClassStyleObject();
  }

  cardClicked(): void {
    this.onClicked.emit();
  }

  setCardClassStyleObject(): void {
    this.cardClass = {
      'me-5': this.isEven,
      'ms-5': !this.isEven,
      'white-blue-gradient': this.isEven,
      'blue-white-gradient': !this.isEven
    }
  }
}
