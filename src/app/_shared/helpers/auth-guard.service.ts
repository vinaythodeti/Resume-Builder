import { Injectable, NgZone } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route, CanActivateChild, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AppInitializerService } from './app-initializer.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn:'root'
})
export class AuthGuard implements CanActivateChild, CanActivate, CanLoad {


  constructor(private zone:NgZone, private _authService: AuthService, private _router: Router, private appinitializer: AppInitializerService) {
  }
  canLoad(route: Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
     if (this._authService.isAuthenticated()) {
        return true;
        this.zone.run(() => {this._router.navigate(['']);});
    }
    console.log("routerSnapShot",route)
    this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: route.path }});
    // navigate to login page
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }
  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
    if (this._authService.isAuthenticated()) {
      return true;
    }
   // navigate to login page
   this._router.navigateByUrl('authentication/login')
   // you can save redirect url so after authing we can move them back to the page they requested
   return false;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this._authService.isAuthenticated()) {
      this.zone.run(() => {this._router.navigate([state.url]);});
        return true;
    }
    console.log("routerSnapShot",state)
    console.log("routerSnapShot",next) 
    this._router.navigate(['/authentication/login'], { queryParams: { returnUrl: state.url }});
    // navigate to login page
    // you can save redirect url so after authing we can move them back to the page they requested
    return false;
  }


}