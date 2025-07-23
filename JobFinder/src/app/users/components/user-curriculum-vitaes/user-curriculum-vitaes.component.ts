import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurriculumVitaesService } from '../../services/curriculum-vitaes.service';
import { CvListing } from '../../models/cv';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jf-user-curriculum-vitaes',
  templateUrl: './user-curriculum-vitaes.component.html',
  standalone: false
})
export class UserCurriculumVitaesComponent implements OnInit, OnDestroy {

  cvs: CvListing[] = [];
  cvId: string | null = null;
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['name', 'createdOn', 'actions'];

  constructor(private cvService: CurriculumVitaesService) { }

  ngOnInit(): void {
    const subscription: Subscription = this.cvService.getAllMine()
      .subscribe((data: CvListing[]) => {
        this.cvs = data;
      });
    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => {
      subscription.unsubscribe();
    });
  }
}
