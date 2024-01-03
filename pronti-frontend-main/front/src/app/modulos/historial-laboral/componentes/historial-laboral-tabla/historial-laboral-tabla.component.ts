import {Component, OnInit} from '@angular/core';
import {HistorialLaboralResponseDto} from '../../servicios/dto/historial-laboral.response-dto';
import {HistorialLaboralFindDto} from '../../servicios/dto/historial-laboral.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpHistorialLaboralService} from '../../servicios/http-historial-laboral-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {HistorialLaboralCreateDto} from '../../servicios/dto/historial-laboral.create-dto';
import {HistorialLaboralUpdateDto} from '../../servicios/dto/historial-laboral.update-dto';
import {FormHistorialLaboralEnum} from '../../form/form-historial-laboral.enum';
import {FORM_HISTORIAL_LABORAL} from '../../form/form-historial-laboral';
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
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {
  HttpListaValoresDetalleService
} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {
  ListaValoresDetalleResponseDto
} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {ActivatedRoute} from '@angular/router';
import {AgenciaFindDto} from '../../../agencia/servicios/dto/agencia.find-dto';
import {HttpAgenciaService} from '../../../agencia/servicios/http-agencia-service';
import {AgenciaResponseDto} from '../../../agencia/servicios/dto/agencia.response-dto';
import {CargoResponseDto} from '../../../cargo/servicios/dto/cargo.response-dto';
import {HttpCargoService} from '../../../cargo/servicios/http-cargo-service';
import {CargoFindDto} from '../../../cargo/servicios/dto/cargo.find-dto';
import {
  DivisionAdministrativaFindDto
} from "../../../division-administrativa/servicios/dto/division-administrativa.find-dto";
import {
  HttpDivisionAdministrativaService
} from "../../../division-administrativa/servicios/http-division-administrativa-service";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {HttpTrabajadorService} from "../../../trabajador/servicios/http-trabajador-service";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-historial-laboral-tabla',
  templateUrl: './historial-laboral-tabla.component.html',
  styleUrls: ['./historial-laboral-tabla.component.scss']
})
export class HistorialLaboralTablaComponent extends AbstractTable<HistorialLaboralResponseDto, HistorialLaboralFindDto>
  implements OnInit, TableAbstractClass<HistorialLaboralResponseDto>, AutocompleteFormInterface {
  idTrabajador!: number;
  fechaActual!: string;
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  searchBarFormFields: FormField[] = [
    {
      label: 'Cargo',
      placeholder: 'Ej: Supervisor',
      help: 'Puede filtrar por cargo',
      formControlName: 'idCargo',
      initialValue: '',
      validators: [
        Validators.required,
      ],
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
      help: 'Seleccione la fecha de ingreso a filtrar',
      formControlName: FormHistorialLaboralEnum.fechaIngreso,
      initialValue: "",
      validators: [],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Fecha ingreso',
      placeholder: 'Ej: 12/12/2021',
      column: '6',
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
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpHistorialLaboralService: HttpHistorialLaboralService,
    public confirmationService: ConfirmationService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
    public httpAgenciaService: HttpAgenciaService,
    public httpCargoService: HttpCargoService,
    public activatedRoute: ActivatedRoute,
    public httpDivisionAdministrativa: HttpDivisionAdministrativaService,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public httpTrabajadorServcice: HttpTrabajadorService,
  ) {
    super(
      httpHistorialLaboralService,
      {
        nombreRegistro: 'Historial Laboral',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
    this.fechaActual = dayjs().format('YYYY-MM-DD');
  }

  async ngOnInit() {
    const {idTrabajador} = this.activatedRoute.snapshot.params;
    console.log(this.activatedRoute.snapshot.params);
    if (idTrabajador) {
      this.idTrabajador = +idTrabajador;
      this.findDto.idTrabajador = this.idTrabajador;
    }

    await this.obtenerDatosConfiguracionGeneral()

    this.stablishSkipAndTake(0, TAKE);
    /*  this.tableData = [{
        "cargo": "vendedor",
        "sueldo": 500,
        "fechaIngreso": "2021-06-12",
        // "fechaFin": "2022-06-01",
        "duracion": "trabajo actual",
        "fueAscendido": "N",
        tipoContrato: 'Servicios',
        idCargo: {
          nombre: 'Supervisor'
        }
      }]*/
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.fechaIngreso = undefined;
    this.findDto.idCargo = undefined;
  }

  validarSueldo(values: HistorialLaboralCreateDto) {
    let esSueldoValido = false;
    if (values.sueldo >= 0) {
      if (values.tipoContrato === 'Indefinido') {
        if (this.configuracionGeneral.sueldoBasico) {
          esSueldoValido = values.sueldo >= this.configuracionGeneral.sueldoBasico;
          return esSueldoValido;
        } else {
          return false;
          this.logsMlabsService.toaster(
            {
              titulo: 'ERROR',
              mensaje: 'No se pudo validar si el sueldo ingresado es válido.',
              tipo: ToasterTipo.error,
            }
          )
        }
      } else if (values.sueldo > 0) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }


  actualizarSueldoTrabajador(values: HistorialLaboralCreateDto) {
    this.httpTrabajadorServcice.updateById({sueldo: values.sueldo}, this.idTrabajador)
      .subscribe(
        {
          next: (res) => {
            this.logsMlabsService.toaster(
              {
                titulo: 'AVISO',
                mensaje: 'Sueldo del trabajador actualizado',
                tipo: ToasterTipo.success
              }
            );
          },
          error: (err) => {
            console.error('Error actualizando el sueldo del trabajador:', err);
            this.logsMlabsService.toaster(
              {
                titulo: 'AVISO',
                mensaje: 'No se pudo actualizar el sueldo del trabajador',
                tipo: ToasterTipo.warning
              }
            );
          }
        }
      )
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    let esSueldoValido = this.validarSueldo(values);
    if (esSueldoValido) {
      if (this.create) {
        values.sisHabilitado = ActivoInactivo.Activo;
        values.idTrabajador = this.idTrabajador;
        this.blockuiService.habilitarBlockUI();
        this.httpHistorialLaboralService
          .createOne(values as HistorialLaboralCreateDto)
          .subscribe({
            next: () => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                )
              );
              this.actualizarSueldoTrabajador(values);
              closeModal.closeModal();
              this.searchData();
            },
            error: (error) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(MENSAGE_TOAST.error());
              console.error({error: error, message: "Error creando Historial Laboral", data: values});
            },
          });
      } else {
        this.blockuiService.habilitarBlockUI();
        this.httpHistorialLaboralService
          .updateById(values as HistorialLaboralUpdateDto, this.recordUpdated.id as number)
          .subscribe({
            next: () => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(
                MENSAGE_TOAST.creacionExitosa(
                  this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
                )
              );
              this.actualizarSueldoTrabajador(values);
              closeModal.closeModal();
              this.searchData();
            },
            error: (error) => {
              this.blockuiService.deshabilitarBlockUI();
              this.parameters.messageService.toaster(MENSAGE_TOAST.error());
              console.error({error: error, message: "Error actualizando Historial Laboral", data: values});
            },
          });
      }
    } else {
      this.logsMlabsService.toaster(
        {
          titulo: 'ERROR',
          mensaje: 'Sueldo inválido.',
          tipo: ToasterTipo.error,
        }
      )
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formControlName === 'fechaIngreso') {
      if (event.valid) {
        const fechaActual = dayjs().format('YYYY/MM/DD');
        const duracion = dayjs(event.actualValue).diff(fechaActual, 'days');
        event.formGroup.get('duracion')?.setValue(duracion);
      }
    }
    if (event.formControlName === 'tipoContrato') {
      event.formGroup.get('sueldo')?.reset()
      if (event.actualValue.nombre === 'Indefinido') {
        if (this.configuracionGeneral.sueldoBasico) {
          event.formGroup.get('sueldo')?.clearValidators()
          event.formGroup.get('sueldo')?.addValidators(Validators.min(this.configuracionGeneral.sueldoBasico));
        }
      } else {
        event.formGroup.get('sueldo')?.clearValidators();
      }
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
      if (event.formControlName === 'fechaIngreso') {
        this.findDto.fechaIngreso = event.actualValue
      }
      if (event.formControlName === 'idCargo') {
        this.findDto.idCargo = event.actualValue?.id
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
      case FormHistorialLaboralEnum.tipoContrato:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormHistorialLaboralEnum.idAgencia:
        this.buscarAutocompleteAgencia(event);
        break;
      case FormHistorialLaboralEnum.idCargo:
        this.buscarAutocompleteCargo(event);
        break;
      case FormHistorialLaboralEnum.codigoSectorial:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormHistorialLaboralEnum.idDivisionAdministrativa:
        this.buscarAutocompleteDivisionAdministrativa(event);
        break;
    }
  }

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      tipoContrato: ListaValoresEnum.tipoContratoE,
      codigoSectorial: ListaValoresEnum.codigoSectorial,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
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

  buscarAutocompleteAgencia(evento: SearchAutoCompleteInterface) {
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


  buscarAutocompleteCodigoSectorial(evento: SearchAutoCompleteInterface) {
    const busqueda: ListaValoresDetalleFindDto = {
      busqueda: evento.query,
    };
    this.httpAgenciaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [AgenciaResponseDto[], number])
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

  buscarAutocompleteCargo(evento: SearchAutoCompleteInterface) {
    const busqueda: CargoFindDto = {
      busqueda: evento.query,
    };
    this.httpCargoService
      .find(busqueda)
      .toPromise()
      .then(res => res as [CargoResponseDto[], number])
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

  buscarAutocompleteDivisionAdministrativa(evento: SearchAutoCompleteInterface) {
    const busqueda: DivisionAdministrativaFindDto = {
      busqueda: evento.query,
    };
    this.httpDivisionAdministrativa
      .find(busqueda)
      .toPromise()
      .then(res => res as [CargoResponseDto[], number])
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

  createOrEdit(record?: HistorialLaboralResponseDto) {
    let formArray = [
      ...FORM_HISTORIAL_LABORAL(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistorialLaboralEnum.idCargo)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistorialLaboralEnum.fechaIngreso)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormHistorialLaboralEnum.duracion)];
      this.createEditFormArray = [...formArray];
      this.recordUpdated = {...record};
      this.recordUpdated.tipoContrato = {nombre: record.tipoContrato};
      this.recordUpdated.codigoSectorial = {nombre: record.codigoSectorial};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  eliminarCampoDeFormulario(formArray: FormField[], formcontrolName: string) {
    const foundFieldIndex = formArray.findIndex((field) => {
      return field.formControlName === formcontrolName;
    })
    if (foundFieldIndex >= 0) {
      formArray.splice(foundFieldIndex, 1);
    }
    return formArray;
  }

  obtenerDatosConfiguracionGeneral() {
    return new Promise((resolve, reject) => {
      this.httpConfiguracionGeneralService.find()
        .subscribe(
          {
            next: (configuraciones) => {
              this.configuracionGeneral = configuraciones[0][0];
              resolve(this.configuracionGeneral);
            },
            error: err => {
              this.logsMlabsService.toaster({
                titulo: 'Error',
                tipo: ToasterTipo.error,
                mensaje: 'Error cargando datos de configuración'
              })
              reject(false)
            }
          }
        )
    })
  }

}
