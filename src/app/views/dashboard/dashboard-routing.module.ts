import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../_helper/auth.guard';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: '',
        component: DashboardComponent,
        data: {
          title: ''
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'registration',
        loadChildren: () => import('./_modules/registration/register.module').then(m => m.RegisterModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notes',
        loadChildren: () => import('./_modules/note/note.module').then(m => m.NoteModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'assignment',
        loadChildren: () => import('./_modules/assignment/assignment.module').then(m => m.AssignmentModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'notification',
        loadChildren: () => import('./_modules/notification/notification.module').then(m => m.NotificationModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'class',
        loadChildren: () => import('./_modules/class/class.module').then(m => m.ClassModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
