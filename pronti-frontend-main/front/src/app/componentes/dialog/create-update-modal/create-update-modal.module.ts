import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CreateUpdateModalComponent } from "./create-update-modal.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { AccordionModule } from "primeng/accordion";
import {MatDialogModule} from '@angular/material/dialog';
import {FormContainerModule} from '../../forms/form-container/form-container.module';

@NgModule({
  declarations: [CreateUpdateModalComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatExpansionModule,
    AccordionModule,
    FormContainerModule,
  ],
})
export class CreateUpdateModalModule {}
