import {Component, OnInit} from '@angular/core';
import {UsuarioResponseDto} from '../../servicios/dto/usuario.response-dto';
import {UsuarioFindDto} from '../../servicios/dto/usuario.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpUsuarioService} from '../../servicios/http-usuario-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup, Validators} from '@angular/forms';
import {UsuarioCreateDto} from '../../servicios/dto/usuario.create-dto';
import {UsuarioUpdateDto} from '../../servicios/dto/usuario.update-dto';
import {FORM_USUARIO} from '../../form/form-usuario';
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
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {FormUsuarioEnum} from '../../form/form-usuario.enum';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {MatStepperArray} from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";

@Component({
  selector: 'app-usuario-tabla',
  templateUrl: './usuario-tabla.component.html',
  styleUrls: ['./usuario-tabla.component.scss']
})
export class UsuarioTablaComponent extends AbstractTable<UsuarioResponseDto, UsuarioFindDto>
  implements OnInit, TableAbstractClass<UsuarioResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos, username o correo',
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
      label: 'Tipo documento de identidad',
      placeholder: 'Ej: Cédula',
      help: 'Seleccione el tipo de documento de identidad',
      formControlName: FormUsuarioEnum.tipoDocumentoIdentidad,
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
      label: 'País',
      placeholder: 'Ej: Ecuador',
      help: 'Seleccione un país',
      formControlName: FormUsuarioEnum.pais,
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
      formControlName: FormUsuarioEnum.provincia,
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
      formControlName: FormUsuarioEnum.ciudad,
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
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpUsuarioService: HttpUsuarioService,
    public confirmationService: ConfirmationService,
    public httpListavaloresDetalle: HttpListaValoresDetalleService,
  ) {
    super(
      httpUsuarioService,
      {
        nombreRegistro: 'Usuario',
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
    this.findDto.pais = undefined;
    this.findDto.provincia = undefined;
    this.findDto.ciudad = undefined;
    this.findDto.tipoDocumentoIdentidad = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);

    if (values.fechaNacimiento) {
      const fechaNacimiento = new Date(values.fechaNacimiento);
      fechaNacimiento.setDate(fechaNacimiento.getDate() + 1);
      values.fechaNacimiento = fechaNacimiento.toISOString();
    }
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpUsuarioService
        .createOne(values as UsuarioCreateDto)
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
            console.error({error: error, message: "Error creando Usuario", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpUsuarioService
        .updateById(values as UsuarioUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Usuario", data: values});
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
      if (event.formControlName === 'pais') {
        this.findDto.pais = event.actualValue?.nombre
      }
      if (event.formControlName === 'ciudad') {
        this.findDto.ciudad = event.actualValue?.nombre
      }
      if (event.formControlName === 'provincia') {
        this.findDto.provincia = event.actualValue?.nombre
      }
      if (event.formControlName === 'tipoDocumentoIdentidad') {
        this.findDto.tipoDocumentoIdentidad = event.actualValue?.nombre
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
      case FormUsuarioEnum.tipoMedioContacto:
        this.buscarAutocomplete(event);
        break;
      case FormUsuarioEnum.tipoDocumentoIdentidad:
        this.buscarAutocomplete(event);
        break;
      case FormUsuarioEnum.pais:
        this.buscarAutocomplete(event);
        break;
      case FormUsuarioEnum.provincia:
        this.buscarAutocomplete(event);
        break;
      case FormUsuarioEnum.ciudad:
        this.buscarAutocomplete(event);
        break;
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {
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

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      tipoMedioContacto1: 'TMC1',
      tipoDocumentoIdentidad: 'TD1',
      pais: 'PU1',
      provincia: 'PVU1',
      ciudad: 'CU1',
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }

  createOrEdit(record?: UsuarioResponseDto) {
    let formArray = [
      ...FORM_USUARIO(),
    ];

    if (record) {
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormUsuarioEnum.correo)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormUsuarioEnum.username)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormUsuarioEnum.password)];
      formArray = [...this.eliminarCampoDeFormulario(formArray, FormUsuarioEnum.documentoIdentidad)];

      this.createEditFormArray = [...formArray];
      const recordAux: any = {...record};
      delete recordAux.pais;
      delete recordAux.provincia;
      delete recordAux.ciudad;
      delete recordAux.tipoDocumentoIdentidad;
      delete recordAux.tipoMedioContacto1;
      recordAux.pais = {nombre: record.pais}
      recordAux.provincia = {nombre: record.provincia}
      recordAux.ciudad = {nombre: record.ciudad}
      recordAux.tipoDocumentoIdentidad = {nombre: record.tipoDocumentoIdentidad}
      recordAux.tipoMedioContacto1 = {nombre: record.tipoMedioContacto1}

      if (record.fechaNacimiento) {
        const fecha = new Date(record.fechaNacimiento);
        fecha.setDate(fecha.getDate() - 1);
        recordAux.fechaNacimiento = fecha.toISOString().split('T')[0];
      }
      this.recordUpdated = {...recordAux};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.createEditFormArray = [...formArray];
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
}
