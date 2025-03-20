import { AbstractControl, FormGroup } from "@angular/forms";

export function PairValues(firstControlName: string, secondControlName: string) {

    return (formGroup: FormGroup) => {
        debugger;

        const firstControl: AbstractControl<any, any> = formGroup.controls[firstControlName];
        const secondControl: AbstractControl<any, any> = formGroup.controls[secondControlName];

        if (secondControl.errors && !secondControl.errors?.['pairValues']) {
            // return if another validator has already found an error on the second control
            return;
        }

        if (firstControl.value && !secondControl.value) {
            secondControl.setErrors({ pairValues: true });
        } else if (!firstControl.value && secondControl.value) {
            firstControl.setErrors({ pairValues: true });
        } else {
            secondControl.setErrors(null);
        }
    };
}