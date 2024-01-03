import {Component, OnInit} from '@angular/core';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {TrabajadorResponseDto} from "../../servicios/dto/trabajador.response-dto";
import {TrabajadorFindDto} from "../../servicios/dto/trabajador.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {MatStepperConfig} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-config";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {FormTrabajadorEnum} from "../../form/form-trabajador.enum";
import {GeneroEnum} from "../../../../enums/genero.enum";
import {EstadoFamiliarEnum} from "../../../../enums/estado-familiar.enum";
import {SiNoEnum} from "../../../../enums/si-no.enum";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {ModalidadContrato} from "../../../../enums/modalidad-contrato";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpTrabajadorService} from "../../servicios/http-trabajador-service";
import {ConfirmationService} from "primeng/api";
import {HttpUsuarioService} from "../../../usuario/servicios/http-usuario-service";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {TAKE} from "../../../../constantes/tabla/take";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import * as dayjs from "dayjs";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {UsuarioFindDto} from "../../../usuario/servicios/dto/usuario.find-dto";
import {UsuarioResponseDto} from "../../../usuario/servicios/dto/usuario.response-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {CuentaContableFindDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {FORM_PAGOS_1} from "../../../pagos1/form/form-pagos1";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {HttpPagos1Service} from "../../../pagos1/servicios/http-pagos1-service";

@Component({
  selector: 'app-trabajador-tabla-caracteristicas-anuales',
  templateUrl: './trabajador-tabla-caracteristicas-anuales.component.html',
  styleUrls: ['./trabajador-tabla-caracteristicas-anuales.component.scss']
})
export class TrabajadorTablaCaracteristicasAnualesComponent extends AbstractTable<TrabajadorResponseDto, TrabajadorFindDto>
  implements OnInit, TableAbstractClass<TrabajadorResponseDto>, AutocompleteFormInterface {
  matStepperConfig: MatStepperConfig = {
    orientation: 'horizontal',
    linear: false,
  };
  esDecimoTercero = false;
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  additionalFilters: FormField[] = [
    {
      label: 'País',
      placeholder: 'Ej: Ecuador',
      help: 'Seleccione un país',
      formControlName: 'pais',
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
      label: 'Provincia',
      placeholder: 'Ej: Pichincha',
      help: 'Seleccione una provincia',
      formControlName: 'provincia',
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
      label: 'Ciudad',
      placeholder: 'Ej: Quito',
      help: 'Seleccione una ciudad',
      formControlName: 'ciudad',
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
      label: 'Estado civil',
      placeholder: 'Ej: Soltero',
      help: 'Seleccione el estado civil',
      formControlName: FormTrabajadorEnum.estadoCivil,
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
      label: 'Género',
      placeholder: 'Ej: Femenino',
      help: 'Seleccione un género',
      formControlName: FormTrabajadorEnum.genero,
      initialValue: '',
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'genero',
        filterPlaceholder: 'Femenino',
        optionLabel: 'nombre',
        options: [
          {
            genero: GeneroEnum.masculino,
            nombre: 'Masculino',
          },
          {
            genero: GeneroEnum.femenino,
            nombre: 'Femenino',
          }
        ]
      }
    },
    {
      label: 'Estado familiar',
      placeholder: 'Ej: Madre',
      help: 'Seleccione el estado familiar',
      formControlName: FormTrabajadorEnum.estadoFamiliar,
      initialValue: '',
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'estadoFamiliar',
        filterPlaceholder: 'Madre',
        optionLabel: 'nombre',
        options: [
          {
            estadoFamiliar: EstadoFamiliarEnum.madre,
            nombre: 'Madre',
          },
          {
            estadoFamiliar: EstadoFamiliarEnum.padre,
            nombre: 'Padre',
          },
          {
            estadoFamiliar: EstadoFamiliarEnum.noAplica,
            nombre: 'No aplica',
          }
        ]
      }
    },
    {
      label: 'Grupo sanguineo',
      placeholder: 'Ej: O+',
      help: 'Seleccione un grupo sanguineo',
      formControlName: FormTrabajadorEnum.grupoSanguineo,
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
      label: 'Nivel de estudios',
      placeholder: 'Ej: Bachillerato',
      help: 'Seleccione el nivel de estudios',
      formControlName: FormTrabajadorEnum.nivelEstudios,
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
      label: 'Profesión',
      placeholder: 'Ej: Trabajador en general',
      help: 'Seleccione la profesión',
      formControlName: FormTrabajadorEnum.profesion,
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
      label: 'Discapacidad',
      placeholder: 'Ej: No',
      help: 'Seleccione si tiene discapacidad',
      formControlName: FormTrabajadorEnum.discapacidad,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'discapacidad',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            discapacidad: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            discapacidad: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      }
    },
    {
      label: 'Tipo discapacidad',
      placeholder: 'Ej: Visual',
      help: 'Seleccione el tipo de discapacidad',
      formControlName: FormTrabajadorEnum.tipoDiscapacidad,
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
  ]
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos, documento de identidad, o correo',
      formControlName: 'busquedaUsuario',
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
    {
      label: 'Modalidad de contrato',
      placeholder: 'Ej: S/N/NP',
      help: 'Seleccione una modalidad de contrato',
      formControlName: 'modalidadContrato',
      initialValue: '',
      validators: [],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'modalidadContrato',
        dataKey: 'modalidadContrato',
        filterPlaceholder: 'S/N/NP',
        optionLabel: 'nombre',
        options: [
          {
            modalidadContrato: ModalidadContrato.S.label,
            nombre: ModalidadContrato.S.modalidadContrato,
          },
          {
            modalidadContrato: ModalidadContrato.N.label,
            nombre: ModalidadContrato.N.modalidadContrato,
          },
          {
            modalidadContrato: ModalidadContrato.NP.label,
            nombre: ModalidadContrato.NP.modalidadContrato,
          },

        ]
      }
    },

  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpTrabajadorService: HttpTrabajadorService,
    public confirmationService: ConfirmationService,
    public httpUsuarioService: HttpUsuarioService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    public router: Router,
    public httpCuentaContable: HttpCuentaContableService,
    private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public httpPagos1Service: HttpPagos1Service,
    public route: ActivatedRoute,
  ) {
    super(
      httpTrabajadorService,
      {
        nombreRegistro: 'Trabajador',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
    const url = this.route.snapshot.url;
    if (url.length === 2) {
      if (url[1].path === 'decimo-tercero') {
        this.esDecimoTercero = true;
      } else if (url[1].path === 'decimo-cuarto') {
        this.esDecimoTercero = false;
      }
    } else {
      this.logsMlabsService.toaster({
          titulo: 'Error',
          mensaje: 'Error al definir la ruta',
          tipo: ToasterTipo.error
        }
      );
    }
  }

  ngOnInit(): void {

    this.obtenerDataConfiguracionGeneral();
    this.stablishSkipAndTake(0, TAKE);

  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.idUsuarioPais = undefined;
    this.findDto.idUsuarioProvincia = undefined;
    this.findDto.idUsuarioCiudad = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.modalidadContrato = undefined;
    this.findDto.estadoCivil = undefined;
    this.findDto.genero = undefined;
    this.findDto.estadoFamiliar = undefined;
    this.findDto.grupoSanguineo = undefined;
    this.findDto.nivelEstudios = undefined;
    this.findDto.profesion = undefined;
    this.findDto.discapacidad = undefined;
    this.findDto.tipoDiscapacidad = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    // const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // la funcion getFormDate no funciona, llena el dato de select
    const values = {
      region: this.createEditFormArray[0].initialValue,
      nombre: this.createEditFormArray[1].initialValue,
      fechaInicio: this.createEditFormArray[2].initialValue,
      fechaFin: this.createEditFormArray[3].initialValue,
      ultimoPago: this.createEditFormArray[4].initialValue,
      periodo: this.createEditFormArray[5].initialValue,
      sisHabilitado: ActivoInactivo.Activo,
    }

    // values.modalidadContrato = this.createEditFormArray[1].actualValue.modalidadContrato;
    console.log(values);
    // if (this.create) {

    this.blockuiService.habilitarBlockUI();
    this.httpPagos1Service
      .decimoCuartoAnual(values)
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
          this.parameters.messageService.toaster(MENSAGE_TOAST.error('Error realizando el cálculo.'));
          console.error({error: error, message: "Error realizando el cálculo", data: values});
        },
      });
    // } else {
    //   this.blockuiService.habilitarBlockUI();
    //   this.httpTrabajadorService
    //     .updateById(values as TrabajadorUpdateDto, this.recordUpdated.id as number)
    //     .subscribe({
    //       next: () => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(
    //           MENSAGE_TOAST.creacionExitosa(
    //             this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
    //           )
    //         );
    //         closeModal.closeModal();
    //         this.searchData();
    //       },
    //       error: (error) => {
    //         this.blockuiService.deshabilitarBlockUI();
    //         this.parameters.messageService.toaster(MENSAGE_TOAST.error());
    //         console.error({error: error, message: "Error actualizando Trabajador", data: values});
    //       },
    //     });
    // }
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
      title: `Calcular décimo cuarto`,
      description: "Confirme si desea realizar el cálculo",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `Calcular`,
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
      if (event.formControlName === 'busquedaUsuario') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'modalidadContrato') {
        this.findDto.modalidadContrato = event.actualValue?.modalidadContrato
      }
      if (event.formControlName === 'pais') {
        this.findDto.idUsuarioPais = event.actualValue?.nombre;
      }
      if (event.formControlName === 'provincia') {
        this.findDto.idUsuarioProvincia = event.actualValue?.nombre;
      }
      if (event.formControlName === 'ciudad') {
        this.findDto.idUsuarioCiudad = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.estadoCivil) {
        this.findDto.estadoCivil = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.genero) {
        this.findDto.genero = event.actualValue?.genero;
      }
      if (event.formControlName === FormTrabajadorEnum.grupoSanguineo) {
        this.findDto.grupoSanguineo = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.nivelEstudios) {
        this.findDto.nivelEstudios = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.profesion) {
        this.findDto.profesion = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.estadoFamiliar) {
        this.findDto.estadoFamiliar = event.actualValue?.estadoFamiliar;
      }
      if (event.formControlName === FormTrabajadorEnum.tipoDiscapacidad) {
        this.findDto.tipoDiscapacidad = event.actualValue?.nombre;
      }
      if (event.formControlName === FormTrabajadorEnum.discapacidad) {
        this.findDto.discapacidad = event.actualValue?.discapacidad;
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
    console.log(event.field);
    switch (event.field.formControlName) {
      case FormTrabajadorEnum.usuario:
        this.buscarAutocompleteUsuario(event);
        break;
      case FormTrabajadorEnum.estadoCivil:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.grupoSanguineo:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.nivelEstudios:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.profesion:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.tipoDiscapacidad:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'provincia':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'pais':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case 'ciudad':
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormTrabajadorEnum.cuentaContableNombre:
        this.buscarAutocompleteCuentaContable(event);
        break;
    }
  }

  buscarAutocompleteUsuario(evento: SearchAutoCompleteInterface) {
    const busqueda: UsuarioFindDto = {
      busqueda: evento.query,
    };
    this.httpUsuarioService
      .find(busqueda)
      .toPromise()
      .then(res => res as [UsuarioResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombresCompletos = a.nombres + ' ' + a.apellidos;
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

  buscarAutocompleteListaValorDetalle(evento: SearchAutoCompleteInterface) {
    let codigoListaValorTipo = this.findCodListaValorTipo(evento.field.formControlName);
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: codigoListaValorTipo,
      busqueda: evento.query,
    };
    this.httpListavaloresDetalle
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

  buscarAutocompleteCuentaContable(evento: SearchAutoCompleteInterface) {

    const busqueda: CuentaContableFindDto = {
      busqueda: evento.query,
    };
    this.httpCuentaContable
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


  // createOrEdit(record?: TrabajadorResponseDto) {
  //   const formArray = [
  //     ...FORM_TRABAJADOR(),
  //     ...FORM_BENEFICIO(),
  //     ...FORM_DESCUENTO(),
  //     ...FORM_INGRESO()
  //   ];
  //   this.createEditFormArray = [...formArray];
  //   console.log('trabajador:', record);
  //   if (record) {
  //
  //     this.recordUpdated = {...record};
  //     // @ts-ignore
  //     this.recordUpdated.idUsuario.nombresCompletos = `${this.recordUpdated.idUsuario.nombres} ${record.idUsuario.apellidos}`;
  //     this.recordUpdated.estadoCivil = {nombre: this.recordUpdated.estadoCivil};
  //     this.recordUpdated.grupoSanguineo = {nombre: this.recordUpdated.grupoSanguineo};
  //     this.recordUpdated.nivelEstudios = {nombre: this.recordUpdated.nivelEstudios};
  //     this.recordUpdated.profesion = {nombre: this.recordUpdated.profesion};
  //     this.recordUpdated.codigoSectorial = {nombre: this.recordUpdated.codigoSectorial};
  //     this.recordUpdated.tipoDiscapacidad = {nombre: this.recordUpdated.tipoDiscapacidad};
  //     this.recordUpdated.cuentaContableNombre = {nombre: this.recordUpdated.cuentaContableNombre};
  //     this.fillForm(this.recordUpdated, this.createEditFormArray);
  //     this.create = false;
  //   } else {
  //     this.create = true;
  //     // this.recordUpdated = undefined;
  //     const objetoTrabajadoCrear: Partial<TrabajadorResponseDto> = {};
  //     objetoTrabajadoCrear.aporteIess = SiNoEnum.SI;
  //     objetoTrabajadoCrear.aporteIessAsumido = SiNoEnum.SI;
  //     objetoTrabajadoCrear.decimosAnio = SiNoEnum.SI;
  //     objetoTrabajadoCrear.impuestoRenta = SiNoEnum.SI;
  //     objetoTrabajadoCrear.fondoReservaIess = SiNoEnum.SI;
  //     objetoTrabajadoCrear.utilidades = SiNoEnum.SI;
  //     objetoTrabajadoCrear.pagoFondosReservaMes = SiNoEnum.NO;
  //     objetoTrabajadoCrear.impuestoRentaPatron = SiNoEnum.NO;
  //     objetoTrabajadoCrear.vacaciones = SiNoEnum.SI;
  //     objetoTrabajadoCrear.beneficios = SiNoEnum.SI;
  //     objetoTrabajadoCrear.pagoDecTercerCuartoMes = SiNoEnum.NO;
  //     objetoTrabajadoCrear.tiempoParcial = SiNoEnum.NO;
  //     this.fillForm(objetoTrabajadoCrear, this.createEditFormArray)
  //   }
  //   this.openDialog(this.createEditFormArray)
  // }

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      pais: ListaValoresEnum.paisUsuario,
      provincia: ListaValoresEnum.provinciaUsuario,
      ciudad: ListaValoresEnum.ciudadUsuario,
      estadoCivil: ListaValoresEnum.estadoCivil,
      grupoSanguineo: ListaValoresEnum.grupoSanguineo,
      nivelEstudios: ListaValoresEnum.nivelEstudios,
      profesion: ListaValoresEnum.profesion,
      tipoDiscapacidad: ListaValoresEnum.tipoDiscapacidad,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }

  navegar(trabajador: TrabajadorResponseDto, path: string) {
    this.router.navigate(['personal', 'trabajadores-modulo', trabajador.id, path])
  }

  obtenerDataConfiguracionGeneral() {
    this._httpConfiguracionGeneralService.find({id: 1}).subscribe(
      (resp: [ConfiguracionGeneralResponseDto[], number]) => {
        this.configuracionGeneral = resp[0][0];
      },
      error => {
        console.error('No existe configuracion general');
        ``
      }
    )
  }

  abrirModalCalcularDecimoCuarto(registro: TrabajadorResponseDto) {
    this.blockuiService.habilitarBlockUI();
    registro.idAgencia = {
      idRegion: {
        nombre: 'Costa'
      }
    };
    const objetoDatos = {
      region: registro.idAgencia?.idRegion?.nombre,
      fechaInicio: '',
      fechaFin: '',
      ultimoPago: '',
      nombre: '',
      periodo: ''
    };
    const yearInicio = dayjs().year() - 1;
    if (objetoDatos.region?.toLowerCase() === 'sierra') {
      objetoDatos.fechaInicio = `01-08-${yearInicio}`;
      objetoDatos.fechaFin = `31-07-${yearInicio + 1}`;
    } else if (objetoDatos.region?.toLowerCase() === 'costa') {
      objetoDatos.fechaInicio = `01-03-${yearInicio}`;
      objetoDatos.fechaFin = `28-02-${yearInicio + 1}`;
    } else {
      this.logsMlabsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obteniendo la region del trabajador',
          tipo: ToasterTipo.error
        }
      )
    }
    objetoDatos.periodo = `${objetoDatos.fechaInicio} - ${objetoDatos.fechaFin}`
    objetoDatos.nombre = `DECIMO CUARTO SUELDO ${objetoDatos.region?.toUpperCase()}`
    console.log(registro.idAgencia?.idRegion?.nombre);
    const formArray = [
      ...FORM_PAGOS_1(),
    ];
    this.createEditFormArray = [...formArray];
    this.createEditFormArray[0].initialValue = objetoDatos.region;
    this.createEditFormArray[1].initialValue = objetoDatos.nombre;
    this.createEditFormArray[2].initialValue = objetoDatos.fechaInicio;
    this.createEditFormArray[3].initialValue = objetoDatos.fechaFin;
    this.createEditFormArray[4].initialValue = objetoDatos.ultimoPago;
    this.createEditFormArray[5].initialValue = objetoDatos.periodo;
    let nombreTrabajador = '';
    if (registro.idUsuario) {
      if (registro.idUsuario.nombres && registro.idUsuario.apellidos) {
        nombreTrabajador = registro.idUsuario?.nombres + registro.idUsuario?.apellidos;
      }
    }
    this.abrirModalDecimoCuarto(this.createEditFormArray, nombreTrabajador);
    this.blockuiService.deshabilitarBlockUI();
  }


  abrirModalDecimoCuarto(formFields: FormField[], nombreTrabajador: string): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `Calcular décimo cuarto: ${nombreTrabajador}`,
      description: "Confirme si desea realizar el cálculo",
      accordeons: [],
      formsFields: formFields,
      button: `Calcular`,
      route: this,
      submitButtonDisabled: false
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }

  abrirModalCalcularDecimoTercero(registro: TrabajadorResponseDto) {
    this.blockuiService.habilitarBlockUI();
    registro.idAgencia = {
      idRegion: {
        nombre: 'Costa'
      }
    };
    const objetoDatos = {
      region: registro.idAgencia?.idRegion?.nombre,
      fechaInicio: '',
      fechaFin: '',
      ultimoPago: '',
      nombre: '',
      periodo: ''
    };
    const yearInicio = dayjs().year() ;

      objetoDatos.fechaInicio = `01-12-${yearInicio}`;
      objetoDatos.fechaFin = `30-11-${yearInicio + 1}`;


    objetoDatos.periodo = `${objetoDatos.fechaInicio} - ${objetoDatos.fechaFin}`
    objetoDatos.nombre = `DECIMO TERCER SUELDO`
    const formArray = [
      ...FORM_PAGOS_1(),
    ];
    formArray.splice(0, 1);
    this.createEditFormArray = [...formArray];

    this.createEditFormArray[0].initialValue = objetoDatos.nombre;
    this.createEditFormArray[1].initialValue = objetoDatos.fechaInicio;
    this.createEditFormArray[2].initialValue = objetoDatos.fechaFin;
    this.createEditFormArray[3].initialValue = objetoDatos.ultimoPago;
    this.createEditFormArray[4].initialValue = objetoDatos.periodo;
    let nombreTrabajador = '';
    if (registro.idUsuario) {
      if (registro.idUsuario.nombres && registro.idUsuario.apellidos) {
        nombreTrabajador = registro.idUsuario?.nombres + registro.idUsuario?.apellidos;
      }
    }
    this.abrirModalDecimoTercero(this.createEditFormArray, nombreTrabajador);
    this.blockuiService.deshabilitarBlockUI();
  }


  abrirModalDecimoTercero(formFields: FormField[], nombreTrabajador: string): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `Calcular décimo tercero: ${nombreTrabajador}`,
      description: "Confirme si desea realizar el cálculo",
      accordeons: [],
      formsFields: formFields,
      button: `Calcular`,
      route: this,
      submitButtonDisabled: false
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }
}
