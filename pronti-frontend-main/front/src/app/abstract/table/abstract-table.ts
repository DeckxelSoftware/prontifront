import {FormGroup} from "@angular/forms";
import {fieldType, FormField} from '../../componentes/forms/interfaces/form-field';
import {ROWSPERPAGE} from '../../constantes/tabla/rows-per-page';
import {TableAbstractClassInterface} from './interfaces/table-abstract-class.interface';
import {MENSAGE_TOAST} from '../../constantes/toaster/mensaje-toast';
import {STARTING_ROWS} from '../../constantes/tabla/starting-rows';
import {find} from 'rxjs';
import {MatStepperArray} from "../../componentes/forms/form-container/interfaces/mat-stepper-array";

export abstract class AbstractTable<ResponseDto = any, FindDto = any> {

  searchBarFields: FormField[] = [];
  tableData: ResponseDto[] = [];
  findForm: FormGroup = new FormGroup({});
  createEditFormGroup: FormGroup = new FormGroup({});
  findDto: FindDto = {} as any;
  totalRecords = 0;
  startingRows = STARTING_ROWS;
  rowsPerPage = ROWSPERPAGE;
  searchButtonDisabled = true;
  createEditFormArray: FormField[] = [];
  accordeonFormArray: MatStepperArray[] = [];
  create = true;
  recordUpdated?: ResponseDto | any;

  constructor(private service: any, public parameters: TableAbstractClassInterface) {

  }

  searchData() {
    this.parameters.blockuiService.habilitarBlockUI();
    this.service.find(this.findDto).subscribe({
      next: (value: [ResponseDto[], number]) => {
        if (value) {
          if (value[0] && value[1]) {
            this.totalRecords = value[1];
            this.tableData = value[0];
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.busquedaExitosa(
                this.parameters.nombreRegistro
              )
            );
          } else {
            this.totalRecords = 0;
            this.tableData = [];
          }
          // this.clearSearchForm();
        }
        this.parameters.blockuiService.deshabilitarBlockUI();
      },
      error: (error: any) => {
        console.error({error: error, message: 'Error encontrando registros', data: this.findDto})
        this.parameters.blockuiService.deshabilitarBlockUI();
        this.parameters.messageService.toaster(
          MENSAGE_TOAST.error()
        );
      }
    })
  }

  lazyLoad(event: { first: number, rows: number }) {
    this.stablishSkipAndTake(event.first, event.rows);
    this.searchData()
  }

  clearSearchForm() {
    this.findForm.reset();
  }

  stablishSkipAndTake(skip: number, take: number) {
    const findDto = this.findDto as any;
    findDto.skip = skip;
    findDto.take = take;

  }

  fillForm(record: ResponseDto, formArray: FormField[]) {
    return formArray.forEach((item) => {
      const object = Object.entries(record).find((x) => item.formControlName === x[0]);
      if (object) {
        if (item.type === fieldType.select) {
          item.initialValue = {[item.formControlName]: object[1]};
        } else {
          if (item.type === fieldType.autoComplete && item.autoComplete) {
            let objectInit: any = {};
            if (item.autoComplete.field) {
              // @ts-ignore
              if (record[item.formControlName]) {
                // @ts-ignore
                objectInit[item.autoComplete.field] = record[item.formControlName][item.autoComplete.field]
                item.initialValue = objectInit[item.autoComplete.field];
              }
            } else {
              let recordAny = record as any;
              item.initialValue = recordAny[item.formControlName];
            }
          } else {
            item.initialValue = object[1];
          }
        }
      }
    });
  }

  getFormData(fieldsArray: FormField[], form: FormGroup): any {
    console.log(form);
    const actualValue: any = {};
    fieldsArray.forEach((field) => {
      const fieldFounded = form.get(field.formControlName);
      if (fieldFounded) {
        actualValue[field.formControlName] =
          field.type === fieldType.select
            ? fieldFounded.value[field.formControlName]
            : fieldFounded.value;
        if (field.autoComplete && field.type === fieldType.autoComplete) {
          if (fieldFounded.value) {
            actualValue[field.formControlName] = fieldFounded.value[field.autoComplete.inputId];
          }
        }
      }
    });
    return actualValue;
  }

  disable(enabled: boolean, record: ResponseDto) {
    this.parameters.blockuiService.habilitarBlockUI();
    const recordTyped = record as any
    this.service
      .disable(!enabled, recordTyped.id as number)
      .subscribe({
        next: (data: any) => {
          this.parameters.blockuiService.deshabilitarBlockUI();
          this.parameters.messageService.toaster(
            MENSAGE_TOAST.habilitadoExitoso(
              this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro '
            )
          );
          this.searchData();
        },
        error: (error: any) => {
          this.parameters.blockuiService.deshabilitarBlockUI();
          this.parameters.messageService.toaster(
            MENSAGE_TOAST.error('No se pudo cambiar el estado de habilitado del registro')
          );
          console.error({error: error, message: 'error deshabilitando registro', data: {record, enabled}});
        }
      });
  }

  confirmChangeEnable(enabled: boolean, record: ResponseDto) {
    this.parameters.confirmationService.confirm({
      message: '¿Estás seguro de cambiar el estado de habilitado de este registro?',
      accept: () => {
        this.disable(enabled, record)
      },
      header: 'Habilitar/Deshabilitar'
    });
  }
}


