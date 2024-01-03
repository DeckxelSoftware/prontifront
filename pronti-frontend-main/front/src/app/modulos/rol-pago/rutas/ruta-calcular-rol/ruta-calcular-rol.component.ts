import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {HttpPeriodoLaboralService} from '../../../periodo-laboral/servicios/http-periodo-laboral-service';
import {BlockuiService} from '../../../../servicios/block-ui/blockui.service';
import {LogsMlabsService} from '../../../../servicios/logs-mensajes/logs-mlabs.service';
import {HttpRolPagoService} from '../../servicios/http-rol-pago-service';
import {MatDialog} from '@angular/material/dialog';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {PeriodoLaboralResponseDto} from '../../../periodo-laboral/servicios/dto/periodo-laboral.response-dto';
import {ToasterTipo} from '../../../../servicios/logs-mensajes/enums/toaster-tipo';

@Component({
  selector: 'app-ruta-calcular-rol',
  templateUrl: './ruta-calcular-rol.component.html',
  styleUrls: ['./ruta-calcular-rol.component.scss']
})
export class RutaCalcularRolComponent implements OnInit {

  items: MenuItem[] = [];

  mostrarPuedeCerrarRol = false;
  periodoLaboral: PeriodoLaboralResponseDto = {};

  constructor(private _httpPeriodoLaboralService: HttpPeriodoLaboralService,
              private blockUiService: BlockuiService,
              public logsMlabsService: LogsMlabsService,
              private _httpRolPagoService: HttpRolPagoService,
              private _dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.obtenerPeriodoActual();
    this.items = [
      {label: 'Personal menú', routerLink: '/personal'},
      {label: 'Calcular rol'},
    ];
  }

  obtenerPeriodoActual() {
    this.blockUiService.habilitarBlockUI();
    this._httpPeriodoLaboralService.find({activo: ActivoInactivo.Activo})
      .subscribe({
        next: (respuesta) => {
          const [arregloPeriodos, numero] = respuesta;
          console.log(respuesta);
          if (numero === 1) {

            this.periodoLaboral = arregloPeriodos[0];
          } else {

            this.periodoLaboral = arregloPeriodos[0];
            this.logsMlabsService.toaster(
              {
                mensaje: 'No existe un solo periodo laboral',
                tipo: ToasterTipo.error,
                titulo: 'Periodo laboral activo'
              },
            )
          }

          this.blockUiService.deshabilitarBlockUI();
        },
        error: err => {
          console.error('Problemas en buscar periodo laboral activo', err);
          this.logsMlabsService.toaster(
            {
              mensaje: 'No se pudo obtener el periodo laboral ',
              tipo: ToasterTipo.error,
              titulo: 'Periodo laboral'
            },
          );

          this.blockUiService.deshabilitarBlockUI();
        }
      })
  }


  calcularRol() {
    this.blockUiService.habilitarBlockUI();
    this._httpRolPagoService.calcularRolPagos().subscribe(
      {
        next: (resp)=>{
          console.log('res', resp);
          this.mostrarPuedeCerrarRol = true;
          this.blockUiService.deshabilitarBlockUI();

        },
        error: err => {
          console.error('No se pudo calcular el rol', err);
          this.blockUiService.deshabilitarBlockUI();
        }
      }

    );
  }

  cerrarRol() {
    this.blockUiService.habilitarBlockUI();
    this._httpRolPagoService.cerrarRol().subscribe(
      {
        next: (resp)=>{
          console.log('res', resp);
          this.blockUiService.deshabilitarBlockUI();
        },
        error: err => {
          console.error('No se pudo calcular el rol', err);
          this.blockUiService.deshabilitarBlockUI();
        }

      }
    );
  }
}
