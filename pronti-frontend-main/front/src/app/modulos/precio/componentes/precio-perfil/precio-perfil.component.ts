import {Component, Input} from '@angular/core';
import {PrecioResponseDto} from '../../servicios/dto/precio.response-dto';
import {PRECIO_TABS_ARRAY} from './constantes/precio-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-precio-perfil',
  templateUrl: './precio-perfil.component.html',
  styleUrls: ['./precio-perfil.component.scss']
})
export class PrecioPerfilComponent {
  @Input()
  registro: PrecioResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PRECIO_TABS_ARRAY();

  constructor() {
  }

}
