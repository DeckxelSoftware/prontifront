import {Component} from '@angular/core';
import {MenuItem} from "primeng/api";
import {ToasterTipo} from "../../../../servicios/logs-mensajes/enums/toaster-tipo";
import {ActivatedRoute} from "@angular/router";
import {LogsMlabsService} from "../../../../servicios/logs-mensajes/logs-mlabs.service";

@Component({
  selector: 'app-caracteristicas-anuales-trabajador',
  templateUrl: './caracteristicas-anuales-trabajador.component.html',
  styleUrls: ['./caracteristicas-anuales-trabajador.component.scss']
})
export class CaracteristicasAnualesTrabajadorComponent {
  items: MenuItem[] = [];
  home!: MenuItem;
  titulo = '';

  constructor(
    public route: ActivatedRoute,
    public logsMlabsService: LogsMlabsService,
  ) {
    this.items = [
      {label: 'Características anuales', routerLink: '/caracteristicas-anuales-menu'},

    ];
    const url = this.route.snapshot.url;
    if (url.length === 2) {
      if (url[1].path === 'decimo-tercero') {
        this.items.push({label: 'Cáculo dec. tercero'});
        this.titulo = 'Cáculo décimo tercero'
      } else if (url[1].path === 'decimo-cuarto') {
        this.items.push({label: 'Cáculo dec. cuarto'});
        this.titulo = 'Cáculo décimo cuarto'
      }
    } else {
      this.logsMlabsService.toaster({
          titulo: 'Error',
          mensaje: 'Error al definir la ruta',
          tipo: ToasterTipo.error
        }
      );
    }
  }

}
