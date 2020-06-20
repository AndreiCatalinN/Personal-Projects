// Libraries
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

// Locals
import { Customer } from './customer';

function emailMatch(
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

function ratingRange(min: number, max: number): ValidatorFn {
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

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {
  customer = new Customer();

  customerForm: FormGroup;
  emailMessage: string;
  confirmEmailMessage: string;
  private validationM = {
    required: 'E-mail is required',
    email: 'Please enter a valid email address',
  };

  states = [
    { prefix: '', state: 'Select a state' },
    { prefix: 'IE', state: 'Ireland' },
    { prefix: 'RO', state: 'Romania' },
    { prefix: 'UK', state: 'United Kingdom' },
    { prefix: 'DE', state: 'Denmark' },
    { prefix: 'S', state: 'Spain' },
    { prefix: 'P', state: 'Portugal' },
    { prefix: 'FR', state: 'France' },
    { prefix: 'IT', state: 'Italy' },
  ];

  get addresses(): FormArray {
    return <FormArray>this.customerForm.get('addresses');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.customerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3)]],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      emailGroup: this.fb.group(
        {
          email: ['', [Validators.required, Validators.email]],
          confirmEmail: ['', [Validators.required]],
        },
        { validator: emailMatch }
      ), // watch out for this little v
      phone: '',
      rating: [null, ratingRange(1, 5)],
      notification: 'email',
      sendCatalog: true,
      addresses: this.fb.array([this.buildAddress()]),
    });

    this.customerForm
      .get('notification')
      .valueChanges.subscribe((value) => this.setNotification(value));

    const emailControl = this.customerForm.get('emailGroup.email');
    emailControl.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((value) => this.setMessage(emailControl));

    const confirmEmailControl = this.customerForm.get(
      'emailGroup.confirmEmail'
    );
    confirmEmailControl.valueChanges.subscribe((value) =>
      this.setMessageConf(confirmEmailControl)
    );
  }

  save() {
    console.log(this.customerForm);
    console.log('Saved' + JSON.stringify(this.customerForm.value));
  }

  setNotification(setVal: string) {
    // get the phone number
    const phoneControl = this.customerForm.get('phone');
    // get value and change validators
    if (setVal === 'text') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  private setMessage(emailControl: AbstractControl): void {
    this.emailMessage = '';
    if ((emailControl.touched || emailControl.dirty) && emailControl.errors) {
      this.emailMessage = Object.keys(emailControl.errors)
        .map((key) => (this.emailMessage += this.validationM[key]))
        .join(' ');
    }
  }

  private setMessageConf(confirmEmailControl: AbstractControl) {
    this.confirmEmailMessage = '';
    if (
      (confirmEmailControl.touched || confirmEmailControl.dirty) &&
      confirmEmailControl.errors
    ) {
      this.confirmEmailMessage = Object.keys(confirmEmailControl.errors)
        .map((key) => (this.confirmEmailMessage += this.validationM[key]))
        .join(' ');
    }
  }

  buildAddress(): FormGroup {
    return this.fb.group({
      addressType: 'home',
      street1: '',
      street2: '',
      city: '',
      state: '',
      zip: '',
    });
  }

  addAddress(): void {
    this.addresses.push(this.buildAddress());
  }
}
