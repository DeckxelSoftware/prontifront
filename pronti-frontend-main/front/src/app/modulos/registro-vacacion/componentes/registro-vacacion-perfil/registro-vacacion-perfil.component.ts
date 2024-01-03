import {Component, Input} from '@angular/core';
import {RegistroVacacionResponseDto} from '../../servicios/dto/registro-vacacion.response-dto';
import {REGISTRO_VACACION_TABS_ARRAY} from './constantes/registro-vacacion-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-registro-vacacion-perfil',
  templateUrl: './registro-vacacion-perfil.component.html',
  styleUrls: ['./registro-vacacion-perfil.component.scss']
})
export class RegistroVacacionPerfilComponent {
  @Input()
  registro: RegistroVacacionResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = REGISTRO_VACACION_TABS_ARRAY();

  constructor() {
  }

}
