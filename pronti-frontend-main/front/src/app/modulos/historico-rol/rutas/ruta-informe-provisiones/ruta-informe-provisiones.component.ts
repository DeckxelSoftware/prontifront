import { Component, OnInit } from '@angular/core';
import { HttpPeriodoLaboralService } from '../../../periodo-laboral/servicios/http-periodo-laboral-service';
import { PeriodoLaboralFindDto } from '../../../periodo-laboral/servicios/dto/periodo-laboral.find-dto';
import { PeriodoLaboralResponseDto } from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { SearchAutoCompleteInterface } from '../../../../componentes/forms/interfaces/form-field';
import { HttpRolPagoService } from '../../../rol-pago/servicios/http-rol-pago-service';
import { RolPagoFindDto } from '../../../rol-pago/servicios/dto/rol-pago.find-dto';
import { RolPagoResponseDto } from '../../../rol-pago/servicios/dto/rol-pago.response-dto';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MenuItem } from 'primeng/api';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-ruta-informe-provisiones',
  templateUrl: './ruta-informe-provisiones.component.html',
  styleUrls: ['./ruta-informe-provisiones.component.scss']
})
export class RutaInformeProvisionesComponent implements OnInit {

  periodosLaboral: PeriodoLaboralResponseDto[] = [];

  items: MenuItem[]= [];

  periodo: any = '';

  totalesProvisiones = {
    totalDecimoTercero: 0,
    totalDecimoCuarto: 0,
    totalFondoReserva: 0,
    totalVacacion: 0,
    totalAportePatronal: 0
  }

  rolPagos: RolPagoResponseDto[] = [];
  desabilitarDescarga = true;

  constructor(
    private _httpPeriodoLaboralService: HttpPeriodoLaboralService,
    private _httpRolPagoService: HttpRolPagoService,
    public blockuiService: BlockuiService,
    public logsMlabsService: LogsMlabsService,
  ) { }

