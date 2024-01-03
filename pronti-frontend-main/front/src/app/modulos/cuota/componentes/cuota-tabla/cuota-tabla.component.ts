import {Component, OnDestroy, OnInit} from '@angular/core';
import {CuotaResponseDto} from '../../servicios/dto/cuota.response-dto';
import {CuotaFindDto} from '../../servicios/dto/cuota.find-dto';
import {MatDialog} from '@angular/material/dialog';
import {HttpCuotaService} from '../../servicios/http-cuota-service';
import {ConfirmationService} from 'primeng/api';
import {FormGroup} from '@angular/forms';
import {CuotaCreateDto} from '../../servicios/dto/cuota.create-dto';
import {CuotaUpdateDto} from '../../servicios/dto/cuota.update-dto';
import {FORM_CUOTA} from '../../form/form-cuota';
import {AbstractTable} from '../../../../abstract/table/abstract-table';
import {CreateUpdateModalComponent} from '../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {MENSAGE_TOAST} from '../../../../constantes/toaster/mensaje-toast';
import {FormField, SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {TableAbstractClass} from '../../../../abstract/table/interfaces/table-abstract-class';
import {ModalComponent} from '../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {AutocompleteFormInterface} from '../../../../abstract/table/interfaces/autocomplete-form.interface';
import {CreateUpdateModalParameters} from '../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {MatStepperArray} from '../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {EstadoContratoService} from '../../../../servicios/estado-contrato/estado-contrato.service';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {HttpConfiguracionGeneralService} from '../../../configuracion-general/servicios/http-configuracion-general-service';
import {ConfiguracionGeneralResponseDto} from '../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import * as dayjs from 'dayjs'
import {HistoricoPlanContratoResponseDto} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {Subscription} from 'rxjs';
import {tipoCambioContrato} from '../../../contrato/rutas/ruta-editar-contrato/ruta-editar-contrato.component';

@Component({
  selector: 'app-cuota-tabla',
  templateUrl: './cuota-tabla.component.html',
  styleUrls: ['./cuota-tabla.component.scss']
})
export class CuotaTablaComponent extends AbstractTable<CuotaResponseDto, CuotaFindDto>
  implements OnInit, OnDestroy, TableAbstractClass<CuotaResponseDto>, AutocompleteFormInterface {
  historicoPlan: HistoricoPlanContratoResponseDto = {};
  esCambioDePlan!: Boolean;
  esCambioMonto!: Boolean;
  tipoCambio!: tipoCambioContrato | boolean;
  descuentoPrimeraCuota = 0;
  descuentoInscripcion = 0;
  descuentoRecargo = 0;
  plazo = 0;
  cantidadCuotasPasanANuevoPlan = 0;
  skip = 0;
  take = 1;
  cargando = false;
  configuracionGeneral: ConfiguracionGeneralResponseDto = {};
  plan: PlanResponseDto = {};
  mostrarTabla = true;
  fechaCobro = new Date();
  cuotas: CuotaResponseDto[] = [];
  tasaCambioContratoReactivacion = 0;
  subscripciones: Subscription[] = [];
  searchBarFormFields: FormField[] = [
    // {
    //   help: 'Puede buscar por nombre',
    //   formControlName: 'busqueda',
    //   initialValue: "",
    //   validators: [],
    //   type: fieldType.text,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   label: 'Busqueda',
    //   placeholder: 'Ej: ...',
    //   column: '12',
    //   actualValue: '',
    // },
    // {
    //   label: 'Habilitado',
    //   formControlName: 'sisHabilitado',
    //   type: fieldType.select,
    //   help: 'Seleccione si esta habilitado o no',
    //   select:{
    //     filterBy:'sisHabilitado',
    //     dataKey:'sisHabilitado',
    //     filterPlaceholder:'0 = Inactivo, 1 = Activo',
    //     optionLabel: 'nombre',
    //     options:[
    //       {
    //         sisHabilitado:ActivoInactivo.Activo,
    //         nombre: 'Activo',
    //       },
    //       {
    //         sisHabilitado:ActivoInactivo.Inactivo,
    //         nombre: 'Inactivo',
    //       }
    //     ]
    //   },
    //   initialValue: "",
    //   validators: [],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   placeholder: 'Ej: Activo / Inactivo',
    //   column: '6',
    //   actualValue: '',
    // },
  ];

  constructor(
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
    public dialog: MatDialog,
    public httpCuotaService: HttpCuotaService,
    public confirmationService: ConfirmationService,
    public estadoContratoService: EstadoContratoService,
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
  ) {
    super(
      httpCuotaService,
      {
        nombreRegistro: 'Cuota',
        messageService: logsMlabsService,
        blockuiService: blockuiService,
        confirmationService: confirmationService,
      }
    )
  }

  async ngOnInit() {

    try {
      await this.obtenerDatosConfiguracionGeneral();

      this.escuchaCambioFechaCobro();
      this.escucharPlan();
      this.escucharEsCambioDePlan(); // muestra la columna extra de cuota pasa a nuevo plan
      this.escucharHistoricoPlan(); // para cambio de plan
      this.escucharDescuentoInscripcion();
      this.escucharDescuentoPrimeraCuota();
      this.escucharPlazo();
      this.escucharDescuentoRecargo();
      this.escucharTipoCambioContrato();
      this.escucharTasaCambioContrato()
    } catch (e) {
      console.error('Error consultado configuracion general');
    }


  }

  escucharTasaCambioContrato() {
    this.subscripciones.push(
      this.estadoContratoService.tasaCambioContrato.subscribe(
        {
          next: tasaCambioReactivacion => {
            this.tasaCambioContratoReactivacion = tasaCambioReactivacion;
            if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
              this.armarCuotasPlan({
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo,
              });
              this.mostrarTabla = true;
            } else {
              this.mostrarTabla = false;
            }
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo cuotas:', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharTipoCambioContrato() {
    this.subscripciones.push(
      this.estadoContratoService.tipoCambio.subscribe(
        {
          next: tipoCambio => {
            this.tipoCambio = tipoCambio;
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo historico plan: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharHistoricoPlan() {
    this.subscripciones.push(
      this.estadoContratoService.historicoPlanContrato.subscribe(
        {
          next: historicoPlan => {
            this.historicoPlan = {...historicoPlan};
            console.log({historicoPlan})
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo historico plan: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharDescuentoRecargo() {
    this.subscripciones.push(
      this.estadoContratoService.descuentoRecargo.subscribe(
        {
          next: descuentoRecargo => {
            this.descuentoRecargo = descuentoRecargo;

          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo decuento recargo: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharEsCambioDePlan() {
    this.subscripciones.push(
      this.estadoContratoService.cambioDePlan.subscribe(
        {
          next: cambioDePlan => {
            this.esCambioDePlan = cambioDePlan;
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo parametro cambio de plan: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  // escucharCantidadDeCuotasPasanANuevoPlan() {
  //   this.estadoContratoService.cantidadCuotasPasanANuevoPlan.subscribe(
  //     {
  //       next: cantidadCuotasPasan => {
  //         console.log(cantidadCuotasPasan);
  //         this.cantidadCuotasPasanANuevoPlan = cantidadCuotasPasan;
  //       },
  //       error: err => {
  //         this.mostrarTabla = false;
  //         console.error('Error obteniendo parametro cambio de plan: ', err);
  //         this.parameters.messageService.toaster({
  //           titulo: 'Error',
  //           mensaje: 'Error obteniendo cuotas.',
  //           tipo: ToasterTipo.error
  //         });
  //       }
  //     }
  //   )
  // }

  escuchaCambioFechaCobro() {
    this.subscripciones.push(
      this.estadoContratoService.fechaCobro.subscribe(
        {
          next: fechaCobro => {
            this.fechaCobro = fechaCobro;
            if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
              this.armarCuotasPlan({
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo,
              });
              this.mostrarTabla = true;
            } else {
              this.mostrarTabla = false;
            }
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo fecha cobro: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharDescuentoPrimeraCuota() {
    this.subscripciones.push(
      this.estadoContratoService.descuentoPrimeraCuota.subscribe(
        {
          next: descuentoPrimeraCuota => {
            this.descuentoPrimeraCuota = descuentoPrimeraCuota;
            if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
              this.armarCuotasPlan({
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo,
              });
              this.mostrarTabla = true;
            } else {
              this.mostrarTabla = false;
            }
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo descuento primera cuota: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharDescuentoInscripcion() {
    this.subscripciones.push(
      this.estadoContratoService.descuentoInscripcion.subscribe(
        {
          next: descuentoInscripcion => {
            this.descuentoInscripcion = descuentoInscripcion;
            if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
              this.armarCuotasPlan({
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo,
              });
              this.mostrarTabla = true;
            } else {
              this.mostrarTabla = false;
            }
          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo descuento inscripcion: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharPlazo() {
    this.subscripciones.push(
      this.estadoContratoService.plazo.subscribe(
        {
          next: plazo => {
            this.plazo = plazo;
            if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
              this.armarCuotasPlan({
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo,
              });
              this.mostrarTabla = true;
            } else {
              this.mostrarTabla = false;
            }


          },
          error: err => {
            this.mostrarTabla = false;
            console.error('Error obteniendo plazo: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  escucharPlan() {
    this.subscripciones.push(
      this.estadoContratoService.plan.subscribe(
        {
          next: plan => {
            if (Object.keys(plan).length > 0) {
              this.plan = plan;
              let parametrosArmarCuotas = {
                plan: this.plan,
                fechaCobro: this.fechaCobro,
                descuentoPrimeraCuota: this.descuentoPrimeraCuota,
                descuentoInscripcion: this.descuentoInscripcion,
                plazo: this.plazo
              }
              if (this.plazo > 0) {
                this.armarCuotasPlan(parametrosArmarCuotas);
                this.mostrarTabla = true;
              }
            } else {
              this.plan = {};
              this.mostrarTabla = false;
            }
          },
          error: err => {
            this.mostrarTabla = false;
            this.plan = {};
            console.error('Error obteniendo plan: ', err);
            this.parameters.messageService.toaster({
              titulo: 'Error',
              mensaje: 'Error obteniendo cuotas.',
              tipo: ToasterTipo.error
            });
          }
        }
      )
    )
  }

  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }

  createOrEditModal(closeModal: ModalComponent): void {
    const values = this.getFormData(this.createEditFormArray, this.createEditFormGroup);
    if (this.create) {
      this.blockuiService.habilitarBlockUI();
      this.httpCuotaService
        .createOne(values as CuotaCreateDto)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error creando Cuota", data: values});
          },
        });
    } else {
      this.blockuiService.habilitarBlockUI();
      this.httpCuotaService
        .updateById(values as CuotaUpdateDto, this.recordUpdated.id as number)
        .subscribe({
          next: () => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(
              MENSAGE_TOAST.creacionExitosa(
                this.parameters.nombreRegistro ? this.parameters.nombreRegistro : 'Registro'
              )
            );
            closeModal.closeModal();
            this.searchData();
          },
          error: (error) => {
            this.blockuiService.deshabilitarBlockUI();
            this.parameters.messageService.toaster(MENSAGE_TOAST.error());
            console.error({error: error, message: "Error actualizando Cuota", data: values});
          },
        });
    }
  }

  fieldModalChanged(event: FormField, enableButton: ModalComponent): void {
    if (event.formGroup.valid) {
      this.createEditFormGroup = event.formGroup;
      enableButton.enableButton(true);
    } else {
      this.createEditFormGroup = new FormGroup({});
      enableButton.enableButton(false);
    }
  }

  openDialog(formFields: FormField[], arrayAccordeon: MatStepperArray[] = []): void {
    const createUpdateModalParameters: CreateUpdateModalParameters = {
      title: `${this.create ? 'Crear ' : 'Actualizar'} ${this.parameters.nombreRegistro}`,
      description: "Por favor llene la informacion pertinente.",
      accordeons: arrayAccordeon,
      formsFields: formFields,
      button: `${this.create ? 'Crear ' : 'Actualizar'} `,
      route: this,
    };
    const dialogRef = this.dialog.open(CreateUpdateModalComponent, {
      data: createUpdateModalParameters,
    });
  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      // setear formgroup
      this.findForm = event.formGroup;
      if (event.formControlName === 'busqueda') {
        this.findDto.busqueda = event.actualValue
      }
      if (event.formControlName === 'sisHabilitado') {
        this.findDto.sisHabilitado = event.actualValue?.sisHabilitado
      }
      // Habilitar boton
      this.searchButtonDisabled = false;
    } else {
      // limpiar dto
      this.clearFindDto();
      // Deshabilitar boton
      this.searchButtonDisabled = false;
    }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    // switch (event.field.formControlName) {
    //   case FormCuotaEnum.generoLibro:
    //     this.buscarAutocomplete(event);
    // }
  }


  createOrEdit(record?: CuotaResponseDto) {
    const formArray = [
      ...FORM_CUOTA(),
    ];
    this.createEditFormArray = [...formArray];
    if (record) {
      this.recordUpdated = {...record};
      this.fillForm(this.recordUpdated, this.createEditFormArray);
      this.create = false;
    } else {
      this.create = true;
      this.recordUpdated = undefined;
    }
    this.openDialog(this.createEditFormArray);
  }

  obtenerDatosConfiguracionGeneral() {
    return new Promise((resolve, reject) => {
      this.httpConfiguracionGeneralService.find(this.findDto)
        .subscribe(
          {
            next: (configuraciones) => {
              this.configuracionGeneral = configuraciones[0][0];
              resolve(this.configuracionGeneral);
            },
            error: err => {
              this.parameters.messageService.toaster({
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

  armarCuotasPlan(parametros: { plan: PlanResponseDto, fechaCobro: Date, descuentoPrimeraCuota: number, descuentoInscripcion: number, plazo: number }) {

    this.cargando = true;
    // this.mostrarTabla = false;
    let cuotas: CuotaResponseDto[] = [];
    let cuota: CuotaResponseDto = {};
    // @ts-ignore
    cuota.abonoCapital = parametros.plan.precio / parametros.plazo;
    cuota.sisHabilitado = ActivoInactivo.Activo;
    // @ts-ignore
    cuota.valorTasaAdministrativa = (parametros.plan.tasaAdministrativa * cuota.abonoCapital) / 100;
    // @ts-ignore
    cuota.valorImpuesto = cuota.valorTasaAdministrativa * this.configuracionGeneral.ivaPorcentaje / 100; // quitar el 12 cuando se puedan cargar los datos de configuracion
    cuota.valorCuota = cuota.abonoCapital + cuota.valorTasaAdministrativa + cuota.valorImpuesto;

    // armar el numero de cuotas segun el plazo
    // @ts-ignore
    for (let i = 0; i < parametros.plazo; i++) {
      let cuotaAux = {...cuota}
      cuotaAux.numeroCuota = i + 1;
      cuotaAux.fechaCobro = dayjs(parametros.fechaCobro).add(i, 'month').format('DD/MM/YYYY');
      cuotas.push({...cuotaAux});
    }
    if (this.esCambioDePlan && Object.keys(this.historicoPlan).length > 0) {
      // @ts-ignore
      const cuotasCobradas = this.historicoPlan.totalCuotasCobradas - 1;

      // @ts-ignore
      const valorCuotaAnterior = this.historicoPlan.cuotaCollection[0].valorCuota;

      const cuotasPasanANuevoPlan = Math.floor((cuotasCobradas * valorCuotaAnterior) / cuota.valorCuota);
      console.log({
        cuotasCobradas,
        valorCuotaAnterior,
        cuotasPasanANuevoPlan,
        valorCuota: cuota,
        iva: this.configuracionGeneral.ivaPorcentaje
      });
      ////////////////
      let capital1 = 0;
      let totalPagadoPrimerPlan = 0;
      let capital2 = 0;
      let cobradoNuevoPlan = 0;
      let tasaAdministrativa1 = 0;
      for (let i = 1; i <= cuotasCobradas; i++) {
        // @ts-ignore
        capital1 = this.historicoPlan.cuotaCollection[i].abonoCapital + capital1;
        // @ts-ignore
        totalPagadoPrimerPlan = this.historicoPlan.cuotaCollection[i].abonoCapital + this.historicoPlan.cuotaCollection[i].valorTasaAdministrativa + totalPagadoPrimerPlan;
        // @ts-ignore
        tasaAdministrativa1 = this.historicoPlan.cuotaCollection[i].valorTasaAdministrativa + this.historicoPlan.cuotaCollection[i].valorImpuesto + tasaAdministrativa1;
      }


      cobradoNuevoPlan = cuotasPasanANuevoPlan * cuota.valorCuota;
      const diferenciaCobrada = totalPagadoPrimerPlan - cobradoNuevoPlan; // Primer plan con respecto al segundo
      const tasaMasImpuestoNuevoPlan = cuota.valorImpuesto + cuota.valorTasaAdministrativa; // tasa mas impuesto
      const abonoAlNuevoCapital = diferenciaCobrada - tasaMasImpuestoNuevoPlan; // abono al abono capital
      capital2 = Number((cuota.abonoCapital * cuotasPasanANuevoPlan + abonoAlNuevoCapital).toFixed(2));
      const saldo = Number((capital1 - capital2).toFixed(2));
      let tasaAdministrativa2 = (cuota.valorTasaAdministrativa + cuota.valorImpuesto) * cuotasPasanANuevoPlan;
      if (abonoAlNuevoCapital > 0) {
        tasaAdministrativa2 += abonoAlNuevoCapital;
      }
      const diferenciaTasasAdministrativas = Number((tasaAdministrativa1 - tasaAdministrativa2).toFixed(2));
      const comprobacion = saldo + diferenciaTasasAdministrativas;
      console.log({cuotasPasanANuevoPlan, capital1, capital2, saldo, diferenciaTasasAdministrativas})
      if (comprobacion === 0) {
        console.log('todo ok');
      } else {
        console.log('comprobacion gg');
      }

      // @ts-ignore
      if (cuotasPasanANuevoPlan > 0) {
        if (parametros.plazo >= cuotasPasanANuevoPlan) {
          for (let j = cuotas.length - 1; j >= cuotas.length - cuotasPasanANuevoPlan; j--) {
            cuotas[j].pasaANuevoPlan = SiNoEnum.SI;
          }
        } else {
          for (let i = 0; i < cuotas.length; i++) {
            cuotas[i]['pasaANuevoPlan'] = SiNoEnum.SI;
          }
        }
      }

    }

    this.cuotas = cuotas;
    this.totalRecords = this.cuotas.length;
    this.skip = 0;
    this.take = 1;
    this.startingRows = 1;
    this.tableData = this.cuotas.slice(this.skip, this.startingRows);
    setTimeout(() => {
      this.cargando = false;
    }, 500)
    return cuotas;
  }

  paginarDatos(event: any) {
    this.skip = event.first;
    this.take = event.rows + event.first;
    this.tableData = this.cuotas.slice(event.first, event.rows + event.first);
  }

  calcularValorConDescuento(valor: number, descuento: number) {
    if (descuento > 0) {
      return valor - (valor * (descuento / 100))
    } else {
      return valor;
    }
  }

  ngOnDestroy() {
    this.subscripciones.map(subscripcion => {
      subscripcion.unsubscribe();
    })
  }
}
