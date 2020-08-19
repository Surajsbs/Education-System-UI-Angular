import { NgModule } from '@angular/core';
import { NotificationRoutingModule } from '../notification/notification-routing.module';
import { NotificationViewComponent } from '../../notification/notification-view.component';
import { NotificationCreateComponent } from '../../notification/notification-create.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from '../../../../material.module';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { NotificationService } from '../../../../_services/notification.service';
import { MAT_CHECKBOX_CLICK_ACTION } from '@angular/material/checkbox';

@NgModule({
  imports: [ 
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    MaterialModule,
    NotificationRoutingModule    
  ],
  declarations: [
    NotificationViewComponent,
    NotificationCreateComponent
  ],
  providers: [
    NotificationService,
    { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false }},
    { provide: MAT_CHECKBOX_CLICK_ACTION, useValue: 'check' }
  ],
})
export class NotificationModule { }
