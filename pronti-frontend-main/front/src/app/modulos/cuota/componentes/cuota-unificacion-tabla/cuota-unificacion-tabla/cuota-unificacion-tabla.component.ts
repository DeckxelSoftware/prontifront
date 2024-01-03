import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractTable} from '../../../../../abstract/table/abstract-table';
import {CuotaResponseDto} from '../../../servicios/dto/cuota.response-dto';
import {CuotaFindDto} from '../../../servicios/dto/cuota.find-dto';
import {TableAbstractClass} from '../../../../../abstract/table/interfaces/table-abstract-class';
import {AutocompleteFormInterface} from '../../../../../abstract/table/interfaces/autocomplete-form.interface';
import {HistoricoPlanContratoResponseDto} from '../../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {tipoCambioContrato} from '../../../../contrato/rutas/ruta-editar-contrato/ruta-editar-contrato.component';
import {ConfiguracionGeneralResponseDto} from '../../../../configuracion-general/servicios/dto/configuracion-general.response-dto';
import {PlanResponseDto} from '../../../../plan/servicios/dto/plan.response-dto';
import {Subscription} from 'rxjs';
import {FormField, SearchAutoCompleteInterface} from '../../../../../componentes/forms/interfaces/form-field';
import {BlockuiService} from '../../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../../servicios/logs-mensajes/logs-mlabs.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpCuotaService} from '../../../servicios/http-cuota-service';
import {ConfirmationService} from 'primeng/api';
import {EstadoContratoService} from '../../../../../servicios/estado-contrato/estado-contrato.service';
import {HttpConfiguracionGeneralService} from '../../../../configuracion-general/servicios/http-configuracion-general-service';
import {ToasterTipo} from '../../../../../servicios/logs-mensajes/enums/toaster-tipo';
import {ModalComponent} from '../../../../../componentes/dialog/create-update-modal/interfaces/modal-component';
import {CuotaCreateDto} from '../../../servicios/dto/cuota.create-dto';
import {MENSAGE_TOAST} from '../../../../../constantes/toaster/mensaje-toast';
import {CuotaUpdateDto} from '../../../servicios/dto/cuota.update-dto';
import {FormGroup} from '@angular/forms';
import {MatStepperArray} from '../../../../../componentes/forms/form-container/interfaces/mat-stepper-array';
import {CreateUpdateModalParameters} from '../../../../../componentes/dialog/create-update-modal/interfaces/create-update-modal-parameters';
import {CreateUpdateModalComponent} from '../../../../../componentes/dialog/create-update-modal/create-update-modal.component';
import {FORM_CUOTA} from '../../../form/form-cuota';
import {ActivoInactivo} from '../../../../../enums/activo-inactivo';
import * as dayjs from 'dayjs';
import {SiNoEnum} from '../../../../../enums/si-no.enum';

@Component({
  selector: 'app-cuota-unificacion-tabla',
  templateUrl: './cuota-unificacion-tabla.component.html',
  styleUrls: ['./cuota-unificacion-tabla.component.scss']
})

