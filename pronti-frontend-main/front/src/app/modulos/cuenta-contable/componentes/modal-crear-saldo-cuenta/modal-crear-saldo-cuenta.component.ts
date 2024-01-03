import {Component, Inject, OnInit} from '@angular/core';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {FormField} from "../../../../componentes/forms/interfaces/form-field";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {FormCuentaContableEnum} from "../../form/form-cuenta-contable.enum";
import {FormGroup} from "@angular/forms";
import {TipoCuentaEnum} from "../../../../enums/tipo-cuenta.enum";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {CuentaContableResponseDto} from "../../servicios/dto/cuenta-contable.response-dto";
import {HttpCuentaContableService} from "../../servicios/http-cuenta-contable-service";
import {CuentaContableFindDto} from "../../servicios/dto/cuenta-contable.find-dto";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";

@Component({
  selector: 'app-modal-crear-saldo-cuenta',
  templateUrl: './modal-crear-saldo-cuenta.component.html',
  styleUrls: ['./modal-crear-saldo-cuenta.component.scss']
})
export class ModalCrearSaldoCuentaComponent implements OnInit {
  modalTitle = "";
  modalDescription = "";
  arrayAccordeon: MatStepperArray[] = [];
  arrayForms: FormField[] = [];
  buttonLabel = "Submit";
  meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  submitButtonDisabled = true;
  showHtml = false;
  habilitarCalcularSaldo = false;

  constructor(
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: CreateUpdateModalParameters,
    public logService: LogsMlabsService,
    public httpCuentaContableService: HttpCuentaContableService,
    public blockUiService: BlockuiService,
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
    if (
      event.formControlName === FormCuentaContableEnum.idPeriodoContable ||
      event.formControlName === FormCuentaContableEnum.nombre ||
      event.formControlName === FormCuentaContableEnum.tipoCuenta ||
      event.formControlName === FormCuentaContableEnum.eneroDebito ||
      event.formControlName === FormCuentaContableEnum.eneroCredito ||
      event.formControlName === FormCuentaContableEnum.febreroDebito ||
      event.formControlName === FormCuentaContableEnum.febreroCredito ||
      event.formControlName === FormCuentaContableEnum.marzoDebito ||
      event.formControlName === FormCuentaContableEnum.marzoCredito ||
      event.formControlName === FormCuentaContableEnum.abrilDebito ||
      event.formControlName === FormCuentaContableEnum.abrilCredito ||
      event.formControlName === FormCuentaContableEnum.mayoDebito ||
      event.formControlName === FormCuentaContableEnum.mayoCredito ||
      event.formControlName === FormCuentaContableEnum.junioDebito ||
      event.formControlName === FormCuentaContableEnum.junioCredito ||
      event.formControlName === FormCuentaContableEnum.julioDebito ||
      event.formControlName === FormCuentaContableEnum.julioCredito ||
      event.formControlName === FormCuentaContableEnum.agostoDebito ||
      event.formControlName === FormCuentaContableEnum.agostoCredito ||
      event.formControlName === FormCuentaContableEnum.septiembreDebito ||
      event.formControlName === FormCuentaContableEnum.septiembreCredito ||
      event.formControlName === FormCuentaContableEnum.octubreDebito ||
      event.formControlName === FormCuentaContableEnum.octubreCredito ||
      event.formControlName === FormCuentaContableEnum.noviembreDebito ||
      event.formControlName === FormCuentaContableEnum.noviembreCredito ||
      event.formControlName === FormCuentaContableEnum.diciembreDebito ||
      event.formControlName === FormCuentaContableEnum.diciembreCredito
    ) {
      this.setearSaldosACero(event.formGroup);
      this.setearCreditoDebitoActualACero(event.formGroup);
      if (event.formGroup.get('idPeriodoContable')?.value.anio && event.formGroup.get('nombre')?.value && event.formGroup.get('tipoCuenta')?.value) {
        this.habilitarCalcularSaldo = true;
      }
    }

    this.data.route.fieldModalChanged(event, this);

  }

  async obtenerDatosParaConsultarCuentaAnterior(formGroup: FormGroup) {
    if (formGroup.get('idPeriodoContable')?.value.anio && formGroup.get('nombre')?.value) {
      const periodoSeleccionado = formGroup.get('idPeriodoContable')?.value;
      const nombreCuentaIngresado = formGroup.get('nombre')?.value;
      const anioPeriodoAnterior = periodoSeleccionado.anio - 1;
      try {
        this.blockUiService.habilitarBlockUI();
        const resConsultaPeriodo = await this.consultarSaldoCuentaAnterior(anioPeriodoAnterior, nombreCuentaIngresado);
        this.blockUiService.deshabilitarBlockUI();
        if (resConsultaPeriodo.length === 1) {
          // @ts-ignore
          formGroup.get('anteriorSaldo').setValue(resConsultaPeriodo[0].actualSaldo);
          // @ts-ignore
          formGroup.get('actualSaldo').setValue(resConsultaPeriodo[0].actualSaldo);

          this.logService.toaster(
            {
              titulo: 'Exito',
              mensaje: 'Anterior cuenta obtenida',
              tipo: ToasterTipo.success
            }
          )
        } else {
          this.logService.toaster(
            {
              titulo: 'Advertencia',
              mensaje: 'No se encontró la cuenta anterior',
              tipo: ToasterTipo.warning
            }
          )
          // @ts-ignore
          formGroup.get('anteriorSaldo').setValue(0);
        }
      } catch (e) {
        this.logService.toaster(
          {
            titulo: 'Advertencia',
            mensaje: 'Error consultando la cuenta anterior',
            tipo: ToasterTipo.warning
          }
        )
        // @ts-ignore
        formGroup.get('anteriorSaldo').setValue(0);
      }

    }
  }

  setearCreditoDebitoActualACero(formGroup: FormGroup) {
    formGroup.get('actualCredito')?.setValue(0);
    formGroup.get('actualDebito')?.setValue(0);
    formGroup.get('actualSaldo')?.setValue(0);
  }

  setearSaldosACero(formGroup: FormGroup) {
    this.meses.forEach(mes => {
        formGroup.get(`${mes}Saldo`)?.patchValue(0);
      }
    )
  }

  consultarSaldoCuentaAnterior(periodoAnterior: number, nombre: string): Promise<CuentaContableResponseDto[]> {
    const busqueda: CuentaContableFindDto = {
      anio: periodoAnterior,
      nombre
    }
    return new Promise((resolve, reject) => {
      this.httpCuentaContableService.find(busqueda)
        .subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                resolve(res[0]);
              } else {
                resolve([])
              }
            },
            error: err => {
              reject(err);
            }
          }
        )
    })

    // console.log(periodoAnterior, nombre);
    // const response: CuentaContableResponseDto[] = [];
    // return response;
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

  async calcularDebitoCreditoSaldo(formGroup: FormGroup) {
    await this.obtenerDatosParaConsultarCuentaAnterior(formGroup);
    this.calcularDebitoActual(formGroup);
    this.calcularCreditoActual(formGroup);
    this.calcularSaldo(formGroup)
  }

  calcularDebitoActual(formGroup: FormGroup) {
    let debitoActual = 0;
    this.meses.forEach(mes => {
        debitoActual += this.obtenerValueDeCampo(formGroup, `${mes}Debito`)
      }
    )
    this.arrayForms[0].formGroup.get('actualDebito')?.setValue(debitoActual);
  }

  calcularCreditoActual(formGroup: FormGroup) {
    let creditoActual = 0;
    this.meses.forEach(mes => {
        creditoActual += this.obtenerValueDeCampo(formGroup, `${mes}Credito`)
      }
    )
    this.arrayForms[0].formGroup.get('actualCredito')?.setValue(creditoActual);
  }


  obtenerValueDeCampo(formGroup: FormGroup, nombreCampo: string) {
    return formGroup.get(`${nombreCampo}`)?.value ? formGroup.get(`${nombreCampo}`)?.value : 0;
  }

  calcularSaldo(formGroup: FormGroup) {
    let actualSaldo = formGroup.get('actualSaldo')?.value;
    if (formGroup.get('tipoCuenta')?.value.tipoCuenta) {
      const tipoCuenta = formGroup.get('tipoCuenta')?.value.tipoCuenta;
      if (tipoCuenta === TipoCuentaEnum.acreedora) {
        //saldo(mes) = actual_saldo - débito(mes) + crédito(mes)
        // actual_saldo = actual_saldo -débito(mes) + crédito(mes)
        this.meses.forEach(mes => {
            const saldoMes = actualSaldo - this.obtenerValueDeCampo(formGroup, `${mes}Debito`) + this.obtenerValueDeCampo(formGroup, `${mes}Credito`);
            actualSaldo = saldoMes;
            formGroup.get(`${mes}Saldo`)?.setValue(saldoMes);
          }
        )
        formGroup.get(`actualSaldo`)?.setValue(actualSaldo);
      } else if (tipoCuenta === TipoCuentaEnum.deudora) {
        // saldo(mes)= actual_saldo +debito(mes) - credito(mes)
        // actual_saldo = actual_saldo +debito(mes) - credito(mes)
        this.meses.forEach(mes => {
            const saldoMes = actualSaldo + this.obtenerValueDeCampo(formGroup, `${mes}Debito`) - this.obtenerValueDeCampo(formGroup, `${mes}Credito`);
            actualSaldo = saldoMes;
            formGroup.get(`${mes}Saldo`)?.setValue(saldoMes);
          }
        )
        formGroup.get(`actualSaldo`)?.setValue(actualSaldo);
      }
    }
  }


}
