import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClassRoutingModule } from "./class.routing.module";
import { ClassComponent } from '../../class/class.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ClassRoutingModule
  ],
  declarations: [
    ClassComponent
  ]
})
export class ClassModule { }
