import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { ThemeModule } from '../@theme/theme.module';
import { PlatformModule } from '@angular/cdk/platform';
import { SharedModule, MessageService, ConfirmationService } from 'primeng/api';
import { CommunityRoutingModule } from '../community/community-routing.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { AuthenticationRoutingModule } from './authentication-routing.moduls';
import { AuthenticationServiceService } from './authentication-service.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { HomeComponent } from '../home/home.component';
import { VerificationComponent } from './verification/verification.component';




@NgModule({
  declarations: [LoginComponent, ResetpasswordComponent, VerificationComponent],
  imports: [
    ThemeModule,
    PlatformModule,
    SharedModule,
    AuthenticationRoutingModule,
    BsDatepickerModule.forRoot(),
    CommonModule
  ],
  exports:[
    ThemeModule,
    PlatformModule,
    SharedModule,
    AuthenticationRoutingModule,
    BsDatepickerModule,
    CommonModule

  ],
  providers:[AuthenticationServiceService,MessageService,ConfirmationService,HomeComponent]
})
export class AuthenticationModule { }
