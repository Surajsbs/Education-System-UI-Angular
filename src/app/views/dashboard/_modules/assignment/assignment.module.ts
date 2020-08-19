import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AssignmentCreateComponent } from '../../assignment/assignment-create.component';
import { AssignmentViewComponent } from '../../assignment/assignment-view.component';
import { AssignmentRoutingModule } from './assignment-routing.module';
import { MaterialModule } from '../../../../material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { AssignmentService } from "../../../../_services/assignment.service";
import { ASCreateComponent } from '../../assignment/as-create.component';
import { ASViewComponent } from '../../assignment/as-view.component';
import { ASService } from '../../../../_services/as.service';

@NgModule({
  imports: [
    NgbModule,
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AssignmentRoutingModule
  ],
  declarations: [
    AssignmentCreateComponent,
    AssignmentViewComponent,
    ASCreateComponent,
    ASViewComponent
    
  ],
  providers: [
    AssignmentService,
    ASService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class AssignmentModule { }
