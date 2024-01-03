import {Component, OnInit} from '@angular/core';
import {ContratoResponseDto} from '../../servicios/dto/contrato.response-dto';
import {ActivatedRoute} from '@angular/router';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {HttpContratoService} from '../../servicios/http-contrato-service';
import {MenuItem} from 'primeng/api';
import {CuotaResponseDto} from '../../../cuota/servicios/dto/cuota.response-dto';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';
import * as xlsx from 'xlsx-with-styles';
import {
  HistoricoPlanContratoResponseDto
} from '../../../historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import * as dayjs from "dayjs";
import {EstadoContratoEnum} from "../../../../enums/estado-contrato.enum";
import { imagenProntiautoB64 } from '../../../../constantes/imagenesB64/prontiB64';
import { repeat } from 'rxjs';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-estado-cuenta',
  templateUrl: './ruta-estado-cuenta.component.html',
  styleUrls: ['./ruta-estado-cuenta.component.scss']
})
export class RutaEstadoCuentaComponent implements OnInit {

  contrato: ContratoResponseDto = {};
  idContrato!: number;
  cuotas!: CuotaResponseDto[];
  historico!: HistoricoPlanContratoResponseDto;
  modelCliente: any = {};
  planContrato!: PlanResponseDto;

  items: MenuItem[] = [];

