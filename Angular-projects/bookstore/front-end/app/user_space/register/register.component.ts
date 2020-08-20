import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(5)]],
      firstname: [''],
      lastname: [''],
      password: ['',
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('(?=.*?[a-z])')
      ],
      email: ['', [Validators.required, Validators.email]],
      eircomCode: [''],
      phoneNumber: ['', [
        Validators.minLength(10), // 087 123 1234
        Validators.maxLength(14)] // eg: 00353 87 123 1234
      ],
      book_image: [''],
    });
  }

  onSubmit() {
    console.log(this.userForm);
    console.log('submitted');
  }
}
