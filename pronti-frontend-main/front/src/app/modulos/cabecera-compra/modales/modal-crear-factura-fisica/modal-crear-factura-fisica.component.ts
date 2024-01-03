import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {debounceTime, Observable, of} from "rxjs";
import {AgenciaResponseDto} from "../../../agencia/servicios/dto/agencia.response-dto";
import {RecursoResponseDto} from "../../../recurso/servicios/dto/recurso.response-dto";
import {
  CabeceraCompraResponseDto,
  DetalleCompra,
  DetalleImpuesto
} from "../../servicios/dto/cabecera-compra.response-dto";
import {MatDialogRef} from "@angular/material/dialog";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";
import {HttpRecursoService} from "../../../recurso/servicios/http-recurso-service";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {HttpCabeceraCompraService} from "../../servicios/http-cabecera-compra-service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {CabeceraCompraCreateDto} from "../../servicios/dto/cabecera-compra.create-dto";
import * as dayjs from "dayjs";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {HttpProveedorService} from "../../../proveedor/servicios/http-proveedor-service";
import {ProveedorResponseDto} from "../../../proveedor/servicios/dto/proveedor.response-dto";
import {TipoProveedorEnum} from "../../../../enums/tipo-proveedor.enum";
import {MensajeToaster} from "../../../../servicios/logs-mensajes/intefaces/mensaje-toaster";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {FileUpload} from "primeng/fileupload";
import {HttpArchivoService} from "../../../archivo/servicios/http-archivo-service";
import {TipoArchivo} from "../../../archivo/constantes/tipo-archivo";
import {TipoDocumento} from "../../../archivo/constantes/tipo-documento";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";


@Component({
  selector: 'app-modal-crear-factura-fisica',
  templateUrl: './modal-crear-factura-fisica.component.html',
  styleUrls: ['./modal-crear-factura-fisica.component.scss']
})
export class ModalCrearFacturaFisicaComponent implements OnInit {

  @ViewChild('upload') upload!: FileUpload;
  formFactura: FormGroup;
  opciones: ListaValoresDetalleResponseDto[] = [];
  listaValoresEnum = ListaValoresEnum;
  listaValoresDetallesFiltrados!: Observable<ListaValoresDetalleResponseDto[]>
  opcionesAgencia: AgenciaResponseDto[] = [];
  opcionesRecurso: RecursoResponseDto[] = [];
  opcionesProveedor: ProveedorResponseDto[] = [];
  datosTablaDetalle: DetalleCompra[] = [];
  displayedColumns: string[] = ['recurso', 'descripcion', 'cantidadFactura', 'precioFactura', 'descuento', 'tasaImponible']

  impuestos = 0;
  mostrarTabs = false;
  datosTablaImpuestos: DetalleImpuesto[] = [];
  formDetalle: FormGroup;

  mostrarFormDetalle = false;
  retenciones = 0;
  aPagar = 0;
  subtotal = 0;
  totalFactura = 0;

  // show = false;

  constructor(
    public dialogRef: MatDialogRef<ModalCrearFacturaFisicaComponent>,
    public httpListaValorDetalleService: HttpListaValoresDetalleService,
    public httpAgenciaService: HttpAgenciaService,
    public httpRecursoService: HttpRecursoService,
    public httpProveedorService: HttpProveedorService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    public httpCabeceraDocumentoService: HttpCabeceraCompraService,
    public logService: LogsMlabsService,
    public blockUiSercice: BlockuiService,
    public httpArchivoService: HttpArchivoService,
  ) {
    this.formFactura = new FormGroup({
      nombreProveedor: new FormControl('', Validators.required),
      rucProveedor: new FormControl({value: '', disabled: true}),
      numeroDocumento: new FormControl('', Validators.required),
      autorizacion: new FormControl('', Validators.required),
      serie: new FormControl('', Validators.required),
      fechaRecepcion: new FormControl('', Validators.required),
      fechaEmision: new FormControl('', Validators.required),
      fechaVencimiento: new FormControl('', Validators.required),
      terminosPago: new FormControl('', Validators.required),
      tipoDocumento: new FormControl('', Validators.required),
      idAgencia: new FormControl('', Validators.required),
      idRecurso: new FormControl('', Validators.required)
    })

    this.formDetalle = new FormGroup(
      {
        descripcion: new FormControl('', Validators.required),
        cantidadFactura: new FormControl('', Validators.required),
        precioFactura: new FormControl('', Validators.required),
        descuento: new FormControl('', Validators.required),
        importe: new FormControl('', Validators.required),
      }
    )
  }

