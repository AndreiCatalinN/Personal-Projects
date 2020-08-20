import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  books = [
    { title: 'art of war', description: 'desc1'},
    { title: 'prince', description: 'desc2'}
    ];

  constructor() { }

  ngOnInit(): void {}

}
