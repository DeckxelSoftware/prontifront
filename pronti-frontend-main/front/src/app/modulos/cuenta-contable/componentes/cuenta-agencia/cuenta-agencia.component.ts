import {Component, OnInit} from '@angular/core';
import {AbstractTable} from "../../../../abstract/table/abstract-table";
import {CuentaContableResponseDto} from "../../servicios/dto/cuenta-contable.response-dto";
import {CuentaContableFindDto} from "../../servicios/dto/cuenta-contable.find-dto";
import {TableAbstractClass} from "../../../../abstract/table/interfaces/table-abstract-class";
import {AutocompleteFormInterface} from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {MatDialog} from "@angular/material/dialog";
import {HttpCuentaContableService} from "../../servicios/http-cuenta-contable-service";
import {ConfirmationService} from "primeng/api";
import {HttpPeriodoContableService} from "../../../periodo-contable/servicios/http-periodo-contable-service";
import {TAKE} from "../../../../constantes/tabla/take";
import {ModalComponent} from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {CuentaContableCreateDto} from "../../servicios/dto/cuenta-contable.create-dto";
import {MENSAGE_TOAST} from "../../../../constantes/toaster/mensaje-toast";
import {CuentaContableUpdateDto} from "../../servicios/dto/cuenta-contable.update-dto";
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import {FormCuentaContableEnum} from "../../form/form-cuenta-contable.enum";
import {PeriodoContableFindDto} from "../../../periodo-contable/servicios/dto/periodo-contable.find-dto";
import {PeriodoContableResponseDto} from "../../../periodo-contable/servicios/dto/periodo-contable.response-dto";
import {FORM_CUENTA_AGENCIA} from "../../form/form-cuenta-agencia";
import {AgenciaFindDto} from "../../../agencia/servicios/dto/agencia.find-dto";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";
import {RubrosRolFindDto} from "../../../rubros-rol/servicios/dto/rubros-rol.find-dto";
import {HttpRubrosRolService} from "../../../rubros-rol/servicios/http-rubros-rol-service";
import {CodigoAuxiliarRubrosRolEnum} from "../../../../enums/codigo-auxiliar-rubros-rol.enum";
import {FormTrabajadorEnum} from "../../../trabajador/form/form-trabajador.enum";

@Component({
  selector: 'app-cuenta-agencia',
  templateUrl: './cuenta-agencia.component.html',
  styleUrls: ['./cuenta-agencia.component.scss']
})
export class CuentaAgenciaComponent extends AbstractTable<CuentaContableResponseDto, CuentaContableFindDto>
  implements OnInit, TableAbstractClass<CuentaContableResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    // {
    //   help: 'Puede buscar por nombre',
    //   formControlName: 'busqueda',
    //   initialValue: "",
    //   validators: [],
    //   type: fieldType.text,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   label: 'Búsqueda',
    //   placeholder: 'Ej: Bancos',
    //   column: '12',
    //   actualValue: '',
    // },
    {
      label: 'Agencia',
      placeholder: 'Ej: Norte',
      help: 'Seleccione la agencia',
      formControlName: FormCuentaContableEnum.idAgencia,
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
      label: 'Rubro',
      placeholder: 'Ej: Otros ingresos',
      help: 'Seleccione el rubro',
      formControlName: FormCuentaContableEnum.idRubrosRol,
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
    public httpCuentaContableService: HttpCuentaContableService,
    public confirmationService: ConfirmationService,
    public httpPeriodoContableService: HttpPeriodoContableService,
    public httpAgenciaService: HttpAgenciaService,
    public httpRubrosRolService: HttpRubrosRolService
  ) {
    super(
      httpCuentaContableService,
      {
        nombreRegistro: 'Cuenta Agencia',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    // this.tableData = [
    //   {
    //     nombre: 'prueba',
    //     idRubrosRol: {
    //       id: 1,
    //       nombre: 'pruebita',
    //       codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeIngreso
    //     },
    //     idAgencia: {
    //       id: 1,
    //       nombre: 'MCH'
    //     }
    //   }
    // ]
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.idAgencia = undefined;
    this.findDto.idRubrosRol = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaContableService
        .createOne(values as CuentaContableCreateDto)
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
            console.error({error: error, message: "Error creando Cuenta Agencia", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCuentaContableService
        .updateById(values as CuentaContableUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Cuenta Agencia", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formControlName === 'idRubrosRol') {
      console.log('rubros rol:', event.actualValue);
      if (event.actualValue.codigoAuxiliar) {
        event.formGroup.get('tipo')?.setValue(event.actualValue.codigoAuxiliar);
      } else {
        event.formGroup.get('tipo')?.setValue('No registrado');
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
      if (event.formControlName === 'idAgencia') {
        this.findDto.idAgencia = event.actualValue.id
      }
      if (event.formControlName === 'idRubrosRol') {
        this.findDto.idRubrosRol = event.actualValue.id
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
      case FormCuentaContableEnum.idAgencia:
        this.buscarAutocompleteAgencia(event);
        break;
      case FormCuentaContableEnum.idRubrosRol:
        this.buscarAutocompleteRubrosRol(event);
        break;
    }
  }

  buscarAutocompletePeriodoContable(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoContableFindDto = {
      busqueda: evento.query,

    };
    this.httpPeriodoContableService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoContableResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.detalle = a.fechaInicio.split('T')[0] + '- ' + a.fechaFin.split('T')[0];
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
    const busqueda: AgenciaFindDto = {
      busqueda: evento.query,

    };
    this.httpAgenciaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.detalle = a.fechaInicio.split('T')[0] + '- ' + a.fechaFin.split('T')[0];
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

  buscarAutocompleteRubrosRol(evento: SearchAutoCompleteInterface) {
    const busqueda: RubrosRolFindDto = {
      busqueda: evento.query,

    };
    this.httpRubrosRolService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoContableResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.detalle = a.fechaInicio.split('T')[0] + '- ' + a.fechaFin.split('T')[0];
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


  createOrEdit(record?: CuentaContableResponseDto) {
    const formArray = [
      ...FORM_CUENTA_AGENCIA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.recordUpdated.tipo = this.recordUpdated.idRubrosRol.codigoAuxiliar;
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
