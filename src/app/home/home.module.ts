import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ThemeModule } from '../@theme/theme.module';
import { SharedModule, MessageService, ConfirmationService } from 'primeng/api';
import { HomeRoutingModule } from './home-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { PlatformModule } from '@angular/cdk/platform';
import { ProfileComponent } from './profile/profile.component';
import { ContactusComponent } from './contactus/contactus.component';



@NgModule({
  declarations: [HomeComponent, ProfileComponent, ContactusComponent],
  imports: [
    CommonModule,
    ThemeModule,
    PlatformModule,
    SharedModule,
    HomeRoutingModule
  ],
  exports: [
    CommonModule,
    ThemeModule,
    PlatformModule,
    SharedModule,
    HomeRoutingModule,
    HomeComponent
  ],
  providers:[MessageService,ConfirmationService]
})
export class HomeModule { }
