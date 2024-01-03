import {Component, OnInit} from '@angular/core';
import {HistoricoRolResponseDto} from '../../servicios/dto/historico-rol.response-dto';
import {HistoricoRolFindDto} from '../../servicios/dto/historico-rol.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpHistoricoRolService} from '../../servicios/http-historico-rol-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {HistoricoRolCreateDto} from '../../servicios/dto/historico-rol.create-dto';
import {HistoricoRolUpdateDto} from '../../servicios/dto/historico-rol.update-dto';
import {FormHistoricoRolEnum} from '../../form/form-historico-rol.enum';
import {FORM_HISTORICO_ROL} from '../../form/form-historico-rol';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { TAKE } from '../../../../constantes/tabla/take';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { MatStepperArray } from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import { CreateUpdateModalParameters } from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { CreateUpdateModalComponent } from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';

@Component({
  selector: 'app-historico-rol-tabla',
  templateUrl: './historico-rol-tabla.component.html',
  styleUrls: ['./historico-rol-tabla.component.scss']
})
export class HistoricoRolTablaComponent extends AbstractTable<HistoricoRolResponseDto, HistoricoRolFindDto>
  implements OnInit, TableAbstractClass<HistoricoRolResponseDto>, AutocompleteFormInterface {
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
    public httpHistoricoRolService: HttpHistoricoRolService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpHistoricoRolService,
      {
        nombreRegistro: 'Historico Rol',
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
      this.blockuiService.habilitarBlockUI();
      this.httpHistoricoRolService
        .createOne(values as HistoricoRolCreateDto)
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
            console.error({error: error, message: "Error creando Historico Rol", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpHistoricoRolService
        .updateById(values as HistoricoRolUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Historico Rol", data: values});
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

  openDialog(formFields: FormField[], arrayAccordeon:MatStepperArray[] = []): void {
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
    // switch (event.field.formControlName) {
    //   case FormHistoricoRolEnum.generoLibro:
    //     this.buscarAutocomplete(event);
    // }
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


  createOrEdit(record?: HistoricoRolResponseDto) {
    const formArray = [
      ...FORM_HISTORICO_ROL(),
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
