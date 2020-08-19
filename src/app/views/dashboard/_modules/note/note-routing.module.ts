import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoteCreateComponent } from '../../notes/note-create.component';
import { NoteViewComponent } from '../../notes/note-view.component';
import { AuthGuard } from '../../../../_helper/auth.guard';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notes'
    },
    children: [
      {
        path: '',
        redirectTo: 'create'
      },
      {
        path: 'create',
        component: NoteCreateComponent,
        data: {
          title: 'Create'
        },
        canActivate: [AuthGuard]
      },
      {
        path: 'list',
        component: NoteViewComponent,
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
export class NoteRoutingModule {}