  ngOnInit(): void {
    this.escucharCambiosRecurso();
    this.french();
  }

  french() {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  establecerDatosFactura() {

    if (this.formFactura.valid) {
      this.deshabilitarCamposFactura();
      this.mostrarTabs = true;
    } else {
      this.logService.toaster(
        {
          titulo: 'Aviso',
          mensaje: 'Llene los campos necesarios',
          tipo: ToasterTipo.warning
        }
      )
    }


  }

  deshabilitarCamposFactura() {
    this.formFactura.get('nombreProveedor')?.disable()
    this.formFactura.get('numeroDocumento')?.disable()
    this.formFactura.get('autorizacion')?.disable()
    this.formFactura.get('serie')?.disable()
    this.formFactura.get('fechaRecepcion')?.disable()
    this.formFactura.get('fechaEmision')?.disable()
    this.formFactura.get('fechaVencimiento')?.disable()
    this.formFactura.get('terminosPago')?.disable()
    this.formFactura.get('tipoDocumento')?.disable()
    this.formFactura.get('idAgencia')?.disable()
    this.formFactura.get('idRecurso')?.disable()
  }

  resetCamposDetalle() {
    this.formDetalle.get('descripcion')?.reset()
    this.formDetalle.get('cantidadFactura')?.reset()
    this.formDetalle.get('precioFactura')?.reset()
    this.formDetalle.get('descuento')?.reset()
    this.formDetalle.get('importe')?.reset()
  }

  agregarDetalle() {
    const descripcion = this.formDetalle.get('descripcion')?.value
    const cantidadFactura = this.formDetalle.get('cantidadFactura')?.value
    const precioFactura = this.formDetalle.get('precioFactura')?.value
    const descuento = this.formDetalle.get('descuento')?.value
    const importe = this.formDetalle.get('importe')?.value
    const recurso: RecursoResponseDto = this.formFactura.get('idRecurso')?.value;
    const detalle: DetalleCompra = {
      recurso: recurso.nombre,
      descripcion,
      cantidadFactura,
      precioFactura,
      descuento,
      importe,
      detalleImpuestoCollection: []
    }
    const detalleImpuesto: DetalleImpuesto = {};
    recurso.lineaImpuestoCollection?.forEach(impuesto => {
        detalleImpuesto.lineaImpuesto = impuesto.nombre;
        detalleImpuesto.porcentaje = impuesto.porcentaje;
        // @ts-ignore
        detalleImpuesto.valorImpuesto = (impuesto.porcentaje / 100 * detalle.importe);
        detalleImpuesto.tasaImponible = detalle.importe;
        detalleImpuesto.cuentaContable = impuesto.idCuentaContable?.nombre;
      }
    )
    // @ts-ignore
    this.impuestos += detalleImpuesto.valorImpuesto;
    // @ts-ignore
    this.subtotal += detalle.importe;

    this.totalFactura = 0;
    this.totalFactura = this.impuestos + this.subtotal;
    // @ts-ignore
    detalle.detalleImpuestoCollection.push({...detalleImpuesto});
    this.datosTablaImpuestos.push({...detalleImpuesto})
    this.datosTablaDetalle.push({...detalle});
    console.log(this.datosTablaDetalle);
    this.resetCamposDetalle();
    this.calcularAPagar();
    this.mostrarFormDetalle = false;
  }

  buscarListaValoresDetalle(codListaValorTipo: ListaValoresEnum, busqueda?: string) {
    this.httpListaValorDetalleService.find({
      idListaValoresTipoCodigoPrimario: codListaValorTipo,
      busqueda
    })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.opciones = res[0];
            this.listaValoresDetallesFiltrados = of(res[0]);
          },
          error: () => {
            console.error('Error buscando', codListaValorTipo)
            this.opciones = [];
          }
        }
      )
  }

  buscarAgencia(busqueda?: string) {
    this.httpAgenciaService.find({
      busqueda
    })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.opcionesAgencia = res[0];
          },
          error: () => {
            console.error('Error buscando agencia',)
            this.opcionesAgencia = [];
          }
        }
      )
  }

  buscarRecurso(busqueda?: string) {
    this.httpRecursoService.find({
      busqueda
    })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            this.opcionesRecurso = res[0];
          },
          error: () => {
            console.error('Error buscando recurso',)
            this.opcionesRecurso = [
              {
                nombre: 'Telefonia',
                lineaImpuestoCollection: [{
                  nombre: 'IVA',
                  codigo: 2,
                  porcentaje: 12,
                  idCuentaContable: {nombre: 'Bancos 1'}
                }]
              }
            ];
          }
        }
      )
  }

  buscarProveedor(busqueda?: string) {
    this.httpProveedorService.find({
      busqueda
    })
      .subscribe(
        {
          next: (res) => {
            console.log(res);
            const datos: ProveedorResponseDto[] = [];
            if (res[0].length >= 1) {
              res[0].forEach(proveedor => {
                  if (proveedor.tipoProveedor === TipoProveedorEnum.Empresa) {
                    proveedor.nombreMostrar = proveedor.idEmpresa?.nombreComercial;
                  } else {
                    proveedor.nombreMostrar = proveedor.idUsuario?.nombres + ' ' + proveedor.idUsuario?.apellidos;
                  }

                }
              )
            }
            this.opcionesProveedor = res[0];
          },
          error: () => {
            console.error('Error buscando proveedor',)
            this.opcionesProveedor = [];
          }
        }
      )
  }

  escucharCambiosTipoDocumento() {
    this.formFactura.get('tipoDocumento')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      formValues => {
        this.buscarListaValoresDetalle(this.listaValoresEnum.tipoDocumento, formValues);
      }
    )
  }

  establecerRucProveedor(event: any) {
    console.log(event)
    if (event.tipoProveedor === TipoProveedorEnum.Empresa) {
      this.formFactura.get('rucProveedor')?.setValue(event.idEmpresa.rucEmpresa);
    } else {
      this.formFactura.get('rucProveedor')?.setValue(event.idUsuario.documentoIdentidad);
    }

  }

  resetRucProveedor(event: any) {
    this.formFactura.get('rucProveedor')?.reset()
  }

  escucharCambiosProveedor() {
    this.formFactura.get('tipoDocumento')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      formValues => {
        this.buscarListaValoresDetalle(this.listaValoresEnum.tipoDocumento, formValues);
      }
    )
  }

  escucharCambiosTerminosPago() {
    this.formFactura.get('terminosPago')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      formValues => {
        this.buscarListaValoresDetalle(this.listaValoresEnum.terminosPago, formValues);
      }
    )
  }

  escucharCambiosRecurso() {
    this.formFactura.get('idRecurso')?.valueChanges.pipe(
      debounceTime(500)
    ).subscribe(
      {
        next: (valorRecurso) => {
          if (typeof valorRecurso === "object") {
            console.log(valorRecurso);
            // this.setearDatosDetalle(valorRecurso);
          } else {
            this.datosTablaDetalle = [];
          }
        },
      }
    )
  }

  // setearDatosDetalle(recurso: RecursoResponseDto) {
  //   this.datosTablaDetalle = [];
  //   this.datosTablaImpuestos = [];
  //   if (this.data.factura.factura.detalles.detalle.length === undefined) {
  //     this.data.factura.factura.detalles.detalle = [{...this.data.factura.factura.detalles.detalle}];
  //   }
  //   this.totalConImpuestos = Number(this.data.factura.factura.infoFactura.totalSinImpuestos._text);
  //   this.impuestos = 0;
  //   console.log(this.data.factura.factura.detalles.detalle);
  //   let detallesImpuesto: DetalleImpuesto[] = [];
  //   let detalleImpuesto: DetalleImpuesto = {};
  //   let detalleCompra: DetalleCompra = {};
  //   this.data.factura.factura.detalles.detalle.forEach((detalle: any) => {
  //       if (detalle.impuestos.impuesto.length === undefined) {
  //         detalle.impuestos.impuesto = [{...detalle.impuestos.impuesto}];
  //       }
  //       detallesImpuesto = [];
  //       detalle.impuestos.impuesto.forEach((impuesto: any) => {
  //           if (impuesto.codigo._text !== '') {
  //             recurso.lineaImpuestoCollection?.forEach(linea => {
  //                 console.log(linea.codigo, impuesto.codigo);
  //                 if (linea.codigo === Number(impuesto.codigo._text)) {
  //                   detalleImpuesto.lineaImpuesto = linea.nombre;
  //                   detalleImpuesto.porcentaje = impuesto.tarifa._text;
  //                   detalleImpuesto.valorImpuesto = impuesto.valor._text;
  //                   detalleImpuesto.tasaImponible = impuesto.baseImponible._text;
  //                   detallesImpuesto.push({...detalleImpuesto});
  //                   this.datosTablaImpuestos.push({...detalleImpuesto, cuentaContable: linea.idCuentaContable?.nombre});
  //                   this.totalConImpuestos += Number(impuesto.valor._text);
  //                   this.impuestos += Number(impuesto.valor._text);
  //                 }
  //               }
  //             )
  //           }
  //
  //         }
  //       );
  //
  //       detalleCompra = {
  //         recurso: recurso.nombre,
  //         descripcion: detalle.descripcion._text,
  //         cantidadFactura: detalle.cantidad._text,
  //         precioFactura: detalle.precioUnitario._text,
  //         descuento: detalle.descuento._text,
  //         importe: detalle.precioTotalSinImpuesto._text,
  //         detalleImpuestoCollection: detallesImpuesto
  //       }
  //       this.datosTablaDetalle.push({...detalleCompra})
  //     }
  //   );
  //
  //   console.log('el arreglo de detalles:', this.datosTablaImpuestos);
  //
  // }

  // calcularRetenciones() {
  //   let res = 0;
  //   if (this.data.factura.factura.infoFactura.valorRetIva) {
  //     res += Number(this.data.factura.factura.infoFactura.valorRetIva._text);
  //   }
  //   if (this.data.factura.factura.infoFactura.valorRetRenta) {
  //     res += Number(this.data.factura.factura.infoFactura.valorRetRenta._text);
  //   }
  //
  //   return res;
  //
  // }

  armarJsonCrear() {
    let nombreProveedor = '';
    if (this.formFactura.get('nombreProveedor')?.value) {
      const proveedor = this.formFactura.get('nombreProveedor')?.value;
      if (proveedor.tipoProveedor === TipoProveedorEnum.Empresa) {
        nombreProveedor = proveedor.idEmpresa.razonSocial;
      } else {
        nombreProveedor = proveedor.idUsuario.nombres + ' ' + proveedor.idUsuario.apellidos;
      }
    }
    const cabeceraCompraCrear: CabeceraCompraCreateDto = {
      nombreProveedor,
      rucProveedor: this.formFactura.get('rucProveedor')?.value,
      autorizacion: this.formFactura.get('autorizacion')?.value,
      numeroDocumento: this.formFactura.get('numeroDocumento')?.value,
      serie: this.formFactura.get('serie')?.value,
      fechaRecepcion: dayjs(this.formFactura.get('fechaRecepcion')?.value).format('DD/MM/YYYY'),
      fechaEmision: dayjs(this.formFactura.get('fechaEmision')?.value).format('DD/MM/YYYY'),
      fechaVencimiento: dayjs(this.formFactura.get('fechaVencimiento')?.value).format('DD/MM/YYYY'),
      version: this.formFactura.get('version')?.value,
      terminosPago: this.formFactura.get('terminosPago')?.value.nombre,
      tipoDocumento: this.formFactura.get('tipoDocumento')?.value.nombre,
      subtotal: this.subtotal,
      impuesto: this.impuestos,
      totalFactura: this.totalFactura,
      retenciones: this.retenciones,
      valorAPagar: this.aPagar,
      detalleCompraCollection: this.datosTablaDetalle,
      idRecurso: this.formFactura.get('idRecurso')?.value.id,
      idAgencia: this.formFactura.get('idAgencia')?.value.id
    }
    console.log(cabeceraCompraCrear);
    return cabeceraCompraCrear;
  }

  async crear() {
    const cabeceraCrear = this.armarJsonCrear();
    try {
      const cabeceraCreada = await this.enviarServicioCrear(cabeceraCrear);
      if (cabeceraCreada.id) {
        await this.crearArchivo(cabeceraCreada.id);
      }
      console.log('crear el doc');
    } catch (e) {
      this.logService.toaster(
        e as MensajeToaster
      )
    }

  }

  enviarServicioCrear(cabeceraCrear: CabeceraCompraCreateDto): Promise<CabeceraCompraResponseDto> {
    this.blockUiSercice.habilitarBlockUI();
    return new Promise((resolve, reject) => {
        this.httpCabeceraDocumentoService.createOne(cabeceraCrear)
          .subscribe(
            {
              next: (res) => {
                this.logService.toaster(
                  {
                    titulo: 'Info',
                    mensaje: 'Se ha creado la factura',
                    tipo: ToasterTipo.success
                  }
                );
                this.dialogRef.close();
                this.blockUiSercice.deshabilitarBlockUI();
                resolve(res);
              },
              error: (err) => {
                console.error('Error creando la factura:', err)
                this.blockUiSercice.deshabilitarBlockUI();
                reject({
                    titulo: 'Error',
                    mensaje: 'Error creando la factura',
                    tipo: ToasterTipo.error
                  }
                );
              }
            }
          )
      }
    )

  }

  calcularAPagar() {
    this.aPagar = 0;
    this.datosTablaDetalle.forEach(detalle => {
        if (detalle.importe) {
          if (detalle.importe >= 0) {
            this.aPagar += detalle.importe;
          }
        } else {
          this.logService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error calculando el valor a pagar',
              tipo: ToasterTipo.error
            }
          )
        }
        detalle.detalleImpuestoCollection?.forEach(impuesto => {
            if (impuesto.valorImpuesto) {
              if (impuesto.valorImpuesto >= 0) {
                this.aPagar += impuesto.valorImpuesto;
              }
            } else {
              this.logService.toaster(
                {
                  titulo: 'Error',
                  mensaje: 'Error calculando el valor a pagar',
                  tipo: ToasterTipo.error
                }
              )
            }

          }
        )
        this.aPagar -= this.retenciones;
      }
    )
  }

  crearArchivo(idCabecera: number) {
    return new Promise((resolve, reject) => {
        this.httpArchivoService.crearArchivo(this.upload.files[0], idCabecera + '', 'cabecera_compra', TipoArchivo.Principal, TipoDocumento.Archivo, ActivoInactivo.Activo)
          .subscribe(
            {
              next: res => {
                console.log(res);
                resolve(true);
              },
              error: err => {
                console.log('Error creando el archivo:', err);
                reject({
                    titulo: 'Error',
                    mensaje: 'Error creando el archivo',
                    tipo: ToasterTipo.error
                  }
                )
              }
            }
          )

      }
    )

  }

  obtenerArchivo(event: any) {
    console.log(event);
  }
}
