import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse
} from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

import { environment } from "../../../environments/environment"
import { Router } from "@angular/router";
import { ServerConfig, ServerConfigService } from './server-config.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor(private router: Router, private serverConfig: ServerConfigService ) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let modifiedRequest: HttpRequest<any> = req;

    if(!req.url.endsWith('.json')){
      let url = this.serverConfig.buildCompleteUrl(req);
      modifiedRequest = req.clone({
        url: url
      });
    } 
    console.log(modifiedRequest)
    return next.handle(req.clone(modifiedRequest)).pipe(
      catchError((error: HttpErrorResponse) => {
        throw error;
      })
    );
  }
}
