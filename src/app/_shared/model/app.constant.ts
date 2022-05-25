export enum SERVERCONFIG {
BACKEND = "BACKEND"
}

export class AuthUser{
  token:string;
  email:string;
  first_name:string;
  last_name:string;
  username:string;
  id:any;
}

export class DisplayToast{
  status:string;
  detail:string;
}
export enum AuthenticationModes{
  VERIFICATION="verify",
  CHANGEPASSWORD='changepassword',
  GENERATEOTP='generateotp',
  LOGIN='login',
  LOGOUT='logout',
  REGISTER='register',
  EMAIL='email'
} 