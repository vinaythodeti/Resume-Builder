import { NgModule, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoutesEnum } from '../@core/_model/routes-model';
import { MenuItem } from 'primeng/api';


@Component({
    selector:'png-community',
    templateUrl:'./community.html',
    styleUrls:['./community.scss']
})
export class CommunityComponent{
    
    routes:typeof RoutesEnum=RoutesEnum;
    clicked: boolean;
    items:MenuItem[] = [{
        label: 'Personal',
        routerLink: 'personal'
    },
    {
        label: 'Seat',
        routerLink: 'seat'
    },
    {
        label: 'Payment',
        routerLink: 'payment'
    },
    {
        label: 'Confirmation',
        routerLink: 'confirmation'
    }
];
    constructor(private router:Router){
        
    }
    navigate(value?:any){
        this.router.navigateByUrl(`products/resumebuilder`);
    }
    makeClick(){
        this.clicked=true;
        this.router.navigateByUrl(`resumebuilder/steps/personal`);
    }
}