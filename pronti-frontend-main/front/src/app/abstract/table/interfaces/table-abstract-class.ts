import {FormField} from '../../../componentes/forms/interfaces/form-field';
import {ModalComponent} from '../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {MatStepperArray} from "../../../componentes/forms/form-container/interfaces/mat-stepper-array";

export interface TableAbstractClass<ResponseDto = any> {
  clearSearchForm: () => void;
  searchFieldChanged: (event: FormField) => void;
  searchBarFormFields: FormField[];
  fieldModalChanged: (event: FormField, enableButton: ModalComponent) => void;
  createOrEditModal: (closeModal: ModalComponent) => void;
  clearFindDto: () => void;
  openDialog: (formFields: FormField[], arrayAccordeon?: MatStepperArray[]) => void;
}
