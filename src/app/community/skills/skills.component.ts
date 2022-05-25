import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  alert:boolean = false;
  email:string;
  password:string;
  myimage:string ='../../../assets/images/group-1223@1x.png';


  constructor(private router:Router) { 
  }
navigateto(){
  this.router.navigate(['/screen2']);
}
  ngOnInit(): void {
  }

}
