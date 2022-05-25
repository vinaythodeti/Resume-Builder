import { Routes, RouterModule } from "@angular/router";
import { ResumebuilderComponent } from './resumebuilder/resumebuilder.component';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { CommunityComponent } from './community';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { ProjectsComponent } from './projects/projects.component';
import { PersonaldetailsComponent } from './personaldetails/personaldetails.component';
import { AuthGuard } from '../_shared/helpers/auth-guard.service';

const routes:Routes=[
   {path:'resumebuilder',component:ResumebuilderComponent},
   {path:'skills',component:SkillsComponent},
   {path:'',component:CommunityComponent},
   {path:'resumebuilder/steps/education',component:EducationComponent},
   {path:'resumebuilder/steps/skils',component:SkillsComponent},
   {path:'steps/projects',component:ProjectsComponent},
   {path:'steps/personal',component:PersonaldetailsComponent},

   {path:'',redirectTo:'',pathMatch:'full'}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class CommunityRoutingModule{

}