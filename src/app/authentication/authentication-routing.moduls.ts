import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from '../_shared/helpers/auth-guard.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerificationComponent } from './verification/verification.component';
import { AuthenticationModes } from '../_shared/model/app.constant';


const routes:Routes=[
   {path:'login',component:LoginComponent},
   {path:'resetpassword',component:ResetpasswordComponent},
   {
    path: "verify",
    children:[
        {
            path:"generateotp",
            component:VerificationComponent,
            data:{mode:AuthenticationModes.GENERATEOTP}
        },
        {
            path:"changepassword",
            component:VerificationComponent,
            data:{mode:AuthenticationModes.CHANGEPASSWORD}
        },
        {
            path:"email",
            component:VerificationComponent,
            data:{mode:AuthenticationModes.EMAIL}
        },
    ]
},
   
]




@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class AuthenticationRoutingModule{

}