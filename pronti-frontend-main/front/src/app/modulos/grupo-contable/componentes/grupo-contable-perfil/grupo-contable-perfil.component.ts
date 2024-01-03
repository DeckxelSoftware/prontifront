import {Component, Input} from '@angular/core';
import {GrupoContableResponseDto} from '../../servicios/dto/grupo-contable.response-dto';
import {GRUPO_CONTABLE_TABS_ARRAY} from './constantes/grupo-contable-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-grupo-contable-perfil',
  templateUrl: './grupo-contable-perfil.component.html',
  styleUrls: ['./grupo-contable-perfil.component.scss']
})
export class GrupoContablePerfilComponent {
  @Input()
  registro: GrupoContableResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = GRUPO_CONTABLE_TABS_ARRAY();

  constructor() {
  }

}
