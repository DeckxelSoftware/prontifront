import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {FormGroup} from '@angular/forms';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {FORM_ITEM_ACCORDION_CONTRATO} from '../../form/form-item-accordion-contrato';
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
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {MatDialog} from '@angular/material/dialog';
import {
  ModalSeleccionarCuotasComponent
} from '../../../../shared/modal-seleccionar-cuotas/modal-seleccionar-cuotas.component';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {SupervisorResponseDto} from '../../../supervisor/servicios/dto/supervisor.response-dto';
import {CuotaResponseDto} from "../../../cuota/servicios/dto/cuota.response-dto";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {
  ConfiguracionGeneralResponseDto
} from "../../../configuracion-general/servicios/dto/configuracion-general.response-dto";
import {
  cuotaTablePrimeColumn,
  CuotaViewTablaEmitsService
} from "../../../../shared/cuotas-view-table/cuota-view-tabla-emits.service";
import {
  HttpConfiguracionGeneralService
} from "../../../configuracion-general/servicios/http-configuracion-general-service";
import {
  ListaValoresDetalleResponseDto
} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.response-dto";
import {ListaValoresDetalleFindDto} from "../../../lista-valores-detalle/servicios/dto/lista-valores-detalle.find-dto";
import {ListaValoresEnum} from "../../../../constantes/lista-valores/lista-valores.enum";
import {
  HttpListaValoresDetalleService
} from "../../../lista-valores-detalle/servicios/http-lista-valores-detalle-service";
import {SiNoEnum} from "../../../../enums/si-no.enum";

