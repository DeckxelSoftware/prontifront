import {Component, Input, OnInit} from '@angular/core';
import {AsientoContableCabeceraResponseDto} from '../../servicios/dto/asiento-contable-cabecera.response-dto';
import {AsientoContableCabeceraFindDto} from '../../servicios/dto/asiento-contable-cabecera.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpAsientoContableCabeceraService} from '../../servicios/http-asiento-contable-cabecera-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {AsientoContableCabeceraCreateDto} from '../../servicios/dto/asiento-contable-cabecera.create-dto';
import {AsientoContableCabeceraUpdateDto} from '../../servicios/dto/asiento-contable-cabecera.update-dto';
import {FormAsientoContableCabeceraEnum} from '../../form/form-asiento-contable-cabecera.enum';
import {FORM_ASIENTO_CONTABLE_CABECERA} from '../../form/form-asiento-contable-cabecera';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {TipoTransaccionEnum} from '../../../../enums/tipo-transaccion.enum';
import {TipoAsientoContableEnum} from '../../../../enums/tipo-asiento-contable.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import * as dayjs from 'dayjs'
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ActivatedRoute, Router} from '@angular/router';
import {CuentaContableFindDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto';
import {HttpCuentaContableService} from '../../../cuenta-contable/servicios/http-cuenta-contable-service';
import {HttpChequeService} from '../../../cheque/servicios/http-cheque-service';
import {CuentaContableResponseDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';
import {ChequeFindDto} from '../../../cheque/servicios/dto/cheque.find-dto';
import {ChequeResponseDto} from '../../../cheque/servicios/dto/cheque.response-dto';

@Component({
  selector: 'app-asiento-contable-cabecera-tabla',
  templateUrl: './asiento-contable-cabecera-tabla.component.html',
  styleUrls: ['./asiento-contable-cabecera-tabla.component.scss']
})
export class AsientoContableCabeceraTablaComponent extends AbstractTable<AsientoContableCabeceraResponseDto, AsientoContableCabeceraFindDto>
  implements OnInit, TableAbstractClass<AsientoContableCabeceraResponseDto>, AutocompleteFormInterface {


  @Input()
  idSubgrupo!: number;


  searchBarGestionTransaccion: FormField[] = [

    {
      help: 'Puede buscar por código referencial de asiento',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo de transacción',
      formControlName: 'tipoTransaccion',
      type: fieldType.select,
      help: 'Seleccione el tipo de transacción',
      select: {
        filterBy: 'tipoTransaccion',
        dataKey: 'tipoTransaccion',
        filterPlaceholder: 'I = Ingreso, E = Egreso, D = Diario, T = Transferencia',
        optionLabel: 'nombre',
        options: [
          {
            tipoTransaccion: TipoTransaccionEnum.Ingreso,
            nombre: 'Ingreso',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Egreso,
            nombre: 'Egreso',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Diario,
            nombre: 'Diario',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Transferencia,
            nombre: 'Transferencia',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Ingrese/Egreso/Diario/Transferencia',
      column: '6',
      actualValue: '',
    },
  ];
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por código referencial de asiento',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
      column: '6',
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

    {
      label: 'Tipo asiento contable',
      formControlName: 'tipoAsientoContable',
      type: fieldType.select,
      help: 'Seleccione el tipo de asiento contable',
      select: {
        filterBy: 'tipoAsientoContable',
        dataKey: 'tipoAsientoContable',
        filterPlaceholder: 'E = Efectivo, B = Banco, C = Cheque, M = Medio Digital',
        optionLabel: 'nombre',
        options: [
          {
            tipoAsientoContable: TipoAsientoContableEnum.Efectivo,
            nombre: 'Efectivo',
          },
          {
            tipoAsientoContable: TipoAsientoContableEnum.Cheque,
            nombre: 'Cheque',
          },
          {
            tipoAsientoContable: TipoAsientoContableEnum.MedioDigital,
            nombre: 'Medio Digital',
          },
          {
            tipoAsientoContable: TipoAsientoContableEnum.Banco,
            nombre: 'Banco',
          },
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Efectivo / Medio Digital / Banco / Cheque',
      column: '6',
      actualValue: '',
    },


    {
      label: 'Tipo de transacción',
      formControlName: 'tipoTransaccion',
      type: fieldType.select,
      help: 'Seleccione el tipo de transacción',
      select: {
        filterBy: 'tipoTransaccion',
        dataKey: 'tipoTransaccion',
        filterPlaceholder: 'I = Ingreso, E = Egreso, D = Diario, T = Transferencia',
        optionLabel: 'nombre',
        options: [
          {
            tipoTransaccion: TipoTransaccionEnum.Ingreso,
            nombre: 'Ingreso',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Egreso,
            nombre: 'Egreso',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Diario,
            nombre: 'Diario',
          },
          {
            tipoTransaccion: TipoTransaccionEnum.Transferencia,
            nombre: 'Transferencia',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Ingrese/Egreso/Diario/Transferencia',
      column: '6',
      actualValue: '',
    },


    {
      label: 'Asiento Cerrado',
      formControlName: 'asientoCerrado',
      type: fieldType.select,
      help: 'Seleccione por asiento cerrado',
      select: {
        filterBy: 'asientoCerrado',
        dataKey: 'asientoCerrado',
        filterPlaceholder: 'S = Si, N = No',
        optionLabel: 'nombre',
        options: [
          {
            asientoCerrado: SiNoEnum.SI,
            nombre: 'SI',
          },
          {
            asientoCerrado: SiNoEnum.NO,
            nombre: 'NO',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },

  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpAsientoContableCabeceraService: HttpAsientoContableCabeceraService,
    public confirmationService: ConfirmationService,
    private _router: Router,
    private _httpCuentaContableService: HttpCuentaContableService,
    private _httpChequeService: HttpChequeService,
    private _activatedRoute: ActivatedRoute
  ) {
    super(
      httpAsientoContableCabeceraService,
      {
        nombreRegistro: 'Asiento Contable Cabecera',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {

    if (this.idSubgrupo) {
      this.findDto.idSubgrupoContable = this.idSubgrupo;
    }

    this.stablishSkipAndTake(0, TAKE);


    // this.tableData = [{
    //   id: 1,
    //  fecha: '12/12/2020',
    //   anio: 2022,
    //   mesPeriodo: '12',
    //   tipoTransaccion: 'I',
    //   tipoAsientoContable: 'E',
    //   codigoReferenciaAsientoContable: '123123213',
    //   totalDebito: 123.23,
    //   totalCredito: 345.34,
    //   totalSaldoActualFecha: 1234.341,
    //   asientoCerrado: 'S'
    // }]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      // values.idCuentaContable = 1;
      // values.idSugrupoContable = 1;

      values.diferencia = 0;
      values.totalDebito = 0;
      values.totalCredito = 0;
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpAsientoContableCabeceraService
        .createOne(values as AsientoContableCabeceraCreateDto)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error creando Asiento Contable Cabecera", data: values});
          },
        });
    } else {
      console.log('loquevoy a enviar', values);

      if(Number(values.totalDebito) > 0 && Number(values.totalCredito) > 0){
        values.diferencia = Number(values.totalDebito) && Number(values.totalCredito)
      }else {
        // values.diferencia = 0;
        // values.totalDebito = 0;
        // values.totalCredito = 0;
      }
      this.blockuiService.habilitarBlockUI();
      this.httpAsientoContableCabeceraService
        .updateById(values as AsientoContableCabeceraUpdateDto, this.recordUpdated.id as number)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error actualizando Asiento Contable Cabecera", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if(event.formControlName === 'totalDebito'){
      event.formGroup.get('totalDebito')?.setValue(Number(event.actualValue.toFixed(2)))
    }

    if(event.formControlName === 'totalCredito'){
      event.formGroup.get('totalCredito')?.setValue(Number(event.actualValue.toFixed(2)))
    }

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
      if (event.formControlName === 'tipoTransaccion') {
        this.findDto.tipoTransaccion = event.actualValue?.tipoTransaccion
      }

      if (event.formControlName === 'tipoAsientoContable') {
        this.findDto.tipoAsientoContable = event.actualValue?.tipoAsientoContable
      }

      if (event.formControlName === 'asientoCerrado') {
        this.findDto.asientoCerrado = event.actualValue?.asientoCerrado
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
      // case FormAsientoContableCabeceraEnum.cuentaContable:
      //   this.buscarAutocompleteCuentaContable(event);
      //   break;
      case FormAsientoContableCabeceraEnum.cheque:
        this.buscarAutocompleteCheque(event);
        break;
    }
  }

  buscarAutocompleteCuentaContable(evento: SearchAutoCompleteInterface) {
    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
      sisHabilitado: ActivoInactivo.Activo
    };
    this._httpCuentaContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CuentaContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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


  buscarAutocompleteCheque(evento: SearchAutoCompleteInterface) {
    const busqueda: ChequeFindDto = {
      busqueda: evento.query,
      sisHabilitado: ActivoInactivo.Activo
    };
    this._httpChequeService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ChequeResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
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


  createOrEdit(record?: AsientoContableCabeceraResponseDto) {
    const formArray = [
      ...FORM_ASIENTO_CONTABLE_CABECERA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      if (record.fecha) {
        this.recordUpdated.fecha = dayjs(record.fecha).format('YYYY-MM-DD');
      }

      // let objetoCheque = {};
      // const objetoCuentaContable = {
      //   idCuentaContable: {
      //     nombre: record.idCuentaContable?.nombre,
      //   }
      // }
      //
      // if (record.idCheque){
      //   objetoCheque = {
      //     idCheque: {
      //       numeroCheque: `${record.idCheque?.numeroCheque}`,
      //     },
      //   }
      // }

      // if (record.idCheque) {
      //   this.recordUpdated.idCheque = {
      //     numeroCheque: record.idCheque.numeroCheque,
      //   };
      // }
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;

     this.createEditFormArray = this.createEditFormArray.filter((elementi, indice, arreglo)=> !(indice === 8 || indice == 9))
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  irAGestion(idAsientoContable: number, ruta: string[]) {
    
      this._router.navigate([
        'contabilidad',
        'asiento-contable-cabecera-modulo',
        idAsientoContable,
        ...ruta]);
    
  }

}
