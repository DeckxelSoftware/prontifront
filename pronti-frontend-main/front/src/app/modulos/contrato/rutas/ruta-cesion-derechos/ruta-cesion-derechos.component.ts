import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import * as dayjs from 'dayjs';
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {HttpVendedorService} from '../../../vendedor/servicios/http-vendedor-service';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ContratoStorageService} from '../../../../servicios/estado-contrato/contrato-storage.service';
import {MatDialog} from '@angular/material/dialog';
import {VendedorResponseDto} from '../../../vendedor/servicios/dto/vendedor.response-dto';
import {StorageCesionDerechosService} from "../../servicios/storage-cesion-derechos.service";
import {FORMLY_CONTRATO_READONLY} from "../../funciones/contrato-cesion-derecho-readonly";
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {ContratoCesionDerechoStorageInterface} from '../../interfaces/contrato-cesion-derecho-storage.interface';
import {
  cuotaTablePrimeColumn,
  CuotaViewTablaEmitsService
} from '../../../../shared/cuotas-view-table/cuota-view-tabla-emits.service';
import {CuotaResponseDto} from '../../../cuota/servicios/dto/cuota.response-dto';
import {
  ConfiguracionGeneralResponseDto
} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";

@Component({
  selector: 'app-ruta-cesion-derechos',
  templateUrl: './ruta-cesion-derechos.component.html',
  styleUrls: ['./ruta-cesion-derechos.component.scss']
})

export class RutaCesionDerechosComponent implements OnInit {

  items: MenuItem[] = [];

  cuotas: CuotaResponseDto[] = [];

  respuestaConfirmacion = false;
  vieneAConfirmar = false;

  configuracionGeneral: ConfiguracionGeneralResponseDto = {};

  mostrarTablaCliente = false;
  mostrarTablaVendedor = false;

  medioCaptacionSeleccionado = '';
  mediosDeCaptacion: ListaValoresDetalleResponseDto[] = [];

  tasaDeCambioContrato = 0;


  // valores que pueden mostrase
  nuevaInscripcion = 0;
  limiteValorApagar = 0;
  informacionContratoAConfirmar: ContratoCesionDerechoStorageInterface = {};


  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formContraDentroCliente = new FormGroup({});


  clienteSeleccionado: ClienteResponseDto = {};


  modelCliente: any = {
    id: 0,
    tipoCliente: '',
    apellidos: '',
    nombres: '',
    ciudad: '',
    correo: '',
    documentoIdentidad: '',
    fechaNacimiento: '',
    medioContacto1: '',
    pais: '',
    provincia: '',
    tipoDocumentoIdentidad: '',
    tipoMedioContacto1: '',
    username: '',
  };

  modelContratoActual: any = {
    id: 0,
    numeroDeContrato: '',
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    dsctoInscripcion: 0,
    dsctoPrimeraCuota: 0,
    observacion: '',
    version: 0,
    estado: '',
    cliente: '',
    grupo: '',
    tasaAdministrativa: '',
    inscripcion: 0,
    observacionCesion: '',
    plazoMesSeleccionado: '',
    planSeleccionado: '',
    precioPlanSeleccionado: 0,
    totalMontoCobrado: 0,
    totalCobroPrimeraCuota: 0,
    idHistoricoPlanContrato: 0,
  }

  modelContratoDentroCliente = {
    numeroDeContrato: '',
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    fechaIniciaCobro: dayjs().format('YYYY-MM-DD'),
    observacion: '',
    valorAPagar: 0,
    medioCaptacion: ''
  }

  modelVendedor: any = {
    id: 0,
    nombres: '',
    apellidos: '',
    agencia: '',
    supervisor: '',
  }


  fieldsContrato: FormlyFieldConfig[] = FORMLY_CONTRATO_READONLY();

