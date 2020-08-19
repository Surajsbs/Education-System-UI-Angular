import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { RegisterModule } from './_modules/registration/register.module';
import { NoteModule } from './_modules/note/note.module';
import { AssignmentModule } from './_modules/assignment/assignment.module';
import { ClassModule } from "./_modules/class/class.module";
import { DashboardComponent } from './dashboard.component';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MaterialModule } from '../../material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';

@NgModule({
  imports: [
    MaterialModule,
    BsDropdownModule,
    NgbModule,
    CollapseModule.forRoot(),
    DashboardRoutingModule,
    RegisterModule,
    NoteModule,
    AssignmentModule,
    ClassModule
  ],
  declarations:[
    DashboardComponent
  ]
})
export class DashboardModule { }
