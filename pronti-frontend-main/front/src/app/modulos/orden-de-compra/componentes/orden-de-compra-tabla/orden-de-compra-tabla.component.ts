import { Component, OnInit } from '@angular/core';
import { OrdenDeCompraResponseDto } from '../../servicios/dto/orden-de-compra.response-dto';
import { OrdenDeCompraFindDto } from '../../servicios/dto/orden-de-compra.find-dto';
import { MatDialog } from '@angular/material/dialog';
import { HttpOrdenDeCompraService } from '../../servicios/http-orden-de-compra-service';
import { ConfirmationService } from 'primeng/api';
import { FormGroup } from '@angular/forms';
import { OrdenDeCompraCreateDto } from '../../servicios/dto/orden-de-compra.create-dto';
import { OrdenDeCompraUpdateDto } from '../../servicios/dto/orden-de-compra.update-dto';
import { FormOrdenDeCompraEnum } from '../../form/form-orden-de-compra.enum';
import { FORM_ORDEN_DE_COMPRA } from '../../form/form-orden-de-compra';
import { AbstractTable } from '../../../../abstract/table/abstract-table';
import { TAKE } from '../../../../constantes/tabla/take';
import { CreateUpdateModalComponent } from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import { MENSAGE_TOAST } from '../../../../constantes/toaster/mensaje-toast';
import { fieldType, FormField, SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { TableAbstractClass } from '../../../../abstract/table/interfaces/table-abstract-class';
import { ModalComponent } from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import { AutocompleteFormInterface } from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import { CreateUpdateModalParameters } from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import { MatStepperArray } from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import { ContratoResponseDto } from '../../../contrato/servicios/dto/contrato.response-dto';
import { ClienteEnGrupoResponseDto } from '../../../cliente-en-grupo/servicios/dto/cliente-en-grupo.response-dto';
import { ClienteResponseDto } from '../../../cliente/servicios/dto/cliente.response-dto';
import { UsuarioResponseDto } from '../../../usuario/servicios/dto/usuario.response-dto';
import { ContratoFindDto } from '../../../contrato/servicios/dto/contrato.find-dto';
import { HttpContratoService } from '../../../contrato/servicios/http-contrato-service';
import { FormArticuloEnum } from '../../../articulo/form/form-articulo.enum';
import { ListaValoresDetalleFindDto } from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto';
import { ListaValoresDetalleResponseDto } from '../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto';
import { ListaValoresEnum } from '../../../../constantes/lista-valores/lista-valores.enum';
import { HttpListaValoresDetalleService } from '../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service';
import * as dayjs from 'dayjs';
import { EstadoContratoEnum } from '../../../../enums/estado-contrato.enum';
import { EstadoArticuloEnum } from '../../../../enums/estado-articulo.enum';
import { HttpProveedorService } from '../../../proveedor/servicios/http-proveedor-service';
import { ProveedorResponseDto } from '../../../proveedor/servicios/dto/proveedor.response-dto';

@Component({
  selector: 'app-orden-de-compra-tabla',
  templateUrl: './orden-de-compra-tabla.component.html',
  styleUrls: ['./orden-de-compra-tabla.component.scss']
})
export class OrdenDeCompraTablaComponent extends AbstractTable<OrdenDeCompraResponseDto, OrdenDeCompraFindDto>
  implements OnInit, TableAbstractClass<OrdenDeCompraResponseDto>, AutocompleteFormInterface {
  searchBarFormFields: FormField[] = [
    {
      help: 'Puede buscar por placa, chasis, número orden contrato, nombre del cliente o beneficiario de cheque.',
      formControlName: 'busqueda',
      initialValue: "",
      validators: [],
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      label: 'Busqueda',
      placeholder: 'Ej: ...',
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
      label: 'Año',
      placeholder: 'Ej: 2016',
      help: 'Filtre por año',
      formControlName: 'anio',
      initialValue: '',
      validators: [],
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
    public httpOrdenDeCompraService: HttpOrdenDeCompraService,
    public confirmationService: ConfirmationService,
    private _httpContratoService: HttpContratoService,
    private _httpListaValorDetalle: HttpListaValoresDetalleService,
    private _httpProveedorService: HttpProveedorService
  ) {
    super(
      httpOrdenDeCompraService,
      {
        nombreRegistro: 'Orden De Compra',
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
    values.articulo = {
      anio: String(values.anio),
      chasis: values.chasis,
      color: values.color,
      marca: values.marca,
      modelo: values.modelo,
      observacion: values.observacion,
      placa: values.placa,
      sisHabilitado: values.sisHabilitado,
      ubicacionFisica: '',
      idContrato: values.idContrato
    };

    if (this.create) {
      values.sisHabilitado = ActivoInactivo.Activo;
      values.articulo.sisHabilitado = ActivoInactivo.Activo;
      values.numeroOrdenContrato = String(values.numeroOrdenContrato);
      values.articulo.estado = EstadoArticuloEnum.Comprado;



      this.blockuiService.habilitarBlockUI();
      this.httpOrdenDeCompraService
        .createOne(values as OrdenDeCompraCreateDto)
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
            console.error({ error: error, message: "Error creando Orden De Compra", data: values });
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();


      this.httpOrdenDeCompraService
        .updateById(values as OrdenDeCompraUpdateDto, this.recordUpdated.id as number)
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
            console.error({ error: error, message: "Error actualizando Orden De Compra", data: values });
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formControlName === 'idContrato') {
      const datosContrato = event.formGroup.get('idContrato')?.value as ContratoResponseDto;
      let fechaCartaOferta = '';
      let informacionCliente: UsuarioResponseDto = {};
      if (datosContrato.licitacionCollection) {
        const licitacion = datosContrato.licitacionCollection[datosContrato.licitacionCollection.length - 1];
        fechaCartaOferta = licitacion.fechaOferta || '';
        event.formGroup.get(FormOrdenDeCompraEnum.fechaCartaOferta)?.setValue(fechaCartaOferta);
        event.formGroup.get('fechaCartaOferta')?.setValue(dayjs(fechaCartaOferta).format('YYYY-MM-DD'));
        // event.formGroup.get('fechaCartaOferta')?.setValue(fechaCartaOferta);
      }
      if (datosContrato.idClienteEnGrupo as ClienteEnGrupoResponseDto) {
        if (datosContrato.idClienteEnGrupo.idCliente as ClienteResponseDto) {
          if (datosContrato.idClienteEnGrupo.idCliente.idUsuario as UsuarioResponseDto) {
            informacionCliente = { ...datosContrato.idClienteEnGrupo.idCliente.idUsuario };
            event.formGroup.get('fechaInicio')?.setValue(datosContrato.fechaInicio);
            event.formGroup.get('numeroOrdenContrato')?.setValue(datosContrato.numeroDeContrato);
            event.formGroup.get('nombreCliente')?.setValue(`${informacionCliente.nombres} ${informacionCliente.apellidos}`);
            event.formGroup.get('correo')?.setValue(informacionCliente.correo);
            event.formGroup.get('telefono')?.setValue(informacionCliente.medioContacto1);
            event.formGroup.get('tipoDocumentoIdentidad')?.setValue(informacionCliente.tipoDocumentoIdentidad);
            event.formGroup.get('documentoIdentidad')?.setValue(informacionCliente.documentoIdentidad);
          }
        }
      }

      // console.log('mire vea', event.formGroup.get('idContrato')?.value);

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

      if (event.formControlName === 'anio') {
        this.findDto.anio = event.actualValue
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
      case FormOrdenDeCompraEnum.idContrato:
        this.buscarAutocomplete(event);
        break;
      case FormArticuloEnum.marca:
        this.buscarAutocompleteListaValorDetalle(event);
        break;

      case FormArticuloEnum.modelo:
        this.buscarAutocompleteListaValorDetalle(event);
        break;

      case FormArticuloEnum.color:
        this.buscarAutocompleteListaValorDetalle(event);
        break;

      case FormArticuloEnum.ubicacionFisica:
        this.buscarAutocompleteListaValorDetalle(event);
        break;
      case FormOrdenDeCompraEnum.idProveedor:
        this.buscarAutocompleteProveedor(event);
        break;
    }
  }

  buscarAutocompleteProveedor(evento: SearchAutoCompleteInterface) {

    const busqueda: ContratoFindDto = {
      busqueda: evento.query,
    };
    this._httpProveedorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ProveedorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // console.log('data', arregloDatos);
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          if (a.idUsuario) {
            a.nombres = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
            if (a.idEmpresa) {
              a.nombres += ` - ${a.idEmpresa.razonSocial}`
            }
          }
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
    const busqueda: ContratoFindDto = {
      busqueda: evento.query,
    };
    this._httpContratoService
      .find(busqueda)
      .toPromise()
      .then(res => res as [ContratoResponseDto[], number])
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

  buscarAutocompleteListaValorDetalle(evento: SearchAutoCompleteInterface) {
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

  createOrEdit(record?: OrdenDeCompraResponseDto) {
    const formArray = [
      ...FORM_ORDEN_DE_COMPRA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      const objeto = {
        marca: {
          nombre: record.marca
        },
        modelo: {
          nombre: record.modelo
        },
        color: {
          nombre: record.color
        },
        idProveedor:{
          nombres: `${record.idProveedor?.idUsuario?.nombres || ''} ${record.idProveedor?.idUsuario?.apellidos || ''} - ${record.idProveedor?.idEmpresa?.razonSocial || ''} `
        }
      }
      this.recordUpdated = { ...record, ...objeto };
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

}
