import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  linkedIn(){
    window.open("https://www.linkedin.com/in/sagar-reddy-guvvala-a76612176/");
  }
}
