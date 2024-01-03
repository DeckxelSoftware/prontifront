import {Component, OnInit} from '@angular/core';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {PrecioSeleccionadoInterface} from '../../interfaces/precio-seleccionado.interface';
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
import {
  HttpConfiguracionGeneralService
} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {actualizacionContrato, tipoCambioContrato} from '../ruta-editar-contrato/ruta-editar-contrato.component';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {VendedorResponseDto} from '../../../vendedor/servicios/dto/vendedor.response-dto';
import {
  ModalSeleccionarCuotasComponent
} from '../../../../shared/modal-seleccionar-cuotas/modal-seleccionar-cuotas.component';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {SupervisorResponseDto} from '../../../supervisor/servicios/dto/supervisor.response-dto';
import {
  HistoricoPlanContratoResponseDto
} from "../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto";
import {CuotaResponseDto} from "../../../cuota/servicios/dto/cuota.response-dto";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {
  cuotaTablePrimeColumn,
  CuotaViewTablaEmitsService
} from "../../../../shared/cuotas-view-table/cuota-view-tabla-emits.service";

@Component({
  selector: 'app-ruta-desistir',
  templateUrl: './ruta-desistir.component.html',
  styleUrls: ['./ruta-desistir.component.scss']
})
export class RutaDesistirComponent implements OnInit {

  parametrosCalculoCuotas: { historicoPlan?: HistoricoPlanContratoResponseDto, fechaCobro?: string, plazo?: number, cuota?: number, precio?: number } = {};
  labelSuperiorCompCuotas = 'Inscripción';
  valorSuperiorCompCuotas = 0;
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
  mostrarTablaPlan = false;
  idPlanSeleccionado!: number;
  planSeleccionado!: PlanResponseDto;
  contrato: ContratoResponseDto = {};
  idContrato!: number;
  mostrarTablaCambioPlan = false;
  mostrarTablaVendedor = false;
  precioSeleccionado: PrecioSeleccionadoInterface = {};


  tasaDeCambio = 0;
  inscripcionCambioMonto = 0;
  valorCuotaCambioMonto = 0;

  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formContratoCambioDePlazo = new FormGroup({});
  clientes: any[] = [];
  vendedores: any[] = [];

