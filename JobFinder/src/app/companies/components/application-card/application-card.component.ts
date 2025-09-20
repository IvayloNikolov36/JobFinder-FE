import { Component, Input, OnInit } from '@angular/core';
import { JobApplicationInfo } from '../../models';
import { Router } from '@angular/router';

@Component({
  selector: 'jf-application-card',
  templateUrl: './application-card.component.html',
  standalone: false
})
export class ApplicationCardComponent implements OnInit {

  @Input() data!: JobApplicationInfo;
  @Input() isEven: boolean = false;

  cardClass: object = {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.setCardClassStyleObject();
  }

  openCvPreview = (cvId: string, jobAdId: number): void => {
    this.router.navigate([`my-ads/${jobAdId}/cv/${cvId}/preview`]);
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
