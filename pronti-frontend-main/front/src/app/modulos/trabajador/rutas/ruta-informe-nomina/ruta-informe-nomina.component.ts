import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup} from "@angular/forms";
import {ActivoInactivo} from "../../../../enums/activo-inactivo";
import {ModalidadContrato} from "../../../../enums/modalidad-contrato";
import * as dayjs from "dayjs";
import {FormTrabajadorEnum} from "../../form/form-trabajador.enum";
import {HttpPeriodoLaboralService} from "../../../periodo-laboral/servicios/http-periodo-laboral-service";
import {HttpAgenciaService} from "../../../agencia/servicios/http-agencia-service";
import {HttpTrabajadorService} from "../../servicios/http-trabajador-service";
import {AgenciaFindDto} from "../../../agencia/servicios/dto/agencia.find-dto";
import {AgenciaResponseDto} from "../../../agencia/servicios/dto/agencia.response-dto";
import {TrabajadorFindDto} from "../../servicios/dto/trabajador.find-dto";
import {TrabajadorResponseDto} from "../../servicios/dto/trabajador.response-dto";
import * as xlsx from "xlsx-with-styles";
import {PeriodoLaboralFindDto} from '../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto';
import {PeriodoLaboralResponseDto} from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';
import {HttpRolPagoService} from "../../../rol-pago/servicios/http-rol-pago-service";
import {RolPagoResponseDto} from "../../../rol-pago/servicios/dto/rol-pago.response-dto";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {MensajeToaster} from "../../../../servicios/logs-mensajes/intefaces/mensaje-toaster";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {FilaInterface} from "../../../periodo-laboral/rutas/ruta-informe-ingresos/ruta-informe-ingresos.component";
import {
  DetalleNovedadRolPagoResponseDto
} from "../../../detalle-novedad-rol-pago/servicios/dto/detalle-novedad-rol-pago.response-dto";
import {timeout} from "rxjs";

