import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumebuilderComponent } from './resumebuilder/resumebuilder.component';
import { CommunityComponent } from './community';
import { ThemeModule } from '../@theme/theme.module';
import { PlatformModule } from '@angular/cdk/platform';
import {  MessageService, ConfirmationService } from 'primeng/api';
import { CommunityRoutingModule } from './community-routing.module';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { ProjectsComponent } from './projects/projects.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ResumeBuilderService } from './resumebuilder/resumebuilder.service';

@NgModule({
  declarations: [ResumebuilderComponent,
     CommunityComponent,
      EducationComponent,
      SkillsComponent,
      PersonaldetailsComponent,
      ProjectsComponent],
  imports: [
    CommonModule,
    ThemeModule,
    PlatformModule,
    CommunityRoutingModule,
    BsDatepickerModule.forRoot(),
  ],
  exports: [
    CommonModule,
    ThemeModule,
    PlatformModule,
    CommunityRoutingModule,
    BsDatepickerModule
  ],
  providers:[MessageService,ResumeBuilderService,ConfirmationService]
})
export class CommunityModule { }
