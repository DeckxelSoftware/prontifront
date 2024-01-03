import {Component, OnInit} from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {MenuItem} from "primeng/api";
import {RolPagoResponseDto} from "../../../rol-pago/servicios/dto/rol-pago.response-dto";
import {fieldType, FormField, SearchAutoCompleteInterface} from "../../../../componentes/forms/interfaces/form-field";
import {FormGroup, Validators} from "@angular/forms";
import {HttpPeriodoLaboralService} from "../../../periodo-laboral/servicios/http-periodo-laboral-service";
import {HttpRolPagoService} from "../../../rol-pago/servicios/http-rol-pago-service";
import {BlockuiService} from "../../../../servicios/block-ui/blockui.service";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import * as dayjs from "dayjs";
import {PeriodoLaboralFindDto} from "../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto";
import {TrabajadorResponseDto} from "../../../trabajador/servicios/dto/trabajador.response-dto";
import {MensajeToaster} from "../../../../servicios/logs-mensajes/intefaces/mensaje-toaster";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {FilaInterface} from "../../../periodo-laboral/rutas/ruta-informe-ingresos/ruta-informe-ingresos.component";
import {HttpPagos2Service} from "../../servicios/http-pagos2-service";
import {Pagos2ResponseDto} from "../../servicios/dto/pagos2.response-dto";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-reporte-dec-cuarto',
  templateUrl: './ruta-reporte-dec-cuarto.component.html',
  styleUrls: ['./ruta-reporte-dec-cuarto.component.scss']
})
export class RutaReporteDecCuartoComponent {
  items: MenuItem[] = [];
  findDto: any = {};
  textoPeriodoSeleccionado = '';
  confirmarDeshabilitado = true;
  pagos: Pagos2ResponseDto[] = [];
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
    public httpPagos2Service: HttpPagos2Service,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
  ) {
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Reportes', routerLink: '/personal/reportes-personal'},
      {label: 'Reporte décimo cuarto'},
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
      this.pagos = datos;
      this.exportPdf(this.pagos);
    } catch (e) {
      this.logsMlabsService.toaster(e as MensajeToaster);
    }

  }

  exportPdf(rolesPago: Pagos2ResponseDto[]) {
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
          text: 'Décimo cuarto general',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Periodo: ${this.textoPeriodoSeleccionado}`,
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          alignment: 'center',
          layout: '', // optional'*', '*', '*', '*'
          table: {
            widths: ['auto', '*', '*', '*', '*', '*', '*', '*',],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            body: [

              [
                {
                  text: 'Nombres y Apellidos',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Fec. ingreso',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Días',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Valor nominal',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Dec. cuarto',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Préstamos empresa',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Total egresos',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Valor a pagar',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },

              ],
              ...this.armarDatos(rolesPago)
            ]
          }
        },
        {
          text: '',
          margin: [10, 5, 10, 5]
        },
        {
          alignment: 'center',
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
            widths: ['*', '*', '*', '*', '*', '*', '*', '*',],
            headerRows: 1,
            // keepWithHeaderRows: 1,
            body: [

              [
                {
                  text: '',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: '',
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: 'Total',
                  alignment: 'center',
                  fontSize: 11,
                  bold: true,
                  // colSpan: 3
                },
                {
                  text: this.sumarCampoArreglo('valorNominal', rolesPago),
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: this.sumarDecCuarto(rolesPago),
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: this.sumarCampoArreglo('prestamosEmpresa', rolesPago),
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: this.sumarCampoArreglo('totalEgresos', rolesPago),
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },
                {
                  text: this.sumarCampoArreglo('valorAPagar', rolesPago),
                  alignment: 'center',
                  fontSize: 11,
                  // colSpan: 3
                },

              ],
            ]
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

  sumarCampoArreglo(nombreCampo: string, arreglo: any[]) {
    let resultado = 0;

    arreglo.forEach(elemento => {
      resultado += +elemento[nombreCampo]
    });

    return resultado.toFixed(2);
  }

  sumarDecCuarto(arreglo: any[]) {
    let resultado = 0;

    arreglo.forEach(elemento => {
      resultado += Number((elemento.valorNominal / 12).toFixed(2));
    });

    return resultado.toFixed(2);
  }

  armarDatos(pagos: Pagos2ResponseDto[]): FilaInterface[][] {
    let filas: FilaInterface[][] = [];
    pagos.forEach(pago => {
        let fila: FilaInterface[] = [];
        const nombre = {
          text: (pago.idTrabajador?.idUsuario?.nombres && pago.idTrabajador?.idUsuario?.apellidos) ? pago.idTrabajador?.idUsuario?.nombres + ' ' + pago.idTrabajador?.idUsuario?.apellidos : '',
          fontSize: 9,
          alignment: 'center',
        }
        const fecIngreso = {
          text: pago.idTrabajador?.fechaIngreso + '',
          fontSize: 9,
          alignment: 'center',
        }
        const dias = {
          text: pago.diasLaboradosAlAnio?.toFixed(2) + '',
          fontSize: 9,
          alignment: 'center',
        }
        const valorNominal = {
          text: pago.valorNominal?.toFixed(2) + '',
          fontSize: 9,
          alignment: 'center',
        }
        const decCuarto = {
          text: pago.valorNominal ? (pago.valorNominal / 12)?.toFixed(2) + '' : '0',
          fontSize: 9,
          alignment: 'center',
        }
        const prestamosEmp = {
          text: pago.prestamosEmpresa?.toFixed(2) + '',
          fontSize: 9,
          alignment: 'center',
        }
        const totalEgresos = {
          text: pago.totalEgresos?.toFixed(2) + '',
          fontSize: 9,
          alignment: 'center',
        }
        const valorPagar = {
          text: pago.valorAPagar?.toFixed(2) + '',
          fontSize: 9,
          alignment: 'center',
        }

        fila.push(
          {...nombre},
          {...fecIngreso},
          {...dias},
          {...valorNominal},
          {...decCuarto},
          {...prestamosEmp},
          {...valorPagar},
          {...totalEgresos},
        )
        filas.push([...fila])
      }
    )
    return filas;
  }

  obtenerDatos(): Promise<Pagos2ResponseDto[]> {
    this.blockuiService.habilitarBlockUI();
    return new Promise((resolve, reject) => {
        this.httpPagos2Service.find(this.findDto)
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
