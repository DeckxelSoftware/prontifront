import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {debounceTime, Observable, of} from "rxjs";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";
import {AgenciaResponseDto} from "../../../agencia/servicios/dto/agencia.response-dto";
import {RecursoResponseDto} from "../../../recurso/servicios/dto/recurso.response-dto";
import {HttpRecursoService} from "../../../recurso/servicios/http-recurso-service";
import {DetalleCompra, DetalleImpuesto} from "../../servicios/dto/cabecera-compra.response-dto";
import {CabeceraCompraCreateDto} from "../../servicios/dto/cabecera-compra.create-dto";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import * as dayjs from "dayjs";
import {HttpCabeceraCompraService} from "../../servicios/http-cabecera-compra-service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";

@Component({
  selector: 'app-modal-info-factura',
  templateUrl: './modal-info-factura.component.html',
  styleUrls: ['./modal-info-factura.component.scss']
})
export class ModalInfoFacturaComponent implements OnInit {
  formFactura: FormGroup;
  opciones: ListaValoresDetalleResponseDto[] = [];
  listaValoresEnum = ListaValoresEnum;
  listaValoresDetallesFiltrados!: Observable<ListaValoresDetalleResponseDto[]>
  opcionesAgencia: AgenciaResponseDto[] = [];
  opcionesRecurso: RecursoResponseDto[] = [];
  datosTablaDetalle: DetalleCompra[] = [];
  displayedColumns: string[] = ['recurso', 'descripcion', 'cantidadFactura', 'precioFactura', 'descuento', 'tasaImponible']
  totalConImpuestos = 0;
  impuestos = 0;

  datosTablaImpuestos: DetalleImpuesto[] = [];

  // show = false;

  constructor(
    public dialogRef: MatDialogRef<ModalInfoFacturaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { factura: any },
    public httpListaValorDetalleService: HttpListaValoresDetalleService,
    public httpAgenciaService: HttpAgenciaService,
    public httpRecursoService: HttpRecursoService,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    public httpCabeceraDocumentoService: HttpCabeceraCompraService,
    public logService: LogsMlabsService,
  ) {
    this.formFactura = new FormGroup({
      nombreProveedor: new FormControl({value: '', disabled: true},Validators.required),
      rucProveedor: new FormControl({value: '', disabled: true},Validators.required),
      numeroDocumento: new FormControl({value: '', disabled: true},Validators.required),
      autorizacion: new FormControl({value: '', disabled: true},Validators.required),
      serie: new FormControl({value: '', disabled: true}),
      fechaRecepcion: new FormControl({value: ''},Validators.required),
      fechaEmision: new FormControl({value: '', disabled: true},Validators.required),
      fechaVencimiento: new FormControl({value: ''},Validators.required),
      terminosPago: new FormControl({value: ''},Validators.required),
      tipoDocumento: new FormControl({value: ''},Validators.required),
      version: new FormControl({value: '', disabled: true},Validators.required),
      idAgencia: new FormControl({value: ''},Validators.required),
      idRecurso: new FormControl({value: ''},Validators.required)

    })
  }

  ngOnInit(): void {
    // setTimeout(() => {
    //   this.show = true;
    // }, 1000)
    console.log(this.data.factura)
    this.setearValoresForm();
    this.escucharCambiosRecurso();
    this.french();
  }

  french() {
    this._locale = 'fr';
    this._adapter.setLocale(this._locale);
  }

