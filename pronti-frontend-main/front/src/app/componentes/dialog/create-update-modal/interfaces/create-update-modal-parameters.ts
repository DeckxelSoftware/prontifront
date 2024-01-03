import {FormField} from '../../../forms/interfaces/form-field';
import {MatStepperArray} from "../../../forms/form-container/interfaces/mat-stepper-array";

export interface CreateUpdateModalParameters {
  title: string;
  description: string;
  accordeons?: MatStepperArray[];
  formsFields: FormField[];
  button: string;
  route: any;
  submitButtonDisabled?: boolean;
}
