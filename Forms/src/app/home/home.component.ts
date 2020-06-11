import {Component} from '@angular/core';

import {Employee} from "../models/employee.model";
import {FormPostService} from "../services/form-post.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})
export class HomeComponent {
  public languages =['English', 'Spanish', 'Italian' ,
    'Portuguese' , 'German' , 'French' , 'Romanian' ,
    'Bulgarian' , 'Polish' , 'Chinese' , 'Other'];

  public person: Employee = new Employee('', '', false, '', 'Other');
  constructor(private formPoster: FormPostService){}

  submitForm(form: NgForm){
    console.log(this.person);
    this.formPoster.postEmployeeForm(this.person)
      .subscribe(
        data => console.log('success', data),
        err => console.log('error', err)
      );
  }


}
