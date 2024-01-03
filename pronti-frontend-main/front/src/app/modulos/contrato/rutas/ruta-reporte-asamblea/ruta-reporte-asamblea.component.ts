import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import * as xlsx from "xlsx-with-styles";
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { HttpContratoService } from '../../servicios/http-contrato-service';
import * as dayjs from 'dayjs';
import { ContratoResponseDto } from '../../servicios/dto/contrato.response-dto';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { ToasterTipo } from '../../../../servicios/logs-mensajes/enums/toaster-tipo';

@Component({
  selector: 'app-ruta-reporte-asamblea',
  templateUrl: './ruta-reporte-asamblea.component.html',
  styleUrls: ['./ruta-reporte-asamblea.component.scss']
})
export class RutaReporteAsambleaComponent implements OnInit {
  items: MenuItem[] = [];
  value: Date = new Date();
  contratos: ContratoResponseDto[] = [];

  constructor(private _blockuidService: BlockuiService,
    private _httpContratoService: HttpContratoService,
    private _mensajesToaster: LogsMlabsService) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Menú contabilidad', routerLink: '/contabilidad' },
      { label: 'Reportes asamblea' },
    ];
  }

  buscar() {
  }

  confirmar() {
    this._blockuidService.habilitarBlockUI();
    const asambleDate = dayjs(this.value).format('YYYY-MM');
    this._httpContratoService.asambleaMes(asambleDate).subscribe({
      next: (resp: [ContratoResponseDto[], number]) => {
        this.contratos = resp[0];
        this._blockuidService.deshabilitarBlockUI();
        this._mensajesToaster.toaster(
          {
            titulo: 'Asamblea',
            mensaje: `El informe de asamble con fecha ${asambleDate} esta listo.`,
            tipo: ToasterTipo.success
          });
      },
      error: err => {
        console.error(`No se pudo obtener los contratos con la fecha  ${this.value}`, err);
        this._blockuidService.deshabilitarBlockUI();
      }
    })
    this._blockuidService.deshabilitarBlockUI();
    this._mensajesToaster.toaster(
      {
        titulo: 'Asamblea',
        mensaje: `No se pudo obtener los contratos con la fecha  ${asambleDate}`,
        tipo: ToasterTipo.error
      });

  }


  exportExcel() {


    let hoja = xlsx.utils.table_to_sheet(document.getElementById('tablaReporteAsamblea'), { cellStyles: true });

    hoja["!cols"] = [
      {
        width: 10,
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },

      {
        width: 10,  // width i10Excel "Max Digit Width", width*210 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*210 is integral
      },

      {
        width: 10,  // width i10Excel "Max Digit Width", width*210 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },

      {
        width: 10,  // width i10Excel "Max Digit Width", width*210 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*310 is integral
      },
      {
        width: 10,  // width i10Excel "Max Digit Width", width*210 is integral
      },
    ];


    const workbook = {
      Sheets: {
        'Informe asamblea': hoja,
      },
      SheetNames: ['Informe asamblea']
    };

    const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.descargarArchivo(excelBuffer, 'xd');
  }


  descargarArchivo(archivo: any, tipo: any) {
    let EXCEL_TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const filePath = window.URL.createObjectURL(new Blob([archivo], { type: EXCEL_TYPE }));
    const downloadLink = document.createElement('a');
    downloadLink.href = filePath;
    downloadLink.setAttribute('download', `reporte-clientes-contrato`);
    document.body.appendChild(downloadLink);
    downloadLink.click();
  }
}
