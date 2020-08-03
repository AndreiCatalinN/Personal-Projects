import {AbstractControl, ValidatorFn} from '@angular/forms';

export class NumberValidators {
  static range(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      //if something is wrong
      if (
        control.value !== null &&
        (isNaN(control.value) || control.value < min || control.value > max)
      ) {
        return { range: true };
      }
      return null; // if valid
    };
  }

  static emailMatch(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const email = control.get('email');
    const confirm = control.get('confirmEmail');

    if (email.pristine || confirm.pristine) {
      return null;
    }
    if (email.value === confirm.value) {
      return null;
    }
    return { match: true };
  }
}
