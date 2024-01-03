import {Component, OnInit} from '@angular/core';
import {ContratoResponseDto} from "../../../contrato/servicios/dto/contrato.response-dto";
import {PlanResponseDto} from "../../../plan/servicios/dto/plan.response-dto";
import {CuotaResponseDto} from "../../../cuota/servicios/dto/cuota.response-dto";
import {UsuarioResponseDto} from "../../../usuario/servicios/dto/usuario.response-dto";
import {
  HistoricoPlanContratoResponseDto
} from "../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpContratoService} from "../../../contrato/servicios/http-contrato-service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {
  HttpCuentaBancariaEmpresaService
} from "../../../cuenta-bancaria-empresa/servicios/http-cuenta-bancaria-empresa-service";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {HttpItemCobroPagoService} from "../../../item-cobro-pago/servicios/http-item-cobro-pago-service";
import {HttpCobroService} from "../../../cobro/servicios/http-cobro-service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {ItemCobroPagoResponseDto} from "../../../item-cobro-pago/servicios/dto/item-cobro-pago.response-dto";
import {
  CuentaBancariaEmpresaFindDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.find-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {
  CuentaBancariaEmpresaResponseDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.response-dto";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import * as dayjs from "dayjs";
import {VendedorCreateDto} from "../../../vendedor/servicios/dto/vendedor.create-dto";
import {VendedorResponseDto} from "../../../vendedor/servicios/dto/vendedor.response-dto";
import {SiNoEnum} from "../../../../enums/si-no.enum";
import {DetalleCobroCuotaInterface} from "../../../contrato/interfaces/detalle-cobro-cuota.interface";
import {TipoDetallePagoEnum} from "../../../../enums/tipo-detalle-pago.enum";
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  CobroInterface,
  PagoDetalleInterface,
  PagoInterface
} from "../../../cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";

@Component({
  selector: 'app-ruta-refinanciamiento',
  templateUrl: './ruta-refinanciamiento.component.html',
  styleUrls: ['./ruta-refinanciamiento.component.scss']
})
export class RutaRefinanciamientoComponent implements OnInit {
  idContrato!: number;
  contrato!: ContratoResponseDto;
  plan!: PlanResponseDto;
  cuotas!: CuotaResponseDto[];
  mostrarDatos = false;
  datosUsuarioCliente!: UsuarioResponseDto;
  datosUsuarioVendedor!: VendedorResponseDto;
  historico!: HistoricoPlanContratoResponseDto;
  cuotasMora!: CuotaResponseDto[];
  valorEnMora = 0;
  valorCuota = 0;
  totalCuotasCobrarParaRefinanciamiento = 0;
  totalCobrarParaRefinanciar = 0;
  itemCobroPagoInscripcion: ItemCobroPagoResponseDto = {};
  itemCobroPagoAbonoCapital: ItemCobroPagoResponseDto = {};
  itemCobroPagoCuotaAdministrativa: ItemCobroPagoResponseDto = {};
  itemCobroPagoDispositivio: ItemCobroPagoResponseDto = {};
  itemCobroPagoRastreo: ItemCobroPagoResponseDto = {};
  tipoDeDocumentos: ListaValoresDetalleResponseDto[] = [];
  cuentasBancarias: CuentaBancariaEmpresaResponseDto[] = [];
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  fechaRefinanciamiento = dayjs().format('DD-MM-YYYY');
  detalleCobros: DetalleCobroCuotaInterface[] = [];
  totalCobroIngresado = 0;
  formCobro: FormGroup;
  pagos: PagoInterface[] = [];
  pagosAcumulados = 0;
  excedente = 0;
  totalACobrar = 0;
  totalMostrar = 0;

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
    const {idContrato} = this.route.snapshot.params;
    if (idContrato) {
      this.idContrato = idContrato;
      try {
        await this.obtenerDatosContrato(this.idContrato);
        this.calcularCuotasRefinanciamiento(this.historico);
        this.obtenerCuotasEnMora(this.cuotas);
        this.armarDetallesCobro();
        this.calcularValorEnMora();
        this.calcularValorCuota();
        this.calcularValorACobrarParaRefinanciamiento();
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
                if (this.contrato.estado === EstadoContratoEnum.Adjudicado) {
                  this.itemCobroPagoDispositivio = await this.consultarItemCobro('Dispositivo');
                  this.itemCobroPagoRastreo = await this.consultarItemCobro('Rastreo');
                }
                this.itemCobroPagoAbonoCapital = await this.consultarItemCobro('Capital suscriptor');
                this.itemCobroPagoCuotaAdministrativa = await this.consultarItemCobro('Cuota administrativa');
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
    console.log(this.historico);
  }

  setearDatosCliente(contrato: ContratoResponseDto) {
    this.datosUsuarioCliente = contrato.idClienteEnGrupo.idCliente.idUsuario;
  }

  setearDatosVendedor(vendedor: VendedorCreateDto) {
    // this.datosUsuarioVendedor = vendedor.idTrabajador.idUsuario;

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

  calcularCuotasRefinanciamiento(historico: HistoricoPlanContratoResponseDto) {
    this.totalCuotasCobrarParaRefinanciamiento = 0;
    if (this.historico.totalCuotasMoraActual) {
      this.totalCuotasCobrarParaRefinanciamiento = Math.ceil(this.historico.totalCuotasMoraActual * 0.25);
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obteniendo las cuotas en mora.',
          tipo: ToasterTipo.error
        }
      );
    }
  }

  obtenerCuotasEnMora(cuotas: CuotaResponseDto[]) {
    this.cuotasMora = [];
    this.cuotasMora = cuotas.filter(cuota => {
        return cuota.estaMora === SiNoEnum.SI
      }
    )
    console.log(this.cuotasMora);
  }

  armarDetallesCobro() {
    this.cuotasMora.forEach(cuota => {
        let valorCuentaAdministrativa = 0;
        let valorCapitalSubscriptor = 0;
        if (cuota.estaPagado === SiNoEnum.NO) {
          if (cuota.valorTasaAdministrativa && cuota.valorImpuesto) {
            // @ts-ignore
            valorCuentaAdministrativa = cuota.valorTasaAdministrativa + cuota.valorImpuesto;
            const cuentaAdministrativa: DetalleCobroCuotaInterface = {
              noCuota: cuota.numeroCuota,
              descripcion: `Cuenta administrativa cuota No.${cuota.numeroCuota}`,
              fecha: cuota.fechaCobro,
              valor: valorCuentaAdministrativa,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.cuotaAdministrativa
            }
            const capitalSubscriptor: DetalleCobroCuotaInterface = {
              noCuota: cuota.numeroCuota,
              descripcion: `Capital de subscriptor cuota No.${cuota.numeroCuota}`,
              fecha: cuota.fechaCobro,
              valor: valorCapitalSubscriptor,
              aCobrar: 0,
              cantidadregistradaEnCobro: 0,
              tipo: TipoDetallePagoEnum.abonoCapital
            }
            if (cuota.abonoCapital) {
              // @ts-ignore
              valorCapitalSubscriptor = cuota.abonoCapital;
            } else {
              this.logsService.toaster(
                {
                  titulo: 'Error',
                  mensaje: 'Error obteniendo el valor del abono capital',
                  tipo: ToasterTipo.error
                }
              )
            }
            if (cuota.valorPagadoCuota) {
              // @ts-ignore
              const restoDespuesDeCuentaAdministrativa = cuota.valorPagadoCuota - valorCuentaAdministrativa;
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
                valorCuentaAdministrativa -= cuota.valorPagadoCuota;
                cuentaAdministrativa.valor = valorCuentaAdministrativa;
                this.detalleCobros.push(cuentaAdministrativa);
              }
            } else {
              this.detalleCobros.push(cuentaAdministrativa);
              capitalSubscriptor.valor = valorCapitalSubscriptor;
            }
            this.addDetalleCobroDispositivoYRastreo(cuota);
            // @ts-ignore
            if (capitalSubscriptor.valor > 0) {
              this.detalleCobros.push(capitalSubscriptor);
            }
          }
        } else {
          this.addDetalleCobroDispositivoYRastreo(cuota);
        }
      }
    )
  }

  addDetalleCobroDispositivoYRastreo(cuota: CuotaResponseDto) {
    if (this.contrato.estado === EstadoContratoEnum.Adjudicado) {
      if (cuota.dispositivo &&
        cuota.dispositivoEstaPagado === SiNoEnum.NO
      ) {
        this.addCobroDispositivo(cuota);
      }
      if (cuota.rastreo &&
        cuota.rastreoEstaPagado === SiNoEnum.NO) {
        this.addCobroRastreo(cuota);
      }
    }
  }


  addCobroDispositivo(cuota: CuotaResponseDto) {
    if (cuota.dispositivoEstaPagado === SiNoEnum.NO) {
      if (cuota.dispositivo) {
        let valorDispositivo = cuota.dispositivo;
        const dispositivo: DetalleCobroCuotaInterface = {
          noCuota: cuota.numeroCuota,
          descripcion: `Dispositivo`,
          fecha: cuota.fechaCobro,
          valor: valorDispositivo,
          aCobrar: 0,
          cantidadregistradaEnCobro: 0,
          tipo: TipoDetallePagoEnum.dispositivo
        }
        if (cuota.valorTotalDispositivoCobrado === undefined) {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor cobrado del dispositivo',
              tipo: ToasterTipo.error
            }
          )
        } else { // @ts-ignore
          if (cuota.valorTotalDispositivoCobrado) {
            // @ts-ignore
            valorDispositivo -= cuota.valorTotalDispositivoCobrado;
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

  addCobroRastreo(cuota: CuotaResponseDto) {
    if (cuota.rastreoEstaPagado === SiNoEnum.NO) {
      if (cuota.rastreo) {
        let valorRastreo = cuota.rastreo;
        const rastreo: DetalleCobroCuotaInterface = {
          noCuota: cuota.numeroCuota,
          descripcion: `Rastreo`,
          fecha: cuota.fechaCobro,
          valor: valorRastreo,
          aCobrar: 0,
          cantidadregistradaEnCobro: 0,
          tipo: TipoDetallePagoEnum.rastreo
        }
        if (cuota.valorTotalRastreoCobrado === undefined) {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Error obteniendo el valor cobrado del rastreo',
              tipo: ToasterTipo.error
            }
          )
        } else { // @ts-ignore
          if (cuota.valorTotalRastreoCobrado) {
            // @ts-ignore
            valorRastreo -= cuota.valorTotalRastreoCobrado;
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

  aplicarValorACobrar() {
    this.reestablecerDetalle();

    this.asignarValorACobrarADetallesCobro();

  }

  asignarValorACobrarADetallesCobro() {
    // this.puedenSerMasCuotasAdded = true;
    // this.totalMostrar = 0;
    let auxTotalACobra = this.totalCobroIngresado;

    let valoresACobra = 0;
    this.pagos = [];
    this.pagosAcumulados = 0;
    this.detalleCobros.forEach(cobro => {
        // @ts-ignore
        valoresACobra += cobro.valor;
      }
    );
    if (this.totalCobroIngresado > 0) {
      if (this.totalCobroIngresado === this.totalCobrarParaRefinanciar) {
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
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: 'Ingrese el valor a cobrar para refinanciar',
            tipo: ToasterTipo.warning,
          }
        );
      }
    } else {
      this.logsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Ingrese el valor a cobrar para refinanciar',
          tipo: ToasterTipo.warning,
        }
      )
      this.detalleCobros = this.detalleCobros.map(cobro => {
        cobro.aCobrar = 0;
        return cobro;
      })
      this.totalCobroIngresado = 0;
    }

  }


  reestablecerDetalle() {
    this.detalleCobros.forEach(detalle => {
        detalle.aCobrar = 0;
      }
    )
    this.pagosAcumulados = 0;
  }

  calcularValorEnMora() {
    this.valorEnMora = 0;
    this.detalleCobros.forEach(
      cuota => {
        if (cuota.valor) {
          this.valorEnMora += cuota.valor;
        }
      }
    );
  }

  calcularValorCuota() {
    this.valorCuota = 0;
    if (this.cuotasMora[0].valorCuota) {
      this.valorCuota += this.cuotasMora[0].valorCuota;
      if (this.cuotasMora[0].dispositivo) {
        this.valorCuota += this.cuotasMora[0].dispositivo;
      }
      if (this.cuotasMora[0].rastreo) {
        this.valorCuota += this.cuotasMora[0].rastreo;
      }
    }
  }

  calcularValorACobrarParaRefinanciamiento() {
    this.totalCobrarParaRefinanciar = this.valorCuota * this.totalCuotasCobrarParaRefinanciamiento;
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
                detallePago.numeroCuota = detalle.noCuota;
                detallePago.tipo = detalle.tipo;
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

  navegarAContratos() {
    this.router.navigate(['contratos', 'contrato-modulo'])
  }

  crearRefinanciamiento() {
    this.armarObjetoEnvio();
  }

  armarObjetoEnvio() {
    const cobro: CobroInterface = {
      "idContrato": +this.idContrato,
      "pagos": this.pagos,
      "valorACobrar": this.totalCobroIngresado,
      detalleCobros: this.detalleCobros
    }



    const refinanciamiento = {
      idContrato: +this.idContrato,
      // @ts-ignore
      idPlan: +this.plan.id,
      // @ts-ignore
      idHistoricoPlanContrato: +this.historico.id,
      totalCuotas: this.contrato.plazoMesSeleccionado,
      fechaRefinanciamiento: this.fechaRefinanciamiento,
      totalCuotasMora: this.historico.totalCuotasMoraActual,
      totalCuotasPagadasRefinanciamiento: this.totalCuotasCobrarParaRefinanciamiento,
      valorCuota: this.contrato.cuotaActual,
      // @ts-ignore
      totalCuotasFaltantesRefinanciamiento: this.historico.totalCuotasMoraActual - this.totalCuotasCobrarParaRefinanciamiento,
      totalCuotasPagadas: this.historico.totalCuotasCobradas,
      // @ts-ignore
      cuotasRestantesSinMora: this.contrato.plazoMesSeleccionado - this.historico.totalCuotasCobradas - this.historico.totalCuotasMoraActual,
      valorPendientePago: this.valorEnMora,
      cobro
    }
    console.log(refinanciamiento);

  }
}
