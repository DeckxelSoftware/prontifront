import { Component, OnInit } from '@angular/core';
import { ArticuloResponseDto } from '../../servicios/dto/articulo.response-dto';
import { ArticuloFindDto } from '../../servicios/dto/articulo.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpArticuloService } from '../../servicios/http-articulo-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { ArticuloCreateDto } from '../../servicios/dto/articulo.create-dto';
import { ArticuloUpdateDto } from '../../servicios/dto/articulo.update-dto';
import { FormArticuloEnum } from '../../form/form-articulo.enum';
import { FORM_ARTICULO } from '../../form/form-articulo';
import { TableAbstractClass } from "../../../../abstract/table/interfaces/table-abstract-class";
import { TAKE } from "../../../../constantes/tabla/take";
import {
  CreateUpdateModalComponent
} from "../../../../componentes/dialog/create-update-modal/create-update-modal.component";
import { AbstractTable } from "../../../../abstract/table/abstract-table";
import { MENSAGE_TOAST } from "../../../../constantes/toaster/mensaje-toast";
import { fieldType, FormField, SearchAutoCompleteInterface } from "../../../../componentes/forms/interfaces/form-field";
import { BlockuiService } from "../../../../servicios/block-ui/blockui.service";
import { LogsMlabsService } from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import { ModalComponent } from "../../../../componentes/dialog/create-update-modal/interfaces/modal-component";
import { AutocompleteFormInterface } from "../../../../abstract/table/interfaces/autocomplete-form.interface";
import {
  CreateUpdateModalParameters
} from "../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters";
import { EstadoArticuloEnum } from '../../../../enums/estado-articulo.enum';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { HttpListaValoresTipoService } from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.service';
import { ListaValoresTipoFindDto } from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.find-dto';
import { ListaValoresTipoResponseDto } from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';
import { ListaValoresEnum } from '../../../../constantes/lista-valores/lista-valores.enum';
import { ListaValoresDetalleFindDto } from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import { HttpListaValoresDetalleService } from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import { ListaValoresDetalleResponseDto } from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import { MatStepperArray } from "../../../../componentes/forms/form-container/interfaces/mat-stepper-array";
import { Router } from '@angular/router';
import * as dayjs from 'dayjs';

@Component({
  selector: 'app-articulo-tabla',
  templateUrl: './articulo-tabla.component.html',
  styleUrls: ['./articulo-tabla.component.scss']
})
export class ArticuloTablaComponent extends AbstractTable<ArticuloResponseDto, ArticuloFindDto>
  implements OnInit, TableAbstractClass<ArticuloResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por placa o chasis',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: PJJ-0054',
      column: '6',
      actualValue: '',

    },
    {
      label: 'Estado',
      formControlName: 'estado',
      type: fieldType.select,
      help: 'Seleccione un estado',
      select: {
        filterBy: 'estado',
        dataKey: 'estado',
        filterPlaceholder: 'E = Entregado, F = Flota, C = Comprado',
        optionLabel: 'nombre',
        options: [
          {
            estado: EstadoArticuloEnum.Flota,
            nombre: 'Flota',
          },
          {
            estado: EstadoArticuloEnum.Comprado,
            nombre: 'Comprado',
          },
          {
            estado: EstadoArticuloEnum.Entregado,
            nombre: 'Entregado',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Flota / Comprado / Entregado',
      column: '6',
      actualValue: '',
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
    private _router: Router,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpArticuloService: HttpArticuloService,
    public confirmationService: ConfirmationService,
    private _httpListaValorDetalle: HttpListaValoresDetalleService,
    private _httpListaValorTipo: HttpListaValoresTipoService,
  ) {
    super(
      httpArticuloService,
      {
        nombreRegistro: 'Articulo',
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
    this.findDto.estado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      this.blockuiService.habilitarBlockUI();
      this.httpArticuloService
        .createOne(values as ArticuloCreateDto)
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
            console.error({ error: error, message: "Error creando Articulo", data: values });
          },
        });
    } else {
      if (values.estado === EstadoArticuloEnum.Entregado) {
        values.fechaAdjudicacion = dayjs().format('YYYY-MM-DD');
      }
      this.blockuiService.habilitarBlockUI();

      this.httpArticuloService
        .editarArticulo(this.recordUpdated.id as number, values as ArticuloUpdateDto,)
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
            console.error({ error: error, message: "Error actualizando Articulo", data: values });
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
        this.findDto.busqueda = event.actualValue;
      }
      if (event.formControlName === 'estado') {
        this.findDto.estado = event.actualValue.estado;
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado;
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
      case FormArticuloEnum.marca:
        this.buscarAutocomplete(event);
        break;

      case FormArticuloEnum.modelo:
        this.buscarAutocomplete(event);
        break;

      case FormArticuloEnum.color:
        this.buscarAutocomplete(event);
        break;

      case FormArticuloEnum.ubicacionFisica:
        this.buscarAutocomplete(event);
        break;
    }
  }

  buscarAutocomplete(evento: SearchAutoCompleteInterface) {

    let codigoListaValorTipo = this.obtenerCodigoPrimarioListaValorTipo(evento.field.formControlName)
    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: codigoListaValorTipo,
      busqueda: evento.query,
    };
    this._httpListaValorDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
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

  obtenerCodigoPrimarioListaValorTipo(formCtrlname: string): string {
    const codigosPrimariosArticulo = {
      marca: ListaValoresEnum.marca,
      modelo: ListaValoresEnum.modelo,
      color: ListaValoresEnum.color,
      ubicacionFisica: ListaValoresEnum.ubicacionFisica,
      default: ''
    }
    // @ts-ignore
    return (codigosPrimariosArticulo[formCtrlname] || codigosPrimariosArticulo.default)

  }


  createOrEdit(record?: ArticuloResponseDto) {
    const formArray = [
      ...FORM_ARTICULO(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      const objetoAutocompleteArticulo = {
        marca: {
          nombre: record.marca
        },
        modelo: {
          nombre: record.modelo
        },
        color: {
          nombre: record.color
        },
        ubicacionFisica: {
          nombre: record.ubicacionFisica
        }
      }
      this.recordUpdated = { ...record, ...objetoAutocompleteArticulo };

      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  irAvaluoMecanico(idArticulo: number) {

    this._router.navigate(['bienes', 'articulo-modulo', idArticulo, 'revision-modulo']);
  }
}
