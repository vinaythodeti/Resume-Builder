import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './_shared/helpers/auth-guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren:() => import('./home/home.module')
        .then(m => m.HomeModule) 
  },
  {
    path: 'authentication',
    loadChildren:() => import('./authentication/authentication.module')
        .then(m => m.AuthenticationModule) 
  },
  {
        path: 'products',
        loadChildren: () => import('./community/community.module')
          .then(m => m.CommunityModule)
      },
      {
        path: 'courses',
        loadChildren: () => import('./courses/courses.module')
          .then(m => m.CoursesModule),
      },
      {
        path: 'chats',
        loadChildren: () => import('./chats/chats.module')
          .then(m => m.ChatsModule),
      },
      {
        path: 'blogs',
        loadChildren: () => import('./blogs/blogs.module')
          .then(m => m.BlogsModule),
      },
      {
        path: 'donate',
        loadChildren: () => import('./donate/donate.module')
          .then(m => m.DonateModule),
      },
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

const config: ExtraOptions = {
  useHash: true,
  onSameUrlNavigation: "reload"
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
