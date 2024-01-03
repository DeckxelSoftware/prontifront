import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {
  HistoricoPlanContratoResponseDto
} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {
  ConfiguracionGeneralResponseDto
} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import {forkJoin} from 'rxjs';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {EstadoContratoEnum} from '../../../../enums/estado-contrato.enum';
import {MatDialog} from '@angular/material/dialog';
import {CuotaResponseDto} from "../../../cuota/servicios/dto/cuota.response-dto";
import {DetalleCobroCuotaInterface} from "../../interfaces/detalle-cobro-cuota.interface";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {SiNoEnum} from "../../../../enums/si-no.enum";
import {TipoDetallePagoEnum} from "../../../../enums/tipo-detalle-pago.enum";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {
  CuentaBancariaEmpresaResponseDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.response-dto";
import {
  CuentaBancariaEmpresaFindDto
} from "../../../cuenta-bancaria-empresa/servicios/dto/cuenta-bancaria-empresa.find-dto";
import {
  HttpCuentaBancariaEmpresaService
} from "../../../cuenta-bancaria-empresa/servicios/http-cuenta-bancaria-empresa-service";
import {
  CobroInterface,
  PagoDetalleInterface,
  PagoInterface
} from "../../../cuota/rutas/ruta-cuota-cobro/ruta-cuota-cobro.component";
import {ItemCobroPagoResponseDto} from "../../../item-cobro-pago/servicios/dto/item-cobro-pago.response-dto";
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-ruta-liquidacion',
  templateUrl: './ruta-liquidacion.component.html',
  styleUrls: ['./ruta-liquidacion.component.scss']
})
export class RutaLiquidacionComponent implements OnInit {



  items: MenuItem[] = [];

