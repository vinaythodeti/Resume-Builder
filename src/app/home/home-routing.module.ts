import { NgModel } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';

const routes:Routes=[
    {path:'home',component:HomeComponent},
    {path:'home/profile',component:ProfileComponent},
    {path:'home/contact',component:ContactusComponent},
    {path:'',redirectTo:'home', pathMatch:'full'}]


   
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
export class HomeRoutingModule{

}