import {Component, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {RolPagoResponseDto} from "../../../rol-pago/servicios/dto/rol-pago.response-dto";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup, Validators} from "@angular/forms";
import {HttpPeriodoLaboralService} from "../../servicios/http-periodo-laboral-service";
import {HttpRolPagoService} from "../../../rol-pago/servicios/http-rol-pago-service";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import * as dayjs from "dayjs";
import {TrabajadorFindDto} from "../../../trabajador/servicios/dto/trabajador.find-dto";
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import {MensajeToaster} from "../../../../servicios/logs-mensajes/intefaces/mensaje-toaster";
import * as pdfMake from "pdfmake/build/pdfmake";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {FilaInterface} from "../ruta-informe-ingresos/ruta-informe-ingresos.component";
import {PeriodoLaboralFindDto} from "../../servicios/dto/periodo-laboral.find-dto";

@Component({
  selector: 'app-ruta-informe-egresos',
  templateUrl: './ruta-informe-egresos.component.html',
  styleUrls: ['./ruta-informe-egresos.component.scss']
})
export class RutaInformeEgresosComponent {
  items: MenuItem[] = [];
  findDto: any = {};
  textoPeriodoSeleccionado = '';
  confirmarDeshabilitado = true;
  rolesPago: RolPagoResponseDto[] = [];
  totalesFilas: FilaInterface[] = [
    {
      text: 'Total',
      alignment: 'center',
      fontSize: 8,
      bold: true,
      // colSpan: 3
    },
    {
      text: '',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: '',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: '',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Préstamos',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Póliza personal',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Préstamo IESS',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Multas',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Otros descuentos',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Celular consumo',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Permisos horas y días',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Descuento faltas y atrasos',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Descuento ley solidaria',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Ajuste egreso',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Anticipos',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
    {
      text: 'Total egresos',
      alignment: 'center',
      fontSize: 8,
      // colSpan: 3
    },
  ];
  valoresTotales: {
    aporteIess: number;
    retencionesJudiciales: number;
    prestamos: number;
    polizaPersonal: number;
    prestamoIess: number;
    multas: number;
    otrosDescuentos: number;
    celularConsumo: number;
    permisosHorasDias: number;
    descuentoFaltasAtrasos: number;
    descuentoLeySolidaria: number;
    ajusteEgreso: number;
    anticipos: number;
    totalEgresos: number;
  } = {
    aporteIess: 0,
    retencionesJudiciales: 0,
    prestamos: 0,
    polizaPersonal: 0,
    prestamoIess: 0,
    multas: 0,
    otrosDescuentos: 0,
    celularConsumo: 0,
    permisosHorasDias: 0,
    descuentoFaltasAtrasos: 0,
    descuentoLeySolidaria: 0,
    ajusteEgreso: 0,
    anticipos: 0,
    totalEgresos: 0
  };
  searchBarFormFields: FormField[] = [
    {
      label: 'Periodo',
      placeholder: '',
      help: 'Filtre el periodo por año',
      formControlName: 'idPeriodoLaboral',
      initialValue: '',
      validators: [
        Validators.required
      ],
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

  ];

  constructor(
    public httpPeriodoLaboralService: HttpPeriodoLaboralService,
    public httpRolPagoService: HttpRolPagoService,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
  ) {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Reportes', routerLink: '/personal/reportes-personal'},
      {label: 'Reporte de egresos'},
    ];
  }


  searchFieldChanged(event: FormField): void {
    if (event.valid) {
      if (event.formControlName === 'idPeriodoLaboral') {
        console.log(event.actualValue);
        if (event.actualValue) {
          this.findDto.idPeriodoLaboral = event.actualValue.id
          this.textoPeriodoSeleccionado = event.actualValue.anio + ' - ' + event.actualValue.mes + ', ' + dayjs(event.actualValue.fechaInicio).format('DD/MM/YYYY') + '-' + dayjs(event.actualValue.fechaFin).format('DD/MM/YYYY');
        } else {
          this.findDto.idPeriodoLaboral = undefined
          this.textoPeriodoSeleccionado = '';
        }

      }
      if (this.findDto.idPeriodoLaboral) {
        this.confirmarDeshabilitado = false;
      }
    } else {
      this.confirmarDeshabilitado = true;
    }

  }

  searchAutoComplete(event: SearchAutoCompleteInterface): void {
    console.log(event.field);
    switch (event.field.formControlName) {
      case 'idPeriodoLaboral':
        this.buscarAutocompletePeriodoLaboral(event);
        break;
    }
  }

  buscarAutocompletePeriodoLaboral(evento: SearchAutoCompleteInterface) {
    const busqueda: PeriodoLaboralFindDto = {
      busqueda: evento.query,
    };
    this.httpPeriodoLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [TrabajadorResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => {
          a.mostrar = a.anio + ' - ' + a.mes + ', ' + dayjs(a.fechaInicio).format('DD/MM/YYYY') + '-' + dayjs(a.fechaFin).format('DD/MM/YYYY');
          return a;
        });
        console.log(arregloDatos);
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

  async buscarYGenerarPdf() {
    console.log(this.findDto);
    try {
      const datos = await this.obtenerDatos();
      this.rolesPago = datos;
      this.exportPdf(this.rolesPago);
    } catch (e) {
      this.logsMlabsService.toaster(e as MensajeToaster);
    }

  }

  exportPdf(rolesPago: RolPagoResponseDto[]) {
    console.log('entro en pdf')
    this.blockuiService.habilitarBlockUI();
    const documento: any = {
      pageOrientation: 'landscape',
      pageMargins: [10, 10, 10, 10],
      content: [
        {
          text: 'CONSORCIO PRONTIAUTO S A',
          style: 'header',
          margin: [10, 10, 10, 10]
        },
        {
          text: 'CONTROL DE PERSONAL',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: 'Rol de egresos',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Periodo: ${this.textoPeriodoSeleccionado}`,
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          layout: '',
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            headerRows: 1,
            body: [
              [
                {
                  text: 'Nombres y apellidos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Fec. ingreso',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Aporte IESS',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Retenciones judiciales',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Préstamos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Póliza personal',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Préstamo IESS',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Multas',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Otros descuentos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Celular consumo',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Permisos horas y días',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Descuento faltas y atrasos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Descuento ley solidaria',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Ajuste egreso',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Anticipos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Total egresos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
              ],
              ...this.armarDatos(rolesPago)
            ]
          }
        },
        {
          text: '',
          margin: [10, 10, 10, 10]
        },
        {
          layout: {
            vLineWidth: function (i: any, node: any) {
              return 0;
            },
            hLineWidth: function (i: any, node: any) {
              if (i === 0) {
                return 0;
              }
              return 0.2;
            },
          },
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
            headerRows: 1,
            body: [this.totalesFilas]
          }
        },
        {
          text: '',
          margin: [10, 40, 10, 40]
        },
        {
          columns: [
            {
              text: '',
              width: '*',
              margin: [0, 0, 10, 0],
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: 'ELABORADO POR',
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                  ]
                ]
              }
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [

                    {
                      text: 'REVISADO POR',
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                    // {
                    //   text: 'APROBADO POR',
                    //   alignment: 'center',
                    //   fontSize: 11,
                    //   // colSpan: 3
                    // },
                  ]
                ]
              }
            },
            {
              margin: [10, 0, 10, 0],
              layout: {
                vLineWidth: function (i: any, node: any) {
                  return 0;
                },
                hLineWidth: function (i: any, node: any) {
                  console.log(i, node.table.widths.length);
                  if (i === 0) {
                    return 0.2;
                  }
                  return 0;
                },
              },
              table: {
                widths: ['*',
                  // '*',
                  // '*',
                ],
                body: [
                  [
                    {
                      text: 'APROBADO POR',
                      alignment: 'center',
                      fontSize: 11,
                      // colSpan: 3
                    },
                  ]
                ]
              }
            },
            {
              text: '',
              width: '*',
              margin: [10, 0, 10, 0],
            }

          ]
        },

      ],

      styles: {
        header: {
          fontSize: 14,
          bold: true,
          alignment: 'center'
        },
        subHeader: {
          fontSize: 13,
          alignment: 'center'
        },
        subtitulo: {
          fontSize: 13,
          bold: true,
          alignment: 'left',
          decoration: 'underline',
          margin: [10, 10, 10, 10]
        }
      }
    };
    const pdf = pdfMake.createPdf(documento);
    pdf.open();
    this.blockuiService.deshabilitarBlockUI();

  }

  armarDatos(rolesPago: RolPagoResponseDto[]): FilaInterface[][] {
    let filas: FilaInterface[][] = [];
    this.valoresTotales = {
      aporteIess: 0,
      retencionesJudiciales: 0,
      prestamos: 0,
      polizaPersonal: 0,
      prestamoIess: 0,
      multas: 0,
      otrosDescuentos: 0,
      celularConsumo: 0,
      permisosHorasDias: 0,
      descuentoFaltasAtrasos: 0,
      descuentoLeySolidaria: 0,
      ajusteEgreso: 0,
      anticipos: 0,
      totalEgresos: 0
    };
    rolesPago.forEach(rol => {
        let fila: FilaInterface[] = [];
        const nombre = {
          text: (rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres && rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos) ? rol.idHistorialLaboral?.idTrabajador?.idUsuario?.nombres + ' ' + rol.idHistorialLaboral?.idTrabajador?.idUsuario?.apellidos : '',
          fontSize: 8,
          alignment: 'center',
        }
        const fecIngreso = {
          text: rol.idHistorialLaboral?.idTrabajador?.fechaIngreso + '',
          fontSize: 8,
          alignment: 'center',
        }
        const valorAporteIess = (rol.idHistoricoRol?.aporteIess?.toFixed(2) | 0);
        this.valoresTotales.aporteIess += valorAporteIess;
        const aporteIess = {
          text: valorAporteIess + '',
          fontSize: 8,
          alignment: 'center',
        }

        const valorRetencionesJudiciales = (rol.idHistoricoRol?.retencionesJudiciales?.toFixed(2) | 0)
        this.valoresTotales.retencionesJudiciales += valorRetencionesJudiciales;
        const retencionesJudiciales = {
          text: valorRetencionesJudiciales + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        let prestamosEmpresa = rol.idHistoricoRol?.prestamosEmpresa | 0;
        let pagoCuotaVehiculo = rol.idHistoricoRol?.pagoCuotaVehiculo | 0;
        let valorPrestamos = prestamosEmpresa + pagoCuotaVehiculo;
        this.valoresTotales.prestamos += valorPrestamos;
        const prestamos = {
          text: (valorPrestamos | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const valorPolizaPersonal = (rol.idHistoricoRol?.polizaPersonal?.toFixed(2) | 0);
        this.valoresTotales.polizaPersonal += valorPolizaPersonal;
        const polizaPersonal = {
          text: valorPolizaPersonal + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        let prestamoQuirografario = rol.idHistoricoRol?.prestamoQuirografario | 0;
        let prestamoHipotecario = rol.idHistoricoRol?.prestamoHipotecario | 0;
        let valorPrestamoIess = prestamoHipotecario + prestamoQuirografario;

        this.valoresTotales.prestamoIess += valorPrestamoIess;
        const prestamoIess = {
          text: (valorPrestamoIess | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const valorMultas = (rol.idHistoricoRol?.multas?.toFixed(2) | 0);
        this.valoresTotales.multas += valorMultas;
        const multas = {
          text: valorMultas + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        const valorOtrosDescuentos = (rol.idHistoricoRol?.otrosDescuentos?.toFixed(2) | 0);
        this.valoresTotales.otrosDescuentos += valorOtrosDescuentos;
        const otrosDescuentos = {
          text: valorOtrosDescuentos + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        const valorCelularConsumo = (rol.idHistoricoRol?.celularConsumo?.toFixed(2) | 0);
        this.valoresTotales.celularConsumo += valorCelularConsumo;
        const celularConsumo = {
          text: valorCelularConsumo + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        let permisoHoras = rol.idHistoricoRol?.permisoHoras | 0;
        let permisoDias = rol.idHistoricoRol?.permisoDias | 0;

        let valorPermisoHorasDias = permisoDias + permisoHoras;
        this.valoresTotales.permisosHorasDias += valorPermisoHorasDias;
        const permisosHorasDias = {
          text: (valorPermisoHorasDias | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        let dsctoFaltas = rol.idHistoricoRol?.descuentosPorFaltas | 0;
        let dsctoAtrasos = rol.idHistoricoRol?.descuentosPorAtrasos | 0;

        let valorDsctoFaltasAtrasos = dsctoAtrasos + dsctoFaltas;
        this.valoresTotales.descuentoFaltasAtrasos += valorDsctoFaltasAtrasos;
        const descuentoFaltasAtrasos = {
          text: (valorDsctoFaltasAtrasos | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const valorDescuentoLeySolidaria = (rol.idHistoricoRol?.leySolidaria?.toFixed(2) | 0);
        this.valoresTotales.descuentoLeySolidaria += valorDescuentoLeySolidaria;
        const descuentoLeySolidaria = {
          text: valorDescuentoLeySolidaria + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        const valorAjusteEgreso = (rol.idHistoricoRol?.ajusteEgreso?.toFixed(2) | 0);
        this.valoresTotales.ajusteEgreso += valorAjusteEgreso;
        const ajusteEgreso = {
          text: (rol.idHistoricoRol?.ajusteEgreso?.toFixed(2) | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        const valorAnticipos = (rol.idHistoricoRol?.anticipos?.toFixed(2) | 0);
        this.valoresTotales.anticipos += valorAnticipos;
        const anticipos = {
          text: valorAnticipos + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        const valorTotalEgresos = (rol.idHistoricoRol?.totalEgresos?.toFixed(2) | 0);
        this.valoresTotales.totalEgresos += valorTotalEgresos;
        const totalEgresos = {
          text: valorTotalEgresos + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }

        fila.push(
          {...nombre},
          {...fecIngreso},
          {...aporteIess},
          {...retencionesJudiciales},
          {...prestamos},
          {...polizaPersonal},
          {...prestamoIess},
          {...multas},
          {...otrosDescuentos},
          {...celularConsumo},
          {...permisosHorasDias},
          {...descuentoFaltasAtrasos},
          {...descuentoLeySolidaria},
          {...ajusteEgreso},
          {...anticipos},
          {...totalEgresos},
        )
        filas.push([...fila])
      }
    )
    this.totalesFilas[2].text = this.valoresTotales.aporteIess.toFixed(2);
    this.totalesFilas[3].text = this.valoresTotales.retencionesJudiciales.toFixed(2);
    this.totalesFilas[4].text = this.valoresTotales.prestamos.toFixed(2);
    this.totalesFilas[5].text = this.valoresTotales.polizaPersonal.toFixed(2);
    this.totalesFilas[6].text = this.valoresTotales.prestamoIess.toFixed(2);
    this.totalesFilas[7].text = this.valoresTotales.multas.toFixed(2);
    this.totalesFilas[8].text = this.valoresTotales.otrosDescuentos.toFixed(2);
    this.totalesFilas[9].text = this.valoresTotales.celularConsumo.toFixed(2);
    this.totalesFilas[10].text = this.valoresTotales.permisosHorasDias.toFixed(2);
    this.totalesFilas[11].text = this.valoresTotales.descuentoFaltasAtrasos.toFixed(2);
    this.totalesFilas[12].text = this.valoresTotales.descuentoLeySolidaria.toFixed(2);
    this.totalesFilas[13].text = this.valoresTotales.ajusteEgreso.toFixed(2);
    this.totalesFilas[14].text = this.valoresTotales.anticipos.toFixed(2);
    this.totalesFilas[15].text = this.valoresTotales.totalEgresos.toFixed(2);
    console.log(this.totalesFilas);
    return filas;
  }

  obtenerDatos(): Promise<RolPagoResponseDto[]> {
    this.blockuiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
        this.httpRolPagoService.findAll(this.findDto)
          .subscribe(
            {
              next: res => {
                this.blockuiService.deshabilitarBlockUI();
                if (res[1] > 0) {
                  resolve(res[0]);
                } else {
                  reject({
                      titulo: 'Aviso',
                      mensaje: 'No se han encontrado datos',
                      tipo: ToasterTipo.warning
                    }
                  );
                }
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
}