  ultimoHistoricoContrato: HistoricoPlanContratoResponseDto = {};
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};

  totalCobroIngresado = 0;
  totalACobrar = 0;
  excedente = 0;
  contrato!: ContratoResponseDto;
  cuotas!: CuotaResponseDto[];
  detalleCobros: DetalleCobroCuotaInterface[] = [];
  totalMostrar = 0;
  formCobro: FormGroup;
  tipoDeDocumentos: ListaValoresDetalleResponseDto[] = [{nombre: 'No hay registros'}];
  cuentasBancarias: CuentaBancariaEmpresaResponseDto[] = [];
  pagosAcumulados = 0;
  itemCobroPagoInscripcion: ItemCobroPagoResponseDto = {};
  itemCobroPagoAbonoCapital: ItemCobroPagoResponseDto = {};
  itemCobroPagoCuotaAdministrativa: ItemCobroPagoResponseDto = {};
  itemCobroPagoDispositivio: ItemCobroPagoResponseDto = {};
  pagos: PagoInterface[] = [];

  formPlan = new FormGroup({})
  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formLiquidacion = new FormGroup({});


  modelPlan: any = {
    id: 0,
    planSeleccionado: '',
    precioPlanSeleccionado: '',
    plazoMesSeleccionado: '',
    modelo: '',
    precio: 0,
    inscripcion: 0,
  }

  modelContrato: any = {
    numeroDeContrato: '',
    fechaInicio: '',
    fechaIniciaCobro: '',
    observacion: '',
    dsctoPrimeraCuota: 0,
    dsctoInscripcion: 0,
    plazoMesSeleccionado: 0,
  }

  modelCliente: any = {
    nombres: '',
    apellidos: '',
    documentoIdentidad: '',
    medioContacto1: '',
  };

  modelLiquidacion: any = {
    capitalALiquidar: '',
    tasaAdministrativaALiquidar: '',
    cargosAdjudicacion: '',
  }

  modelVendedor: any = {
    nombres: '',
    apellidos: '',
    agencia: '',
    supervisor: '',
  }


  fieldsPlan: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'inscripcion',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Inscripción',
          }
        },
        {
          className: 'col-4',
          key: 'precio',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Monto',
          }
        },
        {
          className: 'col-4',
          key: 'modelo',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plan',
          }
        },

        {
          className: 'col-4 mt-3',
          key: 'labelInscripcion',
          template: `<p>Inscripcion + primera cuota: </p>`
        },
      ]
    }
  ];


  fieldsContrato: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'numeroDeContrato',
          type: 'input',
          templateOptions: {
            type: 'number',
            min: 0,
            readonly: true,
            label: 'Número de contrato',
          }
        },
        {
          className: 'col-4',
          key: 'fechaInicio',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'date',
            label: 'Fecha Inicio',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'fechaIniciaCobro',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'date',
            label: 'Fecha inicia cobro',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'dsctoInscripcion',
          type: 'input',
          templateOptions: {
            type: 'number',
            min: 0,
            readonly: true,
            label: 'Dscto. Inscripción',
          }
        },
        {
          className: 'col-4',
          key: 'dsctoPrimeraCuota',
          type: 'input',
          templateOptions: {
            type: 'number',
            min: 0,
            readonly: true,
            label: 'Dscto. Primera cuota',
          }
        },
        {
          className: 'col-4',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Observación',
          }
        },
      ]
    }
  ];


  fieldsCliente: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'nombresCliente',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Nombres',
          }
        },
        {
          className: 'col-6',
          key: 'apellidosCliente',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Apellidos',
          }
        },

        {
          className: 'col-6',
          key: 'documentoIdentidad',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Documento identidad',
          }
        },

        {
          className: 'col-6',
          key: 'medioContacto1',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Medio de contacto',
          }
        },
        {
          className: 'col-6',
          key: 'nombreGrupo',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Grupo',
          }
        },
      ]
    }
  ];


  fieldsVendedor: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'nombres',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Nombres',
          }
        },
        {
          className: 'col-6',
          key: 'apellidos',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Apellidos',
          }
        },
        {
          className: 'col-6',
          key: 'agencia',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Agencia',
          }
        },
        {
          className: 'col-6',
          key: 'supervisor',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Supervisor',
          }
        },

      ]
    }
  ]

  fieldsLiquidacion: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'capitalALiquidar',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            min: 0,
            step: 0.01,
            label: 'Capital a liquidar',
            // required: true,
          }
        },

        {
          className: 'col-4',
          key: 'tasaAdministrativaALiquidar',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            min: 0,
            step: 0.01,
            label: 'Tasa administrativa',
            // required: true,
          }
        },
        {
          className: 'col-4',
          key: 'cargosAdjudicacion',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            min: 0,
            step: 0.01,
            label: 'Cargos adjudicación',
            // required: true,
          },
          hideExpression: () => {
            return this.modelContrato.estado === EstadoContratoEnum.PreadjudicadoBuscando || this.modelContrato.estado === EstadoContratoEnum.PreadjudicadoComprado ||
              this.modelContrato.estado === EstadoContratoEnum.Preadjudicado || this.modelContrato.estado === EstadoContratoEnum.Adjudicado || this.modelContrato.estado === EstadoContratoEnum.PreadjudicadoAprobado;
          }
        },
      ]
    }
  ];

  constructor(
    public blockuiService: BlockuiService,
    private _activatedRouter: ActivatedRoute,
    private _router: Router,
    private messageService: LogsMlabsService,
    private _httpContratoService: HttpContratoService,
    private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    private _dialog: MatDialog,
    public logsService: LogsMlabsService,
    public httpListaValoresDetalleService: HttpListaValoresDetalleService,
    public httpCuentaBancariaEmpresa: HttpCuentaBancariaEmpresaService,
    public router: Router,
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

  ngOnInit(): void {

    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Liquidación'},
    ];

    this.blockuiService.habilitarBlockUI();
    forkJoin(
      this.obtenerConfiguracionGeneral(),
      this.obtenerDataContrato())
      .subscribe(async (resp) => {
          console.log('resp', resp);
          this.configuracionGeneral = resp[0][0][0];
          const contrato = resp[1][0][0];
          this.contrato = contrato;
          this.setearDatosCuotas(this.contrato);
          const res = await this.armarDetallesCobro(this.contrato);
          if (res) {
            this.calcularTotalACobrar(this.detalleCobros);
          }
          this.setearValoresContratoAFormularios(contrato);
          this.calcularCamposLiquidacion();

          this.blockuiService.deshabilitarBlockUI();
        },

        error => {

          this.blockuiService.deshabilitarBlockUI();
          console.error('No se pudo consultar los datos', error);
        });
    // this.obtenerConfiguracionGeneral();
    // this.obtenerDataContrato();
  }

  obtenerConfiguracionGeneral() {
    return this._httpConfiguracionGeneralService.find({id: 1})
    //   .subscribe({
    //   next: (resp) => {
    //     if (resp) {
    //       this.configuracionGeneral = resp[0][0];
    //     }
    //   },
    //   error: err => {
    //     console.error('No se pudo obtener la configuracion general', err);
    //   }
    // })
  }

  obtenerDataContrato() {


    const {idContrato} = this._activatedRouter.snapshot.params;

    return this._httpContratoService.find({id: idContrato})
    /* .subscribe({
     next: (resp) => {
       console.log('mire loy', resp);
       if (resp) {
         const historicoArray = resp[0][0].historicoPlanContratoCollection as HistoricoPlanContratoResponseDto[];

         if (historicoArray.length > 0) {
           const ultimoHistorico = historicoArray[historicoArray.length - 1];
           this.ultimoHistoricoContrato = ultimoHistorico;
           const plan = ultimoHistorico.idPlan as PlanResponseDto;

           this.modelPlan = {...plan}

           // plan
           this.formPlan.get('inscripcion')?.setValue(this.modelPlan.inscripcion);
           this.formPlan.get('precio')?.setValue(this.modelPlan.precio);
           this.formPlan.get('modelo')?.setValue(this.modelPlan.modelo);

         }
         // contrato
         this.modelContrato = {...resp[0][0]};


       }
       console.log('this paln', this.modelPlan);
       this.blockuiService.deshabilitarBlockUI();
     },
     error: (err) => {
       console.error('No se pudo encontrar el contrato', err)
       this.blockuiService.deshabilitarBlockUI();
     }
   })*/


  }

  setearValoresContratoAFormularios(contrato: ContratoResponseDto) {

    const historicoArray = contrato.historicoPlanContratoCollection as HistoricoPlanContratoResponseDto[];

    if (historicoArray.length > 0) {
      const ultimoHistorico = historicoArray[historicoArray.length - 1];
      this.ultimoHistoricoContrato = ultimoHistorico;
      const plan = ultimoHistorico.idPlan as PlanResponseDto;

      this.modelPlan = {...plan}

      // plan
      this.formPlan.get('inscripcion')?.setValue(this.modelPlan.inscripcion);
      this.formPlan.get('precio')?.setValue(this.modelPlan.precio);
      this.formPlan.get('modelo')?.setValue(this.modelPlan.modelo);

    }
    // contrato
    this.modelContrato = {...contrato, medioContacto1: contrato.idClienteEnGrupo.idCliente.idUsuario.medioContacto1};
    this.modelVendedor = {
      ...contrato.idVendedor.idTrabajador.idUsuario,
      agencia: contrato.idVendedor.idAgencia.nombre,
      supervisor: contrato.idVendedor.idAgencia.supervisorCollection[0].idTrabajador.idUsuario.nombres
    }


  }


  cancelarAprobarPreasamblea() {

  }


  calcularCamposLiquidacion() {
    // cargosAdjudicacion
    if (this.ultimoHistoricoContrato.capitalTotal && this.configuracionGeneral.tasaCargoAdjudicacion) {

      this.modelLiquidacion.cargosAdjudicacion = this.ultimoHistoricoContrato?.capitalTotal * (this.configuracionGeneral.tasaCargoAdjudicacion / 100);
      this.formLiquidacion.get('cargosAdjudicacion')?.setValue(this.modelLiquidacion.cargosAdjudicacion);
    }

    // capitalAliquidar
    if (this.ultimoHistoricoContrato.capitalTotal && this.ultimoHistoricoContrato.cuotaCollection && this.ultimoHistoricoContrato.abonosCapitalActual) {

      if (this.ultimoHistoricoContrato.cuotaCollection.length > 0) {
        this.modelLiquidacion.capitalALiquidar = (this.ultimoHistoricoContrato.capitalTotal + this.ultimoHistoricoContrato.cuotaCollection[0].abonoCapital) - this.ultimoHistoricoContrato.abonosCapitalActual
        this.formLiquidacion.get('capitalALiquidar')?.setValue(this.modelLiquidacion.capitalALiquidar);
      }
    }
    // tasaAdministrativa
    if (this.ultimoHistoricoContrato.valorTasaAdministrativa && this.ultimoHistoricoContrato.cuotaCollection && this.modelContrato.plazoMesSeleccionado && this.ultimoHistoricoContrato.totalCuotasCobradas) {
      if (this.ultimoHistoricoContrato.cuotaCollection.length > 0) {
        this.modelLiquidacion.tasaAdministrativaALiquidar = (this.ultimoHistoricoContrato.valorTasaAdministrativa + this.ultimoHistoricoContrato.cuotaCollection[0].valorImpuesto) * (this.modelContrato.plazoMesSeleccionado - Number(this.ultimoHistoricoContrato.totalCuotasCobradas) + 1);
        this.formLiquidacion.get('tasaAdministrativaALiquidar')?.setValue(this.modelLiquidacion.tasaAdministrativaALiquidar);
      }

    }


  }

  validarBotonCrear() {
    return !this.formLiquidacion.valid;
  }

  armarObjetoCobroACrear() {
    const cobro: CobroInterface = {
      "idContrato": this.contrato.id,
      "pagos": this.pagos,
      "valorACobrar": this.totalCobroIngresado,
      detalleCobros: this.detalleCobros
    }
    return cobro;
  }

  async liquidarContrato() {
    const objetoLiquidacion = await this.armarObjetoEnvio();
    console.log(objetoLiquidacion);
  }

  enviarDatos(objetoLiquidacion: LiquidarContratoInterface) {
    // todo add servicio para liquidar contrato

  }

  async armarObjetoEnvio() {
    let estadoContratoEnviar: EstadoContratoEnum;
    if (this.modelContrato.estado === EstadoContratoEnum.PreadjudicadoBuscando ||
      this.modelContrato.estado === EstadoContratoEnum.PreadjudicadoComprado ||
      this.modelContrato.estado === EstadoContratoEnum.Preadjudicado) {
      estadoContratoEnviar = EstadoContratoEnum.Liquidado;
    }
    const cobro = this.armarObjetoCobroACrear();
    const objetoLiquidacion: LiquidarContratoInterface = {
      cobro,
      tasaAdministrativa: this.modelLiquidacion.tasaAdministrativaALiquidar,
      capitalLiquidar: this.modelLiquidacion.capitalALiquidar,
    }
    console.log(objetoLiquidacion);
    if (this.modelContrato.estado === EstadoContratoEnum.Ofertado || this.modelContrato.estado === EstadoContratoEnum.EnProceso) {
      objetoLiquidacion.cargosAdjudicacion = this.modelLiquidacion.cargosAdjudicacion;
    }
    return objetoLiquidacion;
  }

  setearDatosCuotas(contrato: ContratoResponseDto) {
    // @ts-ignore
    this.cuotas = contrato.historicoPlanContratoCollection.at(-1).cuotaCollection;
  }

  aplicarValorACobrar() {
    this.reestablecerDetalle();
    this.asignarValorACobrarADetallesCobro();

  }

  async reestablecerDetalle() {
    this.detalleCobros = [];
    await this.armarDetallesCobro(this.contrato);

  }

  asignarValorACobrarADetallesCobro() {
    // this.puedenSerMasCuotasAdded = true;
    this.totalMostrar = 0;
    let auxTotalACobra = this.totalCobroIngresado;
    let valoresACobra = 0;
    this.pagos = [];
    this.pagosAcumulados = 0;
    console.log(this.totalCobroIngresado, this.totalACobrar)
    if (this.totalCobroIngresado === this.totalACobrar) {
      this.logsService.toaster(
        {
          titulo: 'Aviso',
          mensaje: 'Ya puede ingresar los cobros',
          tipo: ToasterTipo.info
        }
      )
    }
    this.detalleCobros.forEach(cobro => {
        // @ts-ignore
        valoresACobra += cobro.valor;
      }
    );
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
        if (this.excedente > 0) {
          this.logsService.toaster(
            {
              titulo: 'Error',
              mensaje: 'Ingrese un valor que no supere el total.',
              tipo: ToasterTipo.warning,
            }
          )
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

  }

  armarDetallesCobro(contrato: ContratoResponseDto) {
    return new Promise((resolve, reject) => {
      if (contrato.cuotaACobrar) {
        const indiceCuotaACobrar = contrato.cuotaACobrar - 1;
        if (this.contrato.plazoMesSeleccionado) {
          const ultimaCuota = this.contrato.plazoMesSeleccionado;
          for (let i = indiceCuotaACobrar; i < ultimaCuota; i++) {

            // setear el valor de la cuenta administrativa de la primera cuota

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
                    valorCuentaAdministrativa -= this.cuotas[i].valorPagadoCuota;
                    cuentaAdministrativa.valor = valorCuentaAdministrativa;
                    this.detalleCobros.push(cuentaAdministrativa);
                  }
                } else {
                  this.detalleCobros.push(cuentaAdministrativa);
                  capitalSubscriptor.valor = valorCapitalSubscriptor;
                }
                if (contrato.estado === EstadoContratoEnum.Adjudicado) {
                  this.addCobroDispositivo(i);
                }
                // @ts-ignore
                if (capitalSubscriptor.valor > 0) {
                  this.detalleCobros.push(capitalSubscriptor);
                }
              }
            } else {
              if (contrato.estado === EstadoContratoEnum.Adjudicado) {
                this.addCobroDispositivo(i);
              }
            }

          }
        }
        this.calcularTotalACobrar(this.detalleCobros);
        resolve(true);
      } else {
        reject(false);
        this.logsService.toaster(
          {
            titulo: 'Error',
            mensaje: `No se pudo generar los valores a cobrar. Contrato con estado ${this.contrato.estado} y cuota a cobrar ${this.contrato.cuotaACobrar}`,
            tipo: ToasterTipo.error
          }
        )
      }
    })

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


  calcularTotalACobrar(cobros: DetalleCobroCuotaInterface[]) {
    let totalACobrar = 0;
    cobros.forEach(cobro => {
        // @ts-ignore
        totalACobrar += cobro.valor;
      }
    );
    this.totalACobrar = totalACobrar;
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

  resetearFormCobro() {
    this.formCobro.get('tipoDocumento')?.reset();
    this.formCobro.get('numeroDocumento')?.reset();
    this.formCobro.get('fechaDeposito')?.reset();
    this.formCobro.get('observaciones')?.reset();
    this.formCobro.get('cuentaBancaria')?.reset();
    this.formCobro.get('valor')?.reset();
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

    if (detalle.descripcion?.includes('Inscripción')) {
      objetoReturn.tipo = TipoDetallePagoEnum.inscripcion;
      objetoReturn.idItemCobroPago = this.itemCobroPagoInscripcion.id;
    }
    objetoReturn.numeroCuota = detalle.noCuota;
    return objetoReturn;
  }

  navegarAContratos() {
    this.router.navigate(['contratos', 'contrato-modulo'])
  }
}

export interface LiquidarContratoInterface {
  cobro: CobroInterface;
  tasaAdministrativa: number;
  capitalLiquidar: number;
  cargosAdjudicacion?: number;
}