  fieldsContratoDentroCliente: FormlyFieldConfig[] = [
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
            required: true,
            label: 'Número de contrato',
          }
        },
        {
          className: 'col-4',
          key: 'fechaInicio',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'date',
            label: 'fechaInicio',

          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'fechaIniciaCobro',
          type: 'input',
          templateOptions: {
            type: 'date',
            required: true,
            label: 'Fecha Inicio Cobro',

            change: (field, event) => {
              if (this.modelContratoActual.fechaIniciaCobro) {
                // this.estadoContratoService.fechaCobro.next(new Date(this.modelContratoActual.fechaIniciaCobro + ' 23:00:00'));
                this.armarCuotasPlan();
              }
            },
          },

        },
        {
          className: 'col-4',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'text',
            label: 'Observación',

          }
        },
        {
          className: 'col-4',
          key: 'valorAPagar',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'number',
            label: 'Valor a pagar',
            change: (field: FormlyFieldConfig) => {
              console.log(field);
              console.log(this.modelContratoDentroCliente.valorAPagar);
              if (this.modelContratoDentroCliente.valorAPagar > this.limiteValorApagar) {
                this.modelContratoDentroCliente.valorAPagar = this.limiteValorApagar;
                this.formContraDentroCliente.get('valorAPagar')?.setValue(this.limiteValorApagar);
              }
            }
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
  ];

  fieldsCliente: FormlyFieldConfig[] = [
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
          key: 'documentoIdentidad',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Documento identidad',
          }
        },

        {
          className: 'col-6',
          key: 'correo',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Correo',
          }
        },


        {
          className: 'col-6',
          key: 'pais',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'País',
          }
        },

        {
          className: 'col-6',
          key: 'provincia',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Provincia',
          }
        },

        {
          className: 'col-6',
          key: 'ciudad',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Ciudad',
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

      ]
    }
  ];


  planSeleccionado!: PlanResponseDto;

  constructor(private _httpClienteService: HttpClienteService,
              private _httpVendedorService: HttpVendedorService,
              private _httpConfiguracionService: HttpConfiguracionGeneralService,
              public estadoContratoService: EstadoContratoService,
              public blockuiService: BlockuiService,
              private _activatedRouter: ActivatedRoute,
              public contratoStorageService: ContratoStorageService,
              private _dialog: MatDialog,
              private _router: Router,
              private _storageCesionDerechosService: StorageCesionDerechosService,
              private _httpContratoService: HttpContratoService,
              public logsMlabsService: LogsMlabsService,
              private dataViewCuotasEmittersService: CuotaViewTablaEmitsService,
              public _httpListavaloresDetalle: HttpListaValoresDetalleService
  ) {
  }


  ngOnInit(): void {
    this.obtenerParametrosConfiguracion();
    this.estadoContratoService.cambioDePlan.next(false);

    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Cesión de derechos'},
    ];

    // subscriber para cuando de click en crear
    this._storageCesionDerechosService.vaConfirmar.subscribe(
      {
        next: vieneAConfirmar => {
          if (vieneAConfirmar) {
            this.vieneAConfirmar = true;
            this.informacionContratoAConfirmar = this._storageCesionDerechosService.contratoCesionDerechosAConfirmar;
            console.log('mire', this.informacionContratoAConfirmar);
            this.setearPlanConfirmar(this.informacionContratoAConfirmar.planSelecionado);
            this.modelContratoDentroCliente = this.informacionContratoAConfirmar.modelContratoDentroCliente;
            this.modelContratoActual = this.informacionContratoAConfirmar.modelContratoActual;
            this.modelCliente = this.informacionContratoAConfirmar.modelCliente;
            this.modelVendedor = this.informacionContratoAConfirmar.modelVendedor;
          } else {
            this.setearPlanContratoInicial();
          }
        }
      }
    );

    const columnas: cuotaTablePrimeColumn[] = [
      {nombre: 'Nro Cuota', field: 'numeroCuota'},
      {nombre: 'Fecha cobro', field: 'fechaCobro'},
      {nombre: 'Cuota', field: 'valorCuota'},
      {nombre: 'Abono capital', field: 'abonoCapital'},
      {nombre: 'Tasa adm.', field: 'valorTasaAdministrativa'},
      {nombre: 'Impuesto', field: 'valorImpuesto'},
      {nombre: 'Cobrado', field: 'valorPagadoCuota'},
      {nombre: 'Por Cobrar', field: 'valorPorCobrar'},
      {nombre: 'Estado', field: 'pasaANuevoPlan'},
    ];
    this.dataViewCuotasEmittersService.columnas.next(columnas);
    this.armarCuotasPlan();

  }


  armarCuotasPlan() {


    console.log('contratico', this._storageCesionDerechosService.contratoCesionDerechos);
    const contrato = this._storageCesionDerechosService.contratoCesionDerechos as ContratoResponseDto;
    let cuotasCalculos: CuotaResponseDto[] = [];


    const ultimoHistorial = this.obtenerUltimoHistorial(contrato);
    const cuota = ultimoHistorial.cuotaCollection[0].valorCuota;

    if (ultimoHistorial) {
      this.cuotas = [...ultimoHistorial.cuotaCollection];
      cuotasCalculos = [...ultimoHistorial.cuotaCollection];
    }


    const cuotasAPasar = ultimoHistorial.totalCuotasCobradas - 1;

    const totalMontoCobrado = ultimoHistorial.totalMontoCobrado;

    if (cuotasAPasar > 0) {
      for (let i = 0; i <= cuotasCalculos.length - 1; i++) {
        cuotasCalculos[i].valorPorCobrar = ultimoHistorial.cuotaCollection[0].valorCuota;
        cuotasCalculos[i].valorPagadoCuota = 0;
        cuotasCalculos[i].pasaANuevoPlan = 'PENDIENTE';
        cuotasCalculos[i].fechaCobro = dayjs(this.modelContratoDentroCliente.fechaIniciaCobro).add(i, 'month').format('DD/MM/YYYY');
      }
      for (let j = 1; j <= cuotasAPasar; j++) {
        cuotasCalculos[cuotasCalculos.length - j].pasaANuevoPlan = 'PAGADO';
        cuotasCalculos[cuotasCalculos.length - j].valorPagadoCuota = ultimoHistorial.cuotaCollection[0].valorCuota;
        cuotasCalculos[cuotasCalculos.length - j].valorPorCobrar = 0;
      }
    }


    if (totalMontoCobrado > (ultimoHistorial.totalCuotasCobradas * cuota)) {
      // abonoCuota = totalMontoCobrado - (ultimoHistorial.totalCuotasCobradas * cuota);
      const indiceCuotaAbono = this.cuotas.findIndex((cuotaLista: any) => {
        return (cuotaLista.valorPagadoCuota > 0 && cuotaLista.valorPagadoCuota < cuota);
      });

      if (indiceCuotaAbono >= 0) {
        const valorPagado = this.cuotas[indiceCuotaAbono].valorPagadoCuota;
        if (valorPagado) {
          cuotasCalculos[indiceCuotaAbono].valorPagadoCuota = valorPagado;
          cuotasCalculos[indiceCuotaAbono].valorPorCobrar = cuota - valorPagado;
        }
      }
    }


    this
      .dataViewCuotasEmittersService
      .cuotas
      .next(cuotasCalculos
      );
    console
      .log('cuoticas', this.cuotas);

  }


  obtenerParametrosConfiguracion() {
    this._httpConfiguracionService.find().subscribe({
      next: (valor) => {
        // console.log('el valor', valor);
        this.configuracionGeneral = valor[0][0];
        if (valor[0][0].tasaCambioContrato) {
          this.tasaDeCambioContrato = valor[0][0].tasaCambioContrato;
        }
      },
      error: err => console.error('No se pudo traer la informacion de configuracion', err)
    })
  }

  onSubmit(model: any) {
    console.log(model);
  }


  obtenerUltimoHistorial(contrato: any): any {
    const historicosContrato = contrato.historicoPlanContratoCollection || [];
    return historicosContrato[historicosContrato?.length - 1] || {};
  }

  setearPlanConfirmar(plan: PlanResponseDto
  ) {
    this.planSeleccionado = plan;
    console.log('plan', this.planSeleccionado);
  }

  setearPlanContratoInicial() {
    const historicosContrato = this._storageCesionDerechosService
      .contratoCesionDerechos
      .historicoPlanContratoCollection || [];
    const infoCliente = this._storageCesionDerechosService
      .contratoCesionDerechos
      .idClienteEnGrupo.idCliente.idUsuario;

    const ultimoHistorico = historicosContrato[historicosContrato.length - 1];

    this.planSeleccionado = ultimoHistorico.idPlan || {};

    const contratoCesionDerechos = {...this._storageCesionDerechosService.contratoCesionDerechos};
    console.log('xsxs', contratoCesionDerechos);

    const objetoContratoActual = {
      id: contratoCesionDerechos.id,
      numeroDeContrato: contratoCesionDerechos.numeroDeContrato,
      fechaInicio: contratoCesionDerechos.fechaInicio,
      fechaIniciaCobro: contratoCesionDerechos.fechaIniciaCobro,
      dsctoInscripcion: contratoCesionDerechos.dsctoInscripcion,
      dsctoPrimeraCuota: contratoCesionDerechos.dsctoPrimeraCuota,
      observacion: contratoCesionDerechos.observacion,
      version: contratoCesionDerechos.version,
      estado: contratoCesionDerechos.estado,
      grupo: '',
      tasaAdministrativa: '',
      plazoMesSeleccionado: contratoCesionDerechos.plazoMesSeleccionado,
      planSeleccionado: contratoCesionDerechos.planSeleccionado,
      precioPlanSeleccionado: contratoCesionDerechos.precioPlanSeleccionado,
      idHistoricoPlanContrato: Number(ultimoHistorico.id),
    }


    const objetoInfoExtraContrato = {
      inscripcion: ultimoHistorico.totalCobroInscripcion || 0,
      cliente: `${infoCliente.nombres}  ${infoCliente.apellidos}`,
      totalMontoCobrado: ultimoHistorico.totalMontoCobrado,
      totalCobroPrimeraCuota: ultimoHistorico.totalCobroPrimeraCuota
    };

    this.modelContratoActual = {...objetoContratoActual, ...objetoInfoExtraContrato};

    if (this.planSeleccionado.precio) {
      this.nuevaInscripcion = this.planSeleccionado.precio * this.tasaDeCambioContrato / 100;
    }
    if (ultimoHistorico.totalCobroInscripcion) {
      this.modelContratoDentroCliente.valorAPagar = this.modelContratoActual.totalMontoCobrado - this.modelContratoActual.totalCobroPrimeraCuota + ultimoHistorico.totalCobroInscripcion;
      this.limiteValorApagar = this.modelContratoDentroCliente.valorAPagar;
    }
  }


  mostrarVendedorSeleccionado(evento
                                :
                                VendedorResponseDto
  ) {
    this.mostrarTablaVendedor = false;
    if (evento.id) {
      const objetoVendedor = {
        id: evento.id,
        nombres: evento?.idTrabajador?.idUsuario?.nombres,
        apellidos: evento?.idTrabajador?.idUsuario?.apellidos,
        agencia: evento?.idAgencia?.nombre,
        supervisor: evento?.idTrabajador?.idSupervisor,
      }
      this.modelVendedor = {...objetoVendedor};
      console.log('model vendedore', this.modelVendedor);
    }
  }


  cancelarCrearContrato() {
    this.respuestaConfirmacion = false;
    this._router.navigate(['contratos', 'contrato-modulo']);
  }

  enviarCesionDerechos() {
    const objetoCesionDerechos = {
      fechaInicio: this.modelContratoDentroCliente.fechaInicio,
      fechaInicioCobro: this.modelContratoDentroCliente.fechaIniciaCobro,
      idCliente: this.modelCliente.id,
      idContrato: this.modelContratoActual.id,
      idHistoricoPlanContrato: this.modelContratoActual.idHistoricoPlanContrato,
      idPlan: this.planSeleccionado.id,
      numeroContrato: this.modelContratoDentroCliente.numeroDeContrato,
      observacion: this.modelContratoDentroCliente.observacion,
      plazoMesSeleccionado: this.modelContratoActual.plazoMesSeleccionado,
      valorADevolver: this.modelContratoDentroCliente.valorAPagar,
      idVendedor: this.modelVendedor.id,
      medioCaptacion: this.modelContratoDentroCliente.medioCaptacion ? this.modelContratoDentroCliente.medioCaptacion : '',
      cuota: this.cuotas[0].valorCuota
    };


    console.log('voy a enviar', objetoCesionDerechos);
    this._httpContratoService.darCesionDerechos(objetoCesionDerechos)
      .subscribe(
        {
          next: (resp) => {
            console.log('resp', resp);
            this._storageCesionDerechosService.deleteContratoCesionDerecho(objetoCesionDerechos.idContrato)

            if (resp) {
              this.logsMlabsService.toaster({
                titulo: 'ÉXITO',
                mensaje: 'Contrato creado',
                tipo: ToasterTipo.success
              })
              this._router.navigate(['contratos', 'contrato-modulo']);
            }
          },
          error: (err) => {
            // console.log('resp erro', err);

            let avisoError = '';
            if (err.error.mensaje) {
              avisoError = 'Error en la comprobación de datos. ';
            }

            this.logsMlabsService.toaster(
              MENSAGE_TOAST.error('Error en crear contrato.' + avisoError))
            console.error('No se pudo dar cesion de derechos', err);
          }
        }
      );
  }

  confirmar() {
    this.respuestaConfirmacion = true;
  }

  llenarDatosCliente(clienteEvento
                       :
                       ClienteResponseDto
  ) {

    const objetoCliente = {
      id: clienteEvento.id,
      tipoCliente: clienteEvento,
      apellidos: clienteEvento.idUsuario.apellidos,
      nombres: clienteEvento.idUsuario.nombres,
      ciudad: clienteEvento.idUsuario.ciudad,
      correo: clienteEvento.idUsuario.correo,
      documentoIdentidad: clienteEvento.idUsuario.documentoIdentidad,
      fechaNacimiento: clienteEvento.idUsuario.fechaNacimiento,
      medioContacto1: clienteEvento.idUsuario.medioContacto1,
      pais: clienteEvento.idUsuario.pais,
      provincia: clienteEvento.idUsuario.provincia,
      tipoDocumentoIdentidad: clienteEvento.idUsuario.tipoDocumentoIdentidad,
      tipoMedioContacto1: clienteEvento.idUsuario.tipoMedioContacto1,
      username: clienteEvento.idUsuario.username,
    }
    this.modelCliente = {...objetoCliente};
    this.mostrarTablaCliente = false;
  }

  validarBotonCrear() {
    return this.formContraDentroCliente.valid && this.modelCliente.id && this.modelVendedor.id
  }

  guardarLocalStorage() {
    this.modelContratoDentroCliente.medioCaptacion = this.medioCaptacionSeleccionado ? this.medioCaptacionSeleccionado : '';
    const contrato: ContratoCesionDerechoStorageInterface = {
      modelContratoActual: this.modelContratoActual,
      modelContratoDentroCliente: this.modelContratoDentroCliente,
      modelCliente: this.modelCliente,
      modelVendedor: this.modelVendedor,
      planSelecionado: this.planSeleccionado
    }
    console.log('esto voy a tener', contrato);
    this._storageCesionDerechosService.addContratoCesionDerecho(contrato);
    this._router.navigate(['contratos', 'contrato-modulo']);
  }

  buscarAutocompleteListaValorDetalle(evento: any) {
    console.log('evento:', evento);

    const busqueda: ListaValoresDetalleFindDto = {
      idListaValoresTipoCodigoPrimario: ListaValoresEnum.medioDeCaptacion,
      busqueda: evento.query,
    };
    this._httpListavaloresDetalle
      .find(busqueda)
      .toPromise()
      .then(res => res as [ListaValoresDetalleResponseDto[], number])
      .then(data => {
          this.mediosDeCaptacion = data[0];
        }
      );
  }
}


