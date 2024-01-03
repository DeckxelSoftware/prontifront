import {Component, OnInit} from '@angular/core';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {FormGroup} from '@angular/forms';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import * as dayjs from 'dayjs';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {MenuItem} from 'primeng/api';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {FORM_ITEM_ACCORDION_CONTRATO} from '../../form/form-item-accordion-contrato';
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {HttpVendedorService} from '../../../vendedor/servicios/http-vendedor-service';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {MatDialog} from '@angular/material/dialog';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {
  ModalSeleccionarCuotasComponent
} from '../../../../shared/modal-seleccionar-cuotas/modal-seleccionar-cuotas.component';
import {VendedorResponseDto} from '../../../vendedor/servicios/dto/vendedor.response-dto';
import {PrecioSeleccionadoInterface} from '../../interfaces/precio-seleccionado.interface';
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {SupervisorResponseDto} from '../../../supervisor/servicios/dto/supervisor.response-dto';
import {CuotaResponseDto} from "../../../cuota/servicios/dto/cuota.response-dto";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {
  HistoricoPlanContratoResponseDto
} from "../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {
  cuotaTablePrimeColumn,
  CuotaViewTablaEmitsService
} from "../../../../shared/cuotas-view-table/cuota-view-tabla-emits.service";

export enum tipoCambioContrato {
  plazo = 'plazo',
  plan = 'plan',
  monto = 'monto',
  reactivacion = 'reactivacion'
}

@Component({
  selector: 'app-ruta-editar-contrato',
  templateUrl: './ruta-editar-contrato.component.html',
  styleUrls: ['./ruta-editar-contrato.component.scss']
})


export class RutaEditarContratoComponent implements OnInit {
  parametrosCalculoCuotas: { historicoPlan?: HistoricoPlanContratoResponseDto, fechaCobro?: string, plazo?: number, cuota?: number, precio?: number } = {};
  labelSuperiorCompCuotas = '';
  valorSuperiorCompCuotas = 0;
  enumTipoCambioContrato = tipoCambioContrato;
  tipoDeCambioContrato = '';
  contrato: ContratoResponseDto = {};
  idContrato!: number;
  esRutaEditarContrato = false;
  esCambioDePlan = false;
  esCambioDePlazo = false;
  esCambioDeMonto = false;
  mostrarTablaCambioPlan = false;
  mostrarTablaVendedor = false;
  precioSeleccionado: PrecioSeleccionadoInterface = {};
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  cuotas: CuotaResponseDto[] = []

  columnasTablaCuotas: cuotaTablePrimeColumn[] = [
    {field: 'numeroCuota', nombre: 'No. cuota'},
    {field: 'fechaCobro', nombre: 'Fecha'},
    {field: 'valorCuota', nombre: 'Cuota total'},
    {field: 'abonoCapital', nombre: 'Abono capital'},
    {field: 'valorTasaAdministrativa', nombre: 'Tasa adm.'},
    {field: 'valorImpuesto', nombre: 'Impuestos'},
    {field: 'valorPagadoCuota', nombre: 'Cobrado'},
    {field: 'valorPorCobrar', nombre: 'Por cobrar'},
    {field: 'pasaANuevoPlan', nombre: 'Cuota pasa a nuevo plan'},
  ]
  /*
  *  <th>No Cuota</th>
          <th>Fecha</th>
          <th>Cuota total</th>
          <th>Abono Capital</th>
          <th>Tasa adm.</th>
          <th> Impuestos</th>
          <th *ngIf="esCambioDePlan">Cuota pasa a nuevo plan</th>*/
  tasaDeCambio = 0;
  inscripcionCambioMonto = 0;
  valorCuotaCambioMonto = 0;

  historicoContrato: HistoricoPlanContratoResponseDto = {};

  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formContratoCambioDePlazo = new FormGroup({});
  clientes: any[] = [];
  vendedores: any[] = [];

  clienteSeleccionado: ClienteResponseDto = {};
  idVendedorSeleccionado!: number;
  idClienteSeleccionado!: number;
  idPlanSeleccionado!: number;
  idPlanCambioSeleccionado!: number;

  modelCliente: any = {
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
    username: ''

  };

