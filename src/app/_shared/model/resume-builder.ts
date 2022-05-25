
export class PersonalDetails{
    id:any;
    fullName:string;
    emailId:string;
    contactNo:any;
    country:any;
    state:any;
    district:any;
    githubProfile:string;
    linkedInProfile:string;
    codingProfile:string;
}

export class Education{
    id:any
    educationType:string;
    institutionName:string;
    branch:any;
    district:any;
    state:any;
    country:any;
    yearOfPassing:number;
    percentage:number;
    startDate:any;
    endDate:any;
}

export class Skills{
    id:any
    skill:string;
    skillClass:string;
    skillClassIndex:number;
}

export class Experience{
    id:any
    employer:string;
    jobTitle:string;
    country:any;
    state:any;
    city:any;
    jobDescription:string;
    experience:number;
    fromDate:any;
    present:boolean
    toDate:any;
}
export class CareerObjective{
    id:any;
    careerObjective:string;
}

export class Project{
    constructor(){
        this.skills=new Array<Skills>();
    }
    id:any;
    title:string;
    description:string;
    skills:Skills[];
    link:string;
}
export class ResumeBuilder{
    constructor(){
        this.personalDetails=new PersonalDetails;
        this.education=new Array<Education>();
        this.skills=new Array<Skills>();
        this.experience=new Array<Experience>();
        this.project=new Array<Project>();
        this.languages=new Array<Languages>();
        this.trainingCertificates=new Array<TrainingCertificates>();
        this.interestsHobbies=new Array<InterestsHobbies>();
        this.careerObjective=new CareerObjective;
    }
    id:any
    personalDetails:PersonalDetails;
    education:Education[];
    skills:Skills[];
    experience:Experience[];
    project:Project[];
    languages:Languages[];
    interestsHobbies:InterestsHobbies[];
    trainingCertificates:TrainingCertificates[];
    careerObjective:CareerObjective;
    emailId:string;
}

export class ResumeBuilderAPIClass{
    constructor(){
        this.education=new Array<number>();
        this.experience=new Array<number>();
        this.project=new Array<number>();
        this.skills=new Array<number>();
        this.languages=new Array<number>();
        this.interestesHobbies=new Array<number>();
        this.trainingCertificates=new Array<number>();
    }
    education:number[];
    experience:number[];
    project:number[];
    skills:number[];
    languages:number[];
    interestesHobbies:number[];
    trainingCertificates:number[];
    personalDetails:number;
    emailId:string;
    id:number;
    careerObjective:number;
}

export class User{
    id:number;
    username:string;
    email:string;
}

export class GoogleLogin{
    email:string;
    username:string;
    first_name:string;
    last_name:string;
    google_token:string;
}

export class GoogleLoginResult{
    constructor(){
        this.user= new User();
    }
    user:User;
    token:string;
}

export class Get_OTP_Key{
    email:string;
}

export class ForgotPassword{
    email:string;
    otp:number;
    new_password:string;
    new_password2:string;
}
export class ChangePassword{
    email:string;
    old_password:string;
    new_password:string;
}

export class RegisterUser{
    email:string;
    first_name:string;
    last_name:string;
    username:string;
    password:string;
    password2:string;
}
export class LoginUser{
    email:string;
    password:string;
}

export class ProjectAPIResult{
    constructor(){
        this.skills=new Array<number>();
    }
    id:number;
    title:string;
    description:string;
    skills:number[];
    link:string;
}

export class TrainingCertificates{
    id:number;
    trainAndCertificates:string;
}

export class Languages{
    id:number;
    language:string;
}

export class InterestsHobbies{
    id:number;
    hobby:string;
}

export class ModifyUser{
    email:string;
    username:string;
    first_name:string;
    last_name:string;
    password:string;
    id:any
}

export const buttonClass=[
    {skillClass:"p-button-raised p-button-text"},
    {skillClass:"p-button-raised p-button-secondary p-button-text"},
    {skillClass:"p-button-raised p-button-success p-button-text"},
    {skillClass:"p-button-raised p-button-info p-button-text"},
    {skillClass:"p-button-raised p-button-warning p-button-text"},
    {skillClass:"p-button-raised p-button-help p-button-text"},
    {skillClass:"p-button-raised p-button-danger p-button-text"},
    {skillClass:"p-button-raised p-button-text p-button-plain"}
]


