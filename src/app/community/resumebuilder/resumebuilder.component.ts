import { Component, OnInit, ViewChild, ɵangular_packages_core_core_bj, Pipe, PipeTransform, ElementRef } from '@angular/core';
import { MenuItem, MessageService ,ConfirmationService, Message} from 'primeng/api';
import { Subscription } from 'rxjs';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CarService } from 'src/app/_shared/services/carservice';
import { Districts } from 'src/app/@core/_model/users';
import { ResumeBuilder, Skills, Experience, Education, buttonClass, PersonalDetails, personaldetailsMock, experienceMock, careerobjMock, skillsMock, educationMock, projectsMock, ResumeBuilderAPIClass, Project, CareerObjective, ProjectAPIResult, Languages, TrainingCertificates, InterestsHobbies } from 'src/app/_shared/model/resume-builder';
import { Product } from 'src/app/_shared/model/product';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { ResumeBuilderService } from './resumebuilder.service';
import { AuthUser } from 'src/app/_shared/model/app.constant';

@Component({
  selector: 'app-resumebuilder',
  templateUrl: './resumebuilder.component.html',
  styleUrls: ['./resumebuilder.component.scss']
})
export class ResumebuilderComponent implements OnInit {

  items: MenuItem[];  
  subscription: Subscription;
  education1: string;
  skills: boolean;
  personaldetails: PersonalDetails;
  avtivesection:string='education';
  states:any;
  districts:any;
  districtsarray:Districts[]=[];
  resumeBuilder:ResumeBuilder;
  skillsList:Skills[]=[];
  experienceList:Experience[]=[];
  educationList:Education[]=[];
  skill:Skills;
  experience:Experience;
  education:Education;
  language:Languages;
  trainingscertificates:TrainingCertificates;
  interestsHobbies:InterestsHobbies;
  languageList:Languages[]=[];
  hobbyList:InterestsHobbies[]=[];
  trainingList:TrainingCertificates[]=[];
  propClass:string="p-button-text";
  skillButtonClasses:any[]=buttonClass;
  products: Product[];
  @ViewChild('personalform')
  form: NgForm;
  @ViewChild('skillsform')
  skillsform: NgForm;
  @ViewChild('experienceform')
  experienceform: NgForm;
  @ViewChild('educationform')
  educationform: NgForm;
  @ViewChild('careerObjectiveform')
  careerobjectiveform: NgForm;
  @ViewChild('projectsForm')
  projectsform:NgForm
  @ViewChild('traniningsform')
  traniningsform:NgForm;
  @ViewChild('hobbiesform')
  hobbiesform:NgForm;
  @ViewChild('languagesform')
  languagesform:NgForm
  @ViewChild('resume') 
  resumeCard:ElementRef;
  @ViewChild('resume') pdfTable: ElementRef;
  personalDetailsSubmitted:boolean;
  skillsformSubmitted:boolean;
  experienceSubmitted:boolean;
  educationSubmitted:boolean;
  preparedResume:boolean=false;
  personalDatamock:any=personaldetailsMock;
  experienceMockdata:any=experienceMock;
  careerObjectiveMock:any=careerobjMock;
  skillsMockData:any=skillsMock;
  educationMockData:any=educationMock;
  projectsMockData:any=projectsMock;
  careerObjective:CareerObjective;
  countryCodes: any;
  taskData: any;
  loggedInUser:AuthUser;
  project:Project;
  isProgress:boolean=false;
  projectList:Project[]=[];
  projectSubmitted:boolean;
  resumeBuilderAPIResponse:ResumeBuilderAPIClass;
  projectAPIResult:ProjectAPIResult;
  msgs: Message[] = [];
  cols = [
    { field: 'educationType', header: 'Study' },
    { field: 'institutionName', header: 'Institution' },
    { field: 'yearOfPassing', header: 'YOP' },
    { field: 'percentage', header: 'Percentage' }
];
  displayBasic: boolean;
  savedPersonalDetaisValid: boolean;
  careerSubmitted: boolean;
  languageSubmitted: boolean;
  hobbySubmitted:boolean;
  trainingSubmitted:boolean;
  preparedResumeEnable:boolean=false;
  constructor(private router:Router,
    private http:HttpClient,
    private carService:CarService,
    private messageService:MessageService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private resumeService : ResumeBuilderService,
    private confirmationService: ConfirmationService
   ) {
      this.resumeBuilder=new ResumeBuilder();
      this.interestsHobbies=new InterestsHobbies;
      this.trainingscertificates=new TrainingCertificates;
      this.resumeBuilderAPIResponse= new ResumeBuilderAPIClass();
      this.experience=new Experience;
      this.education=new Education;
      this.personaldetails=new PersonalDetails;
      this.skill=new Skills;
      this.language=new Languages;
      this.projectAPIResult=new ProjectAPIResult();
      this.project=new Project();
      this.careerObjective= new CareerObjective;  
      this.projectList= new Array<Project>();
    }
    

