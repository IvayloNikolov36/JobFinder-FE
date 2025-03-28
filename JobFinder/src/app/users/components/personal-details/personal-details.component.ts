import { Component, EventEmitter, input, Input, InputSignal, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BasicModel } from '../../../core/models';
import { PersonalDetails } from '../../../shared/models';

@Component({
  selector: 'jf-personal-details',
  templateUrl: './personal-details.component.html',
  standalone: false
})
export class PersonalDetailsComponent implements OnInit {

  countries: InputSignal<BasicModel[]> = input.required<BasicModel[]>();
  citizenships: InputSignal<BasicModel[]> = input.required<BasicModel[]>();
  genderOptions: InputSignal<BasicModel[]> = input.required<BasicModel[]>();
  @Input() isEditMode: boolean = false;
  @Input() personalDetailsData: PersonalDetails | null = null;
  @Output() emitPersonalDetails: EventEmitter<PersonalDetails> = new EventEmitter<PersonalDetails>();

  personalInfoForm!: FormGroup;
  countryControl: FormControl<any> = new FormControl();

  readonly emailPattern: RegExp = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  emitData(): void {
    this.emitPersonalDetails.emit(this.personalInfoForm.value);
  }

  compareFn = (first: BasicModel, second: BasicModel): boolean => {
    return first && second ? first.id === second.id : first === second;
  }

  private initializeForm(): void {
    const controlls = {
      id: [0, []],
      firstName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      middleName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      gender: [null, [Validators.required]],
      birthdate: ['', [Validators.required]],
      citizenship: [null, [Validators.required]],
      country: [null, [Validators.required]],
      city: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(30)]]
    };

    this.personalInfoForm = this.formBuilder.group(controlls);

    if (this.personalDetailsData) {
      this.personalInfoForm.setValue(this.personalDetailsData);
    }
  }
}
