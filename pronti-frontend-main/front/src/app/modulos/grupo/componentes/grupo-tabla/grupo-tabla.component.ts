import {Component, OnInit} from '@angular/core';
import {GrupoResponseDto} from '../../servicios/dto/grupo.response-dto';
import {GrupoFindDto} from '../../servicios/dto/grupo.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpGrupoService} from '../../servicios/http-grupo-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {GrupoCreateDto} from '../../servicios/dto/grupo.create-dto';
import {GrupoUpdateDto} from '../../servicios/dto/grupo.update-dto';
import {FormGrupoEnum} from '../../form/form-grupo.enum';
import {FORM_GRUPO} from '../../form/form-grupo';
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
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {ClienteFindDto} from '../../../cliente/servicios/dto/cliente.find-dto';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-grupo-tabla',
  templateUrl: './grupo-tabla.component.html',
  styleUrls: ['./grupo-tabla.component.scss']
})
export class GrupoTablaComponent extends AbstractTable<GrupoResponseDto, GrupoFindDto>
  implements OnInit, TableAbstractClass<GrupoResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Buscar por nombre de grupo o nombres apellidos de cliente',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: 1',
      column: '6',
      actualValue: '',
    },

    // {
    //   label: 'Cliente',
    //   placeholder: 'Ej: ProntiAuto',
    //   help: 'Seleccione un cliente',
    //   formControlName: 'cliente',
    //   initialValue: '',
    //   validators: [
    //   ],
    //   type: fieldType.autoComplete,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   autoComplete:{
    //     field: 'cliente',
    //     inputId: '',
    //     suggestions: []
    //   }
    // },
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
    public httpGrupoService: HttpGrupoService,
    public confirmationService: ConfirmationService,
    private _httpClienteService: HttpClienteService,
  ) {
    super(
      httpGrupoService,
      {
        nombreRegistro: 'Grupo',
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
      this.httpGrupoService
        .createOne(values as GrupoCreateDto)
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
            console.error({error: error, message: "Error creando Grupo", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpGrupoService
        .updateById(values as GrupoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Grupo", data: values});
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
    console.log(event);
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'cliente') {
        this.findDto.idClienteId = event.actualValue?.id;
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
      case FormGrupoEnum.cliente:
        this.buscarAutocomplete(event);
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
      const busqueda: ClienteFindDto = {
        busqueda: evento.query,
      };
      this._httpClienteService
          .find(busqueda)
          .toPromise()
          .then(res => res as [ClienteResponseDto[], number])
          .then(data => {
            // const arregloDatos = data[0];
            // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
            const arregloDatos = data[0].map((a:any)=>{ a.cliente = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos; return a;});
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


  createOrEdit(record?: GrupoResponseDto) {
    const formArray = [
      ...FORM_GRUPO(),
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
