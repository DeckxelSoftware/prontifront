import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import * as dayjs from "dayjs";
import {FormGroup, Validators} from "@angular/forms";
import {TrabajadorFindDto} from "../../../trabajador/servicios/dto/trabajador.find-dto";
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import {HttpPeriodoLaboralService} from "../../servicios/http-periodo-laboral-service";

import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {HttpRolPagoService} from "../../../rol-pago/servicios/http-rol-pago-service";
import {RolPagoResponseDto} from "../../../rol-pago/servicios/dto/rol-pago.response-dto";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {MensajeToaster} from "../../../../servicios/logs-mensajes/intefaces/mensaje-toaster";
import {PeriodoLaboralFindDto} from "../../servicios/dto/periodo-laboral.find-dto";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-informe-ingresos',
  templateUrl: './ruta-informe-ingresos.component.html',
  styleUrls: ['./ruta-informe-ingresos.component.scss']
})
export class RutaInformeIngresosComponent {
  items: MenuItem[] = [];
  findDto: any = {};
  textoPeriodoSeleccionado = '';
  confirmarDeshabilitado = true;
  rolesPago: RolPagoResponseDto[] = [];
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
      {label: 'Reporte de ingresos'},
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
          text: 'Rol de ingresos',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Periodo: ${this.textoPeriodoSeleccionado}`,
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          layout: '', // optional'*', '*', '*', '*'
          table: {
            widths: ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto',],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            body: [

              [
                {
                  text: 'Nombres y Apellidos',
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
                  text: 'Sueldo',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Horas extra',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Comisión',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Bonificación',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Movilización especial',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Componente salarial unificado',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Incentivos ocacionales',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Otros ingresos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Retroactivos',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Ajuste ingreso',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
                {
                  text: 'Total ingresos',
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
                {
                  text: 'Total a pagar',
                  alignment: 'center',
                  fontSize: 8,
                  // colSpan: 3
                },
              ],
              ...this.armarDatos(rolesPago)
            ]
          }
        }, {
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
        const sueldo = {
          text: rol.idHistorialLaboral?.idTrabajador?.sueldo + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const horasExtra = {
          text: (rol.idHistoricoRol?.totalHorasExtra | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const comision = {
          text: (rol.idHistoricoRol?.comision | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const bonificacion = {
          text: (rol.idHistoricoRol?.bonificacion | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const movilizacion = {
          text: (rol.idHistoricoRol?.movilizacionEspecial | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const compSalarial = {
          text: (rol.idHistoricoRol?.componenteSalarialUnif | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const incentivos = {
          text: (rol.idHistoricoRol?.incentivosOcasionales | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const otrosIngresos = {
          text: (rol.idHistoricoRol?.otrosIngresos | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const retroactivos = {
          text: (rol.idHistoricoRol?.retroactivo | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const ajusteIngreso = {
          text: (rol.idHistoricoRol?.ajustesIngreso | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const totalIngresos = {
          text: (rol.idHistoricoRol?.totalIngresos | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const totalEgresos = {
          text: (rol.idHistoricoRol?.totalEgresos | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        const totalPagar = {
          text: (rol.idHistoricoRol?.totalAPagar | 0) + '', // cambiar por el sueldo del historico rol
          fontSize: 8,
          alignment: 'center',
        }
        fila.push(
          {...nombre},
          {...fecIngreso},
          {...sueldo},
          {...horasExtra},
          {...comision},
          {...bonificacion},
          {...movilizacion},
          {...compSalarial},
          {...incentivos},
          {...otrosIngresos},
          {...retroactivos},
          {...ajusteIngreso},
          {...totalIngresos},
          {...totalEgresos},
          {...totalPagar},
        )
        filas.push([...fila])
      }
    )
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

export interface FilaInterface {
  text: string;
  fontSize: number;
  alignment: string;
  bold?: boolean;
}
