import {FormField} from "../../interfaces/form-field";
import {FormGroup} from "@angular/forms";

export interface MatStepperArray {
  labelHtml?: string;
  id: string;
  formGroup: FormGroup;
  editable?: boolean;
  fieldsArray?: FormField[];
}
