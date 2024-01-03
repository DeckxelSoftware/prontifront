import {Component, OnInit} from '@angular/core';
import {SupervisorResponseDto} from '../../servicios/dto/supervisor.response-dto';
import {SupervisorFindDto} from '../../servicios/dto/supervisor.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpSupervisorService} from '../../servicios/http-supervisor-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {SupervisorCreateDto} from '../../servicios/dto/supervisor.create-dto';
import {SupervisorUpdateDto} from '../../servicios/dto/supervisor.update-dto';
import {FORM_SUPERVISOR} from '../../form/form-supervisor';
import {TAKE} from '../../../../constantes/tabla/take';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {fieldType, FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {ModalidadContrato, ModalidadContratoEnum} from '../../../../enums/modalidad-contrato';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {FormSupervisorEnum} from '../../form/form-supervisor.enum';
import {HttpTrabajadorService} from '../../../trabajador/servicios/http-trabajador-service';
import {TrabajadorFindDto} from '../../../trabajador/servicios/dto/trabajador.find-dto';
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {HttpAgenciaService} from '../../../agencia/servicios/http-agencia-service';
import {AgenciaFindDto} from '../../../agencia/servicios/dto/agencia.find-dto';
import {AgenciaResponseDto} from '../../../agencia/servicios/dto/agencia.response-dto';
import {FormTrabajadorEnum} from '../../../trabajador/form/form-trabajador.enum';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-supervisor-tabla',
  templateUrl: './supervisor-tabla.component.html',
  styleUrls: ['./supervisor-tabla.component.scss']
})
export class SupervisorTablaComponent extends AbstractTable<SupervisorResponseDto, SupervisorFindDto>
  implements OnInit, TableAbstractClass<SupervisorResponseDto>, AutocompleteFormInterface {
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
    {
      label: 'Agencia',
      placeholder: 'Ej: Agencia norte',
      help: 'Seleccione una agencia',
      formControlName: FormSupervisorEnum.agencia,
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
    public httpSupervisorService: HttpSupervisorService,
    public confirmationService: ConfirmationService,
    public httpTrabajadorService: HttpTrabajadorService,
    public httpAgenciaService: HttpAgenciaService,
  ) {
    super(
      httpSupervisorService,
      {
        nombreRegistro: 'Supervisor',
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
    this.findDto.idTrabajadorModalidadContrato = undefined;
    this.findDto.idAgencia = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpSupervisorService
        .createOne(values as SupervisorCreateDto)
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
            console.error({error: error, message: "Error creando Supervisor", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpSupervisorService
        .updateById(values as SupervisorUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Supervisor", data: values});
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
      if (event.formControlName === 'busquedaUsuario') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'modalidadContrato') {
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
    }
  }

  buscarAutocompleteTrabajador(evento: SearchAutoCompleteInterface) {
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
        console.log('trabajadores:', arregloDatos);
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


  createOrEdit(record?: SupervisorResponseDto) {
    const formArray = [
      ...FORM_SUPERVISOR(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};

      if (record.idTrabajador) {
        if (record.idTrabajador.idUsuario) {
          if (record.idTrabajador.idUsuario.apellidos && record.idTrabajador.idUsuario.nombres) {
            this.recordUpdated.idTrabajador.nombreCompleto = record.idTrabajador?.idUsuario?.nombres + ' ' + record.idTrabajador?.idUsuario?.apellidos;
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

}
