import {Component, Input} from '@angular/core';
import {SubgrupoContableResponseDto} from '../../servicios/dto/subgrupo-contable.response-dto';
import {SUBGRUPO_CONTABLE_TABS_ARRAY} from './constantes/subgrupo-contable-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-subgrupo-contable-perfil',
  templateUrl: './subgrupo-contable-perfil.component.html',
  styleUrls: ['./subgrupo-contable-perfil.component.scss']
})
export class SubgrupoContablePerfilComponent {
  @Input()
  registro: SubgrupoContableResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = SUBGRUPO_CONTABLE_TABS_ARRAY();

  constructor() {
  }

}
