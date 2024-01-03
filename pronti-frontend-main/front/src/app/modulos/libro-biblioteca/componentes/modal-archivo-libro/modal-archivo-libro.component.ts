import {Component, Inject, OnInit} from '@angular/core';
import {FormField} from '../../../../componentes/forms/interfaces/form-field';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-modal-archivo-libro',
  templateUrl: './modal-archivo-libro.component.html',
  styleUrls: ['./modal-archivo-libro.component.scss']
})
export class ModalArchivoLibroComponent implements OnInit {

  modalTitle = "";
  modalDescription = "";
  arrayAccordeon: MatStepperArray[] = [];
  arrayForms: FormField[] = [];
  buttonLabel = "Submit";

  submitButtonDisabled = true;
  showHtml = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CreateUpdateModalParameters,
  ) {
  }

  ngOnInit() {
    this.modalTitle = this.data.title;
    this.modalDescription = this.data.description;
    this.arrayAccordeon = this.data.accordeons ? this.data.accordeons : [];
    this.arrayForms = this.data.formsFields;
    this.buttonLabel = this.data.button;
    this.showHtml = true;
  }

  fieldChanged(event: any) {
    this.data.route.fieldModalChanged(event, this);
  }

  cambiarImagen() {
    this.data.route.editarImagen(this);
  }

  enableButton(value: boolean) {
    this.submitButtonDisabled = !value;
  }

  closeModal() {
    this.dialogRef.close();
  }

  clearForm(){
    this.arrayForms = [];
  }

  autocompleteChanged(event: any) {
    this.data.route.searchAutoComplete(event);
  }
}
