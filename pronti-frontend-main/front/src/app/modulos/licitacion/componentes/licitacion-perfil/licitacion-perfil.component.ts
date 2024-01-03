import {Component, Input} from '@angular/core';
import {LicitacionResponseDto} from '../../servicios/dto/licitacion.response-dto';
import {LICITACION_TABS_ARRAY} from './constantes/licitacion-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-licitacion-perfil',
  templateUrl: './licitacion-perfil.component.html',
  styleUrls: ['./licitacion-perfil.component.scss']
})
export class LicitacionPerfilComponent {
  @Input()
  registro: LicitacionResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = LICITACION_TABS_ARRAY();

  constructor() {
  }

}