@Component({
  selector: 'app-ruta-informe-nomina',
  templateUrl: './ruta-informe-nomina.component.html',
  styleUrls: ['./ruta-informe-nomina.component.scss']
})
export class RutaInformeNominaComponent {
  items: MenuItem[] = [];
  home!: MenuItem;
  findDto: any = {};
  datos: InformeNomina[] = [];
  rolesPAgo: RolPagoResponseDto[] = [];
  periodoSeleccionado: PeriodoLaboralResponseDto = {};
  datosTabla: any[] = [];
  searchBarFormFields: FormField[] = [
    // {
    //   help: '',
    //   formControlName: 'anio',
    //   initialValue: dayjs().year(),
    //   validators: [],
    //   type: fieldType.text,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   label: 'Año',
    //   placeholder: '',
    //   column: '6',
    //   actualValue: dayjs().year(),
    // },
    {
      label: 'Periodo',
      placeholder: '',
      help: '',
      formControlName: 'idPeriodoLaboral',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'mostrar',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Agencia',
      placeholder: '',
      help: '',
      formControlName: 'idAgencia',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Trabajador',
      placeholder: '',
      help: '',
      formControlName: 'idTrabajador',
      initialValue: '',
      validators: [],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombreCompleto',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Habilitado',
      formControlName: 'sisHabilitado',
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'sisHabilitado',
        dataKey: 'sisHabilitado',
        filterPlaceholder: '0 = Inactivo, 1 = Activo',
        optionLabel: 'nombre',
        options: [
          {
            sisHabilitado: ActivoInactivo.Activo,
            nombre: 'Activo',
          },
          {
            sisHabilitado: ActivoInactivo.Inactivo,
            nombre: 'Inactivo',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },
  ];
  detallesNovedadRolPago: DetalleNovedadRolPagoResponseDto[] = [];
  diasPeriodo = 0;

  constructor(
    public httpPeriodoLaboralService: HttpPeriodoLaboralService,
    public httpAgenciaService: HttpAgenciaService,
    public httpTrabajadorService: HttpTrabajadorService,
    public httpRolPagoService: HttpRolPagoService,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
  ) {
    this.items = [
      {label: 'Contabilidad menú', routerLink: '/contabilidad'},
      {label: 'Reportes menú', routerLink: '/contabilidad/reportes-contabilidad-menu'},
      {label: 'Informe de nómina'},
    ];
    // this.findDto.anio = dayjs().year();

  }

  buscarAutocompleteAgencia(evento: SearchAutoCompleteInterface) {
    const busqueda: AgenciaFindDto = {
      busqueda: evento.query,
    };
    this.httpAgenciaService
      .find(busqueda)
      .toPromise()
      .then(res => res as [AgenciaResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => {
        //   a.nombreCompeto = a.nombre + ' ' + a.apellido;
        //   return a;
        // });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }

  buscarAutocompleteTrabajador(evento: SearchAutoCompleteInterface) {
    const busqueda: TrabajadorFindDto = {
      busqueda: evento.query,
    };
    this.httpTrabajadorService
      .find(busqueda)
      .toPromise()
      .then(res => res as [TrabajadorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.nombreCompleto = a.idUsuario.nombres + ' ' + a.idUsuario.apellidos;
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }

  buscarAutocompletePeriodoLaboral(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoLaboralFindDto = {
      busqueda: evento.query,
    };
    this.httpPeriodoLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoLaboralResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.mostrar = a.anio + ' - ' + a.mes + ', ' + dayjs(a.fechaInicio).format('DD/MM/YYYY') + '-' + dayjs(a.fechaFin).format('DD/MM/YYYY');
          return a;
        });
        if (evento.field.autoComplete) {
          if (Array.isArray(arregloDatos)) {
            evento.field.autoComplete.suggestions = [...arregloDatos];
          } else {
            evento.field.autoComplete.suggestions = [arregloDatos];
          }
        }
        return data;
      });
  }

  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      if (event.formControlName === 'anio') {
        if (event.actualValue) {
          this.findDto.anio = event.actualValue
        } else {
          this.findDto.anio = undefined;
        }
      }
      if (event.formControlName === 'idAgencia') {
        if (event.actualValue) {
          this.findDto.idAgencia = event.actualValue.id
        } else {
          this.findDto.idAgencia = undefined;
        }
      }
      if (event.formControlName === 'idPeriodoLaboral') {
        if (event.actualValue) {
          this.findDto.idPeriodoLaboral = event.actualValue.id
          this.periodoSeleccionado = event.actualValue;
          this.diasPeriodo = dayjs(this.periodoSeleccionado.fechaFin).diff(this.periodoSeleccionado.fechaInicio, 'days');
        } else {
          this.periodoSeleccionado = {};
          this.diasPeriodo = 0;
        }

      }
      if (event.formControlName === 'idTrabajador') {
        if (event.actualValue) {
          this.findDto.idTrabajador = event.actualValue.id
        } else {
          this.findDto.idTrabajador = undefined;
        }
      }
      if (event.formControlName === 'sisHabilitado') {
        if (event.actualValue) {
          this.findDto.sisHabilitado = event.actualValue.sisHabilitado
        } else {
          this.findDto.sisHabilitado = undefined;
        }
      }
    }
  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    switch (event.field.formControlName) {
      case 'idAgencia':
        this.buscarAutocompleteAgencia(event);
        break;
      case 'idPeriodoLaboral':
        this.buscarAutocompletePeriodoLaboral(event);
        break;
      case 'idTrabajador':
        this.buscarAutocompleteTrabajador(event);
        break;
    }
  }

  async buscarYGenerarExcel() {
    try {
      const datos = await this.obtenerDatos();
      this.rolesPAgo = datos;
      this.armarDatos(this.rolesPAgo);
      setTimeout(() => {
        this.exportExcel()
      }, 1000);

    } catch (e) {
      this.logsMlabsService.toaster(e as MensajeToaster);
    }
  }

  obtenerDatos(): Promise<RolPagoResponseDto[]> {
    this.blockuiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
        this.httpRolPagoService.find(this.findDto)
          .subscribe(
            {
              next: res => {
                if (res[1] > 0) {
                  resolve(res[0]);
                } else {
                  reject({
                      titulo: 'Aviso',
                      mensaje: 'No se han encontrado datos',
                      tipo: ToasterTipo.warning
                    }
                  )
                }
                this.blockuiService.deshabilitarBlockUI();
              },
              error: err => {
                this.blockuiService.deshabilitarBlockUI();
                console.error('Error obteniendo datos: ', err);
                reject({
                    titulo: 'Error',
                    mensaje: 'Error obteniendo datos',
                    tipo: ToasterTipo.warning
                  }
                );
              }
            }
          )
      }
    )
  }

