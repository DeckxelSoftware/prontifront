import {Component, OnInit} from '@angular/core';
import {RubrosRolResponseDto} from '../../servicios/dto/rubros-rol.response-dto';
import {RubrosRolFindDto} from '../../servicios/dto/rubros-rol.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpRubrosRolService} from '../../servicios/http-rubros-rol-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {RubrosRolCreateDto} from '../../servicios/dto/rubros-rol.create-dto';
import {RubrosRolUpdateDto} from '../../servicios/dto/rubros-rol.update-dto';
import {FormRubrosRolEnum} from '../../form/form-rubros-rol.enum';
import {FORM_RUBROS_ROL} from '../../form/form-rubros-rol';
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
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {CodigoAuxiliarRubrosRolEnum} from '../../../../enums/codigo-auxiliar-rubros-rol.enum';
import {UnidadesEnum} from '../../../../enums/unidades.enum';
import {SiNoEnum} from '../../../../enums/si-no.enum';

@Component({
  selector: 'app-rubros-rol-tabla',
  templateUrl: './rubros-rol-tabla.component.html',
  styleUrls: ['./rubros-rol-tabla.component.scss']
})
export class RubrosRolTablaComponent extends AbstractTable<RubrosRolResponseDto, RubrosRolFindDto>
  implements OnInit, TableAbstractClass<RubrosRolResponseDto>, AutocompleteFormInterface {
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
      placeholder: 'Ej: Días de falta',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Código auxiliar',
      formControlName: FormRubrosRolEnum.codigoAuxiliar,
      type: fieldType.select,
      help: 'Seleccione el código auxiliar',
      select: {
        filterBy: 'nombre',
        dataKey: 'codigoAuxiliar',
        filterPlaceholder: 'Ej: Argumento de egreso',
        optionLabel: 'nombre',
        options: [
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeEgreso,
            nombre: 'Argumento de egreso',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeIngreso,
            nombre: 'Argumento de ingreso',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosFijos,
            nombre: 'Egresos fijos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosLegales,
            nombre: 'Egresos legales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.otrosEgresos,
            nombre: 'Otros egresos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.egresosPrestamos,
            nombre: 'Egresos prestamos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.ingresosFijos,
            nombre: 'Ingresos fijos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.ingresosLegales,
            nombre: 'Ingresos legales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.otrosIngresos,
            nombre: 'Otros ingresos',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.totalesAcumulados,
            nombre: 'Totales acumulados',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.totalesIndividuales,
            nombre: 'Totales individuales',
          },
          {
            codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.provisiones,
            nombre: 'Provisiones',
          },

        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Totales ...',
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
    public httpRubrosRolService: HttpRubrosRolService,
    public confirmationService: ConfirmationService,
  ) {
    super(
      httpRubrosRolService,
      {
        nombreRegistro: 'Rubros Rol',
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
    //     codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.otrosIngresos,
    //     nombre: 'totales',
    //     nombreAuxiliarUno: 'totales',
    //     nombreAuxiliarDos: 'totales',
    //     unidad: UnidadesEnum.horas,
    //     calculaIess: SiNoEnum.SI,
    //     calculaRenta: SiNoEnum.SI,
    //     calculaDecTercero: SiNoEnum.SI,
    //     calculaDecCuarto: SiNoEnum.SI,
    //     calculaFReserva: SiNoEnum.SI,
    //     calculaVacaciones: SiNoEnum.SI,
    //     seSuma: SiNoEnum.SI,
    //   }
    // ]
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
      this.httpRubrosRolService
        .createOne(values as RubrosRolCreateDto)
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
            console.error({error: error, message: "Error creando Rubros Rol", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpRubrosRolService
        .updateById(values as RubrosRolUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Rubros Rol", data: values});
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
      if (event.formControlName === 'codigoAuxiliar') {
        this.findDto.codigoAuxiliar = event.actualValue?.codigoAuxiliar
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
    //   case FormRubrosRolEnum.generoLibro:
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


  createOrEdit(record?: RubrosRolResponseDto) {
    const formArray = [
      ...FORM_RUBROS_ROL(),
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
