import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {


  profileForm = this.fb.group({
    name: [''],
    address: this.fb.group({
      street: [''],
      zip: ['']
    }),
  });
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.profileForm.value.name);
  }

}