  exportExcel() {
    let hoja = xlsx.utils.table_to_sheet(document.getElementById('tablaInformeNomina'), {cellStyles: true});

    hoja["!cols"] = [
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},
      {width: 18},

    ];


    const workbook = {
      Sheets: {
        'Datos contrato': hoja,
      },
      SheetNames: ['Datos contrato']
    };

    const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.descargarArchivo(excelBuffer, 'xd');
  }


  descargarArchivo(archivo: any, tipo: any) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const filePath = window.URL.createObjectURL(new Blob([archivo], {type: EXCEL_TYPE}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', `informe-nomina`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  establecerDetallesNovedadRolPago(rol: RolPagoResponseDto) {
    if (rol.idPeriodoLaboral) {
      if (rol.idPeriodoLaboral.detalleNovedadRolPagoCollection) {
        this.detallesNovedadRolPago = rol.idPeriodoLaboral.detalleNovedadRolPagoCollection;
      }
    }
  }

  obtenerDetalleNovedadPorCodigo(rol: RolPagoResponseDto, codigo: string) {
    if (rol.idPeriodoLaboral) {
      if (rol.idPeriodoLaboral.detalleNovedadRolPagoCollection) {
        const detalles = rol.idPeriodoLaboral.detalleNovedadRolPagoCollection.filter(detalle => {
            return detalle.codigoNovedad === codigo;
          }
        );
        return detalles;
      }
    }
    return [];

  }

  establecerDiasNoTrabajados(detallesNovedadRolPagoCodAE18: DetalleNovedadRolPagoResponseDto[]) {
    let sumatoria = 0;
    if (detallesNovedadRolPagoCodAE18.length > 0) {
      detallesNovedadRolPagoCodAE18.forEach(detalle => {
          if (detalle.valor) {
            sumatoria += detalle.valor;
          }
        }
      )
    }
    return sumatoria;
  }

  armarDatos(rolesPago: RolPagoResponseDto[]) {
    this.datosTabla = [];
    rolesPago.forEach(rol => {
        const detallesNovedad = this.obtenerDetalleNovedadPorCodigo(rol, 'AE18');
        const diasNoLaborados = this.establecerDiasNoTrabajados(detallesNovedad);
        let prestamoQuitografario = rol.prestamoQuirografario ? rol.prestamoQuirografario : 0;
        let prestamoHipotecario = rol.prestamoHipotecario ? rol.prestamoHipotecario : 0;
        let valorPrestamo = prestamoQuitografario + prestamoHipotecario;
        let provDecTercero = rol.provDecimoTercero ? rol.provDecimoTercero : 0;
        let provDecCuarto = rol.provDecimoCuarto ? rol.provDecimoCuarto : 0;
        let provVacaciones = rol.provVacaciones ? rol.provVacaciones : 0;
        let provFondosReserva = rol.provFondosReserva ? rol.provFondosReserva : 0;
        let sueldoValor = rol.sueldo ? rol.sueldo : 0;
        let horasExtraValor = rol.totalHorasExtra ? rol.totalHorasExtra : 0;
        let comisionesValor = rol.comision ? rol.comision : 0;
        let bonoValor = rol.bonificacion ? rol.bonificacion : 0;
        let aportePatronalValor = rol.provAportePatronal ? rol.provAportePatronal : 0;
        let costoEmpresaValor = provDecTercero + provDecCuarto + provVacaciones
          + provFondosReserva + sueldoValor + horasExtraValor
          + comisionesValor + bonoValor + aportePatronalValor;
        const info = {
          mes: this.periodoSeleccionado?.mes + '',
          nombre: (rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres && rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos) ? rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres + ' ' + rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos : '',
          sueldoRegistrado: rol.idHistorialLaboral?.idTrabajador?.sueldo + '',
          diasLaborados: (this.diasPeriodo - diasNoLaborados) + '',
          sueldo: rol.idHistorialLaboral?.sueldo ? ((rol.idHistorialLaboral?.sueldo / this.diasPeriodo) * (this.diasPeriodo - diasNoLaborados)) + '' : '',
          horasExtra: (rol.totalHorasExtra ? rol.totalHorasExtra : 0) + '',
          transporte: (rol.movilizacionEspecial ? rol.movilizacionEspecial : 0) + '',
          comisiones: (rol.comision ? rol.comision : 0) + '',
          bono: (rol.bonificacion ? rol.bonificacion : 0) + '',
          fondosReservaRol: (rol.pagoFondoReservaMes ? rol.pagoFondoReservaMes : 0) + '',
          otrosIngresos: (rol.otrosIngresos ? rol.otrosIngresos : 0) + '',
          decTerceroRol: (rol.pagoDecimoTerceroCuartoMes ? rol.pagoDecimoTerceroCuartoMes : 0) + '',
          decCuartoRol: (rol.pagoDecimoCuartoMes ? rol.pagoDecimoCuartoMes : 0) + '',
          totalIngresos: (rol.totalIngresos ? rol.totalIngresos : 0) + '',
          aporteIess: (rol.aporteIess ? rol.aporteIess : 0) + '',
          prestamosIess: valorPrestamo + '',
          anticipos: (rol.anticipos ? rol.anticipos : 0) + '',
          otrosDescuentos: (rol.otrosDescuentos ? rol.otrosDescuentos : 0) + '',
          impuestoRenta: (rol.otrosDescuentos ? rol.otrosDescuentos : 0) + '',
          prestamosEmpresa: (rol.prestamosEmpresa ? rol.prestamosEmpresa : 0) + '',
          celular: (rol.celularConsumo ? rol.celularConsumo : 0) + '',
          totalDescuentos: (rol.totalEgresos ? rol.totalEgresos : 0) + '',
          pago: (rol.totalAPagar ? rol.totalAPagar : 0) + '',
          fechaIngreso: (rol.idHistorialLaboral?.idTrabajador?.fechaIngreso ? rol.idHistorialLaboral.idTrabajador.fechaIngreso : '') + '',
          ingresosGravados: (rol.idHistorialLaboral?.sueldo ? rol.idHistorialLaboral?.sueldo : '') + '',
          decTerceroProv: (rol?.provDecimoTercero ? rol.provDecimoTercero : '') + '',
          decCuartoProv: (rol?.provDecimoCuarto ? rol.provDecimoCuarto : '') + '',
          vacaciones: (rol?.provVacaciones ? rol.provVacaciones : '') + '',
          aportePatronal: (rol?.provAportePatronal ? rol.provAportePatronal : '') + '',
          fondosReservaProv: (rol?.provFondosReserva ? rol.provFondosReserva : '') + '',
          costoEmpresa: costoEmpresaValor
        }
        this.datosTabla.push({...info});
      }
    )
  }

}

