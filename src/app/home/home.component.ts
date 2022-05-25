import { OnInit, OnDestroy, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RoutesEnum } from '../@core/_model/routes-model';
import { DisplayToast } from '../_shared/model/app.constant';
import { MessageService, ConfirmationService } from 'primeng/api';
import { AuthService } from '../_shared/helpers/auth.service';



@Component({
    selector:'home-app',
    templateUrl:'./home.component.html',
    styleUrls:['./home.component.scss']
})
export class HomeComponent implements OnInit,OnDestroy{
    homepagetitles:any=[
        {title:"Add Intelligence to your hard work"},
        {title:"Yields Better Results"}]
    advertiseTItles:any=[
        {title:"Are you looking for web application development"},
        {title:"No worries , we are here to assist you"},
        {title:"we do freelancing for full stack web application development"}
    ]   
    routes:typeof RoutesEnum=RoutesEnum; 
    status:string;
    detail:string;
    displayToast:DisplayToast;

    constructor(
        private http:HttpClient,
        private router:Router,
        private activatedRoute:ActivatedRoute,
        private messageService: MessageService,
        private confirmationService:ConfirmationService,
        private authService:AuthService
    ){

    }

    ngOnInit(){
        this.initComponent();
    }
    initComponent(){
        if(this.authService?.detail && this.authService?.status){
        this.showSuccessCustom(this.authService?.status,this.authService?.detail);
        this.authService.status='';
        this.authService.detail='';
        }
    }
    navigate(value?:any){
        this.router.navigateByUrl(`${value}`);
    }
    ngOnDestroy(){

    }



    showSuccess() {
        setTimeout(()=>{
        this.messageService.add({severity:'success', summary: 'Success', detail: 'Details Saved'});
        },200)
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
      showSuccessCustom(summary:any,detail:any) {
        setTimeout(()=>{
          this.messageService.add({severity:'success', summary:summary, detail: detail});
        },400)
      }
    showCustomMessage(ser:any,sum:any,det:any) {
    this.messageService.add({severity:ser, summary:sum, detail:det});
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
}