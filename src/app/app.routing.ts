import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { HomeLayoutComponent } from './containers/home/layout/home-layout.component';

import { P404Component } from './error/404.component';
import { P500Component } from './error/500.component';
import { DashboardLayoutComponent } from './containers/dashboard';
import { AuthGuard } from './_helper/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  { 
    path: '',
    component: HomeLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./views/home/home.module').then(m => m.HomeModule)
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      }
    ]
  },
  {
    path: '404',
    component: P404Component,
    data: { title: 'Page 404' }
  },
  {
    path: '500',
    component: P500Component,
    data: { title: 'Page 500' }
  },
  { 
    path: '**', 
    component: P404Component
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
