import {Component, OnInit} from '@angular/core';
import {CuentaBancariaEmpresaResponseDto} from '../../servicios/dto/cuenta-bancaria-empresa.response-dto';
import {CuentaBancariaEmpresaFindDto} from '../../servicios/dto/cuenta-bancaria-empresa.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpCuentaBancariaEmpresaService} from '../../servicios/http-cuenta-bancaria-empresa-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {CuentaBancariaEmpresaCreateDto} from '../../servicios/dto/cuenta-bancaria-empresa.create-dto';
import {CuentaBancariaEmpresaUpdateDto} from '../../servicios/dto/cuenta-bancaria-empresa.update-dto';
import {FormCuentaBancariaEmpresaEnum} from '../../form/form-cuenta-bancaria-empresa.enum';
import {FORM_CUENTA_BANCARIA_EMPRESA} from '../../form/form-cuenta-bancaria-empresa';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {EmpresaFindDto} from '../../../empresa/servicios/dto/empresa.find-dto';
import {HttpEmpresaService} from '../../../empresa/servicios/http-empresa-service';
import {EmpresaResponseDto} from '../../../empresa/servicios/dto/empresa.response-dto';
import {HttpBancoService} from '../../../banco/servicios/http-banco-service';
import {BancoFindDto} from '../../../banco/servicios/dto/banco.find-dto';
import {BancoResponseDto} from '../../../banco/servicios/dto/banco.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-cuenta-bancaria-empresa-tabla',
  templateUrl: './cuenta-bancaria-empresa-tabla.component.html',
  styleUrls: ['./cuenta-bancaria-empresa-tabla.component.scss']
})
export class CuentaBancariaEmpresaTablaComponent extends AbstractTable<CuentaBancariaEmpresaResponseDto, CuentaBancariaEmpresaFindDto>
  implements OnInit, TableAbstractClass<CuentaBancariaEmpresaResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por número de cuenta o id',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: 1112223333/1',
      column: '6',
      actualValue: '',
    },

    {
      label: 'Tipo Cuenta',
      placeholder: 'Ej: Ahorro/Corriente',
      help: 'Seleccione el tipo de cuenta',
      formControlName: FormCuentaBancariaEmpresaEnum.tipoCuenta,
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },


    {
      label: 'Banco',
      placeholder: 'Ej: Produbanco/Pichincha',
      help: 'Seleccione el banco',
      formControlName: FormCuentaBancariaEmpresaEnum.banco,
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


    {
      label: 'Empresa',
      placeholder: 'Ej: Empresa1',
      help: 'Seleccione la empresa',
      formControlName: FormCuentaBancariaEmpresaEnum.empresa,
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'razonSocial',
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
    public httpCuentaBancariaEmpresaService: HttpCuentaBancariaEmpresaService,
    public confirmationService: ConfirmationService,
    private _httpValoresDetalleService: HttpListaValoresDetalleService,
    private _httpEmpresaService: HttpEmpresaService,
    private _httpBancoService: HttpBancoService,
  ) {
    super(
      httpCuentaBancariaEmpresaService,
      {
        nombreRegistro: 'Cuenta Bancaria Empresa',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaBancariaEmpresaService
        .createOne(values as CuentaBancariaEmpresaCreateDto)
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
            console.error({error: error, message: "Error creando Cuenta Bancaria Empresa", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaBancariaEmpresaService
        .updateById(values as CuentaBancariaEmpresaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cuenta Bancaria Empresa", data: values});
          },
        });
    }
  }

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
    console.log('evetntico1', event);
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }

      if (event.formControlName === 'tipoCuenta') {
        this.findDto.tipoCuenta = event.actualValue?.nombre;
      }
      if (event.formControlName === 'idBanco') {
        this.findDto.idBanco = event.actualValue?.id;
      }

      if (event.formControlName === 'idEmpresa') {
        this.findDto.idEmpresa = event.actualValue?.id;
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
      case FormCuentaBancariaEmpresaEnum.tipoCuenta:
        this.buscarAutocompleteTipoCuenta(event);
        break;

      case FormCuentaBancariaEmpresaEnum.empresa:
        this.buscarAutocompleteEmpresa(event);
        break;

      case FormCuentaBancariaEmpresaEnum.banco:
        this.buscarAutocompleteBanco(event);
        break;
    }
  }

  buscarAutocompleteTipoCuenta(evento: SearchAutoCompleteInterface) {
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: ListaValoresEnum.tipoCuenta,
      busqueda: evento.query,
    };
    this._httpValoresDetalleService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
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

  buscarAutocompleteEmpresa(evento: SearchAutoCompleteInterface) {
    const busqueda: EmpresaFindDto= {
      busqueda: evento.query,
    };
    this._httpEmpresaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [EmpresaResponseDto[], number])
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

  buscarAutocompleteBanco(evento: SearchAutoCompleteInterface) {
    const busqueda: BancoFindDto= {
      busqueda: evento.query,
    };
    this._httpBancoService
      .find(busqueda)
      .toPromise()
      .then(res => res as [BancoResponseDto[], number])
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


  createOrEdit(record?: CuentaBancariaEmpresaResponseDto) {
    const formArray = [
      ...FORM_CUENTA_BANCARIA_EMPRESA(),
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
