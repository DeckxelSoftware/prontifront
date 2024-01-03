import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { PersonalComponent } from './personal.component';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    PersonalComponent
  ],
  imports: [
    CommonModule,
    PersonalRoutingModule,
    CardModule
  ]
})
export class PersonalModule { }
