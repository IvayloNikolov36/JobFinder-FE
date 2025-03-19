import { AbstractControl, FormGroup } from '@angular/forms';

// Custom validator to check whether max value is greater than or equal to the min value

export function GreaterThanOrEqual(minValueControlName: string, maxValueControlName: string) {

  return (formGroup: FormGroup) => {

    const minValueControl: AbstractControl<any, any> = formGroup.controls[minValueControlName];
    const maxValueControl: AbstractControl<any, any> = formGroup.controls[maxValueControlName];

    if (maxValueControl.errors && !maxValueControl.errors?.['greaterThanOrEqual']) {
      // return if another validator has already found an error on the maxValueControl
      return;
    }

    // set error on maxValueControl if validation fails
    if (maxValueControl.value < minValueControl.value) {
      maxValueControl.setErrors({ greaterThanOrEqual: true });
    } else {
      maxValueControl.setErrors(null);
    }
  };
}
