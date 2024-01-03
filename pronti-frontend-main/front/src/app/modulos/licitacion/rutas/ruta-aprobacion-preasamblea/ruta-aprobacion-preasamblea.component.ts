import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpLicitacionService } from '../../servicios/http-licitacion-service';
import { LicitacionResponseDto } from '../../servicios/dto/licitacion.response-dto';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { ActivoInactivo } from '../../../../enums/activo-inactivo';
import * as dayjs from 'dayjs';
import { BlockuiService } from '../../../../servicios/block-ui/blockui.service';

@Component({
  selector: 'app-ruta-aprobacion-preasamblea',
  templateUrl: './ruta-aprobacion-preasamblea.component.html',
  styleUrls: ['./ruta-aprobacion-preasamblea.component.scss']
})
export class RutaAprobacionPreasambleaComponent implements OnInit {

  items: MenuItem[] = [];
  idLicitacion!: number;
  licitacion: LicitacionResponseDto = {};

  seGuardoPreasamblea = false;
  textoBotonCancelarVoler = 'Cancelar';

  formPreasamblea = new FormGroup({});
  modelPreasamblea = {
    fechaPreasamblea: '',
    sisHabilitado: ActivoInactivo.Activo,
    fechaLimite: '',
    idLicitacion: 0,
  }

  fieldsPreasamblea: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'fechaPreasamblea',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'date',
            label: 'Fecha preasamblea',
            change: (event) => {
              console.log({ prop: event.formControl?.value, event });
              const datePreasamblea = dayjs(event.formControl?.value); // aaaa-mm-dd
              this.modelPreasamblea.fechaLimite = datePreasamblea.add(20, 'day').format('YYYY-MM-DD');
            }
          }
        },
        {
          className: 'col-6',
          key: 'estado',
          type: 'select',
          templateOptions: {
            required: true,
            label: 'Estado',
            options: [
              { label: 'Aprobado', value: 'APR' },

              { label: 'No Aprobado', value: 'NPR' },

              { label: 'Aprobado por Gerencia', value: 'APG' }
            ]
          }
        },
        {
          className: 'col-12',
          key: 'observaciones',
          type: 'input',
          templateOptions: {
            label: 'Observaciones',
            type: 'text'
          }
        }
      ]
    }
  ]

  constructor(private activateRouter: ActivatedRoute,
    private _httpLicitacionService: HttpLicitacionService,
    private _cargandoService: BlockuiService) { }

  ngOnInit(): void {
    const { id } = this.activateRouter.snapshot.params;
    this.idLicitacion = Number(id);
    this.modelPreasamblea.idLicitacion = Number(id);
    this.obtenerInforLicitacionPorId(id);

    this.items = [
      { label: 'Preasamblea', routerLink: '/licitacion-modulo/gestion-preasamblea' },
      { label: 'Aprobación' },
    ];
  }

  obtenerInforLicitacionPorId(id: number) {
    this._httpLicitacionService.find({ id })
      .subscribe({
        next: ([licitaciones, totalRegistros]) => {
          this.licitacion = licitaciones[0];
          console.log(licitaciones);

        },
        error: err => {

        }
      })
  }
  confirmarAprobacion() {
    this._cargandoService.habilitarBlockUI();
    console.log(this.modelPreasamblea);
    this._httpLicitacionService.confirmarPreasamblea(this.modelPreasamblea)
      .subscribe((resp) => {
        this.formPreasamblea.disable();
        this.seGuardoPreasamblea = true;
        this.textoBotonCancelarVoler = 'Volver';
        this._cargandoService.deshabilitarBlockUI();
        console.log('resp', resp);
      });
  }

}
