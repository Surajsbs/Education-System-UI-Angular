import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignmentCreateComponent } from '../../assignment/assignment-create.component';
import { AssignmentViewComponent } from '../../assignment/assignment-view.component';
import { AuthGuard } from '../../../../_helper/auth.guard';
import { ASCreateComponent } from '../../assignment/as-create.component';
import { ASViewComponent } from '../../assignment/as-view.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Assignment'
    },
    children: [
      {
        path: '',
        redirectTo: 'create'
      },
      {
        path: 'create',
        component: AssignmentCreateComponent,
        data: {
          title: 'Create'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'view',
        component: AssignmentViewComponent,
        data: {
          title: 'View'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'submission',
        component: ASCreateComponent,
        data: {
          title: 'Submission'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'viewSubmission',
        component: ASViewComponent,
        data: {
          title: 'View Submission'
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
export class AssignmentRoutingModule {}