  ngOnInit(): void {
    this.buscarPeriodoLaboralPorAnio();

    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Reportes', routerLink: '/personal/reportes-personal'},
      {label: 'Provisiones'},
    ];
  }

  confirmar() {
    if (this.periodo.id) {
      this.buscarRolPagoPorIdPeriodo(this.periodo.id);
    }

  }
  exportPDF() {
    const documento: any = {
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
          text: 'Provisiones del mes',
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          text: `Periodo: ${this.periodo.fechaInicio} - ${this.periodo.fechaFin} `,
          style: 'subHeader',
          margin: [10, 10, 10, 10]
        },
        {
          layout: '', // optional'*', '*', '*', '*'
          table: {
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            headerRows: 2,
            // keepWithHeaderRows: 1,
            body: [
              [
                {
                  text: 'Nombres y apellidos',
                  style: 'tableHeader',
                  colSpan: 1,
                  rowSpan: 1,
                  alignment: 'center'
                },
                {
                  text: 'Fecha de ingreso',
                  colSpan: 1,
                  alignment: 'center'
                },
                {
                  text: 'Décimo tercero',
                  colSpan: 1,
                  alignment: 'center'

                },
                {
                  text: 'Décimo cuarto',
                  colSpan: 1,
                  alignment: 'center'

                },
                {
                  text: 'Fondo de reserva',
                  colSpan: 1,
                  alignment: 'center',
                },
                {
                  text: 'Vacación',
                  colSpan: 1,
                  alignment: 'center',
                },
                {
                  text: 'Aporte patronal',
                  colSpan: 1,
                  alignment: 'center',
                }
              ],
              ...this.armarArregloPdf(),
              // ['', 'Días de vacaciones', 'Días tomados', 'Días saldo', 'Total ingreso', 'Valor vacación', 'Valor saldo'],             // [

              [
                {
                  text: 'Total',
                  colSpan: 2,
                  alignment: 'center',
                }
                , '', 
                this.totalesProvisiones.totalDecimoTercero,
                this.totalesProvisiones.totalDecimoCuarto,
                this.totalesProvisiones.totalFondoReserva,
                this.totalesProvisiones.totalVacacion,
                this.totalesProvisiones.totalAportePatronal],             // [

            ]
          }
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




  }





  buscarPeriodoLaboralPorAnio(event?: SearchAutoCompleteInterface) {
    this.desabilitarDescarga = true;
    this.blockuiService.habilitarBlockUI();
    const busqueda: PeriodoLaboralFindDto = {
      anio: event?.query,
    };
    this._httpPeriodoLaboralService
      .find(busqueda)
      .toPromise()
      .then(res => res as [PeriodoLaboralResponseDto[], number])
      .then(data => {
        // const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        const arregloDatos = data[0].map((a: any) => { a.datos = a.anio + ' ' + a.mes + ', ' + a.fechaInicio + ' - ' + a.fechaFin; return a; });
        // if (evento.campoFormulario.autocomplete) {
        //   if (Array.isArray(arregloDatos)) {
        //     evento.campoFormulario.autocomplete.suggestions = [...arregloDatos];
        //   } else {
        //     evento.campoFormulario.autocomplete.suggestions = [arregloDatos];
        //   }
        // }

        this.periodosLaboral = arregloDatos;

        this.blockuiService.deshabilitarBlockUI();
        return arregloDatos;

      }).catch(err => {
        this.blockuiService.deshabilitarBlockUI();
      });
  }

  buscarRolPagoPorIdPeriodo(idPeriodoLaboral: number) {
    this.blockuiService.habilitarBlockUI();
    const busqueda: RolPagoFindDto = {
      idPeriodoLaboral: idPeriodoLaboral,
    };
    this._httpRolPagoService
      .reporteProvisiones(idPeriodoLaboral)
      .toPromise()
      .then(res => res as [RolPagoResponseDto[], number])
      .then(data => {
        const arregloDatos = data[0];
        // SI ES NECSARIO HACER UN MAP PARA VISUALIZAR OTROS CAMPOS UTILIZAR LA SIGUIENTE LÍNEA
        // const arregloDatos = data[0].map((a: any) => { a.datos = a.anio + ' ' + a.mes + ', ' + a.fechaInicio + ' - ' + a.fechaFin; return a; });
        // if (evento.campoFormulario.autocomplete) {
        //   if (Array.isArray(arregloDatos)) {
        //     evento.campoFormulario.autocomplete.suggestions = [...arregloDatos];
        //   } else {
        //     evento.campoFormulario.autocomplete.suggestions = [arregloDatos];
        //   }
        // }
        this.rolPagos = arregloDatos;
        this.blockuiService.deshabilitarBlockUI();
        console.log('roles', this.rolPagos);

        this.desabilitarDescarga = false;
        return arregloDatos;

      }).catch(err => {

        this.desabilitarDescarga = true;
        this.blockuiService.deshabilitarBlockUI();
      });
  }

  armarArregloPdf() {
    return this.rolPagos.map((valor: any) => {
      let fondoReserva = 0;
      if (valor.idHistorialLaboral.idTrabajador.pagoFondosReservaMes === 'S') {
        fondoReserva = valor.idHistoricoRol.pagoFondoReservaMes;
      } else if (valor.idHistorialLaboral.fondoReservaIess) {
        fondoReserva = valor.idHistoricoRol.provFondosReserva
      }
      this.totalesProvisiones.totalDecimoTercero += valor.idHistoricoRol?.provDecimoTercero | 0;
      this.totalesProvisiones.totalDecimoCuarto += valor.idHistoricoRol?.provDecimoCuarto | 0;
      this.totalesProvisiones.totalFondoReserva += fondoReserva;
      this.totalesProvisiones.totalVacacion += valor.idHistoricoRol?.provVacaciones | 0;
      this.totalesProvisiones.totalAportePatronal += valor.idHistoricoRol?.provAportePatronal | 0;
      return [
        `${valor.idHistorialLaboral.idTrabajador.idUsuario.nombres} ${valor.idHistorialLaboral.idTrabajador.idUsuario.apellidos}`,
        valor.idHistorialLaboral.idTrabajador.fechaIngreso,
        valor.idHistoricoRol?.provDecimoTercero | 0,
        valor.idHistoricoRol?.provDecimoCuarto | 0,
        fondoReserva,
        valor.idHistoricoRol?.provVacaciones | 0,
        valor.idHistoricoRol?.provAportePatronal | 0,
      ]
    });
  }


}

