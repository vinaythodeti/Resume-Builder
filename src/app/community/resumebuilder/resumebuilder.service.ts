import { Injectable } from '@angular/core';
import { SERVERCONFIG } from 'src/app/_shared/model/app.constant';
import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { Observable, throwError } from 'rxjs';
import { ResumeBuilder, ResumeBuilderAPIClass, Skills, Education, Experience, Project, PersonalDetails, CareerObjective, ProjectAPIResult, Languages, InterestsHobbies, TrainingCertificates } from 'src/app/_shared/model/resume-builder';
import { catchError } from 'rxjs/operators';
import { AuthenticationServiceService } from 'src/app/authentication/authentication-service.service';


@Injectable({
    providedIn:'root'
})
export class ResumeBuilderService{
    API_BACKEND = `${SERVERCONFIG.BACKEND}/api`;
    headers:HttpHeaders;
  
    constructor(private http: HttpClient, private authService: AuthService,
         private authenticationService: AuthenticationServiceService) {
      this.setHeaders();
    }
  
    setHeaders(){
      if(this.authService.authUser){
      this.headers = new HttpHeaders({ Authorization:`Token ${this.authService.authUser.token}` });
    }
  }

  //Get By Id PrimaryKey (AutoFiled) methods
  
  getUserResumeDetails(emailId:string):Observable<ResumeBuilderAPIClass>{
      let data ={emailId:emailId}
      this.setHeaders();
      let url =`${this.API_BACKEND}/get_resume_data_by_id/`;
      return this.http.post(url,data,{headers:this.headers}).pipe(catchError(this.handleError)) as Observable<ResumeBuilderAPIClass>;
  }
  getSkillById(value:number):Observable<Skills>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_skills_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Skills>;
  }
  getEducationId(value:number):Observable<Education>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_education_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Education>;
  }
  getExperienceById(value:number):Observable<Experience>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_experience_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Experience>;
  }
  getProjectById(value:number):Observable<ProjectAPIResult>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_project_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<ProjectAPIResult>;
  }
  getPersonalDetailsById(value:number):Observable<PersonalDetails>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_personal_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<PersonalDetails>;
  }
  getCareerObjectiveById(value:number):Observable<CareerObjective>{
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_career_objective_data/${value}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  getPersonalDetailsByEmailId(emailId:string){
    this.setHeaders();
    let data={emailId:emailId}
    let url =`${this.API_BACKEND}/get_personal_data_by_id/`;
    return this.http.post(url,data,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<PersonalDetails>;
  }
  getLanguageById(id:number){
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_language_data/${id}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Languages>;
  }
  getHobbiesById(id:number){
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_hobbies_data/${id}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<InterestsHobbies>;
  }
  getTrainingsById(id:number){
    this.setHeaders();
    let url =`${this.API_BACKEND}/get_training_data/${id}`;
    return this.http.get(url,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<TrainingCertificates>;
  }

  savePersonalDetails(personalDetails:PersonalDetails){
    this.setHeaders();
    let url =`${this.API_BACKEND}/register_personal_details/`;
    return this.http.post(url,personalDetails,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<PersonalDetails>;
  }

  saveCareerObjective(careerObjective:CareerObjective){
      this.setHeaders();
      let url =`${this.API_BACKEND}/register_career_objective/`;
      return this.http.post(url,careerObjective,{headers:this.headers})
      .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  saveResume(resumeData:ResumeBuilderAPIClass){
    this.setHeaders();
    let url =`${this.API_BACKEND}/register_resume_builder/`;
    return this.http.post(url,resumeData,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<ResumeBuilderAPIClass>;
 }
 saveSkill(skill:Skills){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_skill/`;
  return this.http.post(url,skill,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<Skills>;
}
saveEducation(education:Education){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_education/`;
  return this.http.post(url,education,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<Education>;
}
saveProject(project:ProjectAPIResult){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_project/`;
  return this.http.post(url,project,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<ProjectAPIResult>;
}
saveExperience(personalDetails:Experience){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_experience/`;
  return this.http.post(url,personalDetails,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<Experience>;
}
saveLanguage(language:Languages){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_language/`;
  return this.http.post(url,language,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<Languages>;
}
saveHobbies(hobbie:InterestsHobbies){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_interest_hobbies/`;
  return this.http.post(url,hobbie,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<InterestsHobbies>;
}
saveTrainingCertificates(trainings:TrainingCertificates){
  this.setHeaders();
  let url =`${this.API_BACKEND}/register_training_certificates/`;
  return this.http.post(url,trainings,{headers:this.headers})
  .pipe(catchError(this.handleError)) as Observable<TrainingCertificates>;
}

  modifyResume(resumeData:ResumeBuilderAPIClass){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_resume_details/${resumeData.id}`;
    return this.http.put(url,resumeData,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<ResumeBuilderAPIClass>;
  }
  modifyPersonalDetails(personalDetails:PersonalDetails){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_personal_details/${personalDetails.id}`;
    return this.http.put(url,personalDetails,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<PersonalDetails>;
  }
  modifySkill(skill:Skills){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_skills_details/${skill.id}`;
    return this.http.put(url,skill,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Skills>;
  }
  modifyEducation(education:Education){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_education_details/${education.id}`;
    return this.http.put(url,education,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Education>;
  }
  modifyExperience(experience:Experience){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_experience_details/${experience.id}`;
    return this.http.put(url,experience,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Experience>;
  }
  modifyProject(project:any){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_project_details/${project.id}`;
    return this.http.put(url,project,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<ProjectAPIResult>;
  }
  modifyCareerObjective(careerObjective:CareerObjective){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_career_objective_details/${careerObjective.id}`;
    return this.http.put(url,careerObjective,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  modifyLanguage(language:Languages){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_language_details/${language.id}`;
    return this.http.put(url,language,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<Languages>;
  }
  modifyTrainings(training:TrainingCertificates){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_training_details/${training.id}`;
    return this.http.put(url,training,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<TrainingCertificates>;
  }
  modifyHobbies(hobbie:InterestsHobbies){
    this.setHeaders();
    let url =`${this.API_BACKEND}/modify_hobbies_details/${hobbie.id}`;
    return this.http.put(url,hobbie,{headers:this.headers})
    .pipe(catchError(this.handleError)) as Observable<InterestsHobbies>;
  }


  deleteSkill(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}delete_skill_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<any>;
  }
  deleteEducation(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_education_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<any>;
  }
  deleteExperience(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_experience_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<any>;
  }
  deleteCareerObjective(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_career_objective_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<any>;
  }
  deleteResume(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_resume_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  deleteProject(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_project_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  deletePersonalDetails(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_personal_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<CareerObjective>;
  }
  deleteLanguage(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_language_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<Languages>;
  }
  deleteTrainingCertificate(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_training_details`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<TrainingCertificates>;
  }
  deleteHobbies(id:number){
    this.setHeaders();
    const options={headers:this.headers,body:{id:id} }
    let url =`${this.API_BACKEND}/delete_hobbies_details/`;
    return this.http.delete(url,options)
    .pipe(catchError(this.handleError)) as Observable<InterestsHobbies>;
  }

  handleError(error:HttpErrorResponse){
    switch(error.status){
      case 401: localStorage.removeItem('authUser');
        window.location.reload();
        break;
      case 400:break;
      case 500:break;
      default:break;  
    }
    return throwError(error);
  }

  checkErrorCodes(code){
  }

}