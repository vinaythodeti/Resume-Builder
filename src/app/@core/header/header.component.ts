import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserData } from '../_model/users';
import { LayoutService } from '../../@core/_services/layout.service';
import { map, takeUntil, filter } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { items } from 'src/app/_shared/model/menu-model';
import { AuthUser } from 'src/app/_shared/model/app.constant';
import { AuthService } from 'src/app/_shared/helpers/auth.service';
import { AuthenticationServiceService } from 'src/app/authentication/authentication-service.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'png-header',
    styleUrls: ['./header.component.scss'],
    templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {

    private destroy$: Subject<void> = new Subject<void>();
    public readonly materialTheme$: Observable<boolean>;
    userPictureOnly: boolean = false;
    items: MenuItem[];
    isCollapsed:any=true;
    items2:MenuItem[];
    user:AuthUser;
    token:any;
    logincomponent:boolean;

     constructor(private authService: AuthService, 
                private authenticationService: AuthenticationServiceService,
                private router: Router
                )
                {}   
    ngOnInit(){
        this.initialize();
    }
    initialize(){
        this.items=items;
        this.user =this.authService.authUser;
        this.logincomponent= this.authService.islogincomponent;
        if(this.user) this.token=this.user.token;
    }

    ngOnDestroy(){
    }
    update(){

    }
    delete(){

    }
    save(value:any){

    }
    logout(){
        this.authenticationService.userlogout().subscribe(x=>{
            if(x){
                console.log("loggedout result",x);
                this.authService.authUser= new AuthUser();
                localStorage.removeItem('authUser');
                window.location.reload();
            }
        },err=>{this.handleError(err);
        })
    }
    
    login(){
        this.authService.islogincomponent=true;
        this.logincomponent=true;
        this.router.navigateByUrl('authentication/login');
    }

    handleError(error:Error |HttpErrorResponse){
        console.error(error);
    }
}
