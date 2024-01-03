import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ListInfoComponent } from "./list-info.component";
import { MatTabsModule } from "@angular/material/tabs";
import {MatIconModule} from "@angular/material/icon";
import {FormContainerModule} from '../../forms/form-container/form-container.module';

@NgModule({
  declarations: [ListInfoComponent],
  exports: [ListInfoComponent],
  imports: [CommonModule, MatTabsModule, MatIconModule, FormContainerModule],
})
export class ListInfoModule {}
