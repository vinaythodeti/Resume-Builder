import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { ThemeModule } from '../@theme/theme.module';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AnalyticsService } from './_services/analytics.service';
import { LayoutService } from './_services/layout.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AuthenticationServiceService } from '../authentication/authentication-service.service';
import { AuthService } from '../_shared/helpers/auth.service';


export const NB_CORE_PROVIDERS = [
 // HttpConfigInterceptor,
  AnalyticsService,
  LayoutService
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ThemeModule,
    MDBBootstrapModule.forRoot()
  ],
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  declarations: [LayoutComponent,HeaderComponent,FooterComponent],
  providers:[AuthService]
})
export class CoreModule {
  constructor() {
  }

  static forRoot(): ModuleWithProviders<CoreModule> {
    return {
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS
      ],
    };
  }
}