export const personaldetailsMock:any={
    id:1,
    fullName:'Sagar Guvvala',
    contactNo:9494744282,
    emailId:'sagarreddyguvvala@gmail.com',
    state:'Andhra Pradesh',
    district:'Nellore',
    country:'India',
    githubProfile:'https://github.com/gsrsagar',
    linkedInProfile:'https://www.linkedin.com/in/sagar-reddy-guvvala-a76612176/',
    codingProfile:''
}
export const educationMock:Education[]=[
    {   
        id:1,
        educationType:'B.Tech',
        branch:'Computer Science and Engineering',
        institutionName:'Priyadarshini College of Engineering, Nellore',
        district:'Nellore',
        state:'Andhra Pradesh',
        country:'India',
        percentage:71,
        startDate:new Date(),
        endDate:new Date(),
        yearOfPassing:2019
    },
    {
        id:2,
        educationType:'Intermediate',
        institutionName:'SriChaitanya Junior College',
        district:'Nellore',
        state:'Andhra Pradesh',
        country:'India',
        branch:'MPC',
        percentage:91,
        startDate:new Date(),
        endDate:new Date(),
        yearOfPassing:2015
    },
    {
        id:3,
        educationType:'10th Standard',
        institutionName:'MSM MCHS AC NAGAR , Nellore',
        district:'Nellore',
        state:'Andhra Pradesh',
        country:'India',
        branch:'',
        startDate:new Date(),
        endDate:new Date(),
        percentage:92,
        yearOfPassing:2013
    }
]

export const experienceMock:Experience[]=[
    {
        id:1,
        jobTitle:'Associate Software Engineer',
        employer:'Mphasis',
        country:'India',
        state:'Maharashtra',
        city:'Pune',
        jobDescription:`Worked as a full stack developer, by Managing website development projects from intial development to the final completion, optimizing all 
        cross-browser and multi-platform compatibility , work closely with the programmers and clients to meet projects requirements ,goals and 
        desired functionality`,
        experience:2.5,
        fromDate:new Date(),
        present:false,
        toDate:new Date()

    },
    {
        id:2,
        jobTitle:'Associate Software Engineer',
        employer:'Mphasis',
        country:'India',
        state:'Maharashtra',
        city:'Pune',
        jobDescription:`Worked as a full stack developer, by Managing website development projects from intial development to the final completion, optimizing all 
        cross-browser and multi-platform compatibility , work closely with the programmers and clients to meet projects requirements ,goals and 
        desired functionality`,
        experience:2.5,
        fromDate:new Date(),
        present:false,
        toDate:new Date()

    }
]

export const careerobjMock:CareerObjective={
    id:1,
    careerObjective:`To perform well in a learning environment that offers scope for professional and personal growth in 
    order to learn new things in technologies that helps to build a creative ideas to optimise the existing models as 
    well as to develop innovative models for business`,

}

export const skillsMock:Skills[]=[
    {id:1,skill:'Java',skillClass:'',skillClassIndex:0},
    {id:2,skill:'Angular 2+',skillClass:'',skillClassIndex:0},
    {id:3,skill:'.NET Core API',skillClass:'',skillClassIndex:0},
    {id:4,skill:'SQL',skillClass:'',skillClassIndex:0},
    {id:5,skill:'C#',skillClass:'',skillClassIndex:0},
    {id:6,skill:'Algorithms',skillClass:'',skillClassIndex:0}
]


export const projectsMock:Project[]=[
    {
        id:1,
        title:'Resume Builder App',
        description:`I developed this project as a part of my hands-on in the latest technology like Angular 9 and Django 
        Rest API that having all the features like printing as pdf , convert to document, proper validations , social login
        and good Authentication techniques are used to showcase my skills`,
        skills:[
            {id:1,skill:'Angular 9',skillClass:'',skillClassIndex:0},
            {id:2,skill:'DJango Rest API',skillClass:'',skillClassIndex:0},
            {id:3,skill:'Mongo DB',skillClass:'',skillClassIndex:0}
        ],
        link:'https://github.com/gsrsagar'
    }
]