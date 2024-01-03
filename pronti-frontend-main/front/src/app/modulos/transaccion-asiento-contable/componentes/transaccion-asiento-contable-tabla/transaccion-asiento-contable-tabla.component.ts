import { Component, Input, OnInit } from '@angular/core';
import { TransaccionAsientoContableResponseDto } from '../../servicios/dto/transaccion-asiento-contable.response-dto';
import { TransaccionAsientoContableFindDto } from '../../servicios/dto/transaccion-asiento-contable.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpTransaccionAsientoContableService } from '../../servicios/http-transaccion-asiento-contable-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { TransaccionAsientoContableCreateDto } from '../../servicios/dto/transaccion-asiento-contable.create-dto';
import { TransaccionAsientoContableUpdateDto } from '../../servicios/dto/transaccion-asiento-contable.update-dto';
import { FormTransaccionAsientoContableEnum } from '../../form/form-transaccion-asiento-contable.enum';
import { FORM_TRANSACCION_ASIENTO_CONTABLE } from '../../form/form-transaccion-asiento-contable';
import { AbstractTable } from "../../../../abstract/table/abstract-table";
import { TAKE } from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import { MENSAGE_TOAST } from "../../../../constantes/toaster/mensaje-toast";
import { fieldType, FormField, SearchAutoCompleteInterface } from "../../../../componentes/forms/interfaces/form-field";
import { BlockuiService } from "../../../../servicios/block-ui/blockui.service";
import { LogsMlabsService } from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import { TableAbstractClass } from "../../../../abstract/table/interfaces/table-abstract-class";
import { ModalComponent } from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import { AutocompleteFormInterface } from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { CuentaContableFindDto } from '../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto';
import { HttpCuentaContableService } from '../../../cuenta-contable/servicios/http-cuenta-contable-service';
import { CuentaContableResponseDto } from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';
import {
  HttpAsientoContableCabeceraService
} from "../../../asiento-contable-cabecera/servicios/http-asiento-contable-cabecera-service";
import {
  AsientoContableCabeceraResponseDto
} from "../../../asiento-contable-cabecera/servicios/dto/asiento-contable-cabecera.response-dto";
import { TransaccionesServiceService } from "../../servicios/transacciones-service.service";

@Component({
  selector: 'app-transaccion-asiento-contable-tabla',
  templateUrl: './transaccion-asiento-contable-tabla.component.html',
  styleUrls: ['./transaccion-asiento-contable-tabla.component.scss']
})
export class TransaccionAsientoContableTablaComponent extends AbstractTable<TransaccionAsientoContableResponseDto, TransaccionAsientoContableFindDto>
  implements OnInit, TableAbstractClass<TransaccionAsientoContableResponseDto>, AutocompleteFormInterface {

  @Input()
  idAsientoContable = 0;

  takeTotal = 0;

  asientoContableCabecera: AsientoContableCabeceraResponseDto = {};

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por detalle',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
      column: '12',
      actualValue: '',
    },
    // {
    //   label: 'Habilitado',
    //   formControlName: 'sisHabilitado',
    //   type: fieldType.select,
    //   help: 'Seleccione si esta habilitado o no',
    //   select:{
    //     filterBy:'sisHabilitado',
    //     dataKey:'sisHabilitado',
    //     filterPlaceholder:'0 = Inactivo, 1 = Activo',
    //     optionLabel: 'nombre',
    //     options:[
    //       {
    //         sisHabilitado:ActivoInactivo.Activo,
    //         nombre: 'Activo',
    //       },
    //       {
    //         sisHabilitado:ActivoInactivo.Inactivo,
    //         nombre: 'Inactivo',
    //       }
    //     ]
    //   },
    //   initialValue: "",
    //   validators: [],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   placeholder: 'Ej: Activo / Inactivo',
    //   column: '6',
    //   actualValue: '',
    // },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpTransaccionAsientoContableService: HttpTransaccionAsientoContableService,
    public confirmationService: ConfirmationService,
    private _httpCuentaContableService: HttpCuentaContableService,
    private _httpAsientoContableCabeceraService: HttpAsientoContableCabeceraService,
    private _transaccionService: TransaccionesServiceService
  ) {
    super(
      httpTransaccionAsientoContableService,
      {
        nombreRegistro: 'Transacción Asiento Contable',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.consultarAsientoContable();
    this.stablishSkipAndTake(0, TAKE);
    this.findDto.idAsientoContableCabecera = this.idAsientoContable;
    this.findDto.sisHabilitado = ActivoInactivo.Activo;
    // this.tableData = [{
    //   id: 1,
    //   detalle: 'asdfadsf',
    //   valorDebito: 12,
    //   valorCredito: 12
    // }]
    // this.recalcular();
  }

  consultarAsientoContable() {
    this._httpAsientoContableCabeceraService.find({ id: this.idAsientoContable }).subscribe({
      next: (asientoContable: [AsientoContableCabeceraResponseDto[], number]) => {
        if (asientoContable[0][0]) {
          this.asientoContableCabecera = asientoContable[0][0];
          this._transaccionService.asientoContableCabeceraSubject$.next(asientoContable[0][0]);
          if (asientoContable[0][0].transaccionAsientoContableCollection ) {
            this.tableData = asientoContable[0][0].transaccionAsientoContableCollection.filter( transaccion => transaccion.sisHabilitado === 'A');
          }
          // this.recalcular();
        }
      },
      error: err => {
        console.error('no existe el asiento contable cabecera', err)
      }
    })
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    // this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idAsientoContableCabecera = Number(this.idAsientoContable);
      this.blockuiService.habilitarBlockUI();
      this.httpTransaccionAsientoContableService
        .createOne(values as TransaccionAsientoContableCreateDto)
        .subscribe({
          next: (resp) => {

            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            // this.addRegistroTablaLocal(resp);
            // this.recalcular();
            closeModal.closeModal();
            this.searchData();
            setTimeout(() => {
              this.consultarAsientoContable();
              this.blockuiService.deshabilitarBlockUI();
            }, 2000);
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({ error: error, message: "Error creando Transaccion Asiento Contable", data: values });
          },
        });

      this._transaccionService.asientoContableCabeceraSubject$.next(this.asientoContableCabecera);
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpTransaccionAsientoContableService
        .updateById(values as TransaccionAsientoContableUpdateDto, this.recordUpdated.id as number)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );


            /*      const objetoEditar = {
                    ...this.recordUpdated,
                    ...values
                  }

                  this.actualizarRegistroTablaLocal(objetoEditar);
                  this.recalcular();*/

            closeModal.closeModal();
            this.searchData();
            setTimeout(() => {
              this.consultarAsientoContable();
              this.blockuiService.deshabilitarBlockUI();
            }, 2000);
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({ error: error, message: "Error actualizando Transaccion Asiento Contable", data: values });
          },
        });
    }
  }

  /*  actualizarRegistroTablaLocal(registro: TransaccionAsientoContableResponseDto) {
      const indiceTransaccionEditar = this.tableData.findIndex(transacccion => {
        return transacccion.id === registro.id;
      });
      this.tableData[indiceTransaccionEditar] = registro;
    }

    addRegistroTablaLocal(registro: TransaccionAsientoContableResponseDto) {
      this.tableData.push(registro);
    }*/


  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid) {
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Crear ' : 'Actualizar'} `,
      route: this,
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      // Habilitar boton
      this.searchButtonDisabled = false;
    } else {
      // limpiar dto
      this.clearFindDto();
      // Deshabilitar boton
      this.searchButtonDisabled = false;
    }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      case FormTransaccionAsientoContableEnum.idCuentaContable:
        this.buscarAutocomplete(event);
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
    };
    this._httpCuentaContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CuentaContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }


  createOrEdit(record?: TransaccionAsientoContableResponseDto) {
    const formArray = [
      ...FORM_TRANSACCION_ASIENTO_CONTABLE(),
    ];
    this.createEditFormArray = [...formArray];

    if (record) {

      this.recordUpdated = { ...record };
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;

    } else {
      this.create = true;
      // this.recordUpdated = undefined;
      this.recordUpdated = {
        detalle: this.asientoContableCabecera.descripcion || '',
      }
      this.fillForm(this.recordUpdated, this.createEditFormArray);
    }
    this.openDialog(this.createEditFormArray);
  }

  /*
  recalcular() {
    this.sumarDebeHaberAsientoContable();
    this._transaccionService.asientoContableCabeceraSubject$.next(this.asientoContableCabecera);
  }
*/


  /*  sumarDebeHaberAsientoContable() {
      const valorDebe = this.tableData.reduce((acc: number, val: any) => {
        acc += val.valorCredito;
        return acc;
      }, 0);


      const valorHaber = this.tableData.reduce((acc: number, val: any) => {
        acc += val.valorDebito;
        return acc;
      }, 0);

      this.asientoContableCabecera.totalDebito = valorHaber;
      this.asientoContableCabecera.totalCredito = valorDebe;
    }*/

  enviarTransaccion(evento: boolean) {

    this.blockuiService.habilitarBlockUI();
    let asientoContableBDD: AsientoContableCabeceraResponseDto = {};
    this._httpAsientoContableCabeceraService.find({ id: this.idAsientoContable }).subscribe(
      {
        next: (resp) => {
          asientoContableBDD = resp[0][0];
          // this.recalcular();
          // const puedeCerrarLocalMente = this.asientoContableCabecera.totalCredito === this.asientoContableCabecera.totalDebito;
          const puedeCerrarEnBDD = asientoContableBDD.totalCredito === asientoContableBDD.totalDebito;
          if (puedeCerrarEnBDD) {
            console.log('se puede cerrar');
            this.cerrarAsientoContableCabecera();
          } else {
            alert('Los valores debe y haber no coinciden');
          }
          this.blockuiService.deshabilitarBlockUI();
        },
        error: () => {
          this.blockuiService.deshabilitarBlockUI();
        }
      }
    );
  }

  cerrarAsientoContableCabecera() {

    this.blockuiService.habilitarBlockUI();
    this._httpAsientoContableCabeceraService.updateById({ asientoCerrado: 'S' }, this.idAsientoContable)
      .subscribe({
        next: (resp) => {

          this.blockuiService.deshabilitarBlockUI();
          this._transaccionService.asientoContableCabeceraSubject$.next(resp);
          this.asientoContableCabecera = resp;
          // console.log('reps', resp);
        },
        error: (err) => {
          console.error('No se pudo cerrar el asiento contable', err);
          this.blockuiService.deshabilitarBlockUI();
        }
      })
  }


  eliminar(habilitado: boolean, registro: any) {
    registro.sisHabilitado = 'D';
    this.confirmChangeEnable(habilitado, registro);
    setTimeout(() => {
      this.consultarAsientoContable();
    }, 2000);
  }

  eliminarTransaccion(idRegistro: number) {
    console.log('registro', idRegistro)
    return this.httpTransaccionAsientoContableService.updateById({ sisHabilitado: 'D' }, idRegistro);
  }

  confirmEliminarTransaccion(registro: TransaccionAsientoContableResponseDto) {
    this.parameters.confirmationService.confirm({
      message: '¿Estás seguro de eliminar la transacción?',
      accept: () => {

        this.blockuiService.habilitarBlockUI();
        this.eliminarTransaccion(Number(registro.id)).subscribe({
          next: (resp) => {
            setTimeout(() => {
              this.consultarAsientoContable();
              this.blockuiService.deshabilitarBlockUI();
            }, 2000);
          },
          error: (err) => {
            console.error('errop', err);

            this.blockuiService.deshabilitarBlockUI();
          }
        }
        )
      },
      header: 'Eliminar transacción'
    });
  }

}

