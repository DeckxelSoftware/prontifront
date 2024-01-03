import {Component, OnInit} from '@angular/core';
import {DetalleNovedadRolPagoResponseDto} from '../../servicios/dto/detalle-novedad-rol-pago.response-dto';
import {DetalleNovedadRolPagoFindDto} from '../../servicios/dto/detalle-novedad-rol-pago.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpDetalleNovedadRolPagoService} from '../../servicios/http-detalle-novedad-rol-pago-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {DetalleNovedadRolPagoCreateDto} from '../../servicios/dto/detalle-novedad-rol-pago.create-dto';
import {DetalleNovedadRolPagoUpdateDto} from '../../servicios/dto/detalle-novedad-rol-pago.update-dto';
import {FORM_DETALLE_NOVEDAD_ROL_PAGO} from '../../form/form-detalle-novedad-rol-pago';
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
import {RubrosRolFindDto} from '../../../rubros-rol/servicios/dto/rubros-rol.find-dto';
import {HttpRubrosRolService} from '../../../rubros-rol/servicios/http-rubros-rol-service';
import {RubrosRolResponseDto} from '../../../rubros-rol/servicios/dto/rubros-rol.response-dto';
import {UnidadesEnum} from '../../../../enums/unidades.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {FormDetalleNovedadRolPagoEnum} from '../../form/form-detalle-novedad-rol-pago.enum';
import {TrabajadorFindDto} from '../../../trabajador/servicios/dto/trabajador.find-dto';
import {TrabajadorResponseDto} from '../../../trabajador/servicios/dto/trabajador.response-dto';
import {HttpTrabajadorService} from '../../../trabajador/servicios/http-trabajador-service';
import {PeriodoLaboralFindDto} from "../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto";
import {PeriodoLaboralResponseDto} from "../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto";
import {HttpPeriodoLaboralService} from "../../../periodo-laboral/servicios/http-periodo-laboral-service";

