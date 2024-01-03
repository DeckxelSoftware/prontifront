import {Component, OnInit} from '@angular/core';
import {CargaFamiliarResponseDto} from '../../servicios/dto/carga-familiar.response-dto';
import {CargaFamiliarFindDto} from '../../servicios/dto/carga-familiar.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpCargaFamiliarService} from '../../servicios/http-carga-familiar-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {CargaFamiliarCreateDto} from '../../servicios/dto/carga-familiar.create-dto';
import {CargaFamiliarUpdateDto} from '../../servicios/dto/carga-familiar.update-dto';
import {FormCargaFamiliarEnum} from '../../form/form-carga-familiar.enum';
import {FORM_CARGA_FAMILIAR} from '../../form/form-carga-familiar';
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
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {ActivatedRoute} from '@angular/router';
import {HttpListaValoresDetalleService} from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import {ListaValoresDetalleResponseDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import {ListaValoresDetalleFindDto} from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import * as dayjs from 'dayjs'

@Component({
  selector: 'app-carga-familiar-tabla',
  templateUrl: './carga-familiar-tabla.component.html',
  styleUrls: ['./carga-familiar-tabla.component.scss']
})
export class CargaFamiliarTablaComponent extends AbstractTable<CargaFamiliarResponseDto, CargaFamiliarFindDto>
  implements OnInit, TableAbstractClass<CargaFamiliarResponseDto>, AutocompleteFormInterface {
  idTrabajador!: number;
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por nombres, apellidos y documento',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Búsqueda',
      placeholder: 'Ej: Allison...',
      column: '12',
      actualValue: '',
    },
    {
      label: 'Discapacidad',
      formControlName: FormCargaFamiliarEnum.discapacidad,
      type: fieldType.select,
      help: 'Seleccione si o no',
      select: {
        filterBy: 'nombre',
        dataKey: 'discapacidad',
        filterPlaceholder: 'Si/No',
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
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si / No',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Estudia',
      formControlName: FormCargaFamiliarEnum.estudia,
      type: fieldType.select,
      help: 'Seleccione si o no',
      select: {
        filterBy: 'nombre',
        dataKey: 'estudia',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            estudia: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            estudia: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si / No',
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
        filterPlaceholder: 'A = Inactivo, I = Activo',
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
    public httpCargaFamiliarService: HttpCargaFamiliarService,
    public confirmationService: ConfirmationService,
    public activatedRoute: ActivatedRoute,
    public httpListaValoresDetalleService: HttpListaValoresDetalleService,
  ) {
    super(
      httpCargaFamiliarService,
      {
        nombreRegistro: 'Carga Familiar',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  ngOnInit(): void {
    const {idTrabajador} = this.activatedRoute.snapshot.params;
    if (idTrabajador) {
      this.idTrabajador = idTrabajador;
      this.findDto.idTrabajador = this.idTrabajador;
    }
    this.stablishSkipAndTake(0, TAKE);
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
    this.findDto.estudia = undefined;
    this.findDto.discapacidad = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    // console.log(values);
    // if(values.aplicaUtilidad === ''){
    //   delete values.aplicaUtilidad;
    // }
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      values.sisHabilitado = ActivoInactivo.Activo;
      values.idTrabajador = +this.idTrabajador;
      this.httpCargaFamiliarService
        .createOne(values as CargaFamiliarCreateDto)
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
            console.error({error: error, message: "Error creando Carga Familiar", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCargaFamiliarService
        .updateById(values as CargaFamiliarUpdateDto, this.recordUpdated.id as number)
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
            console.error({error: error, message: "Error actualizando Carga Familiar", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if(event.formControlName === 'fechaNacimiento'){
      const diferecia = dayjs().diff(event.formGroup.get('fechaNacimiento')?.value, 'year');
      event.formGroup.get('edad')?.setValue(diferecia);
    }

    if(event.formControlName === 'discapacidad'){
      if(event.formGroup.get('discapacidad')?.value.discapacidad === 'N'){
        event.formGroup.get('tipoDiscapacidad')?.setValue({tipoDiscapacidad: 'Ninguna', nombre: 'Ninguna'});
        event.formGroup.get('tipoDiscapacidad')?.disable();
        event.formGroup.get('aplicaUtilidad')?.setValue({aplicaUtilidad: SiNoEnum.NO, nombre: 'No'});
        event.formGroup.get('aplicaUtilidad')?.disable();
      }else {
        event.formGroup.get('tipoDiscapacidad')?.enable();
        event.formGroup.get('aplicaUtilidad')?.enable();
      }
    }
    if(event.formControlName === 'tipoDiscapacidad'){
      if (event.formGroup.get('tipoDiscapacidad')?.value?.nombre !== 'Ninguna'){
        event.formGroup.get('aplicaUtilidad')?.enable();
      }else {
        event.formGroup.get('aplicaUtilidad')?.setValue({aplicaUtilidad: SiNoEnum.NO, nombre: 'No'});
        event.formGroup.get('aplicaUtilidad')?.disable();
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
      if (event.formControlName === FormCargaFamiliarEnum.discapacidad) {
        this.findDto.discapacidad = event.actualValue?.discapacidad
      }
      if (event.formControlName === FormCargaFamiliarEnum.estudia) {
        this.findDto.estudia = event.actualValue?.estudia
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
      case FormCargaFamiliarEnum.parentesco:
        this.buscarAutocompleteListaValoresDetalle(event);
        break;
      case FormCargaFamiliarEnum.tipoDocumento:
        this.buscarAutocompleteListaValoresDetalle(event);
        break;
      case FormCargaFamiliarEnum.tipoDiscapacidad:
        this.buscarAutocompleteListaValoresDetalle(event);
        break;

    }
  }

  findCodListaValorTipo(field: string) {
    const codListaValorTipo = {
      tipoDocumento: ListaValoresEnum.tipoDocumentoIdentidad,
      parentesco: ListaValoresEnum.parentesco,
      tipoDiscapacidad: ListaValoresEnum.tipoDiscapacidad,
      default: ''
    }
    // @ts-ignore
    return (codListaValorTipo[field] || codListaValorTipo.default)
  }

  buscarAutocompleteListaValoresDetalle(evento: SearchAutoCompleteInterface) {
    let codigoListaValorTipo = this.findCodListaValorTipo(evento.field.formControlName);
    const busqueda: ListaValoresDetalleFindDto = {
      busqueda: evento.query,
      idListaValoresTipoCodigoPrimario: codigoListaValorTipo,
    };
    this.httpListaValoresDetalleService
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


  createOrEdit(record?: CargaFamiliarResponseDto) {
    const formArray = [
      ...FORM_CARGA_FAMILIAR(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.recordUpdated.parentesco = {nombre: record.parentesco}
      this.recordUpdated.tipoDocumento = {nombre: record.tipoDocumento}
      this.recordUpdated.tipoDiscapacidad = {nombre: record.tipoDiscapacidad}
      if (record.fechaNacimiento) {
        this.recordUpdated.fechaNacimiento = record.fechaNacimiento.split('T')[0];
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
