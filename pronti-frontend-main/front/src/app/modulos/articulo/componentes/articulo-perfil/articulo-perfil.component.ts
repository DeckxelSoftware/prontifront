import {Component, Input} from '@angular/core';
import {ArticuloResponseDto} from '../../servicios/dto/articulo.response-dto';
import {ARTICULO_TABS_ARRAY} from './constantes/articulo-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-articulo-perfil',
  templateUrl: './articulo-perfil.component.html',
  styleUrls: ['./articulo-perfil.component.scss']
})
export class ArticuloPerfilComponent {
  @Input()
  registro: ArticuloResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ARTICULO_TABS_ARRAY();

  constructor() {
  }

}