export interface InformeNomina {
  mes?: string;
  nombresApellidos?: string;
  sueldoRegistrado?: number;
  sueldo?: number;
  horasExtra?: number;
  transporte?: number;
  comisiones?: number;
  bono?: number;
  fondosReservaRol?: number;
  otrosIngresos?: number;
  decimoTerceroRol?: number;
  decimoCuartoRol?: number;
  totalIngresos?: number;
  aporteIess?: number;
  prestamoIess?: number;
  anticipos?: number;
  otrosDescuentos?: number;
  impuestoRenta?: number;
  prestamosEmpresa?: number;
  celular?: number;
  totalDescuentos?: number;
  aPagar?: number;
  fechaIngreso?: string;
  ingresosGravados?: number;
  decimoTerceroProv?: number;
  decimoCuartoProv?: number;
  vacaciones?: number;
  aportePatronal?: number;
  fondosReservaProv?: number;
  costoEmpresa?: number;
}

// let fila: FilaInterface[] = [];
// const mes = {
//   text: this.periodoSeleccionado?.mes + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const nombre = {
//   text: (rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres && rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos) ? rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres + ' ' + rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos : '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const sueldoRegistrado = {
//   text: rol.idHistorialLaboral?.idTrabajador?.sueldo + '', // cambiar por el sueldo del historial laboral
//   fontSize: 8,
//   alignment: 'center',
// }
// const diasLaborados = {
//   text: (this.diasPeriodo - diasNoLaborados) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const sueldo = {
//   text: rol.idHistorialLaboral?.sueldo ? ((rol.idHistorialLaboral?.sueldo / this.diasPeriodo) * (this.diasPeriodo - diasNoLaborados)) + '' : '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const horasExtra = {
//   text: (rol.totalHorasExtra ? rol.totalHorasExtra : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const transporte = {
//   text: (rol.movilizacionEspecial ? rol.movilizacionEspecial : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const comisiones = {
//   text: (rol.comision ? rol.comision : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const bono = {
//   text: (rol.bonificacion ? rol.bonificacion : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const fondosReserva = {
//   text: (rol.pagoFondoReservaMes ? rol.pagoFondoReservaMes : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const otrosIngresos = {
//   text: (rol.otrosIngresos ? rol.otrosIngresos : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const decTercero = {
//   text: (rol.pagoDecimoTerceroCuartoMes ? rol.pagoDecimoTerceroCuartoMes : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const decCuarto = {
//   text: (rol.pagoDecimoCuartoMes ? rol.pagoDecimoCuartoMes : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const totalIngresos = {
//   text: (rol.totalIngresos ? rol.totalIngresos : 0) + '', // todo por revisar
//   fontSize: 8,
//   alignment: 'center',
// }
// const aporteIess = {
//   text: (rol.aporteIess ? rol.aporteIess : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }


