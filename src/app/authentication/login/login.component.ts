import { Component, OnInit, NgZone, OnDestroy, AfterViewInit } from '@angular/core';
import {ViewChild, ElementRef} from '@angular/core';
import { AuthUser, SERVERCONFIG } from 'src/app/_shared/model/app.constant';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { AuthenticationServiceService } from '../authentication-service.service';
import { GoogleLogin, GoogleLoginResult, RegisterUser, LoginUser } from 'src/app/_shared/model/resume-builder';
import { AuthGuard } from 'src/app/_shared/helpers/auth-guard.service';
import { ActivatedRoute, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { HeaderComponent } from 'src/app/@core/header/header.component';
import { MenuItem, MessageService, ConfirmationService } from 'primeng/api';
import { NgForm } from '@angular/forms';
import { HomeComponent } from 'src/app/home/home.component';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit ,AfterViewInit ,OnDestroy{

  @ViewChild('loginRef',{static:true}) loginElement:ElementRef;
  auth2:any
  authUser:any;
  API_BACKEND = `${SERVERCONFIG.BACKEND}/api`;
  languageSubmitted:boolean;
  @ViewChild('signupForm') signupForm:NgForm;
  user:AuthUser;
  returnUrl:any;
  items: MenuItem[];
  activeItem: MenuItem;
  loginSubmitted:boolean;
  signupSubmitted:boolean;
  loginComponent:boolean=true;
  signupComponent:boolean;
  googleLogin:GoogleLogin;
  googleLoginResult:GoogleLoginResult;
  registerUser:RegisterUser;
  loginuser:LoginUser;
  passwordNotMatched: boolean;
  otp: any;
  errors: any={};
  otpCheck: boolean;
  invalidOTP: boolean;
  registerBtnEnabled: boolean;
  generatedOtp: any;
  isOTPSent: boolean;
  clickedSignUp: boolean;
  isSubmittedForOtp: boolean;
  isProgress:boolean;
  loginDisabled: boolean;
  simpleName = 123;

  constructor(
    private http: HttpClient,
     private authenticationService: AuthenticationServiceService,
     private authGuard: AuthGuard,
     private Activatedroute: ActivatedRoute,
     private router: Router,
     private zone: NgZone,
     private authService: AuthService,
     private headercomponent: HeaderComponent,
     private messageService:MessageService,
     private homeComponent:HomeComponent,
     private confirmationService: ConfirmationService) { 
    this.authUser = new AuthUser();
    this.registerUser=new RegisterUser;
    this.googleLogin=new GoogleLogin;
    this.googleLoginResult=new GoogleLoginResult;
    this.loginuser=new LoginUser;
  }
  ngAfterViewInit(): void {
    
  }
  ngOnDestroy() {
    this.authService.islogincomponent=false;
    this.headercomponent.logincomponent=false;
  }

  ngOnInit(): void {
    this.loginComponent=true;
    this.checkReload();
    this.checkAuth();
    this.authService.islogincomponent=true;
    this.headercomponent.logincomponent=true;
    this.returnUrl = this.Activatedroute.snapshot?.queryParams['returnUrl'] || '/';
    this.googleInitialize();
    this.setLoginPanel();
    }
    
getVarName(obj: object):any {
    const keys = Object.keys(obj);
    console.log("keys",keys);
    // console.assert(keys.length == 1, 'key count must be 1');
    return keys[0];
}

    setLoginPanel(){
      this.items = [
        {label: 'Login', command: (event) => {
          this.login();
      }},
        {label: 'Signup', command: (event) => {
          this.signup();}}
    ];
    
    this.activeItem = this.items[0];
    }

    login():void{
      this.signupComponent=false;
      this.loginComponent=true;
    }
    signup(){
      this.signupComponent=true;
      this.loginComponent=false;
    }
    checkReload(){
      if(this.authService.loginReload){
        window.location.reload();
      }
      else{
        this.authService.loginReload=true;
      }
    }
    forgotPassword(){
      console.log("asf");
      this.router.navigateByUrl('authentication/verify/changepassword');
    }

    loginUser(){
      if(this.loginuser.email && this.loginuser.password){
        this.isProgress=true;
        this.loginDisabled=true;
        this.authenticationService.userLogin(this.loginuser).subscribe(x=>{
          if(x){
            this.googleLoginResult=x;
            this.setAuthData(x);
            this.authService.status='Successful';
            this.authService.detail='You are logged in ';
            this.isProgress=false;
            this.loginDisabled=false;
            this.showCustomMessage('success','Success','Login Successful');
            this.router.navigateByUrl('home');
          }
        },err=>{
          console.log("err",err);
          this.showErrorCustom(err.error.error,'Please Try Again With Correct Details');
          this.loginDisabled=false;
          this.isProgress=false;
        })
      }
      else{
        console.log("login errors");
      }
    }

    setAuthData(x:any){
      this.authUser.email=x.user.email;
      this.authUser.token=x.token;
      this.authUser.username=x.user.username;
      this.authUser.first_name=x.user.first_name;
      this.authUser.last_name=x.user.last_name;
      this.authUser.id=x.user.id;
      this.authService.authUser=this.authUser;
      this.headercomponent.user=this.authUser;
      this.headercomponent.token=this.authUser.token;
      localStorage.setItem("authUser",JSON.stringify(this.authUser));
    }
    matchPassword(){
      if(this.registerUser.password && this.registerUser.password2){
        if(this.registerUser.password!=this.registerUser.password2){
          this.passwordNotMatched=true;
        }
        else this.passwordNotMatched=false;
      }
    }
    signUpUser(){
      if(this.signupForm.valid){
        this.clickedSignUp=true;
        if(this.registerUser.password ==this.registerUser.password2){
        this.authenticationService.userSignUp(this.registerUser).subscribe(x=>{
          if(x){
            this.googleLoginResult=x;
            this.setAuthData(x);
            this.authService.detail='You are logged in';
            this.authService.status='Registration Successful';
            this.router.navigateByUrl('home');
            this.showCustomMessage('success','Registration Successful','You are logged in now');
          }
        },err=>{
          this.clickedSignUp=false;
          this.showCustomMessage('Error','Failed Registration',err.error.error);
        })
    }
    else{
      this.showErrorCustom('Both Passwords must be same','Please enter same passwords in both fields');
      this.clickedSignUp=false;
    }
  }
      else{
        this.showErrorCustom('No or more Validation Errors', 'Please fill all the mandatroy fields');
      }

    }
  checkAuth(){
    if(this.authService.authUser?.token){
      console.log("token",this.authService.authUser.token);
      this.router.navigateByUrl('/home');
    }
  }

  setLoginUrlLocalStorage(){
    let loginUrl = this.Activatedroute.snapshot['_routerState'].url;
    localStorage.setItem('loginUrl',loginUrl);
  }

  googleInitialize(){
    window['googleSDKLoaded']=()=>{
      window['gapi'].load('auth2',()=>{
        this.auth2=window['gapi'].auth2.init({
          client_id: '1047473738759-g8eg7ut9u5947rce9j5e850kh4g43s48.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      })
    }
    (function(d,s,id){
      var js, fjs =d.getElementsByTagName(s)[0];
      if(d.getElementById(id)){ return;}
      js = d.createElement(s); js.id=id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js,fjs);
    }(document, 'script', 'google-jssdk'));
  }

  prepareLogin(){
      this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
        (googleUser)=>{
          this.isProgress=true;
          let profile = googleUser.getBasicProfile();
          console.log("googleUser",googleUser)
          console.log('Token ||'+googleUser.getAuthResponse().id_token);
          console.log("Image Url:"+profile.getImageUrl());
          this.bindAuthUser(googleUser);
        },(error)=>{
          alert(JSON.stringify(error, undefined, 2));
        }
        )
  }


  bindAuthUser(googleUser:any){
    let profile = googleUser.getBasicProfile();
    this.authUser.email=profile.getEmail();
    this.authUser.token=googleUser.getAuthResponse().id_token;
    let names = profile.getName().split(' ');
    this.authUser.first_name=names[0];
    this.authUser.last_name=names[1];
    let googleLogin = new GoogleLogin();
    googleLogin.email=this.authUser.email;
    googleLogin.first_name=this.authUser.first_name;
    googleLogin.last_name=this.authUser.last_name;
    googleLogin.google_token=this.authUser.token;
    this.authenticationService.googleLogin(googleLogin).subscribe(x=>{
      if(x){
        console.log("Result",x);
        this.setAuthData(x);
        this.isProgress=false;
         this.zone.run(() => {
            this.router.navigateByUrl(this.returnUrl)
         });  
      }
    },err=>{
      console.log("error",err);
    })
  }

  onNumberKeyPress(event,desc?:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 48 ) || charCode > 57)) {
      return false;
    }
    return true;
}

  navigateToApp(){
    if(this.returnUrl){
      console.log("came here return URL");
       this.router.navigate([this.returnUrl]);
    }
    else{
      this.router.navigateByUrl('/home');
    }
  }

  checkLength(desc?:any){
    switch(desc){
      case 'otp': if( this.otp && `${this.otp}`.length!=6) {
                  this.errors.otpLengthError=true;}
                  else this.errors.otpLengthError=false;
                  break;
    }
  }

  validateOTP(){
    this.otpCheck=true;
    if(this.otp ==this.generatedOtp){
      this.registerBtnEnabled=true;
      this.invalidOTP=false;
    }
    else{
      this.registerBtnEnabled=false;
      this.invalidOTP=true;
    }
  }

  generateOTPSignup(){
    if(this.signupForm.valid){
      if(this.registerUser.password ==this.registerUser.password2){
        this.isSubmittedForOtp=true;
        this.authenticationService.generateOTPSignUp(this.registerUser.email).subscribe(x=>{
          if(x){
            this.generatedOtp=x.frontcopykey;
            this.showCustomMessage('success',x.Message,x.Status);
            if(x.frontcopykey) this.isOTPSent=true;
          }
        },err=>{
           console.log("err",err);
            this.showCustomMessage('error','Failed',err.error.error);
            this.isSubmittedForOtp=false;
        })
      }  
  }
}


  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Details Saved'});
}

showInfo() {
    this.messageService.add({severity:'info', summary: 'Info', detail: 'Details Saved'});
}

showWarn() {
    this.messageService.add({severity:'warn', summary: 'Empty Value', detail: 'Please add some value to save'});
}

showError() {
    this.messageService.add({severity:'error', summary: 'One or More Validation Errors', detail: 'Please fill all mandatory fields'});
}
showErrorCustom(summary:any,detail:any) {
  setTimeout(()=>{
    this.messageService.add({severity:'error', summary:summary, detail: detail});
  },400)
}
showCustomMessage(ser:any,sum:any,det:any) {
this.messageService.add({severity:ser, summary:sum, detail:det, icon: 'pi-file'});
}
showCustom() {
    this.messageService.add({severity:'custom', summary: 'Custom', detail: 'Message Content', icon: 'pi-file'});
}
onConfirm() {
    this.messageService.clear('c');
}

onReject() {
    this.messageService.clear('c');
}

clear() {
    this.messageService.clear();
}

}


