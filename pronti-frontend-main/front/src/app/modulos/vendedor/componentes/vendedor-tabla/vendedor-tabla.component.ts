import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { VendedorResponseDto } from '../../servicios/dto/vendedor.response-dto';
import { VendedorFindDto } from '../../servicios/dto/vendedor.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpVendedorService } from '../../servicios/http-vendedor-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup, Validators } from '@angular/forms';
import { VendedorCreateDto } from '../../servicios/dto/vendedor.create-dto';
import { VendedorUpdateDto } from '../../servicios/dto/vendedor.update-dto';
import { FORM_VENDEDOR } from '../../form/form-vendedor';
import { TAKE } from '../../../../constantes/tabla/take';
import { CreateUpdateModalComponent } from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import { CreateUpdateModalParameters } from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { fieldType, FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { HttpTrabajadorService } from '../../../trabajador/servicios/http-trabajador-service';
import { HttpAgenciaService } from '../../../agencia/servicios/http-agencia-service';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { FormSupervisorEnum } from '../../../supervisor/form/form-supervisor.enum';
import { AgenciaFindDto } from '../../../agencia/servicios/dto/agencia.find-dto';
import { AgenciaResponseDto } from '../../../agencia/servicios/dto/agencia.response-dto';
import { TrabajadorFindDto } from '../../../trabajador/servicios/dto/trabajador.find-dto';
import { TrabajadorResponseDto } from '../../../trabajador/servicios/dto/trabajador.response-dto';
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import { ProveedorFindDto } from '../../../proveedor/servicios/dto/proveedor.find-dto';
import { HttpProveedorService } from '../../../proveedor/servicios/http-proveedor-service';
import { ProveedorResponseDto } from '../../../proveedor/servicios/dto/proveedor.response-dto';
import { TipoProveedorEnum } from '../../../../enums/tipo-proveedor.enum';

@Component({
  selector: 'app-vendedor-tabla',
  templateUrl: './vendedor-tabla.component.html',
  styleUrls: ['./vendedor-tabla.component.scss']
})
export class VendedorTablaComponent extends AbstractTable<VendedorResponseDto, VendedorFindDto>
  implements OnInit, TableAbstractClass<VendedorResponseDto>, AutocompleteFormInterface {


  @Input()
  vieneDesdeContrato = false;

  @Output()
  seleccionoVendedor = new EventEmitter<VendedorResponseDto>();


  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos, documento de identidad, o correo',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Cristian/Lara/cris.lara@.../1717...',
      column: '12',
      actualValue: '',
    },
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
    // {
    //   label: 'Modalidad de contrato',
    //   placeholder: 'Ej: S/N/NP',
    //   help: 'Seleccione una modalidad de contrato',
    //   formControlName: 'idTrabajadorModalidadContrato',
    //   initialValue: '',
    //   validators: [],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: {
    //     filterBy: 'modalidadContrato',
    //     dataKey: 'modalidadContrato',
    //     filterPlaceholder: 'S/N/NP',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         modalidadContrato: ModalidadContrato.S.label,
    //         nombre: ModalidadContrato.S.modalidadContrato,
    //       },
    //       {
    //         modalidadContrato: ModalidadContrato.N.label,
    //         nombre: ModalidadContrato.N.modalidadContrato,
    //       },
    //       {
    //         modalidadContrato: ModalidadContrato.NP.label,
    //         nombre: ModalidadContrato.NP.modalidadContrato,
    //       },

    //     ]
    //   }
    // },
    {
      label: 'Agencia',
      placeholder: 'Ej: Agencia norte',
      help: 'Seleccione una agencia',
      formControlName: 'idAgencia',
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
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpVendedorService: HttpVendedorService,
    public confirmationService: ConfirmationService,
    public httpTrabajadorService: HttpTrabajadorService,
    public httpProveedorService: HttpProveedorService,
    public httpAgenciaService: HttpAgenciaService,
  ) {
    super(
      httpVendedorService,
      {
        nombreRegistro: 'Vendedor',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    this.stablishSkipAndTake(0, TAKE);

    // this.tableData = [

    //   {
    //     sisHabilitado: ActivoInactivo.Activo,
    //     idAgencia: {
    //       nombre: 'Agencia Proveedor'
    //     },
    //     idProveedor: {
    //       // modalidadContrato: ModalidadContratoEnum.NominaCDE,
    //       idUsuario: {
    //         nombres: 'nombre',
    //         apellidos: 'apellidos',
    //         documentoIdentidad: '1717171717'

    //       }
    //     }
    //   },
    //   {
    //     sisHabilitado: ActivoInactivo.Activo,
    //     idAgencia: {
    //       nombre: 'Agencia Trabajador'
    //     },
    //     idTrabajador: {
    //       // modalidadContrato: ModalidadContratoEnum.NominaCDE,
    //       idUsuario: {
    //         nombres: 'nombre',
    //         apellidos: 'apellidos',
    //         documentoIdentidad: '1717171717'

    //       }
    //     }
    //   }
    // ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.idAgencia = undefined;
    this.findDto.idTrabajadorModalidadContrato = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpVendedorService
        .createOne(values as VendedorCreateDto)
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
            console.error({ error: error, message: "Error creando Vendedor", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpVendedorService
        .updateById(values as VendedorUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Vendedor", data: values });
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
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'idTrabajadorModalidadContrato') {
        this.findDto.idTrabajadorModalidadContrato = event.actualValue?.modalidadContrato
      }
      if (event.formControlName === 'idAgencia') {
        this.findDto.idAgencia = event.actualValue?.id
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
      case FormSupervisorEnum.trabajador:
        this.buscarAutocompleteTrabajador(event);
        break;
      case FormSupervisorEnum.agencia:
        this.buscarAutocompleteAgencia(event);
        break;
      case FormSupervisorEnum.proveedor:
        this.buscarAutocompleteProveedor(event);
        break;
    }
  }


  buscarAutocompleteProveedor(evento: SearchAutoCompleteInterface) {
    // if (evento.field.autoComplete) {
    //   evento.field.autoComplete.suggestions = [
    //     {
    //       id: 10,
    //       nombreCompleto: 'Alejo apellido',
    //       idUsuario: {
    //         nombres: 'Alejo',
    //         apellidos: 'apellido'
    //       }
    //     }
    //   ];
    // }

    const busqueda: ProveedorFindDto = {
      busqueda: evento.query,
      tipoProveedor: TipoProveedorEnum.Comisionista,
    };
    this.httpProveedorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ProveedorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombreCompleto = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
          return a;
        });
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


  buscarAutocompleteTrabajador(evento: SearchAutoCompleteInterface) {
    // if (evento.field.autoComplete) {
    //   evento.field.autoComplete.suggestions = [
    //     {
    //       id: 10,
    //       nombreCompleto: 'Alejo apellido',
    //       idUsuario: {
    //         nombres: 'Alejo',
    //         apellidos: 'apellido'
    //       }
    //     }
    //   ];
    // }

    const busqueda: TrabajadorFindDto = {
      busqueda: evento.query,
    };
    this.httpTrabajadorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [TrabajadorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombreCompleto = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
          return a;
        });
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

  buscarAutocompleteAgencia(evento: SearchAutoCompleteInterface) {
    // if (evento.field.autoComplete) {
    //   evento.field.autoComplete.suggestions = [
    //     {
    //       id: 10,
    //       nombre: 'Agencia autocomplete'
    //     }
    //   ];
    // }
    const busqueda: AgenciaFindDto = {
      busqueda: evento.query,
    };
    this.httpAgenciaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [AgenciaResponseDto[], number])
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


  async createOrEdit(record: VendedorResponseDto, tipo?: string) {
    const formArray = [
      ...FORM_VENDEDOR(),
    ];

    if (record?.idTrabajador) {
      formArray.splice(1, 1);
    } else if (record?.idProveedor) {
      formArray.splice(0, 1);
    }

    if (tipo) {
      if (tipo === 'Trabajador') {

        formArray.splice(1, 1);

      } else if (tipo === 'Proveedor') {

        formArray.splice(0, 1);
      }
    }

    this.createEditFormArray = [...formArray];
    if (record.id) {
      this.recordUpdated = { ...record };

      if (record.idTrabajador) {
        if (record.idTrabajador.idUsuario) {
          if (record.idTrabajador.idUsuario.apellidos && record.idTrabajador.idUsuario.nombres) {
            this.recordUpdated.idTrabajador.nombreCompleto = record.idTrabajador?.idUsuario?.nombres + ' ' + record.idTrabajador?.idUsuario?.apellidos;
          }
        }
      }

      if (record.idProveedor) {
        if (record.idProveedor.idUsuario) {
          if (record.idProveedor.idUsuario.apellidos && record.idProveedor.idUsuario.nombres) {
            this.recordUpdated.idProveedor.nombreCompleto = record.idProveedor?.idUsuario?.nombres + ' ' + record.idProveedor?.idUsuario?.apellidos;
          }
        }
      }

      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {

      this.create = true;
      this.recordUpdated = undefined;


    }
    this.openDialog(this.createEditFormArray);
  }


  seleccionarVendedor(registro: VendedorResponseDto) {
    this.seleccionoVendedor.emit(registro);
  }

}
