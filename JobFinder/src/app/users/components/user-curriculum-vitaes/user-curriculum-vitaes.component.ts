import { Component, OnDestroy, OnInit } from '@angular/core';
import { CurriculumVitaesService } from '../../services/curriculum-vitaes.service';
import { CvListing } from '../../models/cv';
import { ToastrService } from 'ngx-toastr';
import { Modal } from 'bootstrap';
import { Subscription } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'jf-user-curriculum-vitaes',
  templateUrl: './user-curriculum-vitaes.component.html',
  standalone: false
})
export class UserCurriculumVitaesComponent implements OnInit, OnDestroy {

  cvs: CvListing[] = [];
  cvName: string | null = null;
  cvId: string | null = null;
  deleteModal: Modal | null = null;
  subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['name', 'createdOn', 'actions'];

  constructor(
    private cvService: CurriculumVitaesService,
    private toaster: ToastrService
  ) { }

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

  deleteCv(id: string, name: string, modalElement: any): void {
    this.cvName = name;
    this.cvId = id;

    this.deleteModal = new Modal(modalElement);
    this.deleteModal.show();
  }

  onDeleteCv = (): void => {
    if (!this.cvId) {
      return;
    }

    const deleteSubscription: Subscription = this.cvService
      .delete(this.cvId)
      .subscribe({
        next: () => {
          this.cvs = [...this.cvs.filter(cv => cv.id !== this.cvId)];
          this.toaster.success(`CV ${this.cvName} is deleted successfully.`);
        },
        error: (error: HttpErrorResponse) => {
          this.toaster.error(error.error);
        },
        complete: () => {
          this.deleteModal?.hide();
        }
      });

    this.subscriptions.push(deleteSubscription);
  }

  onCancelDeletion = (): void => {
    this.deleteModal?.hide();
  }
}