  clienteSeleccionado: ClienteResponseDto = {};
  idVendedorSeleccionado!: number;
  idClienteSeleccionado!: number;

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
    dsctoInscripcion: 0,
    dsctoPrimeraCuota: 0,
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
                this.parametrosCalculoCuotas.fechaCobro = this.modelContrato.fechaIniciaCobro;
                this.verificarSiPuedeGenerarCuotas();
              }
            },

          },

        },
        {
          className: 'col-4',
          key: 'porcentajeInscripcion',
          type: 'select',
          templateOptions: {
            required: true,
            options: [
              {
                value: 3,
                label: '3%'
              },
              {
                value: 5,
                label: '5%'
              }
            ],
            label: '% Inscripción',
            change: (field) => {
              // console.log(field);
              if (this.modelContrato.porcentajeInscripcion === 3) {
                this.valorSuperiorCompCuotas = this.calcularValorAPagar();
                this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
              } else {
                this.valorSuperiorCompCuotas = this.calcularValorAPagar();
                this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
              }

            }
          }
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
              public cuotasTableService: CuotaViewTablaEmitsService,
  ) {
  }

  onSubmit(model: any) {
    console.log(model);
  }

  async ngOnInit() {
    this.cuotasTableService.labelSuperior.next(this.labelSuperiorCompCuotas);
    this.parametrosCalculoCuotas.fechaCobro = this.modelContrato.fechaIniciaCobro;
    this.cuotasTableService.cuotas.next(this.cuotas);
    await this.obtenerDatosConfiguracionGeneral();

    this.cuotasTableService.columnas.next(this.columnasTablaCuotas);
    const {idContrato} = this.route.snapshot.params;
    this.idContrato = idContrato;
    if (this.idContrato) {
      try {
        const resultadoBusqueda = await this.obtenerDatosContrato();
        if (resultadoBusqueda) {

          // this.estadoContratoService.cambioDePlan.next(true);
          // this.estadoContratoService.tipoCambio.next(tipoCambioContrato.reactivacion);
          // @ts-ignore
          // this.contrato.historicoPlanContratoCollection[0].totalCuotasCobradas = 2;
          // @ts-ignore
          // this.estadoContratoService.historicoPlanContrato.next(this.contrato.historicoPlanContratoCollection[0]);
          // @ts-ignore
          //this.estadoContratoService.plan.next(this.contrato.historicoPlanContratoCollection.at(-1).idPlan);
          // this.estadoContratoService.plazo.next(this.contrato.plazoMesSeleccionado as number);
          // this.estadoContratoService.tasaCambioContrato.next(this.tasaDeCambio);
          this.parametrosCalculoCuotas.historicoPlan = this.contrato.historicoPlanContratoCollection[0];
          this.setearValoresEnFormularios()
        }

      } catch (e) {
        console.error('Error obteniendo contrato');
      }

    } else {
      this.estadoContratoService.cambioDePlan.next(false);
    }
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Desistir Contrato'},


    ];

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
    this.blockuiService.habilitarBlockUI();
    this._httpConfiguracionGeneralService.find({id: 1}).subscribe({
      next: (configuracion) => {

        if (configuracion[0][0].tasaCambioContrato) {
          this.tasaDeCambio = configuracion[0][0].tasaCambioContrato;
        }

        console.log('esta es la tasa', this.tasaDeCambio)
        this.blockuiService.deshabilitarBlockUI();
      },
      error: err => {
        console.error('No se pudo obtener la configuracion general', err);
        this.blockuiService.deshabilitarBlockUI();
      }
    })
  }


  mostrarVendedorSeleccionado(evento: VendedorResponseDto) {
    this.mostrarTablaVendedor = false;
    if (evento.id) {

      this.idVendedorSeleccionado = evento.id;
      const objetoAgenciaSupervisor = {
        agencia: evento?.idAgencia?.nombre,
        supervisor: this.filtrarSupervisorActivo(evento?.idAgencia?.supervisorCollection),
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
    this.resetFormContrato();
    this.resetFormVendedor();
    this.resetValoresEstadoServicio();
  }


  deshabilitarSubmit() {


    return !(this.formContrato.valid && this.idVendedorSeleccionado)


  }

  submitForm() {
    const objetoActualizar = this.armarJsonParaEnvío();
    this.enviarDatos(objetoActualizar);
  }

  enviarDatos(objetoActualizar: any) {
    this.blockuiService.habilitarBlockUI();
    this._httpContratoService.desistirContrato(objetoActualizar)
      .subscribe(
        {
          next: res => {
            console.log(res);
            this.blockuiService.deshabilitarBlockUI();
            this.logsMlabsService.toaster({
              titulo: 'ÉXITO',
              mensaje: 'Contrato actualizado',
              tipo: ToasterTipo.success
            })
            this.router.navigate(['contratos', 'contrato-modulo'])
          },
          error: err => {
            console.error(err.error.mensaje);
            if (err?.error?.mensaje) {
              this.logsMlabsService.toaster({
                titulo: 'ERROR',
                mensaje: err?.error?.mensaje,
                tipo: ToasterTipo.error
              })
            } else {
              this.logsMlabsService.toaster({
                titulo: 'ERROR',
                mensaje: 'Error al actualizar contrato',
                tipo: ToasterTipo.error
              })
            }

            console.error('Error desistir contrato', err);
            this.blockuiService.deshabilitarBlockUI();
          }
        }
      )


  }


  async obtenerDatosContrato() {
    this.blockuiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
      this._httpContratoService.find({id: this.idContrato})
        .subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                this.contrato = res[0][0];
                this.blockuiService.deshabilitarBlockUI();
                resolve(this.contrato);
              } else {
                this.blockuiService.deshabilitarBlockUI();
                reject();
              }

            },
            error: err => {
              console.error('error: ', err)
              this.blockuiService.deshabilitarBlockUI();
              reject();

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
    this.idVendedorSeleccionado = this.contrato.idVendedor.id;
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
    objetoEnviar.cuota = this.precioSeleccionado.cuotaSeleccionada;
    objetoEnviar.fechaInicio = this.modelContrato.fechaInicio;
    objetoEnviar.fechaInicioCobro = this.modelContrato.fechaIniciaCobro ? this.modelContrato.fechaIniciaCobro : this.modelContrato.fechaInicio;
    objetoEnviar.idPlan = this.precioSeleccionado.idPlan;
    objetoEnviar.idVendedor = this.idVendedorSeleccionado;
    objetoEnviar.numeroContrato = this.modelContrato.numeroDeContrato;
    objetoEnviar.observacion = this.modelContrato.observacion;
    objetoEnviar.plazoMesSeleccionado = this.precioSeleccionado.plazoSeleccionado;
    objetoEnviar.porcentajeTasa = this.modelContrato.porcentajeInscripcion === 5 ? true : false;
    // @ts-ignore
    objetoEnviar.idPlanAnterior = this.contrato.historicoPlanContratoCollection.at(-1).idPlan.id;
    return objetoEnviar;
  }

  resetValoresEstadoServicio() {
    // this.estadoContratoService.tipoCambio.next(false);
    this.estadoContratoService.descuentoPrimeraCuota.next(0);
    this.estadoContratoService.descuentoInscripcion.next(0);
    this.estadoContratoService.tasaCambioContrato.next(this.tasaDeCambio);
    // this.estadoContratoService.plazo.next(0);
    // this.estadoContratoService.plan.next({});
    this.estadoContratoService.fechaCobro.next(new Date());
  }

  resetFormVendedor() {
    this.formVendedor.get('nombres')?.reset();
    this.formVendedor.get('apellidos')?.reset();
    this.formVendedor.get('agencia')?.reset();
    this.formVendedor.get('supervisor')?.reset();

  }

  resetFormContrato() {
    this.formContrato.get('numeroDeContrato')?.reset();
    this.formContrato.get('dsctoInscripcion')?.reset();
    this.formContrato.get('dsctoPrimeraCuota')?.reset();
    this.formContrato.get('observacion')?.reset();
    this.formContrato.get('porcentajeInscripcion')?.reset();
    this.formContrato.get('fechaIniciaCobro')?.setValue(dayjs().format('YYYY-MM-DD'));
  }

  mostrarPlanSeleccionado(event: PlanResponseDto) {
    this.planSeleccionado = event;
    this.mostrarTablaPlan = false;
    if (event.id) {
      this.idPlanSeleccionado = event.id;

    }
    const dialogRef$ = this.matDialog.open(ModalSeleccionarCuotasComponent, {
        data: {
          plan: this.planSeleccionado
        }
      }
    )
    dialogRef$.afterClosed().subscribe(
      {
        next: res => {
          // console.log('res del modal cuota:', res);
          if (res) {
            this.parametrosCalculoCuotas.plazo = res.plazoSeleccionado;
            this.parametrosCalculoCuotas.cuota = res.cuotaSeleccionada;
            this.parametrosCalculoCuotas.precio = res.precioSeleccionado;
            this.precioSeleccionado = res;
            this.verificarSiPuedeGenerarCuotas();
            // this.estadoContratoService.plan.next(event);
            // this.estadoContratoService.plazo.next(res.plazoSeleccionado);
            this.modelContrato.plazoMesSeleccionado = res.plazoSeleccionado;
            this.formContrato.get('plazoMesSeleccionado')?.setValue(res.plazoSeleccionado);
          }

        },
        error: err => {
        }
      }
    )
  }

  filtrarSupervisorActivo(supervisoresAgencia: SupervisorResponseDto[]) {
    if (supervisoresAgencia?.length > 0) {
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
      const sobrante = (cuotasCobradas * valorCuotaAnterior) % cuota.valorCuota;


      // @ts-ignore
      if (cuotasPasanANuevoPlan > 0) {
        if (parametros.plazo >= cuotasPasanANuevoPlan) {
          for (let j = this.cuotas.length - 1; j >= this.cuotas.length - cuotasPasanANuevoPlan; j--) {
            this.cuotas[j].pasaANuevoPlan = 'SI';
            this.cuotas[j]['valorPagadoCuota'] = parametros.cuota;
            this.cuotas[j]['valorPorCobrar'] = 0;
          }
        } else {
          for (let i = 0; i < this.cuotas.length; i++) {
            this.cuotas[i]['pasaANuevoPlan'] = 'SI';
            this.cuotas[i]['valorPagadoCuota'] = parametros.cuota;
            this.cuotas[i]['valorPorCobrar'] = 0;
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
      this._httpConfiguracionGeneralService.find()
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

  calcularValorAPagar(): number {
    if (this.modelContrato.porcentajeInscripcion && this.precioSeleccionado.precioSeleccionado && this.precioSeleccionado.inscripcion) {
      if (this.modelContrato.porcentajeInscripcion === 3) {
        return this.precioSeleccionado.precioSeleccionado * (this.tasaDeCambio / 100);
      } else if (this.modelContrato.porcentajeInscripcion === 5) {
        return this.precioSeleccionado.inscripcion
      } else {
        return 0;
      }
    } else {
      return 0;
    }
  }
}
