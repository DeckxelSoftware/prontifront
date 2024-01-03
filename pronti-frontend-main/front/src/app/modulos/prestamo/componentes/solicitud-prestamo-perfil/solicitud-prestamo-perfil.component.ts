import {Component, Input, OnInit} from '@angular/core';
import {PrestamoResponseDto} from "../../servicios/dto/prestamo.response-dto";
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";
import {SOLICITUD_PRESTAMO_TABS_ARRAY} from "./constantes/solicitud-prestamo-tabs-array";

@Component({
  selector: 'app-solicitud-prestamo-perfil',
  templateUrl: './solicitud-prestamo-perfil.component.html',
  styleUrls: ['./solicitud-prestamo-perfil.component.scss']
})
export class SolicitudPrestamoPerfilComponent {
  @Input()
  registro: PrestamoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = SOLICITUD_PRESTAMO_TABS_ARRAY();

  constructor() {
  }

}
