import {Component, OnInit} from '@angular/core';
import {TrabajadorResponseDto} from '../../servicios/dto/trabajador.response-dto';
import {TrabajadorFindDto} from '../../servicios/dto/trabajador.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpTrabajadorService} from '../../servicios/http-trabajador-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {TrabajadorCreateDto} from '../../servicios/dto/trabajador.create-dto';
import {TrabajadorUpdateDto} from '../../servicios/dto/trabajador.update-dto';
import {FormTrabajadorEnum} from '../../form/form-trabajador.enum';
import {FORM_TRABAJADOR} from '../../form/form-trabajador';
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
import {UsuarioFindDto} from '../../../usuario/servicios/dto/usuario.find-dto';
import {HttpUsuarioService} from '../../../usuario/servicios/http-usuario-service';
import {UsuarioResponseDto} from '../../../usuario/servicios/dto/usuario.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ModalidadContrato} from '../../../../enums/modalidad-contrato';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {
  ListaValoresDetalleResponseDto
} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {
  HttpListaValoresDetalleService
} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {GeneroEnum} from '../../../../enums/genero.enum';
import {EstadoFamiliarEnum} from '../../../../enums/estado-familiar.enum';
import {Router} from '@angular/router';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {FORM_INGRESO} from '../../form/form-ingreso';
import {FORM_BENEFICIO} from '../../form/form-beneficio';
import {FORM_DESCUENTO} from '../../form/form-descueto';
import {MatStepperConfig} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-config';
import {CuentaContableFindDto} from "../../../cuenta-contable/servicios/dto/cuenta-contable.find-dto";
import {HttpCuentaContableService} from "../../../cuenta-contable/servicios/http-cuenta-contable-service";
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {
  ConfiguracionGeneralResponseDto
} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import * as dayjs from 'dayjs';
import {ModalCrearTrabajadorComponent} from "../modal-crear-trabajador/modal-crear-trabajador.component";
import {FORM_USUARIO} from "../../../usuario/form/form-usuario";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {FormUsuarioEnum} from "../../../usuario/form/form-usuario.enum";
import {UsuarioCreateDto} from "../../../usuario/servicios/dto/usuario.create-dto";
import {FormSupervisorEnum} from "../../../supervisor/form/form-supervisor.enum";
import {AgenciaFindDto} from "../../../agencia/servicios/dto/agencia.find-dto";
import {AgenciaResponseDto} from "../../../agencia/servicios/dto/agencia.response-dto";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";

