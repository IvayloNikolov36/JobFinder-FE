import { AbstractControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {

  return (formGroup: FormGroup) => {

    const control: AbstractControl<any, any> = formGroup.controls[controlName];
    const matchingControl: AbstractControl<any, any> = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
