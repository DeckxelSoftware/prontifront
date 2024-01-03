import {Component, OnInit} from '@angular/core';
import {InformacionFinancieraResponseDto} from '../../servicios/dto/informacion-financiera.response-dto';
import {InformacionFinancieraFindDto} from '../../servicios/dto/informacion-financiera.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpInformacionFinancieraService} from '../../servicios/http-informacion-financiera-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {InformacionFinancieraCreateDto} from '../../servicios/dto/informacion-financiera.create-dto';
import {InformacionFinancieraUpdateDto} from '../../servicios/dto/informacion-financiera.update-dto';
import {FORM_INFORMACION_FINANCIERA} from '../../form/form-informacion-financiera';
import {TAKE} from '../../../../constantes/tabla/take';
import {
  CreateUpdateModalComponent
} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {
  CreateUpdateModalParameters
} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivatedRoute} from '@angular/router';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {FormInformacionFinancieraEnum} from "../../form/form-informacion-financiera.enum";
import {BancoFindDto} from "../../../banco/servicios/dto/banco.find-dto";
import {BancoResponseDto} from "../../../banco/servicios/dto/banco.response-dto";
import {HttpBancoService} from "../../../banco/servicios/http-banco-service";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {FormaPagoEnum} from "../../../../enums/forma-pago.enum";

