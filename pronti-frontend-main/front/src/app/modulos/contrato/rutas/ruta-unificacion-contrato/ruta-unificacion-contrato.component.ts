import {Component, OnInit} from '@angular/core';
import {MenuItem, MessageService} from 'primeng/api';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {FormGroup} from '@angular/forms';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {HttpClienteService} from '../../../cliente/servicios/http-cliente-service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import {HttpVendedorService} from '../../../vendedor/servicios/http-vendedor-service';
import {VendedorResponseDto} from '../../../vendedor/servicios/dto/vendedor.response-dto';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import * as dayjs from 'dayjs';
import {ActivatedRoute, Router} from '@angular/router';
import {ContratoStorageService} from '../../../../servicios/estado-contrato/contrato-storage.service';
import {FORMLY_PLAN} from '../../funciones/formulario-plan';
import {MatDialog} from '@angular/material/dialog';
import {ContratoTablaComponent} from '../../componentes/contrato-tabla/contrato-tabla.component';
import {ModalPlanComponent} from '../../componentes/modal-plan/modal-plan.component';
import {
  ModalSeleccionarCuotasComponent
} from "../../../../shared/modal-seleccionar-cuotas/modal-seleccionar-cuotas.component";
import {HistoricoPlanContratoResponseDto} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ModalContratoComponent} from '../../componentes/modal-contrato/modal-contrato.component';
import {
  cuotaTablePrimeColumn,
  CuotaViewTablaEmitsService
} from '../../../../shared/cuotas-view-table/cuota-view-tabla-emits.service';
import {CuotaResponseDto} from '../../../cuota/servicios/dto/cuota.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {HttpConfiguracionGeneralService} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {ConfiguracionGeneralResponseDto} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import {SiNoEnum} from '../../../../enums/si-no.enum';

@Component({
  selector: 'app-ruta-acciones-contrato',
  templateUrl: './ruta-unificacion-contrato.component.html',
  styleUrls: ['./ruta-unificacion-contrato.component.scss']
})
export class RutaUnificacionContratoComponent implements OnInit {

  items: MenuItem[] = [];
  home!: MenuItem;
  titulo: string = '';

  mostrarTablaPlan = false;
  mostrarTablaCliente = false;
  mostrarTablaVendedor = false;
  mostrarTablaContrato = false;

  collapsePlan1 = false;
  collapsePlan2 = false;
  mostrarDataPlan3 = false;

  cuotas: CuotaResponseDto[] = [];
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  cuotasPagadas = 0;
  historicoPlan: HistoricoPlanContratoResponseDto = {};


  // valores que pueden mostrase
  nuevaInscripcion = 0;

  formPlanUnificacion = new FormGroup({});
  formPlanUnificacionDos = new FormGroup({});
  formPlanUnificacionTres = new FormGroup({});