@Component({
  selector: 'app-ruta-crear-contrato',
  templateUrl: './ruta-crear-contrato.component.html',
  styleUrls: ['./ruta-crear-contrato.component.scss']
})
export class RutaCrearContratoComponent implements OnInit {
  parametrosCalculoCuotas: { fechaCobro?: string, plazo?: number, cuota?: number, precio?: number, dsctoPrimeraCuota?: number } = {};
  labelSuperiorCompCuotas = 'Inscripción + Primera cuota';
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
    {field: 'pasaANuevoPlan', nombre: 'Estado'},

  ]
  medioCaptacionSeleccionado = '';
  mediosDeCaptacion: ListaValoresDetalleResponseDto[] = [];

  idContratoEditar!: number;
  editandoContrato = false;
  contrato: ContratoResponseDto = {};

  mostrarTablaPlan = false;
  mostrarTablaCliente = false;
  mostrarTablaVendedor = false;


  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formEditarContrato = new FormGroup({});
  clientes: any[] = [];
  vendedores: any[] = [];

  clienteSeleccionado: ClienteResponseDto = {};
  idVendedorSeleccionado!: number;
  idClienteSeleccionado!: number;
  idPlanSeleccionado!: number;


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
    username: '',
    nombreGrupo: ''

  };

  modelContrato: ContratoResponseDto = {
    numeroDeContrato: '',
    fechaInicio: dayjs().format('YYYY-MM-DD'),
    dsctoInscripcion: 0,
    dsctoPrimeraCuota: 0,
    observacion: '',
    fechaFin: '',
    fechaIniciaCobro: dayjs().format('YYYY-MM-DD'),
    plazoMesSeleccionado: 0,

  }
  // modelEditarContrato: ContratoResponseDto = {
  //   numeroDeContrato: '',
  //   observacion: '',
  //   plazoMesSeleccionado: 0,
  // }

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
              if (this.modelContrato.fechaIniciaCobro) {
                this.parametrosCalculoCuotas.fechaCobro = this.modelContrato.fechaIniciaCobro;
                this.verificarSiPuedeGenerarCuotas();
              }
            },
          },

        },
        {
          className: 'col-4',
          key: 'dsctoInscripcion',
          type: 'input',
          defaultValue: 0,
          templateOptions: {
            type: 'number',
            min: 0,
            step: 0.01,
            max: 9999999999.99,
            label: 'Descuento inscripción',
            change: () => {
              this.modelContrato.dsctoInscripcion = Number(this.formContrato.get('dsctoInscripcion')?.value.toFixed(2));
              this.formContrato.get('dsctoInscripcion')?.setValue(this.modelContrato.dsctoInscripcion);
              this.valorSuperiorCompCuotas = this.calcularValorAPagar();
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas.toFixed(2) + '');
            }
          }
        },

        {
          className: 'col-4',
          key: 'dsctoPrimeraCuota',
          type: 'input',
          defaultValue: 0,
          templateOptions: {
            type: 'number',
            min: 0,
            step: 0.01,
            max: 9999999999.99,
            label: 'Descuento primera cuota',
            change: () => {
              this.modelContrato.dsctoPrimeraCuota = Number(this.formContrato.get('dsctoPrimeraCuota')?.value.toFixed(2));
              this.formContrato.get('dsctoPrimeraCuota')?.setValue(this.modelContrato.dsctoPrimeraCuota);
              this.valorSuperiorCompCuotas = this.calcularValorAPagar();
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');

              this.parametrosCalculoCuotas.dsctoPrimeraCuota = this.modelContrato.dsctoPrimeraCuota;
              this.verificarSiPuedeGenerarCuotas();
            }
          }
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
  // fieldsEditarContrato: FormlyFieldConfig[] = [
  //   {
  //     fieldGroupClassName: 'row',
  //     fieldGroup: [
  //       {
  //         className: 'col-4',
  //         key: 'numeroDeContrato',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'number',
  //           min: 0,
  //           /// required: true,
  //           label: 'Número de contrato',
  //
  //         }
  //       },
  //       {
  //         className: 'col-4',
  //         key: 'fechaInicio',
  //         type: 'input',
  //         templateOptions: {
  //           readonly: true,
  //           type: 'date',
  //           label: 'fechaInicio',
  //
  //         },
  //         expressionProperties: {}
  //       },
  //       {
  //         className: 'col-4',
  //         key: 'fechaIniciaCobro',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'date',
  //           readonly: true,
  //           label: 'Fecha Inicio Cobro',
  //
  //           change: (field, event) => {
  //             if (this.modelContrato.fechaIniciaCobro) {
  //               this.estadoContratoService.fechaCobro.next(new Date(this.modelContrato.fechaIniciaCobro + ' 23:00:00'));
  //             }
  //           },
  //         },
  //
  //       },
  //       {
  //         className: 'col-4',
  //         key: 'dsctoInscripcion',
  //         type: 'input',
  //         templateOptions: {
  //           readonly: true,
  //           type: 'number',
  //           label: 'Descuento inscripción',
  //         }
  //       },
  //
  //       {
  //         className: 'col-4',
  //         key: 'dsctoPrimeraCuota',
  //         type: 'input',
  //         templateOptions: {
  //           type: 'number',
  //           readonly: true,
  //           label: 'Descuento primera cuota',
  //         }
  //       },
  //       {
  //         className: 'col-4',
  //         key: 'observacion',
  //         type: 'input',
  //         templateOptions: {
  //           required: false,
  //           type: 'text',
  //           label: 'Observación',
  //
  //         }
  //       },
  //       {
  //         className: 'col-4',
  //         key: 'plazoMesSeleccionado',
  //         type: 'input',
  //         templateOptions: {
  //           readonly: true,
  //           type: 'number',
  //           label: 'Plazo seleccionado',
  //         }
  //       },
  //     ]
  //   }
  // ]
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


  planSeleccionado!: PlanResponseDto;
  formularioContrato = FORM_ITEM_ACCORDION_CONTRATO();

  constructor(private _httpClienteService: HttpClienteService,
              private _httpVendedorService: HttpVendedorService,
              public estadoContratoService: EstadoContratoService,
              public blockuiService: BlockuiService,
              public route: ActivatedRoute,
              public router: Router,
              public _httpContratoService: HttpContratoService,
              public matDialog: MatDialog,
              private messageService: LogsMlabsService,
              public cuotasTableService: CuotaViewTablaEmitsService,
              private _httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
              public _httpListavaloresDetalle: HttpListaValoresDetalleService
  ) {
  }

  onSubmit(model: any) {
    console.log(model);
  }

  async ngOnInit() {
    this.cuotasTableService.labelSuperior.next(this.labelSuperiorCompCuotas);
    this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
    this.parametrosCalculoCuotas.fechaCobro = this.modelContrato.fechaIniciaCobro;
    this.cuotasTableService.columnas.next(this.columnasTablaCuotas);
    this.cuotasTableService.cuotas.next(this.cuotas);
    await this.obtenerDatosConfiguracionGeneral();
    const {idContrato} = this.route.snapshot.params;
    this.idContratoEditar = idContrato;
    if (this.idContratoEditar) {
      this.editandoContrato = true;
      try {
        const resultadoBusqueda = await this.obtenerDatosContrato();
        if (resultadoBusqueda) {


          this.setearValoresEnFormularios();
          this.verificarSiPuedeGenerarCuotas();
          if (this.contrato) {
            if (this.contrato.cuotaActual && typeof this.contrato.dsctoPrimeraCuota === "number" && this.planSeleccionado.inscripcion && typeof this.contrato.dsctoInscripcion === "number") {
              this.valorSuperiorCompCuotas = (this.contrato.cuotaActual - ((this.contrato.dsctoPrimeraCuota / 100) * this.contrato.cuotaActual)) +
                (this.planSeleccionado.inscripcion - (this.planSeleccionado.inscripcion * (this.planSeleccionado.inscripcion * this.contrato.dsctoInscripcion)))
              this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
            }
          }
        }

      } catch (e) {
        console.error('Error obteniendo contrato');
        this.messageService.toaster({
          titulo: 'ERROR',
          mensaje: 'Error obteniendo datos del contrato. Inténtelo más tarde.',
          tipo: ToasterTipo.error
        })
      }
      this.items = [
        {label: 'Contratos', routerLink: '/contratos'},
        {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
        {label: 'Editar Contrato'},


      ];
      this.home = {icon: 'pi pi-home', routerLink: '/'};

    } else {
      this.editandoContrato = false;
      this.items = [
        {label: 'Contratos', routerLink: '/contratos'},
        {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
        {label: 'Crear Contratos'},


      ];
      this.home = {icon: 'pi pi-home', routerLink: '/'};
    }


  }

  async obtenerDatosContrato() {
    return new Promise((resolve, reject) => {
      this._httpContratoService.find({id: this.idContratoEditar})
        .subscribe(
          {
            next: res => {
              if (res[1] > 0) {
                this.contrato = res[0][0];
                resolve(this.contrato);
              } else {
                reject();
              }

            },
            error: err => {
              console.error('error: ', err)
              reject();
            }
          }
        )
    })

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
          if (res) {
            this.parametrosCalculoCuotas.plazo = res.plazoSeleccionado;
            this.parametrosCalculoCuotas.cuota = res.cuotaSeleccionada;
            this.parametrosCalculoCuotas.precio = res.precioSeleccionado;
            this.modelContrato.plazoMesSeleccionado = res.plazoSeleccionado;
            this.valorSuperiorCompCuotas = this.calcularValorAPagar();
            this.cuotasTableService.datoSuperior.next(this.valorSuperiorCompCuotas + '');
            this.verificarSiPuedeGenerarCuotas();
            this.formContrato.get('plazoMesSeleccionado')?.setValue(res.plazoSeleccionado);
          }

        },
        error: err => {
        }
      }
    )
  }

  mostrarClienteSeleccionado(cliente: ClienteResponseDto) {
    this.mostrarTablaCliente = false;
    if (cliente.id) {
      this.idClienteSeleccionado = cliente.id;
      this.modelCliente = {...cliente, ...cliente.idUsuario};
    }
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
    this.idClienteSeleccionado = 0;
    this.idPlanSeleccionado = 0;
    this.planSeleccionado = {};
    this.router.navigate(['contratos', 'contrato-modulo'])
  }

  enviarEditarContrato() {
    const contratoEditar = {
      dsctoInscripcion: this.modelContrato.dsctoInscripcion ? this.modelContrato.dsctoInscripcion : 0,
      dsctoPrimeraCuota: this.modelContrato.dsctoPrimeraCuota ? this.modelContrato.dsctoPrimeraCuota : 0,
      fechaInicio: this.modelContrato.fechaInicio,
      fechaInicioCobro: this.modelContrato.fechaIniciaCobro,
      idCliente: this.idClienteSeleccionado,
      idPlan: this.idPlanSeleccionado,
      idVendedor: this.idVendedorSeleccionado,
      numeroContrato: this.modelContrato.numeroDeContrato,
      observacion: this.modelContrato.observacion,
      plazoMesSeleccionado: this.modelContrato.plazoMesSeleccionado,
      medioCaptacion: this.medioCaptacionSeleccionado ? this.medioCaptacionSeleccionado : '',
    }
    this._httpContratoService.updateById(contratoEditar, this.idContratoEditar)
      .subscribe(
        {
          next: res => {
            this.messageService.toaster({
              titulo: 'ÉXITO',
              mensaje: 'Contrato actualizado',
              tipo: ToasterTipo.success
            });
            this.router.navigate(['contratos', 'contrato-modulo'])
          },
          error: err => {
            this.messageService.toaster({
              titulo: 'ERROR',
              mensaje: 'Error actualizando contrato',
              tipo: ToasterTipo.error
            });
            console.error('Error actualizando contrato: ', err);
          }
        }
      )

  }

  enviarCrearContrato() {
    // console.log('plansito', this.planSeleccionado);
    this.blockuiService.habilitarBlockUI();

    /*    if (this.modelContrato.plazoMesSeleccionado) {
          this.modelContrato.fechaFin = dayjs(this.modelContrato.fechaIniciaCobro)
            .add(this.modelContrato.plazoMesSeleccionado, 'month')
            .format('YYYY-MM-DD');
        }*/


    let createContrato = {
      idPlan: this.idPlanSeleccionado,
      idCliente: this.idClienteSeleccionado,
      idVendedor: this.idVendedorSeleccionado,
      cuota: this.parametrosCalculoCuotas.cuota,
      ...this.modelContrato,
      // sisHabilitado: 'A',
      fechaInicioCobro: dayjs(this.modelContrato.fechaIniciaCobro).format('YYYY-MM-DD'),
      // fechaInicioCobro: this.modelContrato.fechaIniciaCobro,
      numeroContrato: this.modelContrato.numeroDeContrato,
      medioCaptacion: this.medioCaptacionSeleccionado ? this.medioCaptacionSeleccionado : '',
      // estado: 'En proceso',
    }

    delete createContrato.fechaIniciaCobro;
    delete createContrato.fechaFin;
    delete createContrato.numeroDeContrato;

    // this._httpContratoService.createOne(createContrato);
    this._httpContratoService.crearContrato(createContrato).subscribe({
      next: (resp: any) => {

        this.blockuiService.deshabilitarBlockUI();
        if (resp.codigo === '200') {
          this.messageService.toaster({
            titulo: 'Contrato',
            tipo: ToasterTipo.info,
            mensaje: 'Contrato creado exitosamente'
          });
          this.router.navigate(['contratos', 'contrato-modulo']);
        }
      },
      error: err => {
        console.error('Error al crear contrato', err);
        this.blockuiService.deshabilitarBlockUI();
        this.messageService.toaster({
          titulo: 'Contrato',
          tipo: ToasterTipo.error,
          mensaje: 'No se pudo crear el contrato'
        });

      }
    });

  }

  /*  eventoSelectCliente(evento: any) {
    this.modelCliente = {...evento, ...evento.idUsuario};
    console.log('modelCLiente', this.modelCliente);
  }*/

  /*  eventoSelectVendedor(evento: any) {
      console.log('evnto vendedor', evento);
      this.idVendedorSeleccionado = evento.id;
      const objetoAgenciaSupervisor = {
        agencia: evento.idAgencia.nombre,
        supervisor: evento.idTrabajador.idSupervisor
      }
      this.modelVendedor = {...evento, ...evento.idTrabajador.idUsuario, ...objetoAgenciaSupervisor};
      console.log('modelCLiente', this.modelCliente);

    }*/

  /*buscarVendedores(event: any) {
  console.log(event);
  const busqueda: VendedorFindDto = {
    busqueda: event.query,
  };
  let dataVendedor: any[] = [];
  this._httpVendedorService
    .find(busqueda)
    .toPromise()
    .then(res => res as [VendedorResponseDto[], number])
    .then(data => {
      // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
      // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
      dataVendedor = data[0].map((a: any) => {
        a.label = a.idTrabajador.idUsuario.nombres + ' ' + a.idTrabajador.idUsuario.apellidos;
        a.value = a.id;
        return a;
      });

      console.log(dataVendedor)
      this.vendedores = dataVendedor;
      return dataVendedor;
    });
}*/


  /*buscarCliente(event: any) {
  console.log(event);
  const busqueda: ClienteFindDto = {
    busqueda: event.query,
  };
  let dataCliente: any[] = [];
  this._httpClienteService
    .find(busqueda)
    .toPromise()
    .then(res => res as [ClienteResponseDto[], number])
    .then(data => {
      // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
      // const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
      dataCliente = data[0].map((a: any) => {
        a.label = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
        a.value = a.id;
        return a;
      });

      console.log(dataCliente)
      this.clientes = dataCliente;
      return dataCliente;
    });
}*/


  setearValoresEnFormularios() {
    this.setearValoresEnFormPlan();
    this.setearValoresEnFormContrato();
    this.setearValoresEnFormCliente();
    this.setearValoresEnFormVendedor();
    this.setearParametrosParaGenerarCuotas();
  }

  setearParametrosParaGenerarCuotas() {
    this.parametrosCalculoCuotas.cuota = this.contrato.cuotaActual;
    this.parametrosCalculoCuotas.plazo = this.contrato.plazoMesSeleccionado;
  }

  setearValoresEnFormPlan() {
    // @ts-ignore
    this.planSeleccionado = {...this.contrato.historicoPlanContratoCollection[0].idPlan};
    this.idPlanSeleccionado = this.planSeleccionado.id as number;
    this.parametrosCalculoCuotas.precio = this.planSeleccionado.precio;
  }

  setearValoresEnFormContrato() {
    // @ts-ignore
    this.modelContrato = this.contrato;
  }

  setearValoresEnFormCliente() {
    this.modelCliente = {
      ...this.contrato.idClienteEnGrupo.idCliente, ...this.contrato.idClienteEnGrupo.idCliente.idUsuario,
      nombreGrupo: this.contrato.idClienteEnGrupo.idGrupo.nombreGrupo
    }
    this.clienteSeleccionado = {...this.contrato.idClienteEnGrupo.idCliente, ...this.contrato.idClienteEnGrupo.idCliente.idUsuario}
    this.idClienteSeleccionado = this.clienteSeleccionado.id as number;
  }

  setearValoresEnFormVendedor() {
    this.modelVendedor = {
      ...this.contrato.idVendedor, ...this.contrato.idVendedor?.idTrabajador?.idUsuario,
      agencia: this.contrato.idVendedor?.idAgencia.nombre,
      supervisor: this.filtrarSupervisorActivo(this.contrato.idVendedor?.idAgencia.supervisorCollection)
    };
    this.idVendedorSeleccionado = this.contrato.idVendedor.id as number;
  }

  irCambiarMontoContrato() {
    this.router.navigate(['contratos', 'contrato-modulo', 'cambiar-monto-contrato'])
  }

  validarBotonCrear(): boolean {
    return this.formContrato.valid && this.modelCliente.id && this.modelVendedor.id && this.planSeleccionado
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
      ;
    } else {
      return 'No tiene'
    }
  }


  armarCuotasPlan(parametros: { fechaCobro: string, plazo: number, cuota: number, precio: number, dsctoPrimeraCuota: number }) {

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
    cuota.pasaANuevoPlan = 'PENDIENTE';
    // armar el numero de cuotas segun el plazo
    // @ts-ignore
    for (let i = 0; i < parametros.plazo; i++) {
      let cuotaAux = {...cuota}
      cuotaAux.numeroCuota = i + 1;
      cuotaAux.fechaCobro = dayjs(parametros.fechaCobro).add(i, 'month').format('DD/MM/YYYY');
      cuotaAux.valorPorCobrar = parametros.cuota;
      cuotaAux.valorPagadoCuota = 0;
      this.cuotas.push({...cuotaAux});
    }

    if(parametros.dsctoPrimeraCuota >= 0){
      this.cuotas[0].valorCuota = parametros.cuota - (parametros.cuota * parametros.dsctoPrimeraCuota / 100);
      // @ts-ignore
      this.cuotas[0].valorTasaAdministrativa = (this.cuotas[0].valorCuota - (cuota.abonoCapital)) / (1 + (this.configuracionGeneral.ivaPorcentaje / 100));
      // @ts-ignore
      this.cuotas[0].valorImpuesto =  this.cuotas[0].valorTasaAdministrativa * (this.configuracionGeneral.ivaPorcentaje / 100);
      this.cuotas[0].valorPorCobrar =  this.cuotas[0].valorCuota;
    }
    // @ts-ignore
    if (this.cuotas[0].valorCuota < this.cuotas[0].abonoCapital){
      this.cuotas[0].abonoCapital = this.cuotas[0].valorCuota;
      this.cuotas[0].valorTasaAdministrativa = 0;
      this.cuotas[0].valorImpuesto = 0;
      
    }

    this.cuotasTableService.cuotas.next(this.cuotas);
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
              this.messageService.toaster({
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
    if (this.parametrosCalculoCuotas.cuota &&
      this.parametrosCalculoCuotas.precio &&
      this.parametrosCalculoCuotas.fechaCobro &&
      this.parametrosCalculoCuotas.plazo) {
      // @ts-ignore
      this.armarCuotasPlan(
        {
          fechaCobro: this.parametrosCalculoCuotas.fechaCobro,
          cuota: this.parametrosCalculoCuotas.cuota,
          precio: this.parametrosCalculoCuotas.precio,
          plazo: this.parametrosCalculoCuotas.plazo,
          dsctoPrimeraCuota: this.parametrosCalculoCuotas.dsctoPrimeraCuota || 0,
        }
      )
    }
  }

  calcularValorAPagar(): number {
    if (this.planSeleccionado.inscripcion && this.parametrosCalculoCuotas.cuota) {
      // @ts-ignore
      if (this.modelContrato?.dsctoInscripcion >= 0 && this.modelContrato?.dsctoPrimeraCuota >= 0) {
        // @ts-ignore
        return (this.planSeleccionado.inscripcion - (this.planSeleccionado.inscripcion * (this.modelContrato.dsctoInscripcion / 100))) + (this.parametrosCalculoCuotas.cuota - (this.parametrosCalculoCuotas.cuota * (this.modelContrato.dsctoPrimeraCuota / 100)));
      } else {
        return this.planSeleccionado.inscripcion + this.parametrosCalculoCuotas.cuota;
      }
    } else {
      return 0;
    }
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