@Component({
  selector: 'app-informacion-financiera-tabla',
  templateUrl: './informacion-financiera-tabla.component.html',
  styleUrls: ['./informacion-financiera-tabla.component.scss']
})
export class InformacionFinancieraTablaComponent extends AbstractTable<InformacionFinancieraResponseDto, InformacionFinancieraFindDto>
  implements OnInit, TableAbstractClass<InformacionFinancieraResponseDto>, AutocompleteFormInterface {
  idTrabajador!: number;
  searchBarFormFields: FormField[] = [
    // {
    //   help: 'Puede buscar por nombre',
    //   formControlName: 'busqueda',
    //   initialValue: "",
    //   validators: [],
    //   type: fieldType.text,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   label: 'Busqueda',
    //   placeholder: 'Ej: ...',
    //   column: '12',
    //   actualValue: '',
    // },
    {
      label: 'Habilitado',
      formControlName: 'sisHabilitado',
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'sisHabilitado',
        dataKey: 'sisHabilitado',
        filterPlaceholder: '0 = Inactivo, 1 = Activo',
        optionLabel: 'nombre',
        options: [
          {
            sisHabilitado: ActivoInactivo.Activo,
            nombre: 'Activo',
          },
          {
            sisHabilitado: ActivoInactivo.Inactivo,
            nombre: 'Inactivo',
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
    public httpInformacionFinancieraService: HttpInformacionFinancieraService,
    public httpListaValoresDetalle: HttpListaValoresDetalleService,
    public confirmationService: ConfirmationService,
    public activatedRoute: ActivatedRoute,
    public httpBancoService: HttpBancoService,
  ) {
    super(
      httpInformacionFinancieraService,
      {
        nombreRegistro: 'Informacion Financiera',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {idTrabajador} = this.activatedRoute.snapshot.params;
    if (idTrabajador) {
      this.idTrabajador = +idTrabajador;
      this.findDto.idTrabajador = this.idTrabajador;
    }
    this.stablishSkipAndTake(0, TAKE);
    // this.tableData = [
    //   {
    //     formaPago: FormaPagoEnum.transferencia,
    //     cuentaBancariaEmpresaCollection: [
    //       {
    //         numeroCuenta: '12345678',
    //         tipoCuenta: 'Ahorros',
    //         idBanco: {
    //           nombre: 'Austro'
    //         }
    //       }
    //
    //     ]
    //   }
    // ]
  }

  clearFindDto()
    :
    void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal
                      :
                      ModalComponent
  ):
    void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create
    ) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idTrabajador = this.idTrabajador;
      values.idCuentaBancariaEmpresa = {
        numeroCuenta: this.createEditFormGroup.get('numeroCuenta')?.value,
        tipoCuenta: this.createEditFormGroup.get('tipoCuenta')?.value.nombre,
        idBanco: this.createEditFormGroup.get('banco')?.value.id,
        sisHabilitado: ActivoInactivo.Activo
      }
      this.blockuiService.habilitarBlockUI();
      this.httpInformacionFinancieraService
        .createOne(values as InformacionFinancieraCreateDto)
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
            console.error({error: error, message: "Error creando Informacion Financiera", data: values});
          },
        });
    } else {
      values.formaPago = this.createEditFormGroup.get('numeroCuenta')?.value.value,
        values.idCuentaBancariaEmpresa = {
          id: this.recordUpdated.cuentaBancariaEmpresaCollection[0].id,
          numeroCuenta: this.createEditFormGroup.get('numeroCuenta')?.value,
          tipoCuenta: this.createEditFormGroup.get('tipoCuenta')?.value.nombre,
          idBanco: this.createEditFormGroup.get('banco')?.value.id,
        }
      this.blockuiService.habilitarBlockUI();
      this.httpInformacionFinancieraService
        .updateById(values as InformacionFinancieraUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Informacion Financiera", data: values});
          },
        });
    }
  }

  fieldModalChanged(event
                      :
                      FormField, enableButton
                      :
                      ModalComponent
  ):
    void {
    if (event.formGroup.valid
    ) {
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  openDialog(formFields
               :
               FormField[], arrayAccordeon
               :
               MatStepperArray[] = []
  ):
    void {
    const createUpdateModalParameters
      :
      CreateUpdateModalParameters = {
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

  searchFieldChanged(event
                       :
                       FormField
  ):
    void {
    if (event.valid
    ) {
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

  searchAutoComplete(event
                       :
                       SearchAutoCompleteInterface
  ):
    void {
    switch (event.field.formControlName
      ) {
      case
      FormInformacionFinancieraEnum.tipoCuenta
      :
        this.buscarAutocompleteListaValoresDetalle(event);
        break;
      case
      FormInformacionFinancieraEnum.banco
      :
        this.buscarAutocompleteBanco(event);
        break;
    }
  }

  buscarAutocompleteBanco(evento
                            :
                            SearchAutoCompleteInterface
  ) {
    const busqueda: BancoFindDto = {
      busqueda: evento.query,
    };
    this.httpBancoService
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

  buscarAutocompleteListaValoresDetalle(evento
                                          :
                                          SearchAutoCompleteInterface
  ) {
    const busqueda: ListaValoresDetalleFindDto = {
      busqueda: evento.query,
      idListaValoresTipoCodigoPrimario: ListaValoresEnum.tipoCuentaBancaria,
    };
    this.httpListaValoresDetalle
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

  // buscarAutocomplete(evento: SearchAutoCompleteInterface) {
  //   const busqueda: NombreCampoBusquedaDto = {
  //     nombreCampo: evento.query,
  //   };
  //   this._nombrCampoService
  //       .buscar(busqueda)
  //       .toPromise()
  //       .then(res => res as [NombreCampoInterface[], number])
  //       .then(data => {
  //         const arregloDatos = data[0];
  //         // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
  //         const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
  //         if (evento.campoFormulario.autocomplete) {
  //           if (Array.isArray(arregloDatos)) {
  //             evento.campoFormulario.autocomplete.suggestions = [...arregloDatos];
  //           } else {
  //             evento.campoFormulario.autocomplete.suggestions = [arregloDatos];
  //           }
  //         }
  //         return data;
  //       });
  // }


  createOrEdit(record ?: InformacionFinancieraResponseDto) {
    const formArray = [
      ...FORM_INFORMACION_FINANCIERA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      console.log(this.recordUpdated);
      this.recordUpdated.numeroCuenta = this.recordUpdated.cuentaBancariaEmpresaCollection[0].numeroCuenta;
      this.recordUpdated.tipoCuenta = {nombre: this.recordUpdated.cuentaBancariaEmpresaCollection[0].tipoCuenta};
      this.recordUpdated.banco = {nombre: this.recordUpdated.cuentaBancariaEmpresaCollection[0].idBanco.nombre};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
