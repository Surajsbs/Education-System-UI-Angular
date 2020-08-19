import {Component} from '@angular/core';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA }      from '@angular/core';


@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
@Component({
  selector: 'app-home',
  templateUrl: './home-layout.component.html'
})
export class HomeLayoutComponent {
}
