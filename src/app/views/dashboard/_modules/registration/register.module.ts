import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RegisterViewComponent } from '../../register/register-view.component';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from '../../register/register.component';
import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { RegistrationService } from '../../../../_services/registration.service';
import { MaterialModule } from '../../../../material.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    RegisterViewComponent,
    RegisterComponent
  ],
  providers: [
    RegistrationService,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
})
export class RegisterModule { }