    ngOnInit() {
      this.initSubscriptions();
  }
  initSubscriptions(){
    this.checkAuth();
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
    this.loggedInUser=this.authService.authUser;
    this.carService.getStates().then(x => { this.states = x;});
    this.carService.getCountryCodes().then(x=>{if(x) this.countryCodes=x;})
    this.getResumeDetails();
  }
  }

  // public DownloadPDF(){
  //     var data = document.getElementById('resumeCard');
  //     html2canvas(data).then(canvas=>{
  //       var imgWidth=208;
  //       var pageHeight=295;
  //       var imgHeight=canvas.height*imgHeight/canvas.width;
  //       var heightLeft= imgHeight;
  //       let contentDataURL = canvas.toDataURL('image/png')
  //       var pdf = new jspdf();
  //       pdf.addImage(contentDataURL,0,0,208,500)
  //       pdf.save(`${this.personaldetails.fullName}.pdf`);

  //     })
  // }
 
  
  //PDF genrate button click function
  public downloadAsPDF() {

    //get table html
    // const pdfTable = this.resumeCard.nativeElement;
    // //html to pdf format
    // var html = htmlToPdfmake(pdfTable.innerHTML);
   
    // const documentDefinition = { content: html };
    // pdfMake.createPdf(documentDefinition).open();
    // pdfMake.createPdf(documentDefinition).download();
  
  
}

  getResumeDetails(){
    this.isProgress=true;
    this.resumeService.getUserResumeDetails(this.loggedInUser?.email).subscribe(x=>{
      if(x){
        console.log(x);
        this.isProgress=false;
        this.resumeBuilderAPIResponse=x;
        console.log("x",x);
        console.log("resumeBuilderAPIResponse",this.resumeBuilderAPIResponse);
        this.initResumeDetails();
      }
    },err=>{
      this.handleError(err);
      this.isProgress=false;
      this.initResumeDetails();
    })
  }
  
  initResumeDetails(){
    if(this.resumeBuilderAPIResponse){
      this.bindLanguageDetails();
      this.bindTrainingDetails();
      this.bindInterestsDetails();
      this.bindSkills();
      this.bindEducationDetails();
      this.bindExperienceDetails();
      this.bindProjectDetails();
      this.bindPersonalDetails();
      this.bindCareerObjective();
    }
      this.checkPersonalDetails();
  }

  bindLanguageDetails(){
    this.isProgress=true;
    if(this.resumeBuilderAPIResponse?.languages?.length){
      this.resumeBuilderAPIResponse?.languages.forEach(e=>{
        this.resumeService.getLanguageById(e).subscribe(x=>{
          if(x){
              this.languageList.push(x);
          }
        },err=>{
          this.handleError(err);
          this.isProgress=false;
        })
      })
      this.isProgress=false;
    }
  }

  bindTrainingDetails(){
    this.isProgress=true;
    if(this.resumeBuilderAPIResponse?.trainingCertificates?.length){
      this.resumeBuilderAPIResponse?.trainingCertificates.forEach(e=>{
        this.resumeService.getTrainingsById(e).subscribe(x=>{
          if(x){
              this.trainingList.push(x);
              this.isProgress=false;
          }
        },err=>{
          this.handleError(err);
          this.isProgress=false;
        })
      })
    }
  }


    bindInterestsDetails(){
      this.isProgress=true;
      console.log("came here");
      if(this.resumeBuilderAPIResponse?.interestesHobbies?.length){
        console.log("came here");
        this.resumeBuilderAPIResponse?.interestesHobbies.forEach(e=>{
          this.resumeService.getHobbiesById(e).subscribe(x=>{
            if(x){
                this.hobbyList.push(x);
                this.isProgress=false;
            }
          },err=>{
            this.handleError(err);
            this.isProgress=false;
          })
        })
      }

  }
  checkPersonalDetails(){
    this.isProgress=true;
    if(!this.resumeBuilderAPIResponse?.personalDetails){
    this.resumeService.getPersonalDetailsByEmailId(this.loggedInUser.email).subscribe(x=>{
      if(x){
          this.isProgress=false;
          console.log(x);
          this.personaldetails=x;
      }
    },err=>{
      this.handleError(err);
      this.isProgress=false;
    })
    }
  }
  bindCareerObjective(){
    if(this.resumeBuilderAPIResponse.careerObjective){
      let key=this.resumeBuilderAPIResponse.careerObjective;
      this.isProgress=true;
      this.resumeService.getCareerObjectiveById(key).subscribe(x=>{
        if(x){
          this.careerObjective=x;
          this.isProgress=false;
        }
      })
    }
  }

  bindSkills(){
    if(this.resumeBuilderAPIResponse?.skills?.length){
    this.resumeBuilderAPIResponse.skills.forEach(element=>{
      this.isProgress=true;
      this.resumeService.getSkillById(element).subscribe(x=>{
        if(x){
          this.skillsList.push(x);
          this.isProgress=false;
        }
      })
    })
  }
  }

  bindEducationDetails(){
    if(this.resumeBuilderAPIResponse?.education?.length){
    this.resumeBuilderAPIResponse.education.forEach(element=>{
      this.isProgress=true;
      this.resumeService.getEducationId(element).subscribe(x=>{
        if(x){
          this.educationList.push(x);
          this.isProgress=false;
          this.educationList.forEach(x=>{
            x.startDate=new Date(x.startDate);
            x.endDate=new Date(x.endDate);
          })
        }
      })
    })
  }
  }

  bindExperienceDetails(){
    if(this.resumeBuilderAPIResponse?.experience?.length){
    this.resumeBuilderAPIResponse.experience.forEach(element=>{
      this.isProgress=true;
      this.resumeService.getExperienceById(element).subscribe(x=>{
        if(x){
          this.isProgress=false;
          if(new Date(x.toDate).getFullYear()==1970){x.toDate=null};
          this.experienceList.push(x);
          this.experienceList.forEach(x=>{
            x.fromDate=new Date(x.fromDate);
           if(x.toDate!=null || x.toDate!=undefined) x.toDate=new Date(x.toDate);
          })
        }
      })
    })
  }
  }

  bindPersonalDetails(){
    if(this.resumeBuilderAPIResponse?.personalDetails){
      let key=this.resumeBuilderAPIResponse.personalDetails;
      this.isProgress=true;
      this.resumeService.getPersonalDetailsById(key).subscribe(x=>{
        if(x){
          this.personaldetails=x;
          if(this.personaldetails?.id) this.savedPersonalDetaisValid=true;
          this.isProgress=false;
          let event= this.countryCodes.filter(e=>e.name.toLowerCase()==(x.country.toLowerCase()));
          console.log("event1",event);
        }
      })
    }
  }

  bindProjectDetails(){
    if(this.resumeBuilderAPIResponse.project?.length){
    this.resumeBuilderAPIResponse.project.forEach(element=>{
      this.isProgress=true;
      let obj= new Project;
      this.resumeService.getProjectById(element).subscribe(x=>{
        if(x){
          console.log("projectsdsdfgs",x);
          this.projectAPIResult=x;
          obj.id=x.id;
          obj.description=x.description;
          obj.title=x.title;
          obj.link=x.link;
          x.skills.forEach(id=>{
            this.resumeService.getSkillById(id).subscribe(x=>{
              if(x){
                console.log("projectdata",x);
                     
                        let obj1 =new Skills;
                        obj1.id=x.id;
                        obj1.skill=x.skill;
                        obj1.skillClass=x.skillClass;
                        obj1.skillClassIndex=x.skillClassIndex;
                        obj.skills.push(obj1);
                  } 
                })
              })
              this.projectList.push(obj);
          }
          })
          this.isProgress=false;
        })
    }
}

    getDistricts(value?:any){
      console.log("states",this.states)
      this.districts=(this.states.filter((x)=>x.state==value))[0].districts;
      this.districtsarray=[];
      this.districts.forEach(element => {
        let obj= new Districts
        obj.name=element;
        obj.value=element;
        this.districtsarray.push(obj);
      });
      console.log('districts',this.districtsarray);

    }
    onStateChange(event?:any,section?:any){
      this.getDistricts(event.state);
      console.log("event",event);
      switch(section){
        case 'personal': this.personaldetails.state=event;
              break;
        case 'experience':this.experience.state=event;
              break;
        case 'education':this.education.state=event;
              break;            
      }
    }
    onDistrictChange(event?:any,section?:any){
      console.log("district  change",event)
      switch(section){
        case 'personal': this.personaldetails.district=event;
              break;
        case 'experience':this.experience.city=event;
              break;
        case 'education':this.education.district=event;
              break;            
      }
    }
    onCountryChange(event?:any,section?:any){
      console.log('event',event.name);
      console.log('event',event);
      switch(section){
        case 'personal': 
        let event= this.countryCodes.filter(e=>e.name.toLowerCase()==(event.toLowerCase()));
        this.personaldetails.contactNo=`${event.dial_code}`;
              break;
        case 'experience':this.experience.country=event;
              break;
        case 'education':this.education.country=event;
              break;            
      }
    }
    onNumberKeyPress(event) {
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && ((charCode < 48 ) || charCode > 57)) {
        return false;
      }

      return true;
  }

  appendCountryCode(event:any){
    let code= this.countryCodes.filter(e=>e.name.toLowerCase()==(event.target.value.toLowerCase()))[0];
    this.personaldetails.contactNo=`${code.dial_code}`;
  }
  saveCareerObjectiveDetails(){
    this.careerSubmitted=true;
    if(this.careerObjective.careerObjective){
      if(this.personaldetails?.id){
        if(this.careerObjective.id){
          this.resumeService.modifyCareerObjective(this.careerObjective).subscribe(x=>{
            if(x){
              console.log("modified Career objective",x);
              this.careerObjective=x;
              this.saveResume();
              this.showSuccess();
            }
          })
        }
        else{
          this.resumeService.saveCareerObjective(this.careerObjective).subscribe(x=>{
            if(x){
                console.log("saved Career Objective",x);
                this.careerObjective=x;
                this.saveResume();
            }
          });
        }
      }
      else{
        this.showCustomMessage('warn','Personal Details','Personal Details to be saved first');
      }
    }
    else{
      this.showError();
    }
  }
  saveResume(){
    this.resumeBuilderAPIResponse.careerObjective=this.careerObjective.id;
    this.resumeBuilderAPIResponse.personalDetails=this.personaldetails.id;
    this.resumeBuilderAPIResponse.emailId=this.authService.authUser.email;
    if(this.resumeBuilderAPIResponse?.id){
      this.resumeService.modifyResume(this.resumeBuilderAPIResponse).subscribe(x=>{
        if(x){
          console.log("modified resume",x);
        }
      })
    }else{
      this.resumeService.saveResume(this.resumeBuilderAPIResponse).subscribe(x=>{
        if(x){
          console.log("resume response saved",x);
          this.resumeBuilderAPIResponse=x;
          this.showSuccess();
        }
      })
    }
  }
  savePerosnalData(){
    this.resumeService.savePersonalDetails(this.personaldetails).subscribe(x=>{
      if(x){
        console.log("saved",x);
        this.personaldetails=x;
        this.showSuccess();
      }
    })
  }
  modifyPersonalData(){
    this.resumeService.modifyPersonalDetails(this.personaldetails).subscribe(x=>{
      if(x){
        console.log(x);
        this.personaldetails=x;
        this.showSuccess();
      }
    })
  }
  savePersonalDetails(){
    this.personalDetailsSubmitted=true;
    if(this.form.valid){
      this.savedPersonalDetaisValid=true;
      if(this.personaldetails?.id){
        this.modifyPersonalData();
      }
      else{
        this.savePerosnalData();
      }   
    }
    else{
      console.log("invalid");
      this.showError();
    }
  }

  registerProject(obj?:Project){
    this.isProgress=true;
    this.projectAPIResult.description=obj.description;
    this.projectAPIResult.link=obj?.link;
    this.projectAPIResult.title=obj.title;
    let index=this.projectAPIResult?.skills?.length || 0;
    console.log("skills",obj);
    obj.skills.forEach(e=>{
      this.projectAPIResult.skills[index]=e.id;
    })
    this.resumeService.saveProject(this.projectAPIResult).subscribe(x=>{
      if(x){
        this.isProgress=false;
        let obj=new Project();
        obj.id=x.id;
        obj.description=x.description;
        obj.title=x.title;
        obj.link=x?.link;
        x.skills.forEach(e=>{
           this.resumeService.getSkillById(e).subscribe(x=>{
             if(x){
                let skill=new Skills();
                skill.id=x.id;
                skill.skill=x.skill;
                skill.skillClass=x.skillClass;
                skill.skillClassIndex=x.skillClassIndex;
                  obj.skills.push(skill);
               }
              });
        })
        this.projectList.push(obj);
        this.project=new Project();
        let index=this.resumeBuilderAPIResponse.project?.length || 0;
        this.resumeBuilderAPIResponse.project[index]=x.id;
        this.modifyResumeData();
        this.showSuccess();
      }
    },err=>{
      this.isProgress=false;
      this.handleError(err);
    })
  }
  modifyProject(obj?:any){
    this.isProgress=true;
    this.projectAPIResult.description=obj.description;
    this.projectAPIResult.link=obj?.link;
    this.projectAPIResult.title=obj.title;
    this.projectAPIResult.id=obj.id;
    let index=this.projectAPIResult?.skills.length || 0
    obj.skills.forEach(e=>{
      this.projectAPIResult.skills[index]=e.id;
      index++;
    })
    this.resumeService.modifyProject(this.projectAPIResult).subscribe(x=>{
      if(x){
        let obj= new Project;
        this.isProgress=false;
        obj.id=x.id;
        obj.description=x.description;
        obj.link=x?.link;
        obj.title=x.title;
        x.skills.forEach(e=>{
           this.resumeService.getSkillById(e).subscribe(x=>{
             if(x){
              console.log("skill",x);
              obj.skills.push(x);
             }
           })
        })
        this.projectList.push(obj);    
    if(!this.projectList.filter(e=>e.id==x.id)){
      let index=this.resumeBuilderAPIResponse.project?.length || 0;
      this.resumeBuilderAPIResponse.project[index]=x.id;
      this.modifyResumeData();
    }
    this.project=new Project();
        this.showSuccess();
      }
    },err=>{
      this.isProgress=false;
      this.handleError(err);
    })
  }

  saveProjectDetails(){
    this.projectSubmitted=true;
    if(this.project.description && this.project.title){
      if(this.project.skills?.length){
        let obj= new Project;
        obj.description=this.project.description;
        obj.link=this.project?.link;
        obj.title=this.project.title; 
           obj.skills.push(...this.project.skills);
        console.log("project",this.project)
        if(this.project?.id){
          obj.id=this.project.id;
          this.modifyProject(obj);
        }
        else this.registerProject(obj);
      }
      else{
        this.showCustomMessage('error','Please add atleast one skill','Atleast one skill is mandatroy to add to the project')
      }
    }
    else{
      this.showWarn();
    }
  }
  modifyResumeData(value?:string){
    this.isProgress=true;
    this.resumeService.modifyResume(this.resumeBuilderAPIResponse).subscribe(x=>{
      if(x){
        console.log("x",x);
        this.isProgress=false;
        this.resumeBuilderAPIResponse=x;
        if(value=='deleteSkill') this.showCustomMessage('success',"success",'Deleted skill from resume');
      }
    },err=>{
      this.handleError(err);
      this.isProgress=false;
    })
  }

  editProject(value:Project,i:any){
    console.log("value",value);
    console.log("projectAPIReilt",this.projectAPIResult);
    this.project.description=value.description;
    this.project.link=value?.link;
    this.project.title=value.title;
    // value.skills.forEach(x=>{
    //   this.project.skills.push(x);
    // })
    this.project.skills.push(...value.skills);
    if(value?.id){
      this.project.id=value.id;
    }
    this.projectList.splice(i,1);
  }

  deleteProject(value:Project,i:number){
    let index=this.projectList?.indexOf(value);
    this.projectList?.splice(index,1);
    let res=this.resumeBuilderAPIResponse.project?.indexOf(value.id);
    this.resumeBuilderAPIResponse.project.splice(res,1);
    this.modifyResumeData();
  }

  deleteProjectSkill(value:Skills){
    console.log("value",value);
    if(value?.id && this.project?.id){
    let index= this.projectAPIResult.skills.indexOf(value.id);
    this.projectAPIResult.skills.splice(index,1);
    let i=this.project.skills.indexOf(value);
    this.project.skills.splice(i,1);
    this.isProgress=true;
    if(this.projectAPIResult?.skills?.length>0 || this.project?.skills?.length>0){
    this.resumeService.modifyProject(this.projectAPIResult).subscribe(x=>{
      if(x){
        this.projectAPIResult=x;
        this.isProgress=false;
        this.showCustomMessage('success','Successfully Deleted','Skill Deleted From Current Project');
      }
    },err=>{
      this.handleError(err);
      this.isProgress=false;
    });
  }
}
    else{
      let i=this.project.skills.indexOf(value);
      console.log('index',i);
      this.projectList.splice(i,1);
    }
  }
  saveSkillAPIData(skill:Skills,value?:any){
    this.isProgress=true;
    this.resumeService.saveSkill(skill).subscribe(x=>{
      if(x){
        this.isProgress=false;
        this.skillsList.push(x);
        this.showSuccess();
        this.skill.skill=undefined;
        this.skillsformSubmitted=false;
        let index= this.resumeBuilderAPIResponse?.skills?.length || 0;
        this.resumeBuilderAPIResponse.skills[index]=x.id;
         if(this.personaldetails.id) this.modifyResumeData();
        if(value=='project'){
           this.project.skills.push(x);
           this.displayBasic=false;
        }  
      }
    },err=>{
      this.handleError(err);
    })
  }
  modifySkillAPIData(skill:Skills,value?:any){
    this.isProgress=true;
    this.resumeService.modifySkill(skill).subscribe(x=>{
      if(x){
        this.isProgress=false;
        this.skillsList.push(x);
        this.showSuccess();
        this.skill.skill=undefined;
        this.skillsformSubmitted=false;
        let index= this.resumeBuilderAPIResponse.skills?.length || 0;
        if(!this.skillsList.filter(e=>e.id==x.id)){
          console.log("not found skill exists");
          this.resumeBuilderAPIResponse.skills[index]=x.id;
          this.modifyResumeData();
        }
        if(value=='project'){
           this.project.skills.push(x);
           this.displayBasic=false;
        }  
      }
    },err=>{
      this.handleError(err);
    })
  }
    saveSkill(value?:any){
      this.skillsformSubmitted=true;
      if(this.skillsform.valid || (value=='project')){
        if(this.skill.skill){
          if(this.personaldetails?.id && this.careerObjective?.id && this.careerObjective?.careerObjective){
        let index =0;
        index=this.skillsList?.length;
        let obj= new Skills;
        obj.skill=this.skill.skill;
        obj.skillClass=buttonClass[index>=buttonClass.length?(index-buttonClass.length):index].skillClass;
        obj.skillClassIndex=index;
        if(this.skill?.id) {
          obj.id=this.skill.id;
          this.modifySkillAPIData(obj,value);
        }
        else this.saveSkillAPIData(obj,value);
      }
      else{
        this.showCustomMessage('error','Saving Skills Failed','Please Save Personal Details and Career Objective First');
      }
    }
    else{
      this.showWarn();
    }
    }
      else{
        this.showError();
      }
    }
    editSkill(event?:any,index?:any){
      if(this.skill?.skill){
        this.showCustomMessage('warn','Not Allowed','Please Save Skill Field')
      }
      else{
        this.skill.skill=event.skill;
        this.skill.skillClass=event.skillClass;
        this.skill.skillClassIndex=event.skillClassIndex;
        if(event?.id) this.skill.id=event.id;
        this.skillsList.splice(index,1);
      }
    }

    deleteSkill(){
      if(this.skill.skill){
        if(this.skill.id){
        let index=this.projectAPIResult.skills.indexOf(this.skill.id);
        console.log("index in project",index);
        if(index){
          this.showCustomMessage('warn','You are using this skill in one of the project','Please delete it in project first');
        }
        else{
          let i=this.resumeBuilderAPIResponse.skills.indexOf(this.skill.id)
          this.resumeBuilderAPIResponse.skills.splice(i,1);
          this.modifyResumeData();
          this.skill=new Skills();
        }
      }
      else{
        this.skill=new Skills();
      }
    }
  }

  deleteSkills(obj:Skills,i:any){
    if(this.skill.id){
      let index=this.projectAPIResult.skills.indexOf(this.skill.id);
      console.log("index in project",index);
      if(index){
        this.showCustomMessage('warn','You are using this skill in one of the project','Please delete it in project first');
      }
    }
    else{
      let index=this.skillsList.indexOf(obj);
    this.skillsList.splice(index,1);
    let is=this.resumeBuilderAPIResponse.skills.indexOf(obj.id);
    this.resumeBuilderAPIResponse.skills.splice(is,1);
    this.modifyResumeData('deleteSkill');
    }
  }
    saveExperienceAPICall(obj?:Experience){
      this.isProgress=true;
      console.log("this.exp",JSON.stringify(obj))
      this.resumeService.saveExperience(obj).subscribe(x=>{
        if(x){
          console.log("x Date",x);
          this.isProgress=false;
          if( new Date(x.toDate).getFullYear()==1970) x.toDate=null;
          this.experienceList.push(x);
          let index=this.resumeBuilderAPIResponse?.experience?.length || 0;
          this.resumeBuilderAPIResponse.experience[index]=x.id;
          this.modifyResumeData();
          this.showSuccess();
          this.educationSubmitted=false;
        }
      },err=>{
        this.handleError(err);
      })
    }
    modifyExperienceAPICall(obj?:Experience){
      this.isProgress=true;
      this.resumeService.modifyExperience(obj).subscribe(x=>{
        if(x){
          this.isProgress=false;
          console.log("mpodify experience result",x);
          x.fromDate=new Date(x.fromDate);
          x.toDate=new Date(x.toDate);
          if( new Date(x.toDate).getFullYear()==1970) {
            x.toDate=null;
          }
          if(!this.experienceList.filter(e=>e.id==x.id)){
            let index= this.resumeBuilderAPIResponse.experience?.length || 0;
            this.resumeBuilderAPIResponse.experience[index]=x.id;
            this.modifyResumeData();
          }
          this.showSuccess();
          this.educationSubmitted=false;
          this.experienceList.push(x);
        }
      },err=>{
        this.handleError(err);
        this.isProgress=false;
      })
    }
    processAddExperience(){
      let obj=new Experience;
      console.log("this.experience",this.experience);
      obj.employer=this.experience.employer;
      obj.jobTitle=this.experience.jobTitle;
      obj.jobDescription=this.experience.jobDescription;
      obj.experience=this.experience.experience;
      obj.state=this.experience.state;
      obj.city=this.experience.city;
      obj.country=this.experience.country;
      obj.present=this.experience.present;
      obj.fromDate=this.processDateToAPICall(this.experience.fromDate);
      if(this.experience.toDate) {obj.toDate= this.processDateToAPICall(this.experience.toDate);}
      else{
        obj.toDate=null;
      }
      if(this.experience?.id){
         obj.id=this.experience.id;
         this.modifyExperienceAPICall(obj);
         this.experienceSubmitted=false;
      }
      else{this.saveExperienceAPICall(obj);}
      this.experience=new Experience;
      this.experienceSubmitted=false;
    }
    processDateToAPICall(date?:Date){
      console.log("data",date.toString());
      let dateyear=date.getDate();
      let month=date.getMonth();
      let year=date.getFullYear();
      let finalDate= `${year}-${month+1}-${dateyear}`
      console.log("YYYY-MM-DD",finalDate);
      return finalDate;

    }
    addExperience(){
      this.experienceSubmitted=true;
      if(!this.experience.present) this.experience.present=false;
      if(this.experience.employer && this.experience.experience && this.experience.jobDescription && this.experience.jobTitle
         && this.experience.fromDate && (this.experience.present==true || this.experience.present==false) && this.experience.city && this.experience.country && this.experience.state ){
         if(this.personaldetails?.id){
          if(this.experience.present==false && this.experience.toDate){
            this.processAddExperience();
          }
          else if(this.experience.present==true && !this.experience.toDate){
            this.processAddExperience();
          }
          else if(this.experience.present==false && !this.experience.toDate){
            this.showCustomMessage('warn','Need Valid Inputs','Required any of the value endData or Currently Working ')
          } 
          else{
            this.processAddExperience();
            this.experienceSubmitted=false;
          } 
        }
        else{
          this.showCustomMessage('error','Save Experience Failed','Please save Personal details and career objective first');
        }
      }
      else{
        this.showWarn();
      }
    }
    editEducation(index?:any){
      this.education.educationType=this.educationList[index].educationType;
      this.education.branch=this.educationList[index].branch;
      this.education.country=this.educationList[index].country;
      this.education.district=this.educationList[index].district;
      this.education.endDate=(this.educationList[index].endDate);
      this.education.institutionName=this.educationList[index].institutionName;
      this.education.percentage=this.educationList[index].percentage;
      this.education.startDate=(this.educationList[index].startDate);
      this.education.state=this.educationList[index].state;
      this.education.yearOfPassing=this.educationList[index].yearOfPassing; 
      if(this.educationList[index]?.id) this.education.id=this.educationList[index].id;
      this.educationList.splice(index,1);
      console.log("education",this.education);
    }
    deleteExperience(i?:any){
      if(this.experienceform.valid && this.experience.employer && this.experience.fromDate && this.experience.jobTitle){
        this.showCustomMessage('warn','Not Allowed','Please Save Experience Fields')
      }else{
        let value=this.experienceList[i].id;
        let index=this.resumeBuilderAPIResponse.experience.indexOf(value);
        this.resumeBuilderAPIResponse.experience.splice(index,1);
        this.experienceList.splice(i,1);
        this.resumeService.deleteExperience(value).subscribe(x=>{
          if(x){
            this.showCustomMessage('success','Success','Details Deleted');
          }
        },err=>{
          this.showCustomMessage('error','Failed',err);
        })
        this.modifyResumeData();
      }
    }

    editExperience(i?:any){
      if(this.experienceform.valid && this.experience.fromDate && this.experience.jobTitle && this.experience.employer){
        this.showCustomMessage('warn','Not Allowed','Please Save Skill Field')
      }
      else{
        this.experience.employer=this.experienceList[i].employer;
        this.experience.experience=this.experienceList[i].experience;
        this.experience.jobDescription=this.experienceList[i].jobDescription;
        this.experience.jobTitle=this.experienceList[i].jobTitle;
        this.experience.present=this.experienceList[i].present;
        this.experience.fromDate=new Date(this.experienceList[i].fromDate);
        // this.experience.toDate=new Date(this.experienceList[i].toDate);
        if(this.experienceList[i].toDate){
          let date= new Date(this.experienceList[i].toDate)
           if(date.getFullYear()==1970) this.experience.toDate= null;
           else this.experience.toDate= new Date(this.experienceList[i].toDate);
        }
        this.experience.city=this.experienceList[i].city;
        this.experience.state=this.experienceList[i].state;
        this.experience.country=this.experienceList[i].country;
        if(this.experienceList[i]?.id){this.experience.id=this.experienceList[i].id};
        this.experienceList.splice(i,1);
      }
    }

    saveEducationAPICall(obj:Education){
      this.isProgress=true;
      console.log("resultAPiResponse",this.resumeBuilderAPIResponse);
      this.resumeService.saveEducation(obj).subscribe(x=>{
        if(x){
          console.log("result",x);
          this.isProgress=false;
          x.startDate=new Date(x.startDate);
          x.endDate=new Date(x.endDate);
          this.educationList.push(x);
          let index=this.resumeBuilderAPIResponse?.education?.length || 0
          this.resumeBuilderAPIResponse.education[index]=x.id;
          this.education=new Education();
          this.modifyResumeData();
          this.showSuccess();
        }
      },err=>{
        this.showCustomMessage('error','Failed',err);
      })
    }
    modifyEducationAPICall(obj:Education){
      this.isProgress=true;
      this.resumeService.modifyEducation(obj).subscribe(x=>{
        if(x){
          this.isProgress=false;
          x.startDate=new Date(x.startDate);
          x.endDate=new Date(x.endDate);
          this.educationList.push(x);
          if(!this.educationList.filter(e=>e.id==x.id)){
            let index= this.resumeBuilderAPIResponse.education?.length || 0;
            this.resumeBuilderAPIResponse.education[index]=x.id;
            this.modifyResumeData();
          }
          this.education=new Education();
          this.showSuccess();
          this.educationSubmitted=false;
        }
      },err=>{
        this.showCustomMessage('error','Failed',err);
      })
    }
    addEducation(){
      this.educationSubmitted=true;
      if(this.educationform.valid && this.education.educationType && this.education.country && 
        this.education.district && this.education.endDate && this.education.institutionName && this.education.startDate
        && this.education.percentage && this.education.state && this.education.yearOfPassing){
          if(this.personaldetails?.id){

            let obj= new Education;
            obj.educationType=this.education.educationType;
            obj.institutionName=this.education.institutionName;
            if(this.education.branch) obj.branch=this.education.branch;
            obj.percentage=this.education.percentage;
            obj.yearOfPassing=this.education.yearOfPassing;
            obj.state=this.education.state;
            obj.district=this.education.district;
            obj.country=this.education.country;
            obj.startDate=this.processDateToAPICall(this.education.startDate);
            obj.endDate=this.processDateToAPICall(this.education.endDate);
            this.educationSubmitted=false;
            if(this.education?.id){
              obj.id=this.education.id;
              this.modifyEducationAPICall(obj);
              this.experienceSubmitted=false;
           }
           else{this.saveEducationAPICall(obj);}
           this.experience=new Experience;
           this.experienceSubmitted=false;
          }
          else{
            this.showCustomMessage('error','Saaving education failed','Please save personal and career objective details first');
          }
        }  
      else{
        this.showError();
      }
    }
    delteEducation(i:number){
      if(this.educationform.valid && this.education.educationType && this.education.institutionName){
        this.showCustomMessage('warn','Not Allowed','Please Save Education Details')
      }else{
        let value=this.educationList[i].id;
        let index=this.resumeBuilderAPIResponse?.education?.indexOf(value);
        this.resumeBuilderAPIResponse?.education?.splice(index,1);
        this.educationList?.splice(i,1);
        this.resumeService.deleteEducation(value).subscribe(x=>{
          if(x){
            this.showCustomMessage('success','Success','Details Deleted');
            this.educationSubmitted=false;
          }
          if(!this.educationList?.length)
          this.showCustomMessage('error','Education Details Needed','To Prepare Resume');
        },err=>{
          this.showCustomMessage('error','Failed',err);
        })
        this.modifyResumeData();
      }
    }
  

    saveLanguageAPIData(language:any){
      this.isProgress=true;
      this.resumeService.saveLanguage(language).subscribe(x=>{
        if(x){
          let obj=new Languages;
          obj=x;
          this.isProgress=false;
          this.languageList.push(obj);
          this.showSuccess();
          this.languageSubmitted=false;
          this.language=new Languages;
          console.log("this.resumeBuilderAPIResponse",this.resumeBuilderAPIResponse);
          let index= this.resumeBuilderAPIResponse?.languages?.length || 0;
         if(index==0){this.resumeBuilderAPIResponse.languages=[];}
          this.resumeBuilderAPIResponse.languages[index]=x.id;
          this.modifyResumeData();

        }
      },err=>{
        this.handleError(err);
      })
    }
    
    saveHobbyAPIData(obj?:InterestsHobbies){
      this.isProgress=true;
      this.resumeService.saveHobbies(obj).subscribe(x=>{
        if(x){
          let obj= new InterestsHobbies;
          obj=x;
          this.isProgress=false;
          this.hobbyList.push(obj);
          this.showSuccess();
          this.hobbySubmitted=false;
          this.interestsHobbies=new InterestsHobbies;
          let index= this.resumeBuilderAPIResponse?.interestesHobbies?.length || 0;
          this.resumeBuilderAPIResponse.interestesHobbies[index]=x.id; 
          this.modifyResumeData();
        }
      },err=>{
        this.handleError(err);
      })
    }

    saveTrainingAPIData(obj?:TrainingCertificates){
      this.isProgress=true;
      this.resumeService.saveTrainingCertificates(obj).subscribe(x=>{
        if(x){
          let obj=new TrainingCertificates;
          obj=x;
          this.isProgress=false;
          this.trainingList.push(obj);
          this.showSuccess();
          this.trainingSubmitted=false;
          this.trainingscertificates=new TrainingCertificates;
          let index= this.resumeBuilderAPIResponse?.trainingCertificates?.length || 0;
          this.resumeBuilderAPIResponse.trainingCertificates[index]=x.id; 
          this.modifyResumeData();
        }
      },err=>{
        this.handleError(err);
      })
    }

    selected(value?:any){ }

    modifyLanguageAPIData(obj:Languages,value?:any){
      this.isProgress=true;
      this.resumeService.modifyLanguage(obj).subscribe(x=>{
        if(x){
          this.isProgress=false;
          this.showSuccess();
          this.language=new Languages;
          this.languageSubmitted=false;
          let index= this.resumeBuilderAPIResponse.languages?.length || 0;
          if(!this.languageList.filter(e=>e.id==x.id)){
            this.resumeBuilderAPIResponse.languages[index]=x.id;
            this.modifyResumeData();
          } 
        }
      },err=>{
        this.handleError(err);
      })
    }

    modifyHobbyAPIData(obj?:InterestsHobbies){
      this.isProgress=true;
      this.resumeService.modifyHobbies(obj).subscribe(x=>{
        if(x){
          this.isProgress=false;
          this.showSuccess();
          this.interestsHobbies=new InterestsHobbies;
          this.hobbySubmitted=false;
          let index= this.resumeBuilderAPIResponse.interestesHobbies?.length || 0;
          if(!this.hobbyList.filter(e=>e.id==x.id)){
            this.resumeBuilderAPIResponse.interestesHobbies[index]=x.id;
            this.modifyResumeData();
          } 
        }
      },err=>{
        this.handleError(err);
      })
    }

    modifyTrainingAPIData(obj?:TrainingCertificates){
      this.isProgress=true;
      this.resumeService.modifyTrainings(obj).subscribe(x=>{
        if(x){
          this.isProgress=false;
          this.showSuccess();
          this.trainingscertificates=new TrainingCertificates;
          this.trainingSubmitted=false;
          let index= this.resumeBuilderAPIResponse.trainingCertificates?.length || 0;
          if(!this.hobbyList.filter(e=>e.id==x.id)){
            this.resumeBuilderAPIResponse.trainingCertificates[index]=x.id;
            this.modifyResumeData();
          } 
        }
      },err=>{
        this.handleError(err);
      })
    }

    saveLanguage(){
      this.languageSubmitted=true;
      if(this.languagesform.valid){
        if(this.personaldetails?.id && this.careerObjective?.id){
          let obj= new Languages;
        let value;
        obj.language=this.language.language;
        if(this.language?.id) {
          obj.id=this.language.id;
          this.modifyLanguageAPIData(obj);
        }
        else this.saveLanguageAPIData(obj)
        }
        else{
          this.showErrorCustom('Saving Failed due to Invalid PersonalDetails and CareerObjective',
          'Please Save PersonalDetails and Career Objective First');
        }
      }
      else{
        this.showError();
      }
    }

    saveHobby(){
      this.hobbySubmitted=true;
      if(this.hobbiesform.valid){
        if(this.personaldetails?.id && this.careerObjective?.id){
          let obj= new InterestsHobbies;
          let value;
          obj.hobby=this.interestsHobbies.hobby;
          if(this.interestsHobbies?.id) {
            obj.id=this.interestsHobbies.id;
            this.modifyHobbyAPIData(obj);
          }
          else this.saveHobbyAPIData(obj)
        }
        else{
          this.showErrorCustom('Saving Failed due to Invalid PersonalDetails and CareerObjective',
          'Please Save PersonalDetails and Career Objective First');
        }
      }
      else{
        this.showError();
      }
    }

    saveTraining(){
      this.trainingSubmitted=true;
      if(this.traniningsform.valid){
        if(this.personaldetails?.id && this.careerObjective?.id){
          let obj= new TrainingCertificates;
          let value;
          obj.trainAndCertificates=this.trainingscertificates.trainAndCertificates;
          if(this.interestsHobbies?.id) {
            obj.id=this.interestsHobbies.id;
            this.modifyTrainingAPIData(obj);
          }
          else this.saveTrainingAPIData(obj)
        }
        else{
          this.showErrorCustom('Saving Failed due to Invalid PersonalDetails and CareerObjective',
          'Please Save PersonalDetails and Career Objective First');
        }
      }
      else{
        this.showError();
      }
    }

    deleteLanguageData(obj:Languages){
      this.isProgress=true;
      this.resumeService.deleteLanguage(obj.id).subscribe(x=>{
        if(x){
            this.isProgress=false;
            let i=this.languageList?.indexOf(obj);
            this.languageList.splice(i,1);
            this.languageSubmitted=false;
            this.showCustomMessage('success','Success','Deleted Language');
        }
      })
    }

    deleteHobbyData(obj:InterestsHobbies){
      this.isProgress=true;
      this.resumeService.deleteHobbies(obj.id).subscribe(x=>{
        if(x){
            this.isProgress=false;
            let i=this.hobbyList?.indexOf(obj);
            this.hobbyList.splice(i,1);
            this.hobbySubmitted=false;
            this.showCustomMessage('success','Success','Deleted Hobby');
        }
      })
    }

    deletTrainingData(obj:TrainingCertificates){
      this.isProgress=true;
      this.resumeService.deleteTrainingCertificate(obj.id).subscribe(x=>{
        if(x){
            this.isProgress=false;
            let i=this.trainingList?.indexOf(obj);
            this.trainingList.splice(i,1);
            this.trainingSubmitted=false;
            this.showCustomMessage('success','Success','Deleted Data');
        }
      })
    }

    deleteLanguage(value?:Languages,i?:number){
        if(value?.id){
        let index = this.resumeBuilderAPIResponse.languages.indexOf(value.id);
        this.resumeBuilderAPIResponse.languages.splice(index,1);
        this.deleteLanguageData(value);
        this.modifyResumeData();
        }
        else {
          let i=this.languageList?.indexOf(value);
          this.languageList.splice(i,1);
        }
        this.language= new Languages;
      }

      deleteHobby(value?:InterestsHobbies,i?:number){
        if(value?.id){
        let index = this.resumeBuilderAPIResponse.interestesHobbies.indexOf(value.id);
        this.resumeBuilderAPIResponse.interestesHobbies.splice(index,1);
        this.deleteHobbyData(value);
        this.modifyResumeData();
        }
        else {
          let i=this.hobbyList?.indexOf(value);
          this.languageList.splice(i,1);
        }
        this.interestsHobbies= new InterestsHobbies;
      }


      deleteTraining(value?:TrainingCertificates,i?:number){
        if(value?.id){
          console.log('came here');
        let index = this.resumeBuilderAPIResponse.trainingCertificates.indexOf(value.id);
        console.log("index",index);
        this.resumeBuilderAPIResponse.trainingCertificates.splice(index,1);
         this.deletTrainingData(value);
        this.modifyResumeData();
        }
        else {
          console.log('came here');
          let i=this.trainingList?.indexOf(value);
          this.trainingList.splice(i,1);
        }
      }
    

   











    ValidateAllForms():boolean{
      this.personalDetailsSubmitted=true;
      this.educationSubmitted=true;
      this.skillsformSubmitted=true;
      this.careerSubmitted=true;
      if(this.educationform.valid  && this.skillsform.valid && this.form.valid && this.projectsform.valid
        && this.careerobjectiveform.valid && this.languagesform.valid && this.hobbiesform.valid)
        return true;
        else false;
    }
    modifyProjectWhenSkillAdded(obj?:Project){
      if(obj?.id) this.projectAPIResult.id=obj?.id
      if(obj?.link) this.projectAPIResult.link=obj?.link;
      this.projectAPIResult.title=obj.title;
      let index=this.projectAPIResult?.skills.length || 0
    obj.skills.forEach(e=>{
      this.projectAPIResult.skills[index]=e.id;
      index++;
    })
    this.resumeService.modifyProject(this.projectAPIResult).subscribe(x=>{
      if(x){
        this.projectAPIResult=x;
      }
    })
      
    }
    saveAllFields(){
      console.log("this.validateforms()",this.ValidateAllForms())
      if(this.ValidateAllForms()){
        if(this.experienceList?.length>0){
            this.bindResumeFields();
          }
          else{
            this.confirmResumePrepare();
          }
        }
      else{
        this.showError();
      }
    }

    naviagteToExternalRoute(link?:any){
      window.open(link);
    }
    bindResumeFields(){
      this.personalDatamock=this.personaldetails;
      this.careerObjectiveMock=this.careerObjective;
      this.skillsMockData=this.skillsList;
      this.experienceMockdata=this.experienceList;
      this.educationMockData=this.educationList;
      this.projectsMockData=this.projectList;
      this.preparedResume=true;
      this.showCustomMessage('success','Successfully prepared resume For you', 'You can download using by clicking on print');
    //  this.downloadAsPDF();
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    templateCall(value?:any){
      switch(value){
       case 'education': this.avtivesection=value;
            break;
       case 'skills': this.avtivesection=value;
            break;
       case 'projects': this.avtivesection=value;
            break;
       case 'personaldetails': this.avtivesection=value;
            break;
      }
    }

    confirm(event:any) {
      this.msgs =new Array<Message>();
      this.confirmationService.confirm({
          message: 'Are you sure that you want to proceed?',
          header: 'Confirmation',
          icon: 'pi pi-exclamation-triangle',
          accept: () => {
            console.log("event",event);
            let result=this.project?.skills.filter(x=>x.id==event.id)[0]
            if(result && result.id==event.id){
              this.showCustomMessage('warn','Empty Value','this value already exists')
            }
              else{
                 this.project.skills.push(event);
                 if(this.project?.id) this.modifyProjectWhenSkillAdded(this.project);
                 this.msgs = [{severity:'info', summary:'Confirmed', detail:'You have Added'}];
                 this.showCustomMessage(this.msgs[0].severity,this.msgs[0].summary,this.msgs[0].detail)
              }
          },
          reject: () => {
              this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
          }
      });
  }

  confirmDelete(event: any,index:number,section:string) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to Delete?',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            //confirm action
          switch(section){
            case 'skill': this.deleteSkills(event,index);
                  break;
            case 'project':this.deleteProject(event,index);
                  break;
            case 'education':this.delteEducation(index);
                  break;
           case 'experience': this.deleteExperience(index);
                 break;
           case 'projectskill':
                          if(this.project?.skills?.length==1){
                            this.showCustomMessage('warn','Delete Skill Failed','Atleast one skill is mandatroy or you can add new skill to delete this skill');
                          }
                        else  this.deleteProjectSkill(event);
                break;

           case 'language':this.deleteLanguage(event,index);     
                break;
           case 'training':this.deleteTraining(event,index);
                break;
           case 'hobby':this.deleteHobby(event,index);          
           default:break;      
          }
        },
        reject: () => {
            //reject action
        }
    });
}

confirmResumePrepare(event?:any) {
  this.confirmationService.confirm({
      message: 'Are you a fresher ? without experiecne, Click Yes to prepare resume',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.bindResumeFields();
      },
      reject: () => {
          //reject action
      }
  });
}


printToCart(printSectionId: string){
  window.print();
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

  showBasicDialog() {
    this.displayBasic = true;
}

  handleError(error:Error |HttpErrorResponse){
    console.error(error);
}

}
