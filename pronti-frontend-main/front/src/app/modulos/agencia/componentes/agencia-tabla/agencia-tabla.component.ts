import {Component, OnInit} from '@angular/core';
import {AgenciaResponseDto} from '../../servicios/dto/agencia.response-dto';
import {AgenciaFindDto} from '../../servicios/dto/agencia.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpAgenciaService} from '../../servicios/http-agencia-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {AgenciaCreateDto} from '../../servicios/dto/agencia.create-dto';
import {AgenciaUpdateDto} from '../../servicios/dto/agencia.update-dto';
import {FormAgenciaEnum} from '../../form/form-agencia.enum';
import {FORM_AGENCIA} from '../../form/form-agencia';
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
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {SupervisorResponseDto} from '../../../supervisor/servicios/dto/supervisor.response-dto';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-agencia-tabla',
  templateUrl: './agencia-tabla.component.html',
  styleUrls: ['./agencia-tabla.component.scss']
})
export class AgenciaTablaComponent extends AbstractTable<AgenciaResponseDto, AgenciaFindDto>
  implements OnInit, TableAbstractClass<AgenciaResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombre',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Agencia ...',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Ciudad',
      placeholder: 'Ej: Quito/Guayaquil/...',
      help: 'Seleccione una ciudad',
      formControlName: FormAgenciaEnum.ciudad,
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
    public httpAgenciaService: HttpAgenciaService,
    public confirmationService: ConfirmationService,
    public httpListaValoresDetalle: HttpListaValoresDetalleService,
  ) {
    super(
      httpAgenciaService,
      {
        nombreRegistro: 'Agencia',
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
    this.findDto.ciudad = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpAgenciaService
        .createOne(values as AgenciaCreateDto)
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
            console.error({error: error, message: "Error creando Agencia", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpAgenciaService
        .updateById(values as AgenciaUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Agencia", data: values});
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
      // if (event.formControlName === 'sisHabilitado') {
      //   this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      // }
      if (event.formControlName === 'ciudad') {
        this.findDto.ciudad = event.actualValue?.nombre
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
      case FormAgenciaEnum.ciudad:
        this.buscarAutocomplete(event);
        break;
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: 'CA1',
      busqueda: evento.query,
    };
    this.httpListaValoresDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleFindDto[], number])
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


  createOrEdit(record?: AgenciaResponseDto) {
    const formArray = [
      ...FORM_AGENCIA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};

      const recordAux: any = {...record}
      delete recordAux.ciudad;
      recordAux.ciudad = {nombre: ''}
      recordAux.ciudad.nombre = this.recordUpdated.ciudad;
      this.fillForm(recordAux, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  filtrarSupervisorActivo(supervisoresAgencia: SupervisorResponseDto[]) {
    console.log('volviendo a ver el supervisor activo');
    const indexSupervisorHabilitado = supervisoresAgencia.findIndex((supervisor) => {
        return supervisor.sisHabilitado === 'A';
      }
    );
    if (indexSupervisorHabilitado >= 0) {
      // @ts-ignore
      if (supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario) {
        // @ts-ignore
        return supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.nombres + ' ' + supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.apellidos;
      } else {
        return 'No tiene'
      }

    } else {
      return 'No tiene'
    }
  }
}
