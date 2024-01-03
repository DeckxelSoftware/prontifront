import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MatDialog } from '@angular/material/dialog';
import { HttpPagos1Service } from '../../../pagos1/servicios/http-pagos1-service';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';
import { ModalConfirmacionComponent } from '../../../../shared/modal-confirmacion/modal-confirmacion.component';
import { Pagos1ResponseDto } from '../../../pagos1/servicios/dto/pagos1.response-dto';
import * as dayjs from 'dayjs';
import { ModalConfirmarUtilidadesComponent } from '../../componentes/modal-confirmar-utilidades/modal-confirmar-utilidades.component';
import { HttpPagos2Service } from '../../servicios/http-pagos2-service';
import { LogsMlabsService } from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import { ToasterTipo } from 'src/app/servicios/logs-mensajes/enums/toaster-tipo';

@Component({
  selector: 'app-ruta-calcular-utilidades',
  templateUrl: './ruta-calcular-utilidades.component.html',
  styleUrls: ['./ruta-calcular-utilidades.component.scss']
})
export class RutaCalcularUtilidadesComponent implements OnInit {


  items: MenuItem[] = [];
  home!: MenuItem;

  constructor(
    private _dialog: MatDialog,
    private _httpPago1Service: HttpPagos1Service,
    private _httpPago2Service: HttpPagos2Service,
    private _blockuiService: BlockuiService,
    private _messageService: LogsMlabsService
  ) {
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Características anuales', routerLink: '/caracteristicas-anuales-menu' },
      { label: 'Calcular utilidades' },
    ];
  }


  async abrirModalConfirmarUtilidades() {


    this._blockuiService.habilitarBlockUI();
    try {
      const ultimoPago1 = await this.obtenerPago1Final();
      console.log('ultimo', ultimoPago1);

      if (ultimoPago1) {
        this._blockuiService.deshabilitarBlockUI();
        const modal = this._dialog.open(ModalConfirmarUtilidadesComponent, {
          width: '500px',
          // height: '500px',
          data: ultimoPago1[0][0] as Pagos1ResponseDto
        });

        modal.afterClosed().subscribe((resp) => {
          this._blockuiService.habilitarBlockUI();
          if (resp) {

            this.calcularUtilidades();
            this._blockuiService.deshabilitarBlockUI();
          } else {
            this._blockuiService.deshabilitarBlockUI();
          }
        });
      } else {
        this._blockuiService.deshabilitarBlockUI();
      }
    } catch (err) {

      this._blockuiService.deshabilitarBlockUI();

      console.error('No se pudo traer el pago1 actual');
    }
  }



  obtenerPago1Final() {
    const anteriorAnio = dayjs().subtract(1,'year').year();
    return this._httpPago1Service.find({ nombre: 'UTILIDADES', fechaFin: `${anteriorAnio}-12-31`}).toPromise();
  }

  calcularUtilidades() {
    this._httpPago2Service.calcularUtilidades().subscribe(
      {
        next: (resp) => {
          if (resp) {
            this._messageService.toaster({
              titulo: 'Cálculo de utilidades',
              mensaje: 'Se ha realizado el cálculo de las utilidades',
              tipo: ToasterTipo.success
            });

          }
        },
        error: err => {
          console.error('No se pudo calcular las utilidades', err);
          this._messageService.toaster({
            titulo: 'Cálculo de utilidades',
            mensaje: 'No se pudo calcular las utilidades',
            tipo: ToasterTipo.error
          });
        }
      }
    );
  }
}
