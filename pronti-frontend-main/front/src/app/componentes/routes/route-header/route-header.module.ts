import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouteHeaderComponent} from './route-header.component';


@NgModule({
  declarations: [RouteHeaderComponent],
  imports: [
    CommonModule
  ],
  exports: [RouteHeaderComponent]
})
export class RouteHeaderModule {
}
