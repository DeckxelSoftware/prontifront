import {Component, Input} from '@angular/core';
import {CargoVacacionResponseDto} from '../../servicios/dto/cargo-vacacion.response-dto';
import {CARGO_VACACION_TABS_ARRAY} from './constantes/cargo-vacacion-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cargo-vacacion-perfil',
  templateUrl: './cargo-vacacion-perfil.component.html',
  styleUrls: ['./cargo-vacacion-perfil.component.scss']
})
export class CargoVacacionPerfilComponent {
  @Input()
  registro: CargoVacacionResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CARGO_VACACION_TABS_ARRAY();

  constructor() {
  }

}