@Component({
  selector: 'app-detalle-novedad-rol-pago-tabla',
  templateUrl: './detalle-novedad-rol-pago-tabla.component.html',
  styleUrls: ['./detalle-novedad-rol-pago-tabla.component.scss']
})
export class DetalleNovedadRolPagoTablaComponent extends AbstractTable<DetalleNovedadRolPagoResponseDto, DetalleNovedadRolPagoFindDto>
  implements OnInit, TableAbstractClass<DetalleNovedadRolPagoResponseDto>, AutocompleteFormInterface {
  idRubroRolSeleccionado!: number;
  nombreRubroRol!: string;
  codigoAuxiliarRubroRol!: string;
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Edgar...',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Tipo',
      placeholder: 'Ej: Aviso ingreso',
      help: 'Seleccione un un tipo',
      formControlName: 'codigoNovedad',
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'codigoAuxiliar',
        suggestions: []
      }
    },
    {
      label: 'Unidad',
      placeholder: '',
      help: '',
      formControlName: 'unidad',
      initialValue: '',
      disabled: true,
      validators: [
        //Validators.required,
      ],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpDetalleNovedadRolPagoService: HttpDetalleNovedadRolPagoService,
    public confirmationService: ConfirmationService,
    public httpRubrosRolService: HttpRubrosRolService,
    public httpTrabajadorService: HttpTrabajadorService,
    public httpPeriodoLaboralService: HttpPeriodoLaboralService
  ) {
    super(
      httpDetalleNovedadRolPagoService,
      {
        nombreRegistro: 'Novedad',
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
    //     id: 1,
    //     tipoNovedad: 'Argumento ingreso',
    //     valor: 100,
    //     idTrabajador: {
    //       idUsuario: {
    //         nombres: 'Nombrecito',
    //         apellidos: 'Apellido '
    //       }
    //     },
    //     idRubrosRol: {
    //       id: 1,
    //       nombre: 'Argumento ingreso',
    //       codigoAuxiliar: CodigoAuxiliarRubrosRolEnum.argumentoDeIngreso,
    //       unidad: UnidadesEnum.horas
    //     },
    //     concepto: 'test'
    //   }
    // ]
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.codigoNovedad = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idRubrosRol = this.idRubroRolSeleccionado;
      values.tipoNovedad = this.nombreRubroRol;
      values.codigoNovedad = this.codigoAuxiliarRubroRol;
      this.blockuiService.habilitarBlockUI();
      this.httpDetalleNovedadRolPagoService
        .createOne(values as DetalleNovedadRolPagoCreateDto)
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
            console.error({error: error, message: "Error creando Detalle Novedad Rol Pago", data: values});
          },
        });
    } else {
      if (this.idRubroRolSeleccionado) {
        values.idRubrosRol = this.idRubroRolSeleccionado;
        values.tipoNovedad = this.nombreRubroRol;
        values.codigoNovedad = this.codigoAuxiliarRubroRol;
      }
      this.blockuiService.habilitarBlockUI();
      this.httpDetalleNovedadRolPagoService
        .updateById(values as DetalleNovedadRolPagoUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Detalle Novedad Rol Pago", data: values});
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
    console.log(event.valid);
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      if (event.formControlName === 'codigoNovedad') {
        console.log('el rubro:', event.actualValue);
        if (event.actualValue?.id) {
          this.idRubroRolSeleccionado = event.actualValue.id;
          this.nombreRubroRol = event.actualValue.nombre;
          this.codigoAuxiliarRubroRol = event.actualValue.codigoAuxiliar;
        } else {
          this.idRubroRolSeleccionado = 0;
          this.nombreRubroRol = '';
          this.codigoAuxiliarRubroRol = '';
        }
        let stringUnidad = ''
        if (this.idRubroRolSeleccionado) {
          stringUnidad = this.devolverUnidad(event.actualValue?.unidad ? event.actualValue.unidad : '');
        } else {
          stringUnidad = this.devolverUnidad('noSeleccionado');
        }

        // @ts-ignore
        this.searchBarFormFields[1].formGroup.get('unidad').setValue(stringUnidad); // 1 es el indice del campo que quiero setear

        if (event.actualValue?.codigoAuxiliar) {
          this.findDto.codigoNovedad = event.actualValue.codigoAuxiliar;
        }
      }
      // Habilitar boton
      this.searchButtonDisabled = false;
    } else {
      // limpiar dto
      // this.clearFindDto();
      // Deshabilitar boton
      this.searchButtonDisabled = false;
    }
  }

  override searchData() {
    super.searchData();
    this.clearFindDto();
  }

  devolverUnidad(unidad: UnidadesEnum | string) {
    switch (unidad) {
      case UnidadesEnum.dias:
        return 'Días';
      case UnidadesEnum.horas:
        return 'Horas';
      case UnidadesEnum.valor:
        return 'Valor';
      case 'noSeleccionado':
        return '';
      default:
        return 'No tiene unidad';
    }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      case 'codigoNovedad':
        this.buscarAutocomplete(event);
        break;
      case FormDetalleNovedadRolPagoEnum.idTrabajador:
        this.buscarAutocompleteTrabajador(event);
        break;
      case FormDetalleNovedadRolPagoEnum.idPeriodoLaboral:
        this.buscarAutocompletePeriodoLaboral(event);
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

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
    const busqueda: RubrosRolFindDto = {
      busqueda: evento.query,
    };
    this.httpRubrosRolService
      .find(busqueda)
      .toPromise()
      .then(res => res as [RubrosRolResponseDto[], number])
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

  buscarAutocompletePeriodoLaboral(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoLaboralFindDto = {
      busqueda: evento.query,
    };
    this.httpPeriodoLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoLaboralResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.detalle = a.mes + '- ' + a.fechaInicio + '-' + a.fechaFin;
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

  createOrEdit(record?: DetalleNovedadRolPagoResponseDto) {
    const formArray = [
      ...FORM_DETALLE_NOVEDAD_ROL_PAGO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.recordUpdated.idTrabajador.nombreCompleto = this.recordUpdated.idTrabajador.idUsuario.nombres + ' ' + this.recordUpdated.idTrabajador.idUsuario.apellidos;
      this.recordUpdated.idPeriodoLaboral.detalle = this.recordUpdated.idPeriodoLaboral.mes + '- ' + this.recordUpdated.idPeriodoLaboral.fechaInicio + '-' + this.recordUpdated.idPeriodoLaboral.fechaFin;
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