  fieldPlanUnificacion: FormlyFieldConfig[] = FORMLY_PLAN(false);
  fieldPlanUnificacionDos: FormlyFieldConfig[] = FORMLY_PLAN(false);
  fieldPlanUnificacionTres: FormlyFieldConfig[] = FORMLY_PLAN(true);


  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});

  clientes: any[] = [];
  vendedores: any[] = [];

  clienteSeleccionado: ClienteResponseDto = {};
  idVendedorSeleccionado!: number;
  idPlanSeleccionado!: number;

  modelPlanUno: any = {
    id: 0,
    modelo: '',
    precio: 0,
    plazoMesSeleccionado: 0,
    valorTasaAdministrativa: 0,
    inscripcion: 0,
    dsctoPrimeraCuota: 0,
    dsctoInscripcion: 0,
    totalPagado: 0
  };


  modelPlanDos: any = {
    id: 0,
    modelo: '',
    precio: 0,
    plazoMesSeleccionado: 0,
    valorTasaAdministrativa: 0,
    inscripcion: 0,
    dsctoPrimeraCuota: 0,
    dsctoInscripcion: 0,
    totalPagado: 0
  };

  modelPlanTres: any = {
    id: 0,
    modelo: '',
    precio: 0,
    plazoMesSeleccionado: 0,
    valorTasaAdministrativa: 0,

    // plazoMesMaximo: 0,
    // tasaAdministrativa: 0,
    inscripcion: 0,
  }

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
    plazoMesSeleccionado: 0,
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
            required: true,
            label: 'Fecha Inicio Cobro',
            change: (field, event) => {
              console.log('fied', field, event);
              console.log('model', this.modelContrato);
              if (this.modelContrato.fechaIniciaCobro) {
                console.log(this.modelContrato.fechaIniciaCobro);
                this.armarCuotasPlan()
                // this.estadoContratoService.fechaCobro.next(new Date(this.modelContrato.fechaIniciaCobro + ' 23:00:00'));
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
            label: 'Observación'
          }
        },
        {
          className: 'col-4',
          key: 'plazoMesSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Plazo seleccionado',
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


  planSeleccionado!: PlanResponseDto;
  cuotaPlan = 0;

  constructor(private _httpClienteService: HttpClienteService,
              private _httpVendedorService: HttpVendedorService,
              public estadoContratoService: EstadoContratoService,
              public blockuiService: BlockuiService,
              private _activatedRouter: ActivatedRoute,
              public contratoStorageService: ContratoStorageService,
              private _router: Router,
              private _dialog: MatDialog,
              private _httpContratoService: HttpContratoService,
              private dataViewCuotasEmittersService: CuotaViewTablaEmitsService,
              private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
              private messageService: LogsMlabsService
  ) {
  }


  ngOnInit(): void {

    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
    ];

    const {idContrato} = this._activatedRouter.snapshot.params;
    if (idContrato) {
      this.titulo = 'Unificación de Contrato';
      this.items.push({label: 'Unificación de contrato'})
    }

    // this.home = {icon: 'pi pi-home', routerLink: '/'};

    this.setearPlanContratoInicial();
    this.obtenerDatosConfiguracionGeneral();

    this.escucharSeleccionContratoDos();

  }

  obtenerDatosConfiguracionGeneral() {
    this._httpConfiguracionGeneralService.find({id: 1})
      .subscribe({
        next: (resp) => {
          this.configuracionGeneral = resp[0][0];
        },
        error: err => {
          console.error('No se pudo consultar la configuracion general', err);
        }
      })
  }

  escucharSeleccionContratoDos() {
    this.contratoStorageService.seleccionoContrato.subscribe(
      {
        next: (seleccionoContrato) => {
          if (seleccionoContrato) {
            this.setearPlanContratoDos();
            this.mostrarTablaContrato = false;
          }
        }
      }
    )
  }

  setearPlanContratoDos() {
    this.modelPlanDos = {...this.obtenerUltimoPlanDeHistorial(this.contratoStorageService.contratoUnificar)};
    this.modelPlanDos.dsctoInscripcion = this.contratoStorageService.contratoUnificar.dsctoInscripcion || 0;
    this.modelPlanDos.dsctoPrimeraCuota = this.contratoStorageService.contratoUnificar.dsctoPrimeraCuota || 0;
    this.modelPlanDos.plazoMesSeleccionado = this.contratoStorageService.contratoUnificar.plazoMesSeleccionado;

  }

  onSubmit(model: any) {
    console.log(model);
  }

  obtenerUltimoPlanDeHistorial(contrato: any): any {
    const historicosContrato = contrato.historicoPlanContratoCollection || [];
    const ultimoHistorico = historicosContrato[historicosContrato?.length - 1];
    const planDos = ultimoHistorico.idPlan;
    planDos.totalPagado = ultimoHistorico.totalMontoCobrado - ultimoHistorico.totalCobroPrimeraCuota;
    planDos.valorTasaAdministrativa = ultimoHistorico.valorTasaAdministrativa;
    return planDos || {};
  }


  setearPlanContratoInicial() {

    const historicosContrato = this.contratoStorageService.contratoInicial.historicoPlanContratoCollection || [];
    const ultimoHistorico = historicosContrato[historicosContrato?.length - 1] as HistoricoPlanContratoResponseDto;
    const planSeleccionadoUltimo = ultimoHistorico.idPlan || {};
    let valorPrimeraCuota = 0;
    let totalMontoCobrado = 0;
    console.log('historicoCOntratoUno', historicosContrato, 'ultimo', ultimoHistorico);

    if (ultimoHistorico.cuotaCollection && ultimoHistorico.totalMontoCobrado && ultimoHistorico.cuotaCollection.length > 0) {
      valorPrimeraCuota = ultimoHistorico.cuotaCollection[0].valorCuota;
      totalMontoCobrado = ultimoHistorico.totalMontoCobrado;
    }
    this.modelPlanUno = {
      id: planSeleccionadoUltimo.id || 0,
      modelo: planSeleccionadoUltimo?.modelo || '',
      precio: planSeleccionadoUltimo.precio || 0,
      inscripcion: planSeleccionadoUltimo.inscripcion || 0,
      plazoMesSeleccionado: this.contratoStorageService?.contratoInicial?.plazoMesSeleccionado || 0,
      valorTasaAdministrativa: ultimoHistorico.valorTasaAdministrativa || 0,
      dsctoInscripcion: this.contratoStorageService.contratoInicial.dsctoInscripcion || 0,
      dsctoPrimeraCuota: this.contratoStorageService.contratoInicial.dsctoPrimeraCuota || 0,
      // totalPagado: 0
      totalPagado: totalMontoCobrado - valorPrimeraCuota,
    }


    this.modelCliente = this.contratoStorageService.contratoInicial.idClienteEnGrupo.idCliente.idUsuario;
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

  mostrarPlanSeleccionado(event: PlanResponseDto) {
    this.planSeleccionado = event;
    this.mostrarTablaPlan = false;
    if (event.id) {
      this.idPlanSeleccionado = event.id;
      this.collapsePlan2 = true;
      this.collapsePlan1 = true;
      this.mostrarDataPlan3 = true;
      this.modelPlanTres = this.planSeleccionado;
    }
    const dialogRef$ = this._dialog.open(ModalSeleccionarCuotasComponent, {
      data: {
        plan: this.planSeleccionado
      }
    });
    dialogRef$.afterClosed().subscribe(
      {
        next: res => {

          // mostrar en formularios de contrato y plan
          this.cuotaPlan = res.cuotaSeleccionada;
          this.modelContrato.plazoMesSeleccionado = res.plazoSeleccionado;
          this.modelPlanTres.plazoMesSeleccionado = res.plazoSeleccionado;
          const capitalTres = Number((res.precioSeleccionado / res.plazoSeleccionado).toFixed(2));
          if (this.configuracionGeneral.ivaPorcentaje) {
            this.modelPlanTres.valorTasaAdministrativa = Number(((res.cuotaSeleccionada - capitalTres) / (capitalTres + capitalTres / (this.configuracionGeneral.ivaPorcentaje / 100))).toFixed(2));
          }

          this.formPlanUnificacionTres.get('valorTasaAdministrativa')?.setValue(this.modelPlanTres.valorTasaAdministrativa);
          this.formPlanUnificacionTres.get('plazoMesSeleccionado')?.setValue(this.modelPlanTres.plazoMesSeleccionado);


          this.calcularIncripcion(event);
          this.planSeleccionado.inscripcion = this.nuevaInscripcion;
          // esto debo de quitar
          this.formContrato.get('plazoMesSeleccionado')?.setValue(res.plazoSeleccionado);

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
        },
        error: err => {
        }
      }
    )
    console.log('plan selecionado', event);
  }


  armarCuotasPlan() {


    this.cuotas = [];
    let cuota: CuotaResponseDto = {};


    if (this.modelPlanTres.plazoMesSeleccionado && this.modelContrato.fechaIniciaCobro && this.cuotaPlan) {

      cuota.valorCuota = this.cuotaPlan;
      cuota.abonoCapital = this.modelPlanTres.precio / this.modelPlanTres.plazoMesSeleccionado;
      cuota.sisHabilitado = ActivoInactivo.Activo;

      if (this.configuracionGeneral.ivaPorcentaje) {

        cuota.valorTasaAdministrativa = (this.cuotaPlan - (this.modelPlanTres.precio / this.modelPlanTres.plazoMesSeleccionado) )/ (1 + this.configuracionGeneral.ivaPorcentaje / 100);
        cuota.valorImpuesto = cuota.valorTasaAdministrativa * (this.configuracionGeneral.ivaPorcentaje / 100);
      }

      cuota.pasaANuevoPlan = 'PENDIENTE';
      // armar el numero de cuotas segun el plazo
      for (let i = 0; i < this.modelPlanTres.plazoMesSeleccionado; i++) {
        let cuotaAux = {...cuota}
        cuotaAux.numeroCuota = i + 1;
        cuotaAux.fechaCobro = dayjs(this.modelContrato.fechaIniciaCobro).add(i, 'month').format('DD/MM/YYYY');
        cuotaAux.valorPorCobrar = this.cuotaPlan;
        cuotaAux.valorPagadoCuota = 0;
        this.cuotas.push({...cuotaAux});
      }


      const montoAPasar = this.modelPlanUno.totalPagado + this.modelPlanDos.totalPagado;
      const cuotasAPasar = Math.floor(montoAPasar / this.cuotaPlan);

      if (cuotasAPasar > 0) {
        for (let j = 1; j <= cuotasAPasar; j++) {
          this.cuotas[this.cuotas.length - j].pasaANuevoPlan = 'PAGADO';
          this.cuotas[this.cuotas.length - j].valorPagadoCuota = cuota.valorCuota;
          this.cuotas[this.cuotas.length - j].valorPorCobrar = 0;
        }
      }

      if (montoAPasar > cuotasAPasar * this.cuotaPlan) {
        const valorCuotaParcial = montoAPasar - cuotasAPasar * this.cuotaPlan;
        const indiceCuotaAbono = this.cuotas.length - cuotasAPasar - 1;
        this.cuotas[indiceCuotaAbono].valorPagadoCuota = montoAPasar - cuotasAPasar * this.cuotaPlan;
        this.cuotas[indiceCuotaAbono].valorPagadoCuota = valorCuotaParcial;
        this.cuotas[indiceCuotaAbono].valorPorCobrar = this.cuotaPlan - valorCuotaParcial;
      }

    }
    this.dataViewCuotasEmittersService.cuotas.next(this.cuotas);
    console.log(this.cuotas);
  }

  calcularIncripcion(plan: PlanResponseDto) {

    console.log('calculo inscripcion',
      {
        plan3: plan.precio,
        pla3Inscripcion: plan.inscripcion,
        incripcion1: this.modelPlanUno.inscripcion,
        inscripcion2: this.modelPlanDos.inscripcion
      });

    if (plan.inscripcion && plan.precio) {
      this.nuevaInscripcion = plan.precio * 0.03 + (plan.inscripcion - this.modelPlanUno.inscripcion - this.modelPlanDos.inscripcion);
    }

  }

  // mostrarClienteSeleccionado(evento: ClienteResponseDto) {
  //   this.mostrarTablaCliente = false;
  //   if (evento.id) {
  //     this.idClienteSeleccionado = evento.id;
  //     this.modelCliente = {...evento, ...evento.idUsuario};
  //   }
  // }

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
    this.limpiarStorageUnificacion();
    this._router.navigate(['contratos', 'contrato-modulo']);
  }

  limpiarStorageUnificacion() {
    this.idVendedorSeleccionado = 0;
    this.idPlanSeleccionado = 0;
    this.contratoStorageService.contratoInicial = {};
    this.contratoStorageService.contratoUnificar = {};
    this.planSeleccionado = {};
  }


  enviarObjetoUnificacion() {


    this.blockuiService.habilitarBlockUI();

    const historicoPlanC1 = this.contratoStorageService.contratoInicial.historicoPlanContratoCollection || [];
    const historicoPlanC2 = this.contratoStorageService.contratoUnificar.historicoPlanContratoCollection || [];
    let idHistoricoPlanC1 = 0;
    let idHistoricoPlanC2 = 0;


    if (historicoPlanC1?.length > 0 && historicoPlanC2?.length > 0) {
      idHistoricoPlanC1 = historicoPlanC1[historicoPlanC1.length - 1].id || 0;
      idHistoricoPlanC2 = historicoPlanC2[historicoPlanC2.length - 1].id || 0;
    }

    const objetoEnviar = {
      cuota: this.cuotaPlan,
      dsctoRecargo: 0,
      fechaInicio: this.modelContrato.fechaInicio,
      fechaInicioCobro: dayjs(this.modelContrato.fechaIniciaCobro).format('YYYY-MM-DD'),
      idContrato1: this.contratoStorageService.contratoInicial.id,
      idContrato2: this.contratoStorageService.contratoUnificar.id,
      idHistoricoPlanContrato1: idHistoricoPlanC1,
      idHistoricoPlanContrato2: idHistoricoPlanC2,
      idNuevoPlan: this.idPlanSeleccionado,
      idPlan1: this.modelPlanUno.id,
      idPlan2: this.modelPlanDos.id,
      idVendedor: this.idVendedorSeleccionado,
      numeroContrato: this.modelContrato.numeroDeContrato,
      observacion: this.modelContrato.observacion,
      plazoMesSeleccionado: this.modelContrato.plazoMesSeleccionado
    };
    console.log('voy a enviar', objetoEnviar);
    this._httpContratoService.realizarUnificacion(objetoEnviar).subscribe(
      {
        next: (resp: any) => {
          this.blockuiService.deshabilitarBlockUI();
          if (resp.codigo === '200') {
            this.messageService.toaster({
              titulo: 'Contrato',
              tipo: ToasterTipo.info,
              mensaje: 'Unificación realizada exitosamente'
            });

            this.limpiarStorageUnificacion();
            this._router.navigate(['contratos', 'contrato-modulo']);
          }
        },
        error: err => {
          console.error('Error al crear contrato', err);
          this.blockuiService.deshabilitarBlockUI();
          this.messageService.toaster({
            titulo: 'Contrato',
            tipo: ToasterTipo.warning,
            mensaje: `No se pudo realizar la unificación. Error en la comprobacion de la diferencia de la tasa administrativa y el capital`
          });

        }
      }
    )


  }

  imprimirContratoInicial() {
    console.log('el uno', this.contratoStorageService.contratoInicial);
    console.log('el otro', this.contratoStorageService.contratoUnificar);
  }

  abrirModalContrato() {
    const dialog$ = this._dialog.open(ModalContratoComponent, {
      width: '100vw',
      height: '100vh'
    });
  }

  abriModalContrato() {
    const dialog$ = this._dialog.open(ModalPlanComponent,
      {
        width: '100vw',
        height: '100vh',
        data: {
          planUno: this.modelPlanUno,
          planDos: this.modelPlanDos
        }
      });

    dialog$.afterClosed().subscribe(console.log)

  }


  verData() {
    console.log('modelP1', this.modelPlanUno);
    console.log('modelP2', this.modelPlanDos);
    this.imprimirContratoInicial();
  }


  validarBotonUnificar(): boolean {
    if (this.formContrato.valid && this.planSeleccionado && this.contratoStorageService.contratoUnificar && this.contratoStorageService.contratoInicial && this.modelVendedor.id) {
      return true;
    } else {
      return false;
    }
  }
}
