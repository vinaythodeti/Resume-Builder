import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthUser } from '../model/app.constant';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  islogincomponent:boolean=false;
  authUser: AuthUser;
  loginReload:boolean=false;
  detail:string;
  status:string;
  constructor(private http: HttpClient,private router: Router) {
    this.authUser = new AuthUser();
    this.setLocalStorageVariables();
  }
  
  setLocalStorageVariables() {
    try {
      let data = JSON.parse(localStorage.getItem("authUser"));
      this.authUser=data;
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }


  isAuthenticated(){
    console.log("this.authUser.token",this.authUser.token)
    if(this.authUser.token) return true;
    else false;
  }
  getAuthenticatedUser(){
    this.authUser
  }


}


 