  modelContrato: ContratoResponseDto = {
    numeroDeContrato: '',
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    fechaIniciaCobro: dayjs().format('YYYY-MM-DD'),
    // dsctoInscripcion: 0,
    // dsctoPrimeraCuota: 0,
    observacion: '',
  }
  modelContratoCambioDePlazo: ContratoResponseDto = {
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    fechaIniciaCobro: dayjs().format('YYYY-MM-DD'),
    dsctoRecargo: 0,
    observacion: '',
  }

  modelVendedor: any = {
    nombres: '',
    apellidos: '',
    agencia: '',
    supervisor: '',
  }

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
            required: true,
            label: 'Número de contrato',
          }
        },
        {
          className: 'col-4',
          key: 'fechaInicio',
          type: 'input',
          // defaultValue: dayjs().format('YYYY-DD-MM'),
          // defaultValue: '2022/05/05',
          // defaultValue: new Date().toISOString(),
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
            required: false,
            label: 'Fecha Inicio Cobro',
            change: (field, event) => {
              if (this.modelContrato.fechaIniciaCobro) {
                // this.estadoContratoService.fechaCobro.next(new Date(this.modelContrato.fechaIniciaCobro + ' 23:00:00'));
                this.parametrosCalculoCuotas.fechaCobro = this.modelContratoCambioDePlazo.fechaIniciaCobro;
                this.verificarSiPuedeGenerarCuotas();
              }
            },

          },

        },
        {
          className: 'col-4',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            // required: true,
            type: 'text',
            label: 'Observación',
          }
        },
      ]
    }
  ]
  fieldsContratoCambioDePlazo: FormlyFieldConfig[] = [
    {
      className: 'col-4',
      key: 'fechaInicio',
      type: 'input',
      templateOptions: {
        required: true,
        type: 'date',
        label: 'Fecha Inicio',
      },
      expressionProperties: {}
    },
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'fechaIniciaCobro',
          type: 'input',
          templateOptions: {
            type: 'date',
            required: true,
            label: 'Fecha Inicio Cobro',
            change: (field, event) => {
              if (this.modelContratoCambioDePlazo.fechaIniciaCobro) {
                // this.estadoContratoService.fechaCobro.next(new Date(this.modelContratoCambioDePlazo.fechaIniciaCobro + ' 23:00:00'));
                this.parametrosCalculoCuotas.fechaCobro = this.modelContratoCambioDePlazo.fechaIniciaCobro;
                this.verificarSiPuedeGenerarCuotas();
              }
            },

          },

        },
        {
          className: 'col-4',
          key: 'dsctoRecargo',
          type: 'input',
          templateOptions: {
            type: 'number',
            min: 0,
            max: 100,
            label: 'Descuento recargo',
            change: (field) => {
              this.valorSuperiorCompCuotas = this.calcularValoresCambioDePlazo()
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas.toFixed(2));
            }
          },


        },


        {
          className: 'col-4',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            required: false,
            type: 'text',
            label: 'Observación',
          }
        },
      ]
    }
  ]
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

    /* {
       key: 'cliente',
       type: 'autocomplete',
       templateOptions: {
         label: 'Cliente',
         placeholder: 'Seleccione un cliente exitente',
         required: true,
         onComplete: (templeteOption: any, evento: any) => {
           templeteOption.results = this.buscarCliente(evento.query)
           console.log('templete', templeteOption);
           console.log('evento', evento.query);
         }
       }
     }*/
  ];


  items: MenuItem[] = [];
  home!: MenuItem;
  planContrato!: PlanResponseDto;
  cambioPlanSeleccionado!: PlanResponseDto;
  formularioContrato = FORM_ITEM_ACCORDION_CONTRATO();

  constructor(private _httpClienteService: HttpClienteService,
              private _httpVendedorService: HttpVendedorService,
              public estadoContratoService: EstadoContratoService,
              public blockuiService: BlockuiService,
              public route: ActivatedRoute,
              public router: Router,
              public _httpContratoService: HttpContratoService,
              public matDialog: MatDialog,
              private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
              public logsMlabsService: LogsMlabsService,
              public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
              public cuotasTableService: CuotaViewTablaEmitsService,
  ) {

  }

  onSubmit(model: any) {
    console.log(model);
  }

  async ngOnInit() {
    this.cuotasTableService.columnas.next(this.columnasTablaCuotas);
    await this.obtenerDatosConfiguracionGeneral();
    const {idContrato} = this.route.snapshot.params;
    this.idContrato = idContrato;
    if (this.idContrato) {
      try {
        const resultadoBusqueda = await this.obtenerDatosContrato();
        if (resultadoBusqueda) {

          // this.estadoContratoService.cambioDePlan.next(true);
          // @ts-ignore
          // this.contrato.historicoPlanContratoCollection.at(-1).totalCuotasCobradas = 2;
          // @ts-ignore
          // this.estadoContratoService.historicoPlanContrato.next(this.contrato.historicoPlanContratoCollection.at(-1));
          // @ts-ignore
          this.historicoContrato = this.contrato.historicoPlanContratoCollection.at(-1);

          this.esRutaEditarContrato = true;
          this.setearValoresEnFormularios();
          this.verificarSiPuedeGenerarCuotas();

        }

      } catch (e) {
        console.error('Error obteniendo contrato', e);
      }

    } else {
      this.estadoContratoService.cambioDePlan.next(false);
    }
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Editar Contrato'},


    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.obtenerTasaAdministrativa();

  }

  searchFieldChanged(event: FormField) {
    console.info({event});

  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.info({event});
    switch (event.field.formControlName) {
      case 'autocomplete':
      // this.buscarSucursal(event);
    }
  }

  obtenerTasaAdministrativa() {
    this._httpConfiguracionGeneralService.find({id: 1}).subscribe({
      next: (configuracion) => {

        if (configuracion[0][0].tasaCambioContrato) {
          this.tasaDeCambio = configuracion[0][0].tasaCambioContrato;
        }

        console.log('esta es la tasa', this.tasaDeCambio)
      },
      error: err => {
        console.error('No se pudo obtener la configuracion general', err);
      }
    })
  }

  abrirModalSeleccionarPlan(plan: PlanResponseDto) {
    this.cambioPlanSeleccionado = plan;
    this.mostrarTablaCambioPlan = false;
    if (plan.id) {
      this.idPlanCambioSeleccionado = plan.id;
      this.estadoContratoService.plan.next(plan);
    }
    const dialogRef$ = this.matDialog.open(ModalSeleccionarCuotasComponent, {
        data: {
          plan: this.cambioPlanSeleccionado
        }
      }
    )
    dialogRef$.afterClosed().subscribe(
      {
        next: res => {
          console.log('res', res);
          if (res) {
            this.precioSeleccionado = res;
            //this.estadoContratoService.plazo.next(res.plazoSeleccionado);
            this.parametrosCalculoCuotas.plazo = res.plazoSeleccionado;
            this.parametrosCalculoCuotas.cuota = res.cuotaSeleccionada;
            this.parametrosCalculoCuotas.precio = res.precioSeleccionado;
            this.verificarSiPuedeGenerarCuotas();
            if (this.esCambioDeMonto) {
              this.valorCuotaCambioMonto = res.cuotaSeleccionada;
              this.calcularInscripcionCambioMonto();
              // this.estadoContratoService.plan.next({...plan, inscripcion: this.inscripcionCambioMonto});
              this.valorSuperiorCompCuotas = this.calcularValoresCambioDeMonto();
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
            } else if (this.esCambioDePlan) {
              this.valorSuperiorCompCuotas = this.calcularValoresCambioDePlan();
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
            } else if (this.esCambioDePlazo) {
              this.valorSuperiorCompCuotas = this.calcularValoresCambioDePlazo();
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
            }
          }

        },
        error: err => {
        }
      }
    )

  }


  mostrarVendedorSeleccionado(evento: VendedorResponseDto) {
    this.mostrarTablaVendedor = false;
    if (evento.id) {

      this.idVendedorSeleccionado = evento.id;
      const objetoAgenciaSupervisor = {
        agencia: evento?.idAgencia?.nombre,
        supervisor: evento?.idTrabajador?.idSupervisor
      }
      this.modelVendedor = {...evento, ...evento?.idTrabajador?.idUsuario, ...objetoAgenciaSupervisor};
    }
  }

  /*  obtenerDataFormularioContrato(): any {
      return this.formularioContrato.reduce((acc: any, valor: FormField) => {
        acc[valor.formControlName] = valor.actualValue
        return acc;
      }, {});
    }*/


  cancelarCrearContrato() {
    this.idVendedorSeleccionado = 0;
    this.idClienteSeleccionado = 0;
    this.idPlanSeleccionado = 0;
  }


  deshabilitarSubmit() {
    if (this.esCambioDePlazo) {
      return !(this.formContratoCambioDePlazo.valid && Object.keys(this.precioSeleccionado).length > 0)
    } else {
      return !(this.formContrato.valid && Object.keys(this.precioSeleccionado).length > 0 /*&& this.idVendedorSeleccionado*/)
    }

  }

  submitForm() {
    const objetoActualizar = this.armarJsonParaEnvío();
    this.enviarDatos(objetoActualizar);
  }

  enviarDatos(objetoActualizar: any) {
    if (this.esCambioDePlazo) {
      this._httpContratoService.cambiarPlazoContrato(objetoActualizar)
        .subscribe(
          {
            next: res => {
              if (res) {
                console.log(res);
                this.logsMlabsService.toaster({
                  titulo: 'ÉXITO',
                  mensaje: 'Contrato actualizado',
                  tipo: ToasterTipo.success
                });
                this.router.navigate(['contratos', 'contrato-modulo'])
              }
            },
            error: err => {
              this.logsMlabsService.toaster(MENSAGE_TOAST.error('Error cambiando de plazo.'));
              console.error('Error cambiando plazo', err);
            }
          }
        )
    }
    if (this.esCambioDePlan) {
      this._httpContratoService.cambiarPlanContrato(objetoActualizar)
        .subscribe(
          {
            next: (res) => {
              this.logsMlabsService.toaster({
                titulo: 'ÉXITO',
                mensaje: 'Contrato actualizado',
                tipo: ToasterTipo.success
              })
              this.router.navigate(['contratos', 'contrato-modulo'])
            },
            error: err => {
              this.logsMlabsService.toaster(MENSAGE_TOAST.error('Error cambiando de plan.'));
              console.error('Error cambiando plan', err);
            }
          }
        )
    }
    if (this.esCambioDeMonto) {
      this._httpContratoService.cambiarMontoContrato(objetoActualizar)
        .subscribe(
          {
            next: res => {
              console.log(res);
              this.logsMlabsService.toaster({
                titulo: 'ÉXITO',
                mensaje: 'Contrato actualizado',
                tipo: ToasterTipo.success
              })
              this.router.navigate(['contratos', 'contrato-modulo'])
            },
            error: err => {
              this.logsMlabsService.toaster(MENSAGE_TOAST.error('Error en cambio de monto.'))
              console.error('Error cambiando de monto', err);
            }
          }
        )
    }

  }

  seleccionarTipoCambio(cambio: tipoCambioContrato) {
    this.resetValoresEstadoServicio();
    this.resetPlanCambioSeleccionado();
    this.resetFormContrato();
    if (cambio === tipoCambioContrato.plan) {
      // this.estadoContratoService.tipoCambio.next(tipoCambioContrato.plan);
      this.esCambioDePlan = true;
      this.esCambioDePlazo = false;
      this.esCambioDeMonto = false;
      this.tipoDeCambioContrato = 'plan';

      this.labelSuperiorCompCuotas = 'Incripción + Primera cuota + Tasa administrativa'
      this.valorSuperiorCompCuotas = this.calcularValoresCambioDePlan();

      this.cuotasTableService.labelSuperior.next(this.labelSuperiorCompCuotas);
      this.cuotasTableService.datoSuperior.next('$ ' +this.valorSuperiorCompCuotas + '');

      this.cuotasTableService.labelSuperior2.next('Cuota administrativa');
      this.cuotasTableService.datoSuperior2.next('$ ' +this.configuracionGeneral.cuotaAdministrativa + '');

    } else if (cambio === tipoCambioContrato.plazo) {
      // this.estadoContratoService.tipoCambio.next(tipoCambioContrato.plazo);
      this.esCambioDePlan = false;
      this.esCambioDePlazo = true;
      this.esCambioDeMonto = false;
      this.tipoDeCambioContrato = 'plazo';

      this.labelSuperiorCompCuotas = 'Cuota administrativa'
      this.valorSuperiorCompCuotas = this.calcularValoresCambioDePlazo();



      this.cuotasTableService.labelSuperior.next(this.labelSuperiorCompCuotas);
      this.cuotasTableService.datoSuperior.next('$ ' +this.valorSuperiorCompCuotas + '');

      // emito un string vacio para que no se muestre
      this.cuotasTableService.labelSuperior2.next('');
      this.cuotasTableService.datoSuperior2.next('$ ' +this.configuracionGeneral.cuotaAdministrativa);
      // todo emitir el label al comp cuotas
    } else if (cambio === tipoCambioContrato.monto) {
      //this.estadoContratoService.tipoCambio.next(tipoCambioContrato.monto);
      this.esCambioDePlan = false;
      this.esCambioDePlazo = false;
      this.esCambioDeMonto = true;
      this.tipoDeCambioContrato = 'monto';

      this.labelSuperiorCompCuotas = 'Inscripción + Primera cuota'
      this.valorSuperiorCompCuotas = this.calcularValoresCambioDeMonto();

      this.cuotasTableService.labelSuperior.next(this.labelSuperiorCompCuotas);
      this.cuotasTableService.datoSuperior.next('$ ' + this.valorSuperiorCompCuotas + '');
      this.cuotasTableService.labelSuperior2.next('Cuota administrativa');
      this.cuotasTableService.datoSuperior2.next('$ ' + this.configuracionGeneral.cuotaAdministrativa);
      
    }

    // this.estadoContratoService.historicoPlanContrato.next({})
  }

  calcularValoresCambioDePlan() {
    // Incripción + Primera cuota + Tasa administrativa 
    if (this.precioSeleccionado.cuotaSeleccionada &&
      this.precioSeleccionado.inscripcion &&
      this.configuracionGeneral.cuotaAdministrativa &&
      this.configuracionGeneral.tasaCambioContrato) {
      return this.precioSeleccionado.cuotaSeleccionada + this.precioSeleccionado.inscripcion + this.configuracionGeneral.tasaCambioContrato;
    } else {
      return 0;
    }

  }

  calcularValoresCambioDeMonto() {
    if (this.precioSeleccionado.cuotaSeleccionada &&
      this.precioSeleccionado.inscripcion) {
      return this.precioSeleccionado.cuotaSeleccionada + 
      this.precioSeleccionado.inscripcion + 
      (this.configuracionGeneral.cuotaAdministrativa || 0);
    } else {
      return 0;
    }
  }

  calcularValoresCambioDePlazo() {
    if (this.configuracionGeneral.cuotaAdministrativa) {
      if (this.modelContratoCambioDePlazo.dsctoRecargo) {
        return this.configuracionGeneral.cuotaAdministrativa - (this.configuracionGeneral.cuotaAdministrativa * this.modelContratoCambioDePlazo.dsctoRecargo / 100);
      } else {
        return this.configuracionGeneral.cuotaAdministrativa;
      }
    } else {
      this.logsMlabsService.toaster(
        {
          titulo: 'Error',
          mensaje: 'Error obteniendo la cuota administrativa',
          tipo: ToasterTipo.error
        }
      )
      return 0;
    }


  }

  retornarTituloAcordeonCambio(cambio: any) {
    if (cambio === tipoCambioContrato.plan) {
      return 'Cambio de plan'
    } else if (cambio === tipoCambioContrato.plazo) {
      return 'Cambio de plazo'
    } else if (cambio === tipoCambioContrato.monto) {
      return 'Cambio de monto'
    } else {
      return ''
    }

  }


  async obtenerDatosContrato() {
    return new Promise((resolve, reject) => {
      this._httpContratoService.find({id: this.idContrato})
        .subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                this.contrato = res[0][0];
                // @ts-ignore
                // this.estadoContratoService.plan.next(this.contrato.historicoPlanContratoCollection.at(-1).idPlan);
                resolve(this.contrato);
              } else {
                reject(false);
              }

            },
            error: err => {
              console.error('error: ', err)
              reject(false);
            }
          }
        )
    })

  }

  setearValoresEnFormularios() {
    this.setearValoresEnFormPlan();
    this.setearValoresEnFormCliente();
    this.setearValoresEnFormVendedor();
  }

  setearValoresEnFormPlan() {
    // @ts-ignore
    this.planContrato = this.contrato.historicoPlanContratoCollection.at(-1).idPlan;
  }

  setearValoresEnFormCliente() {
    this.idClienteSeleccionado = this.contrato.idClienteEnGrupo.idCliente.id;
    this.modelCliente = {...this.contrato.idClienteEnGrupo.idCliente, ...this.contrato.idClienteEnGrupo.idCliente.idUsuario}
  }

  setearValoresEnFormVendedor() {
    this.modelVendedor = {
      ...this.contrato.idVendedor, ...this.contrato.idVendedor?.idTrabajador?.idUsuario,
      agencia: this.contrato.idVendedor?.idAgencia.nombre,
      supervisor: this.filtrarSupervisorActivo(this.contrato.idVendedor?.idAgencia.supervisorCollection)
    };
  }

  armarJsonParaEnvío() {
    const objetoEnviar: actualizacionContrato = {
      idContrato: +this.idContrato,
      // @ts-ignore
      idHistoricoPlanContrato: this.contrato.historicoPlanContratoCollection.at(-1).id,
    }
    if (this.esCambioDePlan) {
      objetoEnviar.dsctoRecargo = 0; // esto solo va en cambio de plazo
      objetoEnviar.fechaInicio = this.modelContrato.fechaInicio;
      objetoEnviar.fechaInicioCobro = this.modelContrato.fechaIniciaCobro;
      objetoEnviar.idPlan = this.precioSeleccionado.idPlan;
      objetoEnviar.idPlanAnterior = this.planContrato.id;
      objetoEnviar.numeroContrato = this.modelContrato.numeroDeContrato;
      objetoEnviar.observacion = this.modelContrato.observacion;
      objetoEnviar.plazoMesSeleccionado = this.precioSeleccionado.plazoSeleccionado;
      objetoEnviar.cuota = this.precioSeleccionado.cuotaSeleccionada;
      // objetoEnviar.dsctoInscripcion = this.modelContrato.dsctoInscripcion;
      // objetoEnviar.dsctoPrimeraCuota = this.modelContrato.dsctoPrimeraCuota;
    } else if (this.esCambioDePlazo) {

      objetoEnviar.dsctoRecargo = this.modelContratoCambioDePlazo.dsctoRecargo;
      objetoEnviar.fechaInicio = this.modelContratoCambioDePlazo.fechaInicio;
      objetoEnviar.fechaInicioCobro = this.modelContratoCambioDePlazo.fechaIniciaCobro;
      objetoEnviar.idPlan = this.planContrato.id;
      objetoEnviar.numeroContrato = this.contrato.numeroDeContrato;
      objetoEnviar.observacion = this.modelContratoCambioDePlazo.observacion;
      objetoEnviar.plazoMesSeleccionado = this.precioSeleccionado.plazoSeleccionado;
      objetoEnviar.cuota = this.precioSeleccionado.cuotaSeleccionada;
    } else if (this.esCambioDeMonto) {
      objetoEnviar.idPlanAnterior = this.planContrato.id;
      // objetoEnviar.dsctoInscripcion = this.modelContrato.dsctoInscripcion;
      // objetoEnviar.dsctoPrimeraCuota = this.modelContrato.dsctoPrimeraCuota;
      objetoEnviar.fechaInicio = this.modelContrato.fechaInicio;
      objetoEnviar.fechaInicioCobro = this.modelContrato.fechaIniciaCobro;
      objetoEnviar.idPlan = this.precioSeleccionado.idPlan;
      objetoEnviar.numeroContrato = this.modelContrato.numeroDeContrato;
      objetoEnviar.observacion = this.modelContrato.observacion;
      objetoEnviar.plazoMesSeleccionado = this.precioSeleccionado.plazoSeleccionado;
      objetoEnviar.dsctoRecargo = 0;
      objetoEnviar.cuota = this.precioSeleccionado.cuotaSeleccionada;
    }
    console.log(objetoEnviar)
    return objetoEnviar;
  }

  resetValoresEstadoServicio() {
    this.parametrosCalculoCuotas = {
      historicoPlan: this.historicoContrato,
      fechaCobro: dayjs().format('YYYY-MM-DD'),
    };
    // todo emitir las cuotas vacias al comp de cuotas para que no muestre nada
    // this.estadoContratoService.tipoCambio.next(false);
    // this.estadoContratoService.descuentoPrimeraCuota.next(0);
    // this.estadoContratoService.descuentoInscripcion.next(0);
    // this.estadoContratoService.descuentoRecargo.next(0);
    // this.estadoContratoService.plazo.next(0);
    // this.estadoContratoService.plan.next({});
    // this.estadoContratoService.fechaCobro.next(new Date());
  }

  resetPlanCambioSeleccionado() {
    this.precioSeleccionado = {};
    this.cambioPlanSeleccionado = {};
  }

  resetFormContrato() {
    this.formContrato.get('numeroDeContrato')?.reset();
    this.formContrato.get('dsctoInscripcion')?.setValue(0);
    this.formContrato.get('dsctoPrimeraCuota')?.setValue(0);
    this.formContrato.get('observacion')?.reset();
    this.formContrato.get('fechaIniciaCobro')?.setValue(dayjs().format('YYYY-MM-DD'));
    this.formContratoCambioDePlazo.get('observacion')?.reset();
    this.formContratoCambioDePlazo.get('fechaIniciaCobro')?.setValue(dayjs().format('YYYY-MM-DD'));
    this.formContratoCambioDePlazo.get('dsctoRecargo')?.setValue(0);
    // this.formContrato.reset();
  }


  calcularInscripcionCambioMonto(): void {
    let totalInscripcionCambMonto = 0;
    const inscripcionP1 = this.planContrato.inscripcion || 0;
    const inscripcionP2 = this.cambioPlanSeleccionado.inscripcion || 0;
    const precioP1 = this.planContrato.precio || 0;
    const precioP2 = this.cambioPlanSeleccionado.precio || 0;

    if (precioP2 > precioP1) {
      this.inscripcionCambioMonto = (inscripcionP2 - inscripcionP1) + (precioP2 * this.tasaDeCambio / 100);
    } else {
      this.inscripcionCambioMonto = precioP2 * this.tasaDeCambio / 100;
    }
  }

  filtrarSupervisorActivo(supervisoresAgencia: SupervisorResponseDto[]) {
    console.log('cambiando el supervisor', supervisoresAgencia);
    if (supervisoresAgencia) {
      const indexSupervisorHabilitado = supervisoresAgencia.findIndex((supervisor) => {
          return supervisor.sisHabilitado === 'A';
        }
      );
      if (indexSupervisorHabilitado >= 0) {
        // @ts-ignore
        if (supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario) {
          // @ts-ignore
          return supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.nombres + ' ' + supervisoresAgencia[indexSupervisorHabilitado].idTrabajador.idUsuario.apellidos;
        } else {
          return 'No tiene'
        }

      } else {
        return 'No tiene'
      }
    } else {
      return 'No tiene'
    }
  }

  armarCuotasPlan(parametros: { historicoPlan: HistoricoPlanContratoResponseDto, fechaCobro: string, plazo: number, cuota: number, precio: number }) {

    this.cuotas = [];
    let cuota: CuotaResponseDto = {};
    // @ts-ignore
    cuota.abonoCapital = parametros.precio / parametros.plazo;
    cuota.sisHabilitado = ActivoInactivo.Activo;
    // @ts-ignore
    cuota.valorTasaAdministrativa = (parametros.cuota - (cuota.abonoCapital)) / (1 + (this.configuracionGeneral.ivaPorcentaje / 100));
    // @ts-ignore
    cuota.valorImpuesto = cuota.valorTasaAdministrativa * (this.configuracionGeneral.ivaPorcentaje / 100);
    cuota.valorCuota = parametros.cuota;
    cuota.valorPorCobrar = parametros.cuota;
    cuota.pasaANuevoPlan = 'NO';
    // armar el numero de cuotas segun el plazo
    // @ts-ignore
    for (let i = 0; i < parametros.plazo; i++) {
      let cuotaAux = {...cuota}
      cuotaAux.numeroCuota = i + 1;
      cuotaAux.valorPagadoCuota = 0;
      cuotaAux.fechaCobro = dayjs(parametros.fechaCobro).add(i, 'month').format('DD/MM/YYYY');
      this.cuotas.push({...cuotaAux});
    }
    if (Object.keys(parametros.historicoPlan).length > 0) {
      // @ts-ignore
      const cuotasCobradas = parametros.historicoPlan.totalCuotasCobradas - 1;

      // @ts-ignore
      const valorCuotaAnterior = parametros.historicoPlan.cuotaCollection[0].valorCuota;

      // cuotas que pasan al nuevo contrato
      const cuotasPasanANuevoPlan = Math.floor((cuotasCobradas * valorCuotaAnterior) / cuota.valorCuota);
      const valorCobrado = cuotasCobradas * valorCuotaAnterior;
      const sobrante = (cuotasCobradas * valorCuotaAnterior) % cuota.valorCuota;

      // @ts-ignore
      if (cuotasPasanANuevoPlan > 0) {
        if (parametros.plazo >= cuotasPasanANuevoPlan) {
          for (let j = this.cuotas.length - 1; j >= this.cuotas.length - cuotasPasanANuevoPlan; j--) {
            this.cuotas[j]['valorPagadoCuota'] = parametros.cuota;
            this.cuotas[j]['valorPorCobrar'] = 0;
            this.cuotas[j].pasaANuevoPlan = 'SI';
          }
        } else {
          for (let i = 0; i < this.cuotas.length; i++) {
            this.cuotas[i]['valorPagadoCuota'] = parametros.cuota;
            this.cuotas[i]['valorPorCobrar'] = 0;
            this.cuotas[i]['pasaANuevoPlan'] = 'SI';
          }
        }
      }
      if (sobrante) {
        this.cuotas[this.cuotas.length - cuotasPasanANuevoPlan - 1].valorPagadoCuota = sobrante;
        this.cuotas[this.cuotas.length - cuotasPasanANuevoPlan - 1].valorPorCobrar = parametros.cuota - sobrante;
      }
    }
    this.cuotasTableService.cuotas.next(this.cuotas);
    console.log(this.cuotas);
  }

  obtenerDatosConfiguracionGeneral() {
    return new Promise((resolve, reject) => {
      this.httpConfiguracionGeneralService.find()
        .subscribe(
          {
            next: (configuraciones) => {
              this.configuracionGeneral = configuraciones[0][0];
              resolve(this.configuracionGeneral);
            },
            error: err => {
              this.logsMlabsService.toaster({
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

  verificarSiPuedeGenerarCuotas() {
    console.log('entro en comprobacion')
    if (this.parametrosCalculoCuotas.cuota &&
      this.parametrosCalculoCuotas.precio &&
      this.parametrosCalculoCuotas.fechaCobro &&
      this.parametrosCalculoCuotas.plazo &&
      typeof this.parametrosCalculoCuotas.historicoPlan === "object") {
      // @ts-ignore
      this.armarCuotasPlan(
        {
          historicoPlan: this.parametrosCalculoCuotas.historicoPlan as HistoricoPlanContratoResponseDto,
          fechaCobro: this.parametrosCalculoCuotas.fechaCobro,
          cuota: this.parametrosCalculoCuotas.cuota,
          precio: this.parametrosCalculoCuotas.precio,
          plazo: this.parametrosCalculoCuotas.plazo
        }
      )
    } else {
      console.log('no puede generar:', this.parametrosCalculoCuotas)
    }
  }

}

export interface actualizacionContrato {

  idContrato?: number; // siempre
  idPlan?: number; // siempre
  idHistoricoPlanContrato?: number; // siempre
  plazoMesSeleccionado?: number; // solo para cambio de plazo
  numeroContrato?: string; // no en cambio de plazo
  dsctoInscripcion?: number; // no en cambio de plazo
  dsctoPrimeraCuota?: number; // no en cambio de plazo
  observacion?: string; // siempre
  fechaInicio?: string; //no en cambio de plazo
  fechaInicioCobro?: string; // siempre
  dsctoRecargo?: number; //  solo para cambio de plazo
  idPlanAnterior?: number;
  porcentajeTasa?: boolean;
  idVendedor?: number;
  cuota?: number;
}