@Component({
  selector: 'app-trabajador-tabla',
  templateUrl: './trabajador-tabla.component.html',
  styleUrls: ['./trabajador-tabla.component.scss']
})
export class TrabajadorTablaComponent extends AbstractTable<TrabajadorResponseDto, TrabajadorFindDto>
  implements OnInit, TableAbstractClass<TrabajadorResponseDto>, AutocompleteFormInterface {
  matStepperConfig: MatStepperConfig = {
    orientation: 'horizontal',
    linear: false,
  };
  crearDatosUsuario = false;
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
    public httpAgenciaService: HttpAgenciaService,
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
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // la funcion getFormDate no funciona, llena el dato de select
    values.modalidadContrato = this.createEditFormArray[1].actualValue.modalidadContrato;

    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpTrabajadorService
        .createOne(values as TrabajadorCreateDto)
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
            console.error({error: error, message: "Error creando Trabajador", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpTrabajadorService
        .updateById(values as TrabajadorUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Trabajador", data: values});
          },
        });
    }
  }

  findFormPorId(id: string, stepper: MatStepperArray[]) {
    const indice = stepper.findIndex(
      step => {
        return step.id === id;
      }
    )
    return indice;
  }

  stepperFieldModalChanged(event: FormField, stepper: MatStepperArray[]
                           //, enableButton: ModalComponent
  ): void {
    console.log(event)
    if (event.formControlName === FormTrabajadorEnum.reingreso) {
      if (event.actualValue.reingreso === SiNoEnum.SI) {
        event.formGroup.get('fechaReingreso')?.enable();
      } else {
        event.formGroup.get('fechaReingreso')?.reset();
        event.formGroup.get('fechaReingreso')?.disable();
      }
    }
    if (event.formControlName === FormTrabajadorEnum.tiempoParcial) {
      if (event.actualValue.tiempoParcial === SiNoEnum.SI) {
        event.formGroup.get('factorParcial')?.enable();
        if (this.configuracionGeneral.sueldoBasico) {
          const indice = this.findFormPorId('formIngreso', stepper);
          if (indice >= 0) {
            stepper[indice].formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
          } else {
            this.logsMlabsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error seteando el sueldo',
                tipo: ToasterTipo.error
              }
            )
          }
        }

      } else {
        event.formGroup.get('factorParcial')?.reset();
        event.formGroup.get('factorParcial')?.disable();
      }
    }

    if (event.formControlName === FormTrabajadorEnum.factorParcial) {
      if (this.configuracionGeneral.sueldoBasico && event.formGroup.get('pasante')?.value.pasante !== SiNoEnum.SI) {
        const indice = this.findFormPorId('formIngreso', stepper);
        if (indice >= 0) {
          stepper[indice].formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
        } else {
          this.logsMlabsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error seteando el sueldo',
              tipo: ToasterTipo.error
            }
          )
        }
      }
    }

    if (event.formControlName === FormTrabajadorEnum.pasante) {
      if (event.actualValue.pasante === SiNoEnum.SI) {
        if (this.configuracionGeneral.sueldoBasico) {
          const indice = this.findFormPorId('formIngreso', stepper);
          if (indice >= 0) {
            stepper[indice].formGroup.get('sueldo')?.setValue(this.configuracionGeneral.sueldoBasico * (1 / 3))
          } else {
            this.logsMlabsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error seteando el sueldo',
                tipo: ToasterTipo.error
              }
            )
          }

        }
        // si elige no entonces se calcula como que hubiese puesto factor parcial
      } else if (event.actualValue.pasante === SiNoEnum.NO) {
        if (this.configuracionGeneral.sueldoBasico && event.formGroup.get(FormTrabajadorEnum.factorParcial)?.value) {
          const indice = this.findFormPorId('formIngreso', stepper);
          if (indice >= 0) {
            stepper[indice].formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
          } else {
            this.logsMlabsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error seteando el sueldo',
                tipo: ToasterTipo.error
              }
            )
          }
        }
      }
    }

    if (event.formControlName === FormTrabajadorEnum.fechaIngreso) {
      const diferencia = dayjs().diff(event.actualValue, 'd');
      if (diferencia > 0) {
        event.formGroup.get(FormTrabajadorEnum.fechaIngreso)?.reset();
      }
    }

    if (event.formGroup.valid) {
      this.createEditFormGroup = event.formGroup;
      // enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      // enableButton.enableButton(false);
    }
  }

  fieldModalChanged(event: FormField,
                    //, enableButton: ModalComponent
  ): void {
    console.log(event)
    if (event.formControlName === FormTrabajadorEnum.reingreso) {
      if (event.actualValue.reingreso === SiNoEnum.SI) {
        event.formGroup.get('fechaReingreso')?.enable();
      } else {
        event.formGroup.get('fechaReingreso')?.reset();
        event.formGroup.get('fechaReingreso')?.disable();
      }
    }
    if (event.formControlName === FormTrabajadorEnum.tiempoParcial) {
      if (event.actualValue.tiempoParcial === SiNoEnum.SI) {
        event.formGroup.get('factorParcial')?.enable();
        if (this.configuracionGeneral.sueldoBasico) {
          event.formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
        }

      } else {
        event.formGroup.get('factorParcial')?.reset();
        event.formGroup.get('factorParcial')?.disable();
      }
    }

    if (event.formControlName === FormTrabajadorEnum.factorParcial) {
      if (this.configuracionGeneral.sueldoBasico && event.formGroup.get('pasante')?.value.pasante !== SiNoEnum.SI) {
        event.formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
      }
    }

    if (event.formControlName === FormTrabajadorEnum.pasante) {
      if (event.actualValue.pasante === SiNoEnum.SI) {
        if (this.configuracionGeneral.sueldoBasico) {
          event.formGroup.get('sueldo')?.setValue(this.configuracionGeneral.sueldoBasico * (1 / 3))
        }
        // si elige no entonces se calcula como que hubiese puesto factor parcial
      } else if (event.actualValue.pasante === SiNoEnum.NO) {
        if (this.configuracionGeneral.sueldoBasico && event.formGroup.get(FormTrabajadorEnum.factorParcial)?.value) {
          event.formGroup.get('sueldo')?.setValue(event.formGroup.get('factorParcial')?.value * this.configuracionGeneral.sueldoBasico)
        }
      }
    }

    if (event.formControlName === FormTrabajadorEnum.fechaIngreso) {
      const diferencia = dayjs().diff(event.actualValue, 'd');
      if (diferencia > 0) {
        event.formGroup.get(FormTrabajadorEnum.fechaIngreso)?.reset();
      }
    }

    if (event.formGroup.valid) {
      this.createEditFormGroup = event.formGroup;
      // enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      // enableButton.enableButton(false);
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

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.log(event.field);
    switch (event.field.formControlName) {
      case FormTrabajadorEnum.idAgencia:
        this.buscarAutocompleteAgencia(event);
        break;
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
      case FormTrabajadorEnum.cuentaContableNombre:
        this.buscarAutocompleteCuentaContable(event);
        break;
      case FormUsuarioEnum.tipoMedioContacto:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.tipoDocumentoIdentidad:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.pais:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.provincia:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormUsuarioEnum.ciudad:
        this.buscarAutocompleteListaValorDetalle(event);
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


  createOrEdit(record?: TrabajadorResponseDto) {
    const formArray = [
      ...FORM_TRABAJADOR(),
      ...FORM_BENEFICIO(),
      ...FORM_DESCUENTO(),
      ...FORM_INGRESO()
    ];
    this.createEditFormArray = [...formArray];
    console.log('trabajador:', record);
    if (record) {

      this.recordUpdated = {...record};
      // @ts-ignore
      this.recordUpdated.idUsuario.nombresCompletos = `${this.recordUpdated.idUsuario.nombres} ${record.idUsuario.apellidos}`;
      this.recordUpdated.estadoCivil = {nombre: this.recordUpdated.estadoCivil};
      this.recordUpdated.grupoSanguineo = {nombre: this.recordUpdated.grupoSanguineo};
      this.recordUpdated.nivelEstudios = {nombre: this.recordUpdated.nivelEstudios};
      this.recordUpdated.profesion = {nombre: this.recordUpdated.profesion};
      this.recordUpdated.codigoSectorial = {nombre: this.recordUpdated.codigoSectorial};
      this.recordUpdated.tipoDiscapacidad = {nombre: this.recordUpdated.tipoDiscapacidad};
      this.recordUpdated.cuentaContableNombre = {nombre: this.recordUpdated.cuentaContableNombre};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      // this.recordUpdated = undefined;
      const objetoTrabajadoCrear: Partial<TrabajadorResponseDto> = {};
      objetoTrabajadoCrear.aporteIess = SiNoEnum.SI;
      objetoTrabajadoCrear.aporteIessAsumido = SiNoEnum.SI;
      objetoTrabajadoCrear.decimosAnio = SiNoEnum.SI;
      objetoTrabajadoCrear.impuestoRenta = SiNoEnum.SI;
      objetoTrabajadoCrear.fondoReservaIess = SiNoEnum.SI;
      objetoTrabajadoCrear.utilidades = SiNoEnum.SI;
      objetoTrabajadoCrear.pagoFondosReservaMes = SiNoEnum.NO;
      objetoTrabajadoCrear.impuestoRentaPatron = SiNoEnum.NO;
      objetoTrabajadoCrear.vacaciones = SiNoEnum.SI;
      objetoTrabajadoCrear.beneficios = SiNoEnum.SI;
      objetoTrabajadoCrear.pagoDecTercerCuartoMes = SiNoEnum.NO;
      objetoTrabajadoCrear.tiempoParcial = SiNoEnum.NO;
      this.fillForm(objetoTrabajadoCrear, this.createEditFormArray)
    }
    this.openDialog(this.createEditFormArray)
  }

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
      tipoMedioContacto1: ListaValoresEnum.tipoMedioContacto,
      tipoDocumentoIdentidad: ListaValoresEnum.tipoDocumentoIdentidad,
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

  async crearOEditarModal(modal: ModalCrearTrabajadorComponent) {
    console.log(modal.data.arregloFormulario)
    if (this.crearDatosUsuario) {
      const valuesUsuario = this.getFormData(modal.data.arregloFormulario[0].fieldsArray as FormField[], modal.data.arregloFormulario[0].formGroup);
      valuesUsuario.sisHabilitado = ActivoInactivo.Activo;
      const valuesTrabajador = this.getFormData(modal.data.arregloFormulario[1].fieldsArray as FormField[], modal.data.arregloFormulario[1].formGroup);
      const valuesBeneficio = this.getFormData(modal.data.arregloFormulario[2].fieldsArray as FormField[], modal.data.arregloFormulario[2].formGroup);
      const valuesIngreso = this.getFormData(modal.data.arregloFormulario[3].fieldsArray as FormField[], modal.data.arregloFormulario[3].formGroup);
      const valuesDescuento = this.getFormData(modal.data.arregloFormulario[4].fieldsArray as FormField[], modal.data.arregloFormulario[4].formGroup);
      const values = {...valuesTrabajador, ...valuesBeneficio, ...valuesIngreso, ...valuesDescuento}
      values.sisHabilitado = ActivoInactivo.Activo;
      console.log(valuesUsuario, values);
      try {
        const resCrearUsuario = await this.crearUsuario(valuesUsuario);
        this.logsMlabsService.toaster(
          {
            titulo: 'Exito',
            mensaje: 'Usuario creardo',
            tipo: ToasterTipo.success
          }
        )
        console.log(resCrearUsuario);
        values.idUsuario = resCrearUsuario.id;
        const resCrearTrabajador = await this.crearTrabajador(values);
        console.log(resCrearTrabajador);
        this.logsMlabsService.toaster(
          {
            titulo: 'Exito',
            mensaje: 'Trabajador creardo',
            tipo: ToasterTipo.success
          }
        )
        modal.close();
      } catch (e) {
        console.error(e);
      }

    } else {
      const valuesTrabajador = this.getFormData(modal.data.arregloFormulario[0].fieldsArray as FormField[], modal.data.arregloFormulario[0].formGroup);
      const valuesBeneficio = this.getFormData(modal.data.arregloFormulario[1].fieldsArray as FormField[], modal.data.arregloFormulario[1].formGroup);
      const valuesIngreso = this.getFormData(modal.data.arregloFormulario[2].fieldsArray as FormField[], modal.data.arregloFormulario[2].formGroup);
      const valuesDescuento = this.getFormData(modal.data.arregloFormulario[3].fieldsArray as FormField[], modal.data.arregloFormulario[3].formGroup);
      const values = {...valuesTrabajador, ...valuesBeneficio, ...valuesIngreso, ...valuesDescuento}
      values.sisHabilitado = ActivoInactivo.Activo;
      try {
        const resCrearTrabajador = await this.crearTrabajador(values);
        this.logsMlabsService.toaster(
          {
            titulo: 'Exito',
            mensaje: 'Trabajador creardo',
            tipo: ToasterTipo.success
          }
        )
        modal.close();
      } catch (e) {
        console.error(e);
      }
    }

  }

  crearTrabajador(datosTrabajador: TrabajadorCreateDto) {
    return new Promise(
      (resolve, reject) => {
        this.blockuiService.habilitarBlockUI();
        this.httpTrabajadorService.createOne(datosTrabajador)
          .subscribe(
            {
              next: res => {
                this.blockuiService.deshabilitarBlockUI();
                resolve(res);
              },
              error: err => {
                this.blockuiService.deshabilitarBlockUI();
                this.logsMlabsService.toaster(
                  {
                    titulo: 'Error',
                    mensaje: 'Error creando trabajador',
                    tipo: ToasterTipo.error
                  }
                )
                console.error('Error creando datos trabajador: ', err);
                reject(err);
              }
            }
          )
      }
    );
  }

  crearUsuario(datosUsuarioCrear: UsuarioCreateDto): Promise<UsuarioResponseDto> {
    return new Promise((resolve, reject) => {
        this.blockuiService.habilitarBlockUI();
        this.httpUsuarioService.createOne(datosUsuarioCrear)
          .subscribe(
            {
              next: res => {
                this.blockuiService.deshabilitarBlockUI();
                resolve(res);
              },
              error: err => {
                this.blockuiService.deshabilitarBlockUI();
                this.logsMlabsService.toaster(
                  {
                    titulo: 'Error',
                    mensaje: 'Error creando usuario',
                    tipo: ToasterTipo.error
                  }
                )
                console.error('Error creando datos de usuario: ', err);
                reject(err);
              }
            }
          )
      }
    )

  }

  abrirModalCrearEditarTrabajador(parametros: { stepper: MatStepperArray[], registro?: TrabajadorResponseDto }) {
    const parametrosModalCrearProveedor = {
      arregloFormulario: parametros.stepper,
      componente: this,
      registro: parametros.registro ? parametros.registro : null,

    };
    const dialogRef = this.dialog.open(ModalCrearTrabajadorComponent, {
      data: parametrosModalCrearProveedor,
    });
  }

  setearFormularioCrear(crearDatosUsuario: boolean) {
    this.crearDatosUsuario = crearDatosUsuario;
    let stepper: MatStepperArray[] = [];
    if (crearDatosUsuario) {
      stepper.push(
        {
          fieldsArray: FORM_USUARIO(),
          id: 'formUsuario',
          formGroup: new FormGroup({}),
          labelHtml: 'Datos Usuario',
        }
      );
    }

    const fieldsTrabajador = FORM_TRABAJADOR();

    if (crearDatosUsuario) {
      fieldsTrabajador.splice(0, 1);
    }

    stepper.push(...[
      {
        fieldsArray: fieldsTrabajador,
        id: 'formTrabajador',
        formGroup: new FormGroup({}),
        labelHtml: 'Datos Trabajador',
      },
      {
        fieldsArray: FORM_BENEFICIO(),
        id: 'formBeneficio',
        formGroup: new FormGroup({}),
        labelHtml: 'Beneficios',
      },
      {
        id: 'formIngreso',
        fieldsArray: FORM_INGRESO(),
        formGroup: new FormGroup({}),
        labelHtml: 'Ingresos',
      },
      {
        fieldsArray: FORM_DESCUENTO(),
        id: 'formDescuento',
        formGroup: new FormGroup({}),
        labelHtml: 'Descuento',
      },
    ])
    this.abrirModalCrearEditarTrabajador({stepper});
  }
}
