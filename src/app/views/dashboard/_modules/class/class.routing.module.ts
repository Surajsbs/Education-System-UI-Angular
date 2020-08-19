import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../../_helper/auth.guard';
import { ClassComponent } from "../../class/class.component";

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Class'
    },
    children: [
      {
        path: '',
        redirectTo: 'create'
      },
      {
        path: 'create',
        component: ClassComponent,
        data: {
          title: 'Create Class'
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
export class ClassRoutingModule {}
