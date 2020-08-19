import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterViewComponent } from '../../register/register-view.component';
import { RegisterComponent } from '../../register/register.component';
import { AuthGuard } from '../../../../_helper/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Registration'
    },
    children: [
      {
        path: '',
        redirectTo: 'register'
      },
      {
        path: 'register',
        component: RegisterComponent,
        data: {
          title: 'Create'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'view',
        component: RegisterViewComponent,
        data: {
          title: 'View'
        },
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterRoutingModule {}
