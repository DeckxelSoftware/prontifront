import {Component, Inject, Input, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CreateUpdateModalParameters} from "./interfaces/create-update-modal-parameters";
import {FormField} from '../../forms/interfaces/form-field';
import {MatStepperArray} from "../../forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: "app-create-update-modal",
  templateUrl: "./create-update-modal.component.html",
  styleUrls: ["./create-update-modal.component.scss"],
})
export class CreateUpdateModalComponent implements OnInit {
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
    this.submitButtonDisabled = typeof this.data.submitButtonDisabled ==="boolean" ? this.data.submitButtonDisabled :true;
    this.showHtml = true;
  }

  fieldChanged(event: any) {
    this.data.route.fieldModalChanged(event, this);
  }

  createOrEdit() {
    this.data.route.createOrEditModal(this);
  }

  enableButton(value: boolean) {
    this.submitButtonDisabled = !value;
  }

  closeModal() {
    this.dialogRef.close();
  }

  clearForm() {
    this.arrayForms = [];
  }

  autocompleteChanged(event: any) {
    this.data.route.searchAutoComplete(event);
  }
}
