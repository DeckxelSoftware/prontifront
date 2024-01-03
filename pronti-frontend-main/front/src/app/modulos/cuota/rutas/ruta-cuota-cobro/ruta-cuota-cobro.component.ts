import {Component, OnInit} from '@angular/core';
import {ContratoResponseDto} from "../../../contrato/servicios/dto/contrato.response-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpContratoService} from "../../../contrato/servicios/http-contrato-service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {PlanResponseDto} from "../../../plan/servicios/dto/plan.response-dto";
import {CuotaResponseDto} from "../../servicios/dto/cuota.response-dto";
import {UsuarioResponseDto} from "../../../usuario/servicios/dto/usuario.response-dto";
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";
import {DetalleCobroCuotaInterface} from "../../../contrato/interfaces/detalle-cobro-cuota.interface";
import {
  HistoricoPlanContratoResponseDto
} from "../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {
  HttpCuentaBancariaEmpresaService
} from "../../../cuenta-bancaria-empresa/servicios/http-cuenta-bancaria-empresa-service";
import {
  CuentaBancariaEmpresaFindDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.find-dto";
import {
  CuentaBancariaEmpresaResponseDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.response-dto";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {SiNoEnum} from "../../../../enums/si-no.enum";
import {MenuItem} from "primeng/api";
import {TipoDetallePagoEnum} from "../../../../enums/tipo-detalle-pago.enum";
import {HttpItemCobroPagoService} from "../../../item-cobro-pago/servicios/http-item-cobro-pago-service";
import {ItemCobroPagoResponseDto} from "../../../item-cobro-pago/servicios/dto/item-cobro-pago.response-dto";
import {HttpCobroService} from "../../../cobro/servicios/http-cobro-service";
import {FacturaResponseDto} from "../../../factura/servicios/dto/factura.response-dto";

@Component({
  selector: 'app-ruta-cuota-cobro',
  templateUrl: './ruta-cuota-cobro.component.html',
  styleUrls: ['./ruta-cuota-cobro.component.scss']
})
export class RutaCuotaCobroComponent implements OnInit {
  items: MenuItem[] = [];
  idContrato!: number;
  contrato!: ContratoResponseDto;
  plan!: PlanResponseDto;
  cuotas!: CuotaResponseDto[];
  mostrarDatos = false;
  datosUsuarioCliente!: UsuarioResponseDto;
  historico!: HistoricoPlanContratoResponseDto;
  totalCobroIngresado = 0;
  totalACobrar = 0;
  totalMostrar = 0;
  detalleCobros: DetalleCobroCuotaInterface[] = [];
  detalleCobrosExcedente: DetalleCobroCuotaInterface[] = [];
  modelCobro = {};
  formCobro: FormGroup;
  tipoDeDocumentos: ListaValoresDetalleResponseDto[] = [{nombre: 'No hay registros'}];
  cuentasBancarias: CuentaBancariaEmpresaResponseDto[] = [];
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  cobros: CobroInterface[] = [];
  pagosAcumulados = 0;
  pagos: PagoInterface[] = [];
  excedente = 0;
  puedenSerMasCuotasAdded = true;
  esAdelanto = false;
  itemCobroPagoInscripcion: ItemCobroPagoResponseDto = {};
  itemCobroPagoAbonoCapital: ItemCobroPagoResponseDto = {};
  itemCobroPagoCuotaAdministrativa: ItemCobroPagoResponseDto = {};
  itemCobroPagoDispositivio: ItemCobroPagoResponseDto = {};
  itemCobroPagoRastreo: ItemCobroPagoResponseDto = {};

  constructor(
    public route: ActivatedRoute,
    public httpContratoService: HttpContratoService,
    public logsService: LogsMlabsService,
    public blockUiService: BlockuiService,
    public httpListaValoresDetalleService: HttpListaValoresDetalleService,
    public httpCuentaBancariaEmpresa: HttpCuentaBancariaEmpresaService,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public router: Router,
    public httpItemCobroPagoService: HttpItemCobroPagoService,
    public httpCobroService: HttpCobroService,
  ) {
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
    ];
    const ruta = this.route.snapshot.url;
    if (ruta[0].path === 'cuota-cobro') {
      this.items.push({label: 'Cobro de cuotas'})
    } else if (ruta[0].path === 'adelanto-cuota') {
      this.esAdelanto = true;
      this.items.push({label: 'Adelanto de cuotas'})
    }
    this.formCobro = new FormGroup(
      {
        tipoDocumento: new FormControl('', [Validators.required]),
        numeroDocumento: new FormControl('', [Validators.required]),
        fechaDeposito: new FormControl('', [Validators.required]),
        observaciones: new FormControl('', [Validators.required]),
        cuentaBancaria: new FormControl('', [Validators.required]),
        valor: new FormControl('', [Validators.required]),
      }
    )
  }


  async ngOnInit() {
    await this.obtenerDatosDeConfiguracion();
    const {idContrato} = this.route.snapshot.params;
    if (idContrato) {
      this.idContrato = idContrato;
      try {
        await this.obtenerDatosContrato(this.idContrato)
      } catch (e) {
        console.error('Error obteniendo datos del contrato:', e);
      }
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obteniendo datos del contrato ',
          tipo: ToasterTipo.error
        }
      )
    }
  }

  escucharFormularioCobro() {
    this.formCobro.valueChanges.subscribe(
      {
        next: cambio => {
          console.log(cambio);
          console.log(this.formCobro);
        }
      }
    )
  }

  async consultarItemCobro(nombreAFiltrar: string) {
    try {
      const res = await this.httpItemCobroPagoService.find({nombreItem: nombreAFiltrar})
        .toPromise()
      if (res) {
        if (res[1] > 0) {
          return res[0][0];
        } else {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: `Error obteniendo item cobro pago: ${nombreAFiltrar} `,
              tipo: ToasterTipo.error
            }
          );
          return {};
        }
      } else {
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: `Error obteniendo item cobro pago: ${nombreAFiltrar} `,
            tipo: ToasterTipo.error
          }
        );
        return {};
      }
    } catch (e) {
      console.error('Error obteniendo item cobro pago: ', nombreAFiltrar);
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: `Error obteniendo item cobro pago: ${nombreAFiltrar} `,
          tipo: ToasterTipo.error
        }
      );
      return {};
    }

  }

  obtenerCuentaBancaria(busqueda?: string) {
    const dtoBusqueda: CuentaBancariaEmpresaFindDto = {
      busqueda: busqueda,
    }
    this.httpCuentaBancariaEmpresa.find(
      dtoBusqueda
    ).subscribe(
      {
        next: (res) => {
          this.cuentasBancarias = res[0];
          if (res[1] > 0) {
            this.cuentasBancarias = this.cuentasBancarias.map(cuenta => {
                cuenta.campoMostrar = cuenta.idBanco?.nombre + ' - ' + cuenta.numeroCuenta
                return cuenta;
              }
            )
          }

        }
      }
    )
  }

  obtenerTipoDeDocumentos(busqueda?: string) {
    const dtoBusqueda: ListaValoresDetalleFindDto = {
      busqueda: busqueda,
      idListaValoresTipoCodigoPrimario: ListaValoresEnum.tipoDocumento
    }
    this.httpListaValoresDetalleService.find(
      dtoBusqueda
    ).subscribe(
      {
        next: (res) => {

          this.tipoDeDocumentos = res[0];

        }
      }
    )
  }

  obtenerDatosContrato(idContrato: number):
    Promise<boolean> {
    this.blockUiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
        this.httpContratoService.find({id: idContrato})
          .subscribe(
            {
              next: async (res) => {
                this.contrato = res[0][0];
                this.setearDatosPlan(this.contrato);
                this.setearDatosCuotas(this.contrato);
                this.setearDatosCliente(this.contrato);
                this.setearDatosHistorico(this.contrato);
                if (this.contrato.estado) {
                  if (this.contrato.estado === EstadoContratoEnum.Registrado) {
                    this.itemCobroPagoInscripcion = await this.consultarItemCobro('Inscripción');
                    this.itemCobroPagoAbonoCapital = await this.consultarItemCobro('Capital suscriptor');
                    this.itemCobroPagoCuotaAdministrativa = await this.consultarItemCobro('Cuota administrativa');
                  }
                  if (this.contrato.estado === EstadoContratoEnum.EnProceso ||
                    this.contrato.estado === EstadoContratoEnum.Ofertado ||
                    this.contrato.estado === EstadoContratoEnum.Preadjudicado ||
                    this.contrato.estado === EstadoContratoEnum.PreadjudicadoBuscando ||
                    this.contrato.estado === EstadoContratoEnum.PreadjudicadoComprado ||
                    this.contrato.estado === EstadoContratoEnum.Adjudicado) {
                    if (this.contrato.estado === EstadoContratoEnum.Adjudicado) {
                      this.itemCobroPagoDispositivio = await this.consultarItemCobro('Dispositivo');
                      this.itemCobroPagoRastreo = await this.consultarItemCobro('Rastreo');
                    }
                    this.itemCobroPagoAbonoCapital = await this.consultarItemCobro('Capital suscriptor');
                    this.itemCobroPagoCuotaAdministrativa = await this.consultarItemCobro('Cuota administrativa');
                  }
                  this.armarCobroContratoPorEstado(this.contrato.estado, this.contrato);
                } else {
                  this.logsService.toaster(
                    {
                      titulo: 'Error',
                      mensaje: 'Error obteniendo estado del contrato',
                      tipo: ToasterTipo.error
                    }
                  )
                }
                this.logsService.toaster(
                  {
                    titulo: 'Exito',
                    mensaje: 'Contrato buscado correctamente',
                    tipo: ToasterTipo.success
                  }
                )
                this.mostrarDatos = true;
                this.blockUiService.deshabilitarBlockUI();
                resolve(true);
              },
              error: (err) => {
                this.logsService.toaster(
                  {
                    titulo: 'Error',
                    mensaje: 'Error obteniendo datos del contrato ',
                    tipo: ToasterTipo.error
                  }
                );
                this.blockUiService.deshabilitarBlockUI();
                reject(false);
              }
            }
          )
      }
    )
  }

  setearDatosPlan(contrato: ContratoResponseDto) {
    // @ts-ignore
    this.plan = contrato.historicoPlanContratoCollection.at(-1).idPlan;
  }

  setearDatosCuotas(contrato: ContratoResponseDto) {
    // @ts-ignore
    this.cuotas = contrato.historicoPlanContratoCollection.at(-1).cuotaCollection;
  }

  setearDatosHistorico(contrato: ContratoResponseDto) {
    // @ts-ignore
    this.historico = contrato.historicoPlanContratoCollection.at(-1);
  }

  setearDatosCliente(contrato: ContratoResponseDto) {
    this.datosUsuarioCliente = contrato.idClienteEnGrupo.idCliente.idUsuario;
  }

  armarCobroContratoPorEstado(estado: EstadoContratoEnum, contrato: ContratoResponseDto) {
    if (estado === EstadoContratoEnum.Registrado) {
      this.armarCoborsContratoRegistrado(contrato);
    }
    if (estado === EstadoContratoEnum.EnProceso ||
      estado === EstadoContratoEnum.Ofertado ||
      estado === EstadoContratoEnum.Preadjudicado ||
      estado === EstadoContratoEnum.PreadjudicadoBuscando ||
      estado === EstadoContratoEnum.PreadjudicadoComprado || estado === EstadoContratoEnum.Adjudicado) {
      this.armarCobrosEnProcesoPreadjudicadoOfertadoAdjudicado(this.contrato);
    }
  }

  addCobroDispositivo(indiceCuotaACobrar: number) {

    if (this.cuotas[indiceCuotaACobrar].dispositivoEstaPagado === SiNoEnum.NO) {
      if (this.cuotas[indiceCuotaACobrar].dispositivo) {
        let valorDispositivo = this.cuotas[indiceCuotaACobrar].dispositivo;
        const dispositivo: DetalleCobroCuotaInterface = {
          noCuota: this.cuotas[indiceCuotaACobrar].numeroCuota,
          descripcion: `Dispositivo`,
          fecha: this.cuotas[indiceCuotaACobrar].fechaCobro,
          valor: valorDispositivo,
          aCobrar: 0,
          cantidadregistradaEnCobro: 0,
          tipo: TipoDetallePagoEnum.dispositivo
        }
        if (this.cuotas[indiceCuotaACobrar].valorTotalDispositivoCobrado === undefined) {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor cobrado del dispositivo',
              tipo: ToasterTipo.error
            }
          )
        } else { // @ts-ignore
          if (this.cuotas[indiceCuotaACobrar].valorTotalDispositivoCobrado) {
            // @ts-ignore
            valorDispositivo -= this.cuotas[indiceCuotaACobrar].valorTotalDispositivoCobrado;
            dispositivo.valor = valorDispositivo;
            this.detalleCobros.push(dispositivo);
          } else {
            this.detalleCobros.push(dispositivo);
          }
        }
      } else {
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Error obteniendo el valor del dispositivo',
            tipo: ToasterTipo.error
          }
        )
      }
    }
  }

  addCobroRastreo(indiceCuotaACobrar: number) {
    if (this.cuotas[indiceCuotaACobrar].rastreoEstaPagado === SiNoEnum.NO) {
      if (this.cuotas[indiceCuotaACobrar].rastreo) {
        let valorRastreo = this.cuotas[indiceCuotaACobrar].rastreo;
        const rastreo: DetalleCobroCuotaInterface = {
          noCuota: this.cuotas[indiceCuotaACobrar].numeroCuota,
          descripcion: `Rastreo`,
          fecha: this.cuotas[indiceCuotaACobrar].fechaCobro,
          valor: valorRastreo,
          aCobrar: 0,
          cantidadregistradaEnCobro: 0,
          tipo: TipoDetallePagoEnum.rastreo
        }
        if (this.cuotas[indiceCuotaACobrar].valorTotalRastreoCobrado === undefined) {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor cobrado del rastreo',
              tipo: ToasterTipo.error
            }
          )
        } else { // @ts-ignore
          if (this.cuotas[indiceCuotaACobrar].valorTotalRastreoCobrado) {
            // @ts-ignore
            valorRastreo -= this.cuotas[indiceCuotaACobrar].valorTotalRastreoCobrado;
            rastreo.valor = valorRastreo;
            this.detalleCobros.push(rastreo);
          } else {
            this.detalleCobros.push(rastreo);
          }
        }
      } else {
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Error obteniendo el valor del rastreo',
            tipo: ToasterTipo.error
          }
        )
      }

    }
  }

  addDetalleCobroDispositivoYRastreo(indiceCuotaACobrar: number) {
    if (this.contrato.estado === EstadoContratoEnum.Adjudicado) {
      if (this.cuotas[indiceCuotaACobrar].dispositivo &&
        this.cuotas[indiceCuotaACobrar].dispositivoEstaPagado === SiNoEnum.NO
      ) {
        this.addCobroDispositivo(indiceCuotaACobrar);
      }
      if (this.cuotas[indiceCuotaACobrar].rastreo &&
        this.cuotas[indiceCuotaACobrar].rastreoEstaPagado === SiNoEnum.NO) {
        this.addCobroRastreo(indiceCuotaACobrar);
      }
    }
  }

  armarCobrosEnProcesoPreadjudicadoOfertadoAdjudicado(contrato: ContratoResponseDto) {
    if (contrato.cuotaACobrar) {
      const indiceCuotaACobrar = contrato.cuotaACobrar - 1;
      // setear el valor de la cuenta administrativa de la primera cuota
      let valorCuentaAdministrativa = 0;
      let valorCapitalSubscriptor = 0;
      if (this.cuotas[indiceCuotaACobrar].estaPagado === SiNoEnum.NO) {
        if (this.cuotas[indiceCuotaACobrar].valorTasaAdministrativa && this.cuotas[indiceCuotaACobrar].valorImpuesto) {
          // @ts-ignore
          valorCuentaAdministrativa = this.cuotas[indiceCuotaACobrar].valorTasaAdministrativa + this.cuotas[indiceCuotaACobrar].valorImpuesto;
          const cuentaAdministrativa: DetalleCobroCuotaInterface = {
            noCuota: this.cuotas[indiceCuotaACobrar].numeroCuota,
            descripcion: `Cuenta administrativa cuota No.${this.cuotas[indiceCuotaACobrar].numeroCuota}`,
            fecha: this.cuotas[indiceCuotaACobrar].fechaCobro,
            valor: valorCuentaAdministrativa,
            aCobrar: 0,
            cantidadregistradaEnCobro: 0,
            tipo: TipoDetallePagoEnum.cuotaAdministrativa
          }
          const capitalSubscriptor: DetalleCobroCuotaInterface = {
            noCuota: this.cuotas[indiceCuotaACobrar].numeroCuota,
            descripcion: `Capital de subscriptor cuota No.${this.cuotas[indiceCuotaACobrar].numeroCuota}`,
            fecha: this.cuotas[indiceCuotaACobrar].fechaCobro,
            valor: valorCapitalSubscriptor,
            aCobrar: 0,
            cantidadregistradaEnCobro: 0,
            tipo: TipoDetallePagoEnum.abonoCapital
          }
          if (this.cuotas[indiceCuotaACobrar].abonoCapital) {
            // @ts-ignore
            valorCapitalSubscriptor = this.cuotas[indiceCuotaACobrar].abonoCapital;
            console.log({valorCapitalSubscriptor});
            capitalSubscriptor.valor = valorCapitalSubscriptor;
          } else {
            this.logsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error obteniendo el valor del abono capital',
                tipo: ToasterTipo.error
              }
            )
          }
          if (this.cuotas[indiceCuotaACobrar].valorPagadoCuota) {
            // @ts-ignore
            const restoDespuesDeCuentaAdministrativa = this.cuotas[indiceCuotaACobrar].valorPagadoCuota - valorCuentaAdministrativa;
            if (restoDespuesDeCuentaAdministrativa >= 0) {
              // entonces ya esta pagada la cuota administrativa
              const restoDespuesDeCapital = restoDespuesDeCuentaAdministrativa - valorCapitalSubscriptor;
              if (restoDespuesDeCapital < 0) {
                valorCapitalSubscriptor -= restoDespuesDeCuentaAdministrativa;
                capitalSubscriptor.valor = valorCapitalSubscriptor;
              } else if (restoDespuesDeCapital === 0) {
                valorCapitalSubscriptor = 0;
                capitalSubscriptor.valor = valorCapitalSubscriptor;
              } else {
                this.logsService.toaster(
                  {
                    titulo: 'Error',
                    mensaje: 'Error calculando el valor del abono capital',
                    tipo: ToasterTipo.error
                  }
                )
              }
            } else {
              // se adelanto un valor que no cubre la cuota administrativa
              // @ts-ignore
              valorCuentaAdministrativa -= this.cuotas[indiceCuotaACobrar].valorPagadoCuota;
              cuentaAdministrativa.valor = valorCuentaAdministrativa;
              this.detalleCobros.push(cuentaAdministrativa);
            }
          } else {
            this.detalleCobros.push(cuentaAdministrativa);
            capitalSubscriptor.valor = valorCapitalSubscriptor;
          }
          this.addDetalleCobroDispositivoYRastreo(indiceCuotaACobrar);
          // @ts-ignore
          if (capitalSubscriptor.valor > 0) {
            this.detalleCobros.push(capitalSubscriptor);
          }
        }
      } else {
        this.addDetalleCobroDispositivoYRastreo(indiceCuotaACobrar);
      }

      this.calcularTotalACobrar(this.detalleCobros);
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: `No se pudo generar los valores a cobrar. Contrato con estado ${this.contrato.estado} y cuota a cobrar ${this.contrato.cuotaACobrar}`,
          tipo: ToasterTipo.error
        }
      )
    }
  }

  addDetalleCobroInscripcion(contrato: ContratoResponseDto) {
    let valorInscripcion = 0;
    if (this.historico.inscripcionEstaPagada === SiNoEnum.NO) {


      //setear el valor de la inscripcion que falta por cobrar
      if (typeof this.historico.totalCobroInscripcion === "number") {
        if (this.historico.totalCobroInscripcion >= 0) {
          valorInscripcion = this.historico.totalCobroInscripcion;
        } else {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor de inscripción',
              tipo: ToasterTipo.error
            }
          )
        }
      } else {
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Error obteniendo el valor pagado de la inscripción',
            tipo: ToasterTipo.error
          }
        )
      }
      const cobroInscripcion: DetalleCobroCuotaInterface = {
        noCuota: 0,
        descripcion: 'Inscripción plan',
        fecha: contrato.fechaIniciaCobro,
        valor: valorInscripcion,
        aCobrar: 0,
        cantidadregistradaEnCobro: 0,
        tipo: TipoDetallePagoEnum.inscripcion
      }
      this.detalleCobros.push(cobroInscripcion);
    }
  }

  armarCoborsContratoRegistrado(contrato: ContratoResponseDto) {
    if (contrato.estado === EstadoContratoEnum.Registrado) {
      this.addDetalleCobroInscripcion(contrato);
    }
    // const cuotaACobrar = contrato.cuotaACobrar;
    if (this.cuotas[0].valorTasaAdministrativa && this.cuotas[0].valorImpuesto && this.cuotas[0].abonoCapital) {
      const cuotaACobrar = this.cuotas[0].valorTasaAdministrativa + this.cuotas[0].valorImpuesto + this.cuotas[0].abonoCapital;
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error Obteniendo el valor de la cuota',
          tipo: ToasterTipo.error
        }
      )
    }
    // setear el valor de la cuenta administrativa de la primera cuota
    let valorCuentaAdministrativa1 = 0;
    let valorCapitalSubscriptor = 0;
    if (this.cuotas[0].valorTasaAdministrativa && this.cuotas[0].valorImpuesto) {
      if (this.contrato.dsctoPrimeraCuota) { // verificar si tiene descuento
        if (this.cuotas[0].valorCuota) {
          const valorCuota = this.cuotas[0].valorCuota - (this.cuotas[0].valorCuota * (this.contrato.dsctoPrimeraCuota / 100));
          if (this.plan.precio && this.contrato.plazoMesSeleccionado && this.configuracionGeneral.ivaPorcentaje) {
            // valorCuentaAdministrativa1 = valorCuota - (this.plan.precio / this.contrato.plazoMesSeleccionado) / (1 + (this.configuracionGeneral.ivaPorcentaje / 100)) // si hay descuento se calcula el valor de la tasa administrativa
            // valorCuentaAdministrativa1 = valorCuentaAdministrativa1 * (1 + (this.configuracionGeneral.ivaPorcentaje / 100)); // anadir el impuesto a la cuota administrativa
            valorCuentaAdministrativa1 = this.cuotas[0].valorTasaAdministrativa + this.cuotas[0].valorImpuesto;
            valorCapitalSubscriptor = valorCuota - valorCuentaAdministrativa1; // al valor de la cuota se le resta el valor de la tasa  calculada antes
          } else {
            this.logsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error obteniendo el valor de la primera cuota',
                tipo: ToasterTipo.error
              }
            )
          }
        } else {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor de la primera cuota',
              tipo: ToasterTipo.error
            }
          )
        }
      } else { // si no tiene descuento  la cuenta administrativa es la suma de la tasa administrativa y el impuesto
        valorCuentaAdministrativa1 = this.cuotas[0].valorTasaAdministrativa + this.cuotas[0].valorImpuesto;
      }
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obteniendo el valor de la primera cuota',
          tipo: ToasterTipo.error
        }
      )
    }

    const cuentaAdministrativa: DetalleCobroCuotaInterface = {
      noCuota: this.cuotas[0].numeroCuota,
      descripcion: `Cuenta administrativa cuota No.${this.cuotas[0].numeroCuota}`,
      fecha: this.cuotas[0].fechaCobro,
      valor: valorCuentaAdministrativa1,
      aCobrar: 0,
      cantidadregistradaEnCobro: 0,
      tipo: TipoDetallePagoEnum.cuotaAdministrativa
    }

    if (this.cuotas[0].valorPagadoCuota) {
      const restoValorPagadoCuota = this.cuotas[0].valorPagadoCuota - valorCuentaAdministrativa1;
      if (restoValorPagadoCuota > 0) {
        // la cuenta administrativa esta pagada y hay un sobrante por asignar a la valorCapitalSubscriptor

        // setear el valor del abono capital de la primera cuota
        if (this.cuotas[0].abonoCapital) {
          if (this.contrato.dsctoPrimeraCuota === 0) {// si no hay descuento
            valorCapitalSubscriptor = this.cuotas[0].abonoCapital;
          }
          const capitalSubscriptor: DetalleCobroCuotaInterface = {
            noCuota: this.cuotas[0].numeroCuota,
            descripcion: `Capital de subscriptor cuota No.${this.cuotas[0].numeroCuota}`,
            fecha: this.cuotas[0].fechaCobro,
            valor: valorCapitalSubscriptor,
            aCobrar: 0,
            cantidadregistradaEnCobro: 0,
            tipo: TipoDetallePagoEnum.abonoCapital
          }
          const restoCapital = restoValorPagadoCuota - valorCapitalSubscriptor;
          if (restoCapital < 0) {
            valorCapitalSubscriptor -= restoValorPagadoCuota;
            capitalSubscriptor.valor = valorCapitalSubscriptor;
            this.detalleCobros.push(capitalSubscriptor);
          }
        } else {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor de la primera cuota',
              tipo: ToasterTipo.error
            }
          )
        }
      } else {
        valorCuentaAdministrativa1 -= this.cuotas[0].valorPagadoCuota;
        cuentaAdministrativa.valor = valorCuentaAdministrativa1;
        this.detalleCobros.push(cuentaAdministrativa);
        const capitalSubscriptor: DetalleCobroCuotaInterface = {
          noCuota: this.cuotas[0].numeroCuota,
          descripcion: `Capital de subscriptor cuota No.${this.cuotas[0].numeroCuota}`,
          fecha: this.cuotas[0].fechaCobro,
          valor: valorCapitalSubscriptor,
          aCobrar: 0,
          cantidadregistradaEnCobro: 0,
          tipo: TipoDetallePagoEnum.abonoCapital
        }
        this.detalleCobros.push(capitalSubscriptor);
      }
    } else {
      this.detalleCobros.push(cuentaAdministrativa);
      if (this.cuotas[0].abonoCapital) {
        valorCapitalSubscriptor = this.cuotas[0].abonoCapital;
      } else {
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Error obteniendo el valor del capital del subscriptor',
            tipo: ToasterTipo.error
          }
        )
      }
      const capitalSubscriptor: DetalleCobroCuotaInterface = {
        noCuota: this.cuotas[0].numeroCuota,
        descripcion: `Capital de subscriptor cuota No.${this.cuotas[0].numeroCuota}`,
        fecha: this.cuotas[0].fechaCobro,
        valor: valorCapitalSubscriptor,
        aCobrar: 0,
        cantidadregistradaEnCobro: 0,
        tipo: TipoDetallePagoEnum.abonoCapital
      }
      this.detalleCobros.push(capitalSubscriptor);
    }
    console.log(this.detalleCobros);
    this.calcularTotalACobrar(this.detalleCobros);
  }

  calcularTotalACobrar(cobros: DetalleCobroCuotaInterface[]) {
    let totalACobrar = 0;
    cobros.forEach(cobro => {
        // @ts-ignore
        totalACobrar += cobro.valor;
      }
    );
    this.totalACobrar = Number(totalACobrar.toFixed(2));
  }

  aplicarValorACobrar() {
    this.reestablecerDetalle();
    this.asignarValorACobrarADetallesCobro();

  }

  reestablecerDetalle() {
    this.detalleCobros = [];
    this.puedenSerMasCuotasAdded = true;
    // @ts-ignore
    this.armarCobroContratoPorEstado(this.contrato.estado, this.contrato);
  }

  asignarValorACobrarADetallesCobro() {
    // this.puedenSerMasCuotasAdded = true;
    this.totalMostrar = 0;
    let auxTotalACobra = this.totalCobroIngresado;

    let valoresACobra = 0;
    this.pagos = [];
    this.pagosAcumulados = 0;
    this.detalleCobros.forEach(cobro => {
        // @ts-ignore
        valoresACobra += cobro.valor;
      }
    );
    valoresACobra = Number(valoresACobra.toFixed(2))
    console.log({valoresACobra});
    if (this.totalCobroIngresado > 0) {
      if (this.totalCobroIngresado <= this.totalACobrar) {
        this.detalleCobros = this.detalleCobros.map(cobro => {
            // @ts-ignore
            const resto = auxTotalACobra - cobro.valor;
            cobro.cantidadregistradaEnCobro = 0;
            if (resto > 0) {
              cobro.aCobrar = cobro.valor;
              // @ts-ignore
              this.totalMostrar += cobro.valor;
              auxTotalACobra = resto;
              return cobro;
            } else if (auxTotalACobra > 0) {
              cobro.aCobrar = auxTotalACobra;
              this.totalMostrar += auxTotalACobra;
              auxTotalACobra = 0;
              return cobro;
            } else {
              cobro.aCobrar = 0;
              return cobro;
            }
          }
        );
      } else {
        this.excedente = this.totalCobroIngresado - this.totalACobrar;
        if (this.cuotas[0].valorCuota) {
          if (this.excedente >= 0.01) {
            const cuotasToBeAdded = Math.ceil(this.excedente / this.cuotas[0].valorCuota);

            if (this.puedenSerMasCuotasAdded) {
              this.addCuotasExtra(cuotasToBeAdded);
              this.calcularTotalACobrar(this.detalleCobros);
              this.puedenSerMasCuotasAdded = false;
              this.asignarValorACobrarADetallesCobro();
            } else {
              this.logsService.toaster(
                {
                  titulo: 'Error',
                  mensaje: 'Ingrese un valor que no supere el total.',
                  tipo: ToasterTipo.warning,
                }
              )
            }
          }
        }
      }
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Ingrese un valor que no supere el total.',
          tipo: ToasterTipo.warning,
        }
      )
      this.detalleCobros = this.detalleCobros.map(cobro => {
        cobro.aCobrar = 0;
        return cobro;
      })
      this.totalCobroIngresado = 0;
    }
    console.log(this.detalleCobros)
  }

  addCuotasConsecutivas(numCuotasToAdd: number) {
    // @ts-ignore
    const ultimaCuota = this.contrato.cuotaACobrar;
    let i = ultimaCuota;
    const cantidadCuotas = this.cuotas.length;
    let hayMasCuotas = true;
    let addedCuotas = 0;
    if (i) {
      while (addedCuotas < numCuotasToAdd && hayMasCuotas) {
        let valorCuentaAdministrativa = 0;
        let valorCapitalSubscriptor = 0;
        if (this.cuotas[i].estaPagado === SiNoEnum.NO) {
          if (this.cuotas[i].valorTasaAdministrativa && this.cuotas[i].valorImpuesto) {
            // @ts-ignore
            valorCuentaAdministrativa = this.cuotas[i].valorTasaAdministrativa + this.cuotas[i].valorImpuesto;
            const cuentaAdministrativa: DetalleCobroCuotaInterface = {
              noCuota: this.cuotas[i].numeroCuota,
              descripcion: `Cuenta administrativa cuota No.${this.cuotas[i].numeroCuota}`,
              fecha: this.cuotas[i].fechaCobro,
              valor: valorCuentaAdministrativa,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.cuotaAdministrativa
            }
            const capitalSubscriptor: DetalleCobroCuotaInterface = {
              noCuota: this.cuotas[i].numeroCuota,
              descripcion: `Capital de subscriptor cuota No.${this.cuotas[i].numeroCuota}`,
              fecha: this.cuotas[i].fechaCobro,
              valor: valorCapitalSubscriptor,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.abonoCapital
            }
            if (this.cuotas[i].abonoCapital) {
              // @ts-ignore
              valorCapitalSubscriptor = this.cuotas[i].abonoCapital;
            } else {
              this.logsService.toaster(
                {
                  titulo: 'Error',
                  mensaje: 'Error obteniendo el valor del abono capital',
                  tipo: ToasterTipo.error
                }
              )
            }
            if (this.cuotas[i].valorPagadoCuota) {
              // @ts-ignore
              const restoDespuesDeCuentaAdministrativa = this.cuotas[i].valorPagadoCuota - valorCuentaAdministrativa;
              if (restoDespuesDeCuentaAdministrativa >= 0) {
                // entonces ya esta pagada la cuota administrativa
                const restoDespuesDeCapital = restoDespuesDeCuentaAdministrativa - valorCapitalSubscriptor;
                if (restoDespuesDeCapital < 0) {
                  valorCapitalSubscriptor -= restoDespuesDeCuentaAdministrativa;
                } else if (restoDespuesDeCapital === 0) {
                  valorCapitalSubscriptor = 0;
                } else {
                  this.logsService.toaster(
                    {
                      titulo: 'Error',
                      mensaje: 'Error calculando el valor del abono capital',
                      tipo: ToasterTipo.error
                    }
                  )
                }
              } else {
                // se adelanto un valor que no cubre la cuota administrativa
                // @ts-ignore
                valorCuentaAdministrativa -= this.cuotas[i].valorPagadoCuota;
                cuentaAdministrativa.valor = valorCuentaAdministrativa;
                this.detalleCobros.push(cuentaAdministrativa);
              }
            } else {
              this.detalleCobros.push(cuentaAdministrativa);
              capitalSubscriptor.valor = valorCapitalSubscriptor;
            }
            this.addDetalleCobroDispositivoYRastreo(i);
            // @ts-ignore
            if (capitalSubscriptor.valor > 0) {
              this.detalleCobros.push(capitalSubscriptor);
              addedCuotas++;
              i++;
            }
          }
        } else {
          this.addDetalleCobroDispositivoYRastreo(i);
          i++;
        }
        if (i >= cantidadCuotas) {
          hayMasCuotas = false;
          // this.puedenSerMasCuotasAdded = false;
        }
      }
    }

  }

  addCuotasAlFinal(numCuotasToAdd: number) {
    // @ts-ignore
    const indiceUltimaCuotaEnDetalle = (this.detalleCobros.at(-1).noCuota - 1);
    if (this.contrato.plazoMesSeleccionado) {
      let i = this.contrato.plazoMesSeleccionado - 1;
      let hayMasCuotas = true;
      let addedCuotas = 0;
      while (addedCuotas < numCuotasToAdd && hayMasCuotas && i > indiceUltimaCuotaEnDetalle) {
        let valorCuentaAdministrativa = 0;
        let valorCapitalSubscriptor = 0;
        if (this.cuotas[i].estaPagado === SiNoEnum.NO) {
          if (this.cuotas[i].valorTasaAdministrativa && this.cuotas[i].valorImpuesto) {
            // @ts-ignore
            valorCuentaAdministrativa = this.cuotas[i].valorTasaAdministrativa + this.cuotas[i].valorImpuesto;
            const cuentaAdministrativa: DetalleCobroCuotaInterface = {
              noCuota: this.cuotas[i].numeroCuota,
              descripcion: `Cuenta administrativa cuota No.${this.cuotas[i].numeroCuota}`,
              fecha: this.cuotas[i].fechaCobro,
              valor: valorCuentaAdministrativa,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.cuotaAdministrativa
            }
            const capitalSubscriptor: DetalleCobroCuotaInterface = {
              noCuota: this.cuotas[i].numeroCuota,
              descripcion: `Capital de subscriptor cuota No.${this.cuotas[i].numeroCuota}`,
              fecha: this.cuotas[i].fechaCobro,
              valor: valorCapitalSubscriptor,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.abonoCapital
            }
            if (this.cuotas[i].abonoCapital) {
              // @ts-ignore
              valorCapitalSubscriptor = this.cuotas[i].abonoCapital;
            } else {
              this.logsService.toaster(
                {
                  titulo: 'Error',
                  mensaje: 'Error obteniendo el valor del abono capital',
                  tipo: ToasterTipo.error
                }
              )
            }
            if (this.cuotas[i].valorPagadoCuota) {
              // @ts-ignore
              const restoDespuesDeCuentaAdministrativa = this.cuotas[i].valorPagadoCuota - valorCuentaAdministrativa;
              if (restoDespuesDeCuentaAdministrativa >= 0) {
                // entonces ya esta pagada la cuota administrativa
                const restoDespuesDeCapital = restoDespuesDeCuentaAdministrativa - valorCapitalSubscriptor;
                if (restoDespuesDeCapital < 0) {
                  valorCapitalSubscriptor -= restoDespuesDeCuentaAdministrativa;
                } else if (restoDespuesDeCapital === 0) {
                  valorCapitalSubscriptor = 0;
                } else {
                  this.logsService.toaster(
                    {
                      titulo: 'Error',
                      mensaje: 'Error calculando el valor del abono capital',
                      tipo: ToasterTipo.error
                    }
                  )
                }
              } else {
                // se adelanto un valor que no cubre la cuota administrativa
                // @ts-ignore
                valorCuentaAdministrativa -= this.cuotas[i].valorPagadoCuota;
                cuentaAdministrativa.valor = valorCuentaAdministrativa;
                this.detalleCobros.push(cuentaAdministrativa);
              }
            } else {
              this.detalleCobros.push(cuentaAdministrativa);
              capitalSubscriptor.valor = valorCapitalSubscriptor;
            }
            this.addDetalleCobroDispositivoYRastreo(i);
            // @ts-ignore
            if (capitalSubscriptor.valor > 0) {
              this.detalleCobros.push(capitalSubscriptor);
              addedCuotas++;
              i--;
            }
          }
        } else {
          this.addDetalleCobroDispositivoYRastreo(i);
          i--;
        }
        if (i === indiceUltimaCuotaEnDetalle) {
          hayMasCuotas = false;
        }
      } // el while
    }

  }

  addCuotasExtra(numCuotasToAdd: number) {
    if (this.esAdelanto) {
      if (numCuotasToAdd <= 2) {
        this.addCuotasConsecutivas(numCuotasToAdd);
      } else {
        const cuotasToBeAddedDesdeElFinal = numCuotasToAdd - 2;
        this.addCuotasConsecutivas(2);
        this.addCuotasAlFinal(cuotasToBeAddedDesdeElFinal);
      }
    } else {
      if (numCuotasToAdd <= 3) {
        this.addCuotasConsecutivas(numCuotasToAdd);
      } else {
        const cuotasToBeAddedDesdeElFinal = numCuotasToAdd - 3;
        this.addCuotasConsecutivas(3);
        this.addCuotasAlFinal(cuotasToBeAddedDesdeElFinal);
      }
    }


  }

  obtenerDatosDeConfiguracion() {
    return new Promise((resolve, reject) => {
      this.httpConfiguracionGeneralService.find()
        .subscribe(
          {
            next: (configuraciones) => {
              this.configuracionGeneral = configuraciones[0][0];
              resolve(this.configuracionGeneral);
            },
            error: err => {
              this.logsService.toaster({
                titulo: 'Error',
                tipo: ToasterTipo.error,
                mensaje: 'Error cargando datos de configuración'
              })
              reject(false)
            }
          }
        )
    })
  }

  setearTipoDetallePago(detalle: DetalleCobroCuotaInterface, objetoPago: PagoDetalleInterface) {
    const objetoReturn = {...objetoPago}

    if (detalle.descripcion?.includes('Capital')) {
      objetoReturn.tipo = TipoDetallePagoEnum.abonoCapital;
      objetoReturn.idItemCobroPago = this.itemCobroPagoAbonoCapital.id;
    }
    if (detalle.descripcion?.includes('Cuenta')) {
      objetoReturn.tipo = TipoDetallePagoEnum.cuotaAdministrativa;
      objetoReturn.idItemCobroPago = this.itemCobroPagoCuotaAdministrativa.id;
    }
    if (detalle.descripcion?.includes('Dispositivo')) {
      objetoReturn.tipo = TipoDetallePagoEnum.dispositivo;
      objetoReturn.idItemCobroPago = this.itemCobroPagoDispositivio.id;
    }
    if (detalle.descripcion?.includes('Rastreo')) {
      objetoReturn.tipo = TipoDetallePagoEnum.rastreo;
      objetoReturn.idItemCobroPago = this.itemCobroPagoRastreo.id;
    }
    if (detalle.descripcion?.includes('Inscripción')) {
      objetoReturn.tipo = TipoDetallePagoEnum.inscripcion;
      objetoReturn.idItemCobroPago = this.itemCobroPagoInscripcion.id;
    }
    objetoReturn.numeroCuota = detalle.noCuota;
    return objetoReturn;
  }

  agregarCobro() {
    const objetoPago = this.obtenerDatosDeFormCobro();
    let detallePago: PagoDetalleInterface = {};
    if (objetoPago.valor) { // verificar si se ingreso in valor para la transaccion
      let valorTransaccion = objetoPago.valor;
      this.pagosAcumulados += valorTransaccion;
      if (this.pagosAcumulados <= this.totalCobroIngresado) { // si el total de transacciones es menor o igual al valor a cobrar ingresado por el usuario
        this.detalleCobros = this.detalleCobros.map(detalle => {
            if (valorTransaccion > 0) {
              // @ts-ignore
              if (detalle.cantidadregistradaEnCobro < detalle.aCobrar) {
                // @ts-ignore
                const faltaPorPagar = detalle.aCobrar - detalle.cantidadregistradaEnCobro;
                if (faltaPorPagar <= valorTransaccion) {
                  valorTransaccion = valorTransaccion - faltaPorPagar;
                  // @ts-ignore
                  detalle.cantidadregistradaEnCobro += faltaPorPagar;
                  detallePago.valor = faltaPorPagar;
                } else { // si lo que falta por pagar es mayor a lo que se registro
                  // @ts-ignore
                  detalle.cantidadregistradaEnCobro += valorTransaccion;
                  detallePago.valor = valorTransaccion;
                  valorTransaccion = 0;
                }
                detallePago = {...this.setearTipoDetallePago(detalle, detallePago)};
                objetoPago.detallePago?.push({...detallePago});
              }
            }
            return detalle;
          }
        );
        this.pagos.push({...objetoPago});
        this.resetearFormCobro();
      } else {
        this.pagosAcumulados -= valorTransaccion;
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Cobro no añadido, supera el valor a cobrar ingresado',
            tipo: ToasterTipo.error
          }
        )
      }

    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Debe ingresar un valor para el pago',
          tipo: ToasterTipo.error
        }
      )
    }

  }

  resetearFormCobro() {
    this.formCobro.get('tipoDocumento')?.reset();
    this.formCobro.get('numeroDocumento')?.reset();
    this.formCobro.get('fechaDeposito')?.reset();
    this.formCobro.get('observaciones')?.reset();
    this.formCobro.get('cuentaBancaria')?.reset();
    this.formCobro.get('valor')?.reset();
  }

  obtenerDatosDeFormCobro(): PagoInterface {
    const tipoDocumento = this.formCobro.get('tipoDocumento')?.value;
    const numeroDocumento = this.formCobro.get('numeroDocumento')?.value;
    const fechaDeposito = this.formCobro.get('fechaDeposito')?.value;
    const observaciones = this.formCobro.get('observaciones')?.value;
    const cuentaBancaria = this.formCobro.get('cuentaBancaria')?.value;
    const valor = this.formCobro.get('valor')?.value;
    console.log('cuenta bancaria:', this.formCobro.get('cuentaBancaria')?.value);
    const objetoPago: PagoInterface = {
      valor,
      idCuentaBancariaEmpresa: cuentaBancaria.id,
      bancoCuentaBancaria: cuentaBancaria.idBanco?.nombre,
      observaciones,
      fechaDeposito,
      numeroDocumento,
      tipoDocumento: tipoDocumento.nombre,
      detallePago: []
    }
    return objetoPago;

  }

  registrarCobro() {
    const cobro = this.armarObjetoCobroACrear();
    // console.log(cobro);
    this.crearCobro(cobro);
  }

  armarObjetoCobroACrear() {
    this.detalleCobros.forEach(det => {
      det.aCobrar = Number(det.aCobrar?.toFixed(4))
      det.cantidadregistradaEnCobro = Number(det.cantidadregistradaEnCobro?.toFixed(4))
      det.valor = Number(det.valor?.toFixed(4))
    })
    this.pagos.forEach(pago => {
      pago.detallePago?.forEach(detPago => {
          detPago.valor = Number(detPago.valor?.toFixed(4));
        }
      )
    })
    const cobro: CobroInterface = {
      "idContrato": +this.idContrato,
      "pagos": this.pagos,
      "valorACobrar": Number(this.totalCobroIngresado.toFixed(4)),
      detalleCobros: this.detalleCobros
    }
    console.log(cobro, this.detalleCobros);
    return cobro;
  }

  navegarAContratos() {
    this.router.navigate(['contratos', 'contrato-modulo'])
  }

  crearCobro(cobro: CobroInterface) {
    this.blockUiService.blockuiHabilitado = true;
    this.httpCobroService.createOne(cobro).subscribe(
      {
        next: res => {
          this.blockUiService.blockuiHabilitado = false;
          this.logsService.toaster(
            {
              titulo: 'Exito',
              mensaje: 'Cobro registrado',
              tipo: ToasterTipo.success
            }
          )
          this.navegarAContratos();
        },
        error: err => {
          this.blockUiService.blockuiHabilitado = false;
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error registrando el cobro',
              tipo: ToasterTipo.error
            }
          )
        }
      }
    )
  }
}


export interface CobroInterface {
  idContrato?: number;
  valorACobrar?: number;
  pagos?: PagoInterface[];
  detalleCobros?: DetalleCobroCuotaInterface[]
}

export interface PagoInterface {
  id?: number;
  tipoDocumento?: string;
  observaciones?: string;
  numeroDocumento?: string;
  valor?: number;
  fechaDeposito?: string;
  detallePago?: PagoDetalleInterface[];
  idCuentaBancariaEmpresa?: number;
  bancoCuentaBancaria?: string;
}

export interface PagoDetalleInterface {
  numeroCuota?: number;
  valor?: number;
  idItemCobroPago?: number;
  tipo?: TipoDetallePagoEnum;
  idFactura?: FacturaResponseDto;
}
