import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticationModes } from 'src/app/_shared/model/app.constant';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForOf } from '@angular/common';
import { NgForm } from '@angular/forms';
import { ForgotPassword } from 'src/app/_shared/model/resume-builder';
import { HomeComponent } from 'src/app/home/home.component';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthenticationServiceService } from '../authentication-service.service';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss']
})
export class VerificationComponent implements OnInit {

  email:any;
  @ViewChild('verifyForm') verifyForm:NgForm;
  @ViewChild('emailForm') emailform:NgForm;
  mode:string;
  isOTPSent:boolean;
  authenticationModes:typeof AuthenticationModes=AuthenticationModes;
  forgotPassword:ForgotPassword;
  errors:any={};
  invalidEmail: boolean;
  isPasswordField:boolean=false;
  isValidEmail: boolean;
  calledAPI: boolean=true;
  otpkey: any;
  invalidOTP: boolean;
  isForgotPasswordSubmitted: boolean;
  otpCheck: boolean;
  constructor(
    private authService:AuthService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private messageService:MessageService,
    private confirmationService: ConfirmationService,
    private service:AuthenticationServiceService
  ) {

    this.forgotPassword=new ForgotPassword;
   }

  ngOnInit(): void {
    this.initComponent();
  }

  initComponent(){
    this.getActiveParams();
  }
  setModes(x?:any){
    switch(x.mode){
      case AuthenticationModes.EMAIL :
        this.mode=AuthenticationModes.EMAIL;
        break;
      case AuthenticationModes.GENERATEOTP:
        this.mode=AuthenticationModes.GENERATEOTP;
        break;
      case AuthenticationModes.CHANGEPASSWORD:
        this.mode= AuthenticationModes.CHANGEPASSWORD;
        break;
    }
  }
  
  getActiveParams(){
      this.activatedRoute.data.subscribe(x=>{
        if(x){this.setModes(x);}
      })
  }

  onNumberKeyPress(event,desc?:any) {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && ((charCode < 48 ) || charCode > 57)) {
      return false;
    }
    return true;
}

checkLength(desc?:any){
  switch(desc){
    case 'otp': if( this.forgotPassword.otp && `${this.forgotPassword.otp}`.length!=6) {
                this.errors.otpLengthError=true;}
                else this.errors.otpLengthError=false;
                break;
  }
}
forgotPasswordAPICall(){
  if(this.forgotPassword.email && this.forgotPassword.new_password && this.forgotPassword.new_password2
    && this.forgotPassword.otp){
      this.isForgotPasswordSubmitted=true;
      this.service.forgotPassword(this.forgotPassword).subscribe(x=>{
        if(x){
          this.showCustomMessage('success','Successful','Your Password Has been changed');
          setTimeout(()=>{
            this.router.navigateByUrl('home')
          },200)

        }
      },err=>{
        console.log("unsuccessful")
        console.log("err",err);
        this.isForgotPasswordSubmitted=false;
      })
    }
    else{
      this.showCustomMessage('error','Failed','PLease fill all the fields');
    }
}

validateOTP(){
  this.otpCheck=true;
  if(this.forgotPassword.otp && this.otpkey==this.forgotPassword.otp){
    this.isPasswordField=true;
    this.invalidOTP=false;
  }
  else{
    this.isPasswordField=false;
    this.invalidOTP=true;
  }

}
sendOTP(){
  console.log(this.validateEmailId())
  if(this.forgotPassword.email && this.emailform.valid){
    this.calledAPI=true;
    this.service.sendOtp(this.forgotPassword.email).subscribe(x=>{
      if(x){
        this.otpkey=x.frontcopykey;
        this.showCustomMessage('success',x.Message,x.Status);
        this.isOTPSent=true;
      }
    },err=>{
       console.log("err",err);
        this.showCustomMessage('error','Failed','Invalid MailId Details');
        this.calledAPI=false;
    })
  }
  else{
    this.showCustomMessage('error','Ivalid Email Format','Please Enter Valid EmailID');
  }
}


validateEmailId(){
  this.calledAPI=false;
  const regex ="^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$"
  if(this.forgotPassword.email.match(regex)) {
    return true
  }
  else return false;
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
