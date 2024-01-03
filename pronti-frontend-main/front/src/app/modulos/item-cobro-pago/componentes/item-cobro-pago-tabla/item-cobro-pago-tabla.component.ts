import {Component, OnInit} from '@angular/core';
import {ItemCobroPagoResponseDto} from '../../servicios/dto/item-cobro-pago.response-dto';
import {ItemCobroPagoFindDto} from '../../servicios/dto/item-cobro-pago.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpItemCobroPagoService} from '../../servicios/http-item-cobro-pago-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {ItemCobroPagoCreateDto} from '../../servicios/dto/item-cobro-pago.create-dto';
import {ItemCobroPagoUpdateDto} from '../../servicios/dto/item-cobro-pago.update-dto';
import {FormItemCobroPagoEnum} from '../../form/form-item-cobro-pago.enum';
import {FORM_ITEM_COBRO_PAGO} from '../../form/form-item-cobro-pago';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {CuentaContableFindDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto';
import {HttpCuentaContableService} from '../../../cuenta-contable/servicios/http-cuenta-contable-service';
import {CuentaContableResponseDto} from '../../../cuenta-contable/servicios/dto/cuenta-contable.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';

@Component({
  selector: 'app-item-cobro-pago-tabla',
  templateUrl: './item-cobro-pago-tabla.component.html',
  styleUrls: ['./item-cobro-pago-tabla.component.scss']
})
export class ItemCobroPagoTablaComponent extends AbstractTable<ItemCobroPagoResponseDto, ItemCobroPagoFindDto>
  implements OnInit, TableAbstractClass<ItemCobroPagoResponseDto>, AutocompleteFormInterface {

  nombreCuentaEnFormulario = '';

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre de ítem',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: Incripción',
      column: '6',
      actualValue: '',
    },

    {
      label: 'Cuenta contable',
      placeholder: 'Ej:Bancos',
      help: 'Seleccione una cuenta contable',
      formControlName: 'idCuentaContable',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
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
    public httpItemCobroPagoService: HttpItemCobroPagoService,
    public confirmationService: ConfirmationService,
    private _httpCuentaContableService: HttpCuentaContableService
  ) {
    super(
      httpItemCobroPagoService,
      {
        nombreRegistro: 'Item Cobro Pago',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
    // this.tableData = [{
    //   id: 1,
    //   nombreCuenta: 'Banvo 3',
    //   idCuentaContable: {
    //     id: 1,
    //     nombre: 'Banco 3'
    //   },
    //   nombreItem: 'nombre'
    // }]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    values.nombreCuenta = this.nombreCuentaEnFormulario;
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpItemCobroPagoService
        .createOne(values as ItemCobroPagoCreateDto)
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
            console.error({error: error, message: "Error creando Item Cobro Pago", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpItemCobroPagoService
        .updateById(values as ItemCobroPagoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Item Cobro Pago", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    console.log(event)
    if (event.formControlName === 'idCuentaContable') {
      // event.formGroup.get('nombreCuenta')?.setValue(event.actualValue.nombre);
      this.nombreCuentaEnFormulario = event.actualValue.nombre;
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
      if (event.formControlName === 'idCuentaContable') {
        this.findDto.idCuentaContable = event.actualValue.id;
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
      case FormItemCobroPagoEnum.cuentaContable:
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


  createOrEdit(record?: ItemCobroPagoResponseDto) {
    const formArray = [
      ...FORM_ITEM_COBRO_PAGO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
