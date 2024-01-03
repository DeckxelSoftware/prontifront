import {Component, OnInit} from '@angular/core';
import {ListaValoresDetalleResponseDto} from '../../servicios/dto/lista-valores-detalle.response-dto';
import {ListaValoresDetalleFindDto} from '../../servicios/dto/lista-valores-detalle.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpListaValoresDetalleService} from '../../servicios/http-lista-valores-detalle-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {ListaValoresDetalleCreateDto} from '../../servicios/dto/lista-valores-detalle.create-dto';
import {ListaValoresDetalleUpdateDto} from '../../servicios/dto/lista-valores-detalle.update-dto';
import {FormListaValoresDetalleEnum} from '../../form/form-lista-valores-detalle.enum';
import {FORM_LISTA_VALORES_DETALLE} from '../../form/form-lista-valores-detalle';
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
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {HttpListaValoresTipoService} from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.service';
import {ListaValoresTipoResponseDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';
import {ListaValoresTipoFindDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.find-dto';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-lista-valores-detalle-tabla',
  templateUrl: './lista-valores-detalle-tabla.component.html',
  styleUrls: ['./lista-valores-detalle-tabla.component.scss']
})
export class ListaValoresDetalleTablaComponent extends AbstractTable<ListaValoresDetalleResponseDto, ListaValoresDetalleFindDto>
  implements OnInit, TableAbstractClass<ListaValoresDetalleResponseDto>, AutocompleteFormInterface {

  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por código primario, secundario y nombre',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: Historia',
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
      label: 'Lista de valores',
      formControlName: FormListaValoresDetalleEnum.listaValoresTipo,
      type: fieldType.autoComplete,
      help: 'Seleccione si esta habilitado o no',
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      },
      placeholder: 'Ej: Género/Ciudad',
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpListaValoresDetalleService: HttpListaValoresDetalleService,
    public confirmationService: ConfirmationService,
    public listaValoresTipoService: HttpListaValoresTipoService,
  ) {
    super(
      httpListaValoresDetalleService,
      {
        nombreRegistro: 'Lista Valores Detalle',
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
      this.httpListaValoresDetalleService
        .createOne(values as ListaValoresDetalleCreateDto)
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
            console.error({error: error, message: "Error creando Lista Valores Detalle", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpListaValoresDetalleService
        .updateById(values as ListaValoresDetalleUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Lista Valores Detalle", data: values});
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
      console.log(event);
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'idListaValoresTipo') {
        this.findDto.idListaValoresTipo = event.actualValue?.id
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
    //   case FormListaValoresDetalleEnum.generoLibro:
    //     this.buscarAutocomplete(event);
    // }
    switch (event.field.formControlName) {
      case FormListaValoresDetalleEnum.listaValoresTipo:
        this.buscarListaValoresTipo(event);
    }
  }

  buscarListaValoresTipo(evento: SearchAutoCompleteInterface) {
    const busqueda: ListaValoresTipoFindDto = {
      busqueda: evento.query,
    };
    this.listaValoresTipoService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresTipoResponseDto[], number])
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


  createOrEdit(record?: ListaValoresDetalleResponseDto) {
    const formArray = [
      ...FORM_LISTA_VALORES_DETALLE(),
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