// const prestamosIess = {
//   text: valorPrestamo + '',
//   fontSize: 8,
//   alignment: 'center',
// }

// const anticipos = {
//   text: (rol.anticipos ? rol.anticipos : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }

// const otrosDescuentos = {
//   text: (rol.otrosDescuentos ? rol.otrosDescuentos : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const impuestoRenta = {
//   text: (rol.otrosDescuentos ? rol.otrosDescuentos : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const prestamosEmpresa = {
//   text: (rol.prestamosEmpresa ? rol.prestamosEmpresa : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const celular = {
//   text: (rol.celularConsumo ? rol.celularConsumo : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const totalDescuentos = {
//   text: (rol.totalEgresos ? rol.totalEgresos : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const pago = {
//   text: (rol.totalAPagar ? rol.totalAPagar : 0) + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const fechaIngreso = {
//   text: (rol.idHistorialLaboral?.idTrabajador?.fechaIngreso ? rol.idHistorialLaboral.idTrabajador.fechaIngreso : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const ingresosGravados = {
//   text: (rol.idHistorialLaboral?.sueldo ? rol.idHistorialLaboral?.sueldo : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const decTerceroProv = {
//   text: (rol?.provDecimoTercero ? rol.provDecimoTercero : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const decCuartoProv = {
//   text: (rol?.provDecimoCuarto ? rol.provDecimoCuarto : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const vacaciones = {
//   text: (rol?.provVacaciones ? rol.provVacaciones : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const aportePatronal = {
//   text: (rol?.provAportePatronal ? rol.provAportePatronal : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }
// const fondosReservaProv = {
//   text: (rol?.provFondosReserva ? rol.provFondosReserva : '') + '',
//   fontSize: 8,
//   alignment: 'center',
// }

// const costoEmpresa = {
//   text: costoEmpresaValor + '',
//   fontSize: 8,
//   alignment: 'center',
// }

// fila.push(
//   {...mes},
//   {...nombre},
//   {...sueldoRegistrado},
//   {...diasLaborados},
//   {...sueldo},
//   {...horasExtra},
//   {...transporte},
//   {...comisiones},
//   {...bono},
//   {...fondosReserva},
//   {...otrosIngresos},
//   {...decTercero},
//   {...decCuarto},
//   {...totalIngresos},
//   {...aporteIess},
//   {...prestamosIess},
//   {...anticipos},
//   {...otrosDescuentos},
//   {...impuestoRenta},
//   {...prestamosEmpresa},
//   {...celular},
//   {...totalDescuentos},
//   {...pago},
//   {...fechaIngreso},
//   {...ingresosGravados},
//   {...decTerceroProv},
//   {...decCuartoProv},
//   {...vacaciones},
//   {...aportePatronal},
//   {...fondosReservaProv},
//   {...costoEmpresa},
// )
// filas.push([...fila])