  setearValoresForm() {
    this.formFactura.get('nombreProveedor')?.setValue(this.data.factura.factura.infoTributaria.nombreComercial._text);
    this.formFactura.get('rucProveedor')?.setValue(this.data.factura.factura.infoTributaria.ruc._text);
    this.formFactura.get('numeroDocumento')?.setValue(this.data.factura.factura.infoTributaria.secuencial._text);
    this.formFactura.get('autorizacion')?.setValue(this.data.factura.factura.infoTributaria.claveAcceso._text);
    // this.formFactura.get('serie')?.setValue(this.data.factura.factura.infoTributaria.claveAcceso._text);
    this.formFactura.get('fechaEmision')?.setValue(this.data.factura.factura.infoFactura.fechaEmision._text);
    this.formFactura.get('version')?.setValue(this.data.factura._declaration._attributes.version);
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

  escucharCambiosTipoDocumento() {
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
            this.setearDatosDetalle(valorRecurso);
          } else {
            this.datosTablaDetalle = [];
          }
        },
      }
    )
  }

  setearDatosDetalle(recurso: RecursoResponseDto) {
    this.datosTablaDetalle = [];
    this.datosTablaImpuestos = [];
    if (this.data.factura.factura.detalles.detalle.length === undefined) {
      this.data.factura.factura.detalles.detalle = [{...this.data.factura.factura.detalles.detalle}];
    }
    this.totalConImpuestos = Number(this.data.factura.factura.infoFactura.totalSinImpuestos._text);
    this.impuestos = 0;
    console.log(this.data.factura.factura.detalles.detalle);
    let detallesImpuesto: DetalleImpuesto[] = [];
    let detalleImpuesto: DetalleImpuesto = {};
    let detalleCompra: DetalleCompra = {};
    this.data.factura.factura.detalles.detalle.forEach((detalle: any) => {
        if (detalle.impuestos.impuesto.length === undefined) {
          detalle.impuestos.impuesto = [{...detalle.impuestos.impuesto}];
        }
        detallesImpuesto = [];
        detalle.impuestos.impuesto.forEach((impuesto: any) => {
            if (impuesto.codigo._text !== '') {
              recurso.lineaImpuestoCollection?.forEach(linea => {
                  console.log(linea.codigo, impuesto.codigo);
                  if (linea.codigo === Number(impuesto.codigo._text)) {
                    detalleImpuesto.lineaImpuesto = linea.nombre;
                    detalleImpuesto.porcentaje = impuesto.tarifa._text;
                    detalleImpuesto.valorImpuesto = impuesto.valor._text;
                    detalleImpuesto.tasaImponible = impuesto.baseImponible._text;
                    detallesImpuesto.push({...detalleImpuesto});
                    this.datosTablaImpuestos.push({...detalleImpuesto, cuentaContable: linea.idCuentaContable?.nombre});
                    this.totalConImpuestos += Number(impuesto.valor._text);
                    this.impuestos += Number(impuesto.valor._text);
                  }
                }
              )
            }

          }
        );

        detalleCompra = {
          recurso: recurso.nombre,
          descripcion: detalle.descripcion._text,
          cantidadFactura: detalle.cantidad._text,
          precioFactura: detalle.precioUnitario._text,
          descuento: detalle.descuento._text,
          importe: detalle.precioTotalSinImpuesto._text,
          detalleImpuestoCollection: detallesImpuesto
        }
        this.datosTablaDetalle.push({...detalleCompra})
      }
    );

    console.log('el arreglo de detalles:', this.datosTablaImpuestos);

  }

  calcularRetenciones() {
    let res = 0;
    if (this.data.factura.factura.infoFactura.valorRetIva) {
      res += Number(this.data.factura.factura.infoFactura.valorRetIva._text);
    }
    if (this.data.factura.factura.infoFactura.valorRetRenta) {
      res += Number(this.data.factura.factura.infoFactura.valorRetRenta._text);
    }

    return res;

  }

  armarJsonCrear() {
    const cabeceraCompraCrear: CabeceraCompraCreateDto = {
      nombreProveedor: this.formFactura.get('nombreProveedor')?.value,
      rucProveedor: this.formFactura.get('rucProveedor')?.value,
      autorizacion: this.formFactura.get('autorizacion')?.value,
      numeroDocumento: this.formFactura.get('numeroDocumento')?.value,
      // serie todo falta este campo
      fechaRecepcion: dayjs(this.formFactura.get('fechaRecepcion')?.value).format('DD/MM/YYYY'),
      fechaEmision: this.formFactura.get('fechaEmision')?.value,
      fechaVencimiento: dayjs(this.formFactura.get('fechaVencimiento')?.value).format('DD/MM/YYYY'),
      version: this.formFactura.get('version')?.value,
      terminosPago: this.formFactura.get('terminosPago')?.value.nombre,
      tipoDocumento: this.formFactura.get('tipoDocumento')?.value.nombre,
      subtotal: Number(this.data.factura.factura.infoFactura.totalSinImpuestos._text),
      impuesto: this.impuestos,
      totalFactura: this.totalConImpuestos,
      retenciones: this.calcularRetenciones(),
      valorAPagar: Number(this.data.factura.factura.infoFactura.importeTotal._text),
      detalleCompraCollection: this.datosTablaDetalle,
      idRecurso: this.formFactura.get('idRecurso')?.value.id,
      idAgencia: this.formFactura.get('idAgencia')?.value.id
    }
    console.log(cabeceraCompraCrear);
    return cabeceraCompraCrear;
  }

  crear() {
    const cabeceraCrear = this.armarJsonCrear();
    this.enviarServicioCrear(cabeceraCrear);

  }

  enviarServicioCrear(cabeceraCrear: CabeceraCompraCreateDto) {
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
          },
          error: (err) => {
            this.logService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error creando la factura',
                tipo: ToasterTipo.error
              }
            );
          }
        }
      )
  }
}
