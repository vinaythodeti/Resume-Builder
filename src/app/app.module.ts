import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import{FormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import{HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ThemeModule } from './@theme/theme.module';
import {InputTextModule} from 'primeng/inputtext';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarService } from './_shared/services/carservice';
import { CoreModule } from './@core/core.module';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { MDBBootstrapModule, IconsModule } from 'angular-bootstrap-md';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PlatformModule } from '@angular/cdk/platform';
import { AppInitializerService, serverConfigInitializerFactory } from './_shared/helpers/app-initializer.service';
import { ServerConfigService } from './_shared/helpers/server-config.service';
import { AuthService } from './_shared/helpers/auth.service';
import { HttpConfigInterceptor } from './_shared/helpers/http-config.interceptor';
import { HttpErrorHandler } from './_shared/helpers/HttpErrorHandler';




// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    PlatformModule,
    HttpClientModule,
    IconsModule,
    ThemeModule.forRoot(),
    CoreModule.forRoot(),
    CollapseModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BsDatepickerModule.forRoot(),
    InputTextModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production})
  ],
  exports:[ThemeModule,CollapseModule,BsDatepickerModule],
  providers: [CarService,
    AppInitializerService,
    ServerConfigService,
    AuthService,
    HttpConfigInterceptor,
    { provide: APP_INITIALIZER, useFactory: serverConfigInitializerFactory, deps: [AppInitializerService], multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    {provide: ErrorHandler,useClass:HttpErrorHandler}
  ],
  bootstrap: [AppComponent],
  entryComponents:[]
})
export class AppModule { }