export class CuotaUnificacionTablaComponent extends AbstractTable<CuotaResponseDto, CuotaFindDto>
  implements OnInit, OnDestroy, TableAbstractClass<CuotaResponseDto>, AutocompleteFormInterface {


  historicoPlan: HistoricoPlanContratoResponseDto = {};

  configuracionGeneral: ConfiguracionGeneralResponseDto = {};

  plan: PlanResponseDto = {};

  cuotas: CuotaResponseDto[] = [];

  descuentoPrimeraCuota = 0;
  descuentoInscripcion = 0;
  cuotasPagadas = 0;
  montoPagado = 0;
  plazo = 0;

  skip = 0;
  take = 1;


  mostrarTabla = true;
  cargando = false;
  fechaCobro = new Date();


  tasaCambioContratoReactivacion = 0;
  subscripciones: Subscription[] = [];
  searchBarFormFields: FormField[] = [];

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

      //listener de plan
      this.escucharPlan();
      this.escucharPlazo();
      // this.escucharCuotasPasar()


      // listener de formulario contrato
      this.escuchaCambioFechaCobro();
      this.escucharDescuentoInscripcion();
      this.escucharDescuentoPrimeraCuota();

    } catch (e) {
      console.error('Error consultado configuracion general');
    }


  }


  clearFindDto(): void {
    this.findDto.id = undefined;
    this.findDto.busqueda = undefined;
    this.findDto.sisHabilitado = undefined;
  }


  obtenerDatosConfiguracionGeneral(): Promise<ConfiguracionGeneralResponseDto | boolean> {
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

  escucharTasaCambioContrato() {
    this.subscripciones.push(
      this.estadoContratoService.tasaCambioContrato.subscribe(
        {
          next: tasaCambioReactivacion => {
            console.log('tasa de cambio', tasaCambioReactivacion);
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


  // escucharHistoricoPlan() {
  //   this.subscripciones.push(
  //     this.estadoContratoService.historicoPlanContrato.subscribe(
  //       {
  //         next: historicoPlan => {
  //           this.historicoPlan = {...historicoPlan};
  //           console.log('historico plan ',{historicoPlan})
  //         },
  //         error: err => {
  //           this.mostrarTabla = false;
  //           console.error('Error obteniendo historico plan: ', err);
  //           this.parameters.messageService.toaster({
  //             titulo: 'Error',
  //             mensaje: 'Error obteniendo cuotas.',
  //             tipo: ToasterTipo.error
  //           });
  //         }
  //       }
  //     )
  //   )
  // }


  escuchaCambioFechaCobro(): void {
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

  // escucharCuotasPasar() {
  //   this.estadoContratoService.cuotasPasarUnificacion.subscribe(
  //     {
  //       next: valores => {
  //         console.log('mirame htp', valores);
  //         this.cuotasPagadas = valores.cuotasAPasar;
  //         this.montoPagado = valores.montoAPasar;
  //         if (this.plazo > 0 && Object.keys(this.plan).length > 0) {
  //           this.armarCuotasPlan({
  //             plan: this.plan,
  //             fechaCobro: this.fechaCobro,
  //             descuentoPrimeraCuota: this.descuentoPrimeraCuota,
  //             descuentoInscripcion: this.descuentoInscripcion,
  //             plazo: this.plazo,
  //           });
  //           this.mostrarTabla = true;
  //         } else {
  //           this.mostrarTabla = false;
  //         }
  //       }
  //     }
  //   )
  // }

  mostrarDatoCobrado(registro: CuotaResponseDto): number {
    if (registro.pasaANuevoPlan === 'S') {
      return Number(registro.valorCuota);
    } else {
      return 0;
    }
  }

  agregarCuotaAbonada() {
    const indiceCuotaAbono =  this.cuotas.length - this.cuotasPagadas - 1;
    const cuotaCuotaAbono = this.cuotas[indiceCuotaAbono] as CuotaResponseDto;
    const cuotasPasadas = this.cuotasPagadas * Number(cuotaCuotaAbono.valorCuota);

    if (this.montoPagado > cuotasPasadas) {
      this.cuotas[indiceCuotaAbono].valorPagadoCuota = this.montoPagado - cuotasPasadas;
    }
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
            console.log('plazo', plazo);
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
            console.log('plan', plan);
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


  armarCuotasPlan(parametros: { plan: PlanResponseDto, fechaCobro: Date, descuentoPrimeraCuota: number, descuentoInscripcion: number, plazo: number }) {

    this.cargando = true;

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
    const cuotasPasanANuevoPlan = this.cuotasPagadas;

    // @ts-ignore
    if (cuotasPasanANuevoPlan > 0) {
      if (parametros.plazo >= cuotasPasanANuevoPlan) {
        for (let j = cuotas.length - 1; j >= cuotas.length - cuotasPasanANuevoPlan; j--) {
          cuotas[j].pasaANuevoPlan = SiNoEnum.SI;
          cuotas[j].valorPagadoCuota = cuota.valorCuota;
        }
      } else {
        for (let i = 0; i < cuotas.length; i++) {
          cuotas[i]['pasaANuevoPlan'] = SiNoEnum.SI;
          cuotas[i].valorPagadoCuota = cuota.valorCuota;
        }
      }
    }

    if (Object.keys(this.historicoPlan).length > 0) {
      // @ts-ignore
      const cuotasCobradas = this.historicoPlan.totalCuotasCobradas - 1;

      // @ts-ignore
      const valorCuotaAnterior = this.historicoPlan.cuotaCollection[0].valorCuota;

      // const cuotasPasanANuevoPlan = Math.floor((cuotasCobradas * valorCuotaAnterior) / cuota.valorCuota);
      const cuotasPasanANuevoPlan = this.cuotasPagadas;

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
    }, 500);

    this.agregarCuotaAbonada();
    return cuotas;
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

  // buscarAutocomplete(evento: SearchAutoCompleteInterface) {
  //   const busqueda: NombreCampoBusquedaDto = {
  //     nombreCampo: evento.query,
  //   };
  //   this._nombrCampoService
  //       .buscar(busqueda)
  //       .toPromise()
  //       .then(res => res as [NombreCampoInterface[], number])
  //       .then(data => {
  //         const arregloDatos = data[0];
  //         // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
  //         const arregloDatos = data[0].map((a:any)=>{ a.nombreCompeto = a.nombre + ' ' + a.apellido; return a;});
  //         if (evento.campoFormulario.autocomplete) {
  //           if (Array.isArray(arregloDatos)) {
  //             evento.campoFormulario.autocomplete.suggestions = [...arregloDatos];
  //           } else {
  //             evento.campoFormulario.autocomplete.suggestions = [arregloDatos];
  //           }
  //         }
  //         return data;
  //       });
  // }


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

  ngOnDestroy() {
    this.subscripciones.map(subscripcion => {
      subscripcion.unsubscribe();
    })
  }

}
