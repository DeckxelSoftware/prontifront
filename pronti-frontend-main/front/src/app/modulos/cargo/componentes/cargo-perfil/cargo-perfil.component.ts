import {Component, Input} from '@angular/core';
import {CargoResponseDto} from '../../servicios/dto/cargo.response-dto';
import {CARGO_TABS_ARRAY} from './constantes/cargo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cargo-perfil',
  templateUrl: './cargo-perfil.component.html',
  styleUrls: ['./cargo-perfil.component.scss']
})
export class CargoPerfilComponent {
  @Input()
  registro: CargoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CARGO_TABS_ARRAY();

  constructor() {
  }

}
