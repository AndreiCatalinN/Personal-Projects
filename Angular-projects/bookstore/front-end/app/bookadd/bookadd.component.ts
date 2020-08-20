import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bookadd',
  templateUrl: './bookadd.component.html',
  styleUrls: ['./bookadd.component.css']
})
export class BookaddComponent implements OnInit {

  bookForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bookForm = this.fb.group({
      isbn: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required]),
      author: new FormControl('', [Validators.required]),
      description: new FormControl(''),
      genre: new FormControl('', [Validators.required]),
      publication_year: new FormControl(''),
      publisher: new FormControl('', [Validators.required]),
      book_image: new FormControl('', )
    });
  }

  onSubmit() {
    // perform some checking for sql injection and other characters
    console.log(this.bookForm);
    console.log('submitted');
  }


}
