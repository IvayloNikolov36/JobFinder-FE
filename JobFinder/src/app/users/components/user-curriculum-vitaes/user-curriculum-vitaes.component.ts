import { Component, Signal } from '@angular/core';
import { CurriculumVitaesService } from '../../services/curriculum-vitaes.service';
import { CvListing } from '../../models/cv';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'jf-user-curriculum-vitaes',
  templateUrl: './user-curriculum-vitaes.component.html',
  standalone: false
})
export class UserCurriculumVitaesComponent {

  cvs!: Signal<CvListing[]>;

  displayedColumns: string[] = ['name', 'createdOn', 'actions'];

  constructor(
    private cvService: CurriculumVitaesService) {
    this.cvs = toSignal(this.cvService.getAllMine(), { initialValue: [] });
  }
}
