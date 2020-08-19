import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationCreateComponent } from '../../notification/notification-create.component';
import { NotificationViewComponent } from '../../notification/notification-view.component';
import { AuthGuard } from '../../../../_helper/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notification'
    },
    children: [
      {
        path: '',
        redirectTo: 'create'
      },
      {
        path: 'create',
        component: NotificationCreateComponent,
        data: {
          title: 'Create'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'view',
        component: NotificationViewComponent,
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
export class NotificationRoutingModule {}