  modelFechaCobro = {
    fechaIniciaCobro: '',// dayjs().format('YYYY-MM-DD'),
  };
  formFechaCobro = new FormGroup({});
  fieldFechaCobro: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-12',
          key: 'fechaIniciaCobro',
          type: 'input',
          templateOptions: {
            type: 'date',
            required: false,
            label: 'Fecha pago',
          }
        },
      ]
    }
  ]

  constructor(
    public route: ActivatedRoute,
    public blockuiService: BlockuiService,
    public _httpContratoService: HttpContratoService,
    public logsMlabsService: LogsMlabsService,
  ) {
  }

  async ngOnInit() {
    const {idContrato} = this.route.snapshot.params;
    this.idContrato = idContrato;
    if (this.idContrato) {
      try {
        const resultadoBusqueda = await this.obtenerDatosContrato();
        if (resultadoBusqueda) {
          this.setearValores();
        }

      } catch (e) {
        console.error('Error obteniendo contrato');
      }
    }
    this.items = [
      {label: 'Contratos', routerLink: '/contratos'},
      {label: 'Gestión contratos', routerLink: '/contratos/contrato-modulo'},
      {label: 'Estado de cuenta'},
    ];
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
                  this.modelFechaCobro.fechaIniciaCobro = this.contrato.fechaIniciaCobro as string;
                  this.formFechaCobro.get('fechaIniciaCobro')?.setValue(this.modelFechaCobro.fechaIniciaCobro);
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
      }
    )
  }

  setearValoresCliente() {
    this.modelCliente = {...this.contrato.idClienteEnGrupo.idCliente, ...this.contrato.idClienteEnGrupo.idCliente.idUsuario}
  }

  setearValoresPlan() {
    // @ts-ignore
    this.planContrato = this.contrato.historicoPlanContratoCollection.at(-1).idPlan;
  }

  setearHistorico() {
// @ts-ignore
    this.historico = this.contrato.historicoPlanContratoCollection.at(-1);
  }

  setearCuotas() {
    // @ts-ignore
    this.cuotas = this.historico.cuotaCollection;
  }

  setearValores() {
    this.setearValoresPlan();
    this.setearValoresCliente();
    this.setearHistorico();
    this.setearCuotas();
  }

  actualizarFechaCobro() {
    this.blockuiService.habilitarBlockUI();
    // const fechaYYYYMMDD = dayjs(this.modelFechaCobro.fechaIniciaCobro).format('YYYY-MM-DD');
    const fechaYYYYMMDD = new Date(this.modelFechaCobro.fechaIniciaCobro).toISOString();
    this._httpContratoService.actualizarFechaInicioContrato(fechaYYYYMMDD, this.historico.id as number)
      .subscribe(
        {
          next: async res => {
            console.log('se actualizo la fecha de pago:', res);
            // this.contrato = res;
            // this.setearValores()
            this.logsMlabsService.toaster(
              {
                titulo: 'Éxito',
                mensaje: 'Fecha de pago actualizada',
                tipo: ToasterTipo.success
              }
            );
            try {
              const resultadoBusqueda = await this.obtenerDatosContrato();
              if (resultadoBusqueda) {
                this.setearValores();
              }
            } catch (e) {
              this.logsMlabsService.toaster({
                titulo: 'Error',
                mensaje: 'Error consultando datos del contrato',
                tipo: ToasterTipo.warning
              })
            }
            this.blockuiService.deshabilitarBlockUI();
          },
          error: err => {
            console.error('Error actualizando la fecha de pago:', err);
            this.logsMlabsService.toaster(
              {
                titulo: 'Error',
                mensaje: 'Error actualizando la fecha de pago',
                tipo: ToasterTipo.error
              }
            );
            this.blockuiService.deshabilitarBlockUI();
          }
        }
      )
  }

  exportarEstadoCuenta(tipo: 'P' | 'E') {
    if (tipo === 'P') {
      this.exportPdf();
    } else {
      this.exportExcel();
    }
  }

  exportExcel() {

    let hoja = xlsx.utils.aoa_to_sheet([
      ['', '', ''],
      ['', "Nombre:", `${this.contrato?.nombresCliente}  ${this.contrato?.apellidosCliente}`, 'Tiempo:', `${this.contrato?.plazoMesSeleccionado}`],
      ['', "Cédula:", `${this.modelCliente.documentoIdentidad}`, 'Vendedor:', `${this.contrato?.idVendedor?.idTrabajador?.idUsuario?.nombres} ${this.contrato?.idVendedor?.idTrabajador?.idUsuario?.apellidos}`],
      ['', "Contrato:", `${this.contrato.numeroDeContrato}`, 'Estado:', `${this.contrato?.estado ? this.setearEstadoContrato(this.contrato?.estado) : 'No especificado'}`],
      ['', "Fecha inicio:", `${this.contrato.fechaInicio}`, 'Versión:', `${this.contrato?.version}`],
      ['', "Plan cliente:", `${this.contrato.planSeleccionado}`, 'Total cobrado:', `$${this.historico.totalMontoCobrado}`],
      ['', "Monto:", `${this.contrato.precioPlanSeleccionado}`, 'Total pendiente:', `$${this.historico.saldoCapital}`],
      ['', "Adjudicado:", `${this.contrato.estado === EstadoContratoEnum.Adjudicado ? 'SI' : 'NO'}`],
      ['', "Fecha cuota:", `${this.contrato.fechaIniciaCobro}`, 'Contrato origen:', `Falta`],
      ['', "Agencia:", `${this.contrato.idVendedor.idAgencia.nombre ? this.contrato.idVendedor.idAgencia.nombre : ''}`, 'Inscripción cobrada:', `$${this.historico.totalCobroInscripcion}`],
      ['', 'Registro de ofertas cliente:', `$ Aun sin saber donde llega el dato`],
      ['', 'Otros cargos administrativos:', `$ ${this.historico.valorRecargo}`],
      ['', 'Cargos adjudicación:', `$ ${this.historico.cargosAdjudicacion}`],
    ], {cellStyles: true});

    hoja["!cols"] = [
      {
        width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 20,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 35,  // width in Excel "Max Digit Width", width*356 is integral
      },
    ];
    const hojaCuotas = xlsx.utils.table_to_sheet(document.getElementById('tablaCuotas'))
    hojaCuotas["!cols"] = [
      {
        width: 10,  // width in Excel "Max Digit Width", width*256 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*356 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*156 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*156 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      },
      {
        width: 15,  // width in Excel "Max Digit Width", width*256 is integral
      },
    ];
    const celdasHojaCuotas = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1', 'H1', 'I1']
    this.setearEstiloEnCeldaTitulo(hojaCuotas, celdasHojaCuotas);
    const workbook = {
      Sheets: {
        'Datos contrato': hoja,
        'Cuotas': hojaCuotas
      },
      SheetNames: ['Datos contrato', 'Cuotas']
    };

    const excelBuffer: any = xlsx.write(workbook, {bookType: 'xlsx', type: 'array'});
    this.descargarArchivo(excelBuffer, 'xd');
  }


  descargarArchivo(archivo: any, tipo: any) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const filePath = window.URL.createObjectURL(new Blob([archivo], {type: EXCEL_TYPE}));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', `estado-cuenta-contrato-#${this.contrato.numeroDeContrato}`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }

  setearEstiloEnCeldaTitulo(hoja: any, arregloCeldas: string[]) {

    arregloCeldas.forEach(
      celda => {
        hoja[`${celda}`].s = {
          // fill: {
          //   patternType: "solid", // none / solid
          //   fgColor: {rgb: "FF5E42"},
          //   bgColor: {rgb: "FF5E42"}
          // },
          // font: {
          //   color: {rgb: "FFFFFF"},
          //   bold: true,
          //   italic: false,
          //   underline: false
          // },
          border: {
            // top: {style: "thin", color: {rgb: "FF5E42"}},
            // right: {style: "thin", color: {rgb: "FF5E42"}},
            bottom: {style: "medium", color: {rgb: "000000"}},
            // left: {style: "thin", color: {rgb: "FF5E42"}}
          }
        }
      }
    );

  }

  setearEstadoContrato(estadoContrato: EstadoContratoEnum) {
    const estadosContrato = {
      [EstadoContratoEnum.Registrado]: 'Registrado',
      [EstadoContratoEnum.EnProceso]: 'En proceso',
      [EstadoContratoEnum.Preadjudicado]: 'Preadjudicado',
      [EstadoContratoEnum.PreadjudicadoBuscando]: 'Preadjudicado buscando',
      [EstadoContratoEnum.PreadjudicadoComprado]: 'Preadjudicado comprado',
      [EstadoContratoEnum.Ofertado]: 'Ofertado',
      [EstadoContratoEnum.Adjudicado]: 'Adjudicado',
      [EstadoContratoEnum.CambioDePlan]: 'Cambio de plan',
      [EstadoContratoEnum.CambioMonto]: 'Cambio de monto',
      [EstadoContratoEnum.CambioPlazo]: 'Cambio de plazo',
      [EstadoContratoEnum.Desistimiento]: 'Desistimiento',
      [EstadoContratoEnum.CesionDerechos]: 'Cesión de derechos',
      [EstadoContratoEnum.Refinamiento]: 'Refinanciamiento',
      [EstadoContratoEnum.Reactivacion]: 'Reactivación',
      [EstadoContratoEnum.Unificacion]: 'Unificación',
      [EstadoContratoEnum.Devolucion]: 'Devolución',
      [EstadoContratoEnum.Liquidado]: 'Liquidado',
      [EstadoContratoEnum.EnProcesoPenalizado]: 'En proceso penalizado ',
      [EstadoContratoEnum.PreadjudicadoAprobado]: 'Preadjudicado aprobado',
      default: 'No definido'
    }
    return estadosContrato[estadoContrato] || estadosContrato.default;

  }

  setAgencia() {

  }

  exportPdf() {

    const bodyCuotas = [
      {text: 'N Cuota', bold: true, fontSize: 10},
      {text: 'Fecha', bold: true, fontSize: 10},
      {text: 'Cuota Total', bold: true, fontSize: 10},
      {text: 'Abono Capital', bold: true, fontSize: 10},
      {text: 'Tasa Adm', bold: true, fontSize: 10},
      {text: 'Impuestos', bold: true, fontSize: 10},
      {text: 'Valor Cobrado', bold: true, fontSize: 10},
      {text: 'Saldo', bold: true, fontSize: 10},
      {text: 'Estado', bold: true, fontSize: 10},
    ];

    const widthsCuotas = ['auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto' ];
    if(this.contrato.estado === EstadoContratoEnum.Adjudicado){
      widthsCuotas.push('auto', 'auto');
      bodyCuotas.push(
        {text: 'Dispositivo', bold: true, fontSize: 10},
        {text: 'Rastreo', bold: true, fontSize: 10},
      );
      bodyCuotas.map(body => body.fontSize = 7);
    }

    const documento: any = {
        header: function (currentPage: any, pageCount: any) {
          const fecha = dayjs().format('DD/MM/YY')
          const hora = dayjs().format('HH:mm:ss')
          let texto = 'Fecha:' + fecha + '\n' + 'Hora:' + hora + '\n' + 'Página:' + currentPage.toString();
          return {
            columns: [
              {
                image: imagenProntiautoB64,
                fit: [57, 25],
                margin: [20, 10, 0, 10],
                width: '10%',
              },
              {
                text: 'CONSORCIO PRONTIAUTO S.A',
                style: {
                  fontSize: 10,
                  bold: true,
                },
                width: '*',
                margin: [40, 20, 10, 10],
              },
              {
                text: texto,
                style: 'header',
                width: '20%',
                margin: [0, 10, 20, 10],
              },
            ],

          }

        },
        content: [
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
                if (i === 0 || i === node.table.widths.length) {
                  return 0.2;
                }
                return 0;
              },
            },
            table: {
              headerRows: 1,
              widths: ['15%', '35%', '15%', '35%'],

              body: [
                [
                  {text: 'Nombre:', fontSize: 10},
                  {
                    text: `${this.contrato?.nombresCliente + ' ' + this.contrato?.apellidosCliente}`,
                    fontSize: 10
                  },
                  {text: 'Plazo:', fontSize: 10},
                  {text: this.contrato?.plazoMesSeleccionado, fontSize: 10},
                ],
                [
                  {text: 'Cédula:', fontSize: 10},
                  {text: this.modelCliente.documentoIdentidad, fontSize: 10},
                  {text: 'Vendedor:', fontSize: 10},
                  {
                    text: this.contrato?.idVendedor?.idTrabajador?.idUsuario?.nombres + ' ' + this.contrato?.idVendedor?.idTrabajador?.idUsuario?.apellidos,
                    fontSize: 10
                  }
                ],
              ]
            }
          },
          {text: '', margin: [0, 20, 0, 20]},
          {
            layout: {
              vLineWidth: function (i: any, node: any) {
                return 0;
              },
              hLineWidth: function (i: any, node: any) {

                if (i === node.table.widths.length + 1) {
                  return 0.2;
                }
                return 0;
              },
            },
            table: {
              headerRows: 1,
              widths: ['*', '*', '*', '*', '*', '*',],

              body: [
                [
                  {text: 'Contrato:', fontSize: 10},
                  {text: `${this.contrato.numeroDeContrato}`, fontSize: 10},
                  {text: 'Versión:', fontSize: 10},
                  {text: this.contrato.version, fontSize: 10},
                  {text: 'Estado:', fontSize: 10},
                  {
                    text: this.contrato.estado ? this.setearEstadoContrato(this.contrato.estado) : 'No definido',
                    fontSize: 10
                  },
                ],
                [

                  {text: 'Fecha inicio:', fontSize: 10},
                  {text: this.contrato?.fechaInicio, fontSize: 10},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: 'Total cobrado:', fontSize: 10},
                  {text: this.historico.totalMontoCobrado, fontSize: 10},

                ],
                [

                  {text: 'Plan cliente:', fontSize: 10},
                  {text: this.contrato?.planSeleccionado, fontSize: 10},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: 'Total pendiente:', fontSize: 10},
                  {text: `${this.historico.saldoCapital}`, fontSize: 10},

                ],
                [
                  {text: 'Monto:', fontSize: 10},
                  {text: '$' + this.planContrato?.precio, fontSize: 10},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: 'Inscripción cobrada:', fontSize: 10},
                  {text: '$' + this.historico?.totalCobroInscripcion, fontSize: 10},
                ],
                [
                  {text: 'Adjudicado:', fontSize: 10},
                  {text: this.contrato?.estado === EstadoContratoEnum.Adjudicado ? 'SI' : 'NO', fontSize: 10},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                ],
                [
                  {text: 'Fecha cuota:', fontSize: 10},
                  {text: this.contrato?.fechaIniciaCobro, fontSize: 10},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                ],
                [
                  {text: 'Agencia:', fontSize: 10},
                  {
                    text: this.contrato.idVendedor.idAgencia.nombre ? this.contrato.idVendedor.idAgencia.nombre : '',
                    fontSize: 10
                  },
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                  {text: '', styles: 'tableField'},
                ],


              ]
            }
          },
          {text: 'Contrato original: Falta', alignment: 'left', margin: [0, 10, 0, 0], fontSize: 10},
          {text: 'DETALLE DE CUOTAS', alignment: 'center', margin: [10, 10, 10, 10]},
          {
            layout: 'noBorders',
            table: {

              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              widths: ['10%', '*', '10%', '*', '10%', '40%',],

              body: [
                [
                  {text: 'Contrato:', bold: true, fontSize: 10},
                  {text: `${this.contrato.numeroDeContrato}`, fontSize: 10},
                  {text: 'Versión:', bold: true, fontSize: 10},
                  {text: this.contrato.version, fontSize: 10},
                  {text: 'Cliente:', bold: true, fontSize: 10},
                  {
                    text: `${this.contrato?.nombresCliente + ' ' + this.contrato?.apellidosCliente}`,
                    fontSize: 10
                  },
                ],
              ]
            }
          },
          {text: '', margin: [0, 10, 0, 0]},
          {
            layout: 'headerLineOnly', // optional
            table: {
              headerRows: 1,
              widths: [...widthsCuotas],
              body: [
                [
                  ...bodyCuotas
                ],
                ...this.generarRowsCuotas()

              ]
            }
          },

        ],
        styles: {
          header: {
            fontSize: 8,
            bold: false,
            // alignment: 'right'
          },
          titulo: {
            fontSize: 14,
            bold: true,
            alignment: 'center'
          },
          tableField: {
            fontSize: 10,
            bold: false
          },
          subtitulo: {
            fontSize: 13,
            bold: true,
            alignment: 'left',
            decoration: 'underline',
            margin: [10, 10, 10, 10]
          }
        }
      }
    ;
    const pdf = pdfMake.createPdf(documento);
    pdf.open();
  }

  generarRowsCuotas(): any[] {
    const arregloRows = this.historico.cuotaCollection?.map(
      cuota => {
        const arreglo = [
          {text: cuota.numeroCuota, fontSize: 10},
          {text: cuota.fechaCobro, fontSize: 10},
          {text: cuota.valorCuota.toFixed(2), fontSize: 10},
          {text: cuota.abonoCapital.toFixed(2), fontSize: 10},
          {text: cuota.valorTasaAdministrativa.toFixed(2), fontSize: 10},
          {text: cuota.valorImpuesto.toFixed(2), fontSize: 10},
          {text: cuota.valorPagadoCuota.toFixed(2), fontSize: 10},
          {text: (cuota.valorCuota - cuota.valorPagadoCuota).toFixed(2), fontSize: 10},
          {text: cuota.estaPagado === 'S' ? 'Pagado' : 'Pendiente', fontSize: 10}
        ];
        if(this.contrato.estado === EstadoContratoEnum.Adjudicado){
          arreglo.push(
          {text: cuota.dispositivo.toFixed(2), fontSize: 10},
          {text: cuota.rastreo.toFixed(2), fontSize: 10} );
        };
        return arreglo;
      }
    )
    return arregloRows || [];
  }

}

