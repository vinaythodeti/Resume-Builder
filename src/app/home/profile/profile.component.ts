import { Component, OnInit, ViewChild } from '@angular/core';
import { RegisterUser, LoginUser, ModifyUser, ChangePassword } from 'src/app/_shared/model/resume-builder';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthenticationServiceService } from 'src/app/authentication/authentication-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  registerUser:RegisterUser;
  signupSubmitted:boolean;
  loginuser:LoginUser;
  loginSubmitted:boolean;
  passwordNotMatched:boolean;
  modifyUser:ModifyUser
  changePassword:ChangePassword;
  password2:string;
  @ViewChild('updateForm') userDataModifyForm:NgForm;
  submitDisabled: boolean;
  changePasswordDetails: boolean;
  isProgress:boolean;
  
  constructor(
      private authService:AuthService,
      private messageService:MessageService,
      private confirmationService:ConfirmationService,
      private authenticationService:AuthenticationServiceService,
      private router:Router,
      private activatedRoute:ActivatedRoute
  ) {
    this.registerUser=new RegisterUser();
    this.loginuser=new LoginUser();
    this.modifyUser= new ModifyUser();
    this.changePassword= new ChangePassword;
   }

  ngOnInit(): void {
    this.checkAuth();
  }

  initComponent(){
    this.modifyUser.email=this.authService.authUser.email;
    this.modifyUser.username=this.authService.authUser.username;
    this.modifyUser.first_name=this.authService.authUser.first_name;
    this.modifyUser.last_name=this.authService.authUser.last_name;
    this.modifyUser.id=this.authService.authUser?.id;
    this.changePassword.email=this.authService.authUser.email;
  }
  checkAuth(){
    if(!this.authService.authUser?.token){
      this.showErrorCustom('Invalid user', 'You must login to continue the application services');
      let url= this.activatedRoute.snapshot['_routerState'].url
      setTimeout(()=>{ this.router.navigateByUrl("/",{skipLocationChange:true}).then(()=>{
        this.router.navigate(['/authentication/login'], { queryParams: { returnUrl: url }}); });
      },1000)
    }
    else{
      this.initComponent();
    }
  }

  
  matchPassword(){
    if(this.changePassword.new_password==this.password2){
        this.passwordNotMatched=true;
      }
      else this.passwordNotMatched=false;
    }

  changePasswordData(){
    this.changePasswordDetails=true;
    if(this.password2==this.changePassword.new_password){
      this.passwordNotMatched=false;
      this.isProgress=true;
    if(this.changePassword.new_password && this.changePassword.old_password){
      this.authenticationService.changePassword(this.changePassword).subscribe(x=>{
        if(x){
          this.showCustomMessage('success','Successful','Your password has been changed');
          this.changePasswordDetails=false;
          this.isProgress=false;
          this.changePassword=new ChangePassword();
          this.password2=undefined;
        }
      },err=>{
        this.showCustomMessage('error','Failed',err.error.error);
        this.isProgress=false;
      })
    }
  }
  else{
    this.showCustomMessage('error','Failed','Password and confirm password must be same');
    this.passwordNotMatched=true;
    this.changePasswordDetails=false;
  }
  }
  modifyUserData(){
    if(this.userDataModifyForm.valid){
      this.submitDisabled=true;
      this.isProgress=true;
      this.authenticationService.modifyUserDetais(this.modifyUser).subscribe(x=>{
        if(x){
          console.log(x);
          this.authService.authUser.email=x.user.email;
          this.authService.authUser.first_name=x.user.first_name;
          this.authService.authUser.last_name=x.user.last_name;
          this.authService.authUser.username=x.user.username;
          this.authService.authUser.id=x.user.id;
          this.submitDisabled=false;
          this.isProgress=false;
          localStorage.setItem("authUser",JSON.stringify(this.authService.authUser));
          this.showCustomMessage('success',x.Status,'Your details are updated');
          // setTimeout(()=>{
          //   this.router.navigateByUrl('/home/profile')
          // })
        }
      },err=>{
        this.submitDisabled=false;
        this.showCustomMessage('error',err.error.error,err.Status)
        this.isProgress=false;
      })
    }
    else{
      this.showCustomMessage('error','Failed','Please fill all mandatory fields')
    }
  }

  
  showSuccess() {
    setTimeout(()=>{
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Details Saved'});
    },200)
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
  showSuccessCustom(summary:any,detail:any) {
    setTimeout(()=>{
      this.messageService.add({severity:'success', summary:summary, detail: detail});
    },400)
  }
showCustomMessage(ser:any,sum:any,det:any) {
this.messageService.add({severity:ser, summary:sum, detail:det});
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
