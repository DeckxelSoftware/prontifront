import {Component, Input} from '@angular/core';
import {MemorandumResponseDto} from '../../servicios/dto/memorandum.response-dto';
import {MEMORANDUM_TABS_ARRAY} from './constantes/memorandum-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-memorandum-perfil',
  templateUrl: './memorandum-perfil.component.html',
  styleUrls: ['./memorandum-perfil.component.scss']
})
export class MemorandumPerfilComponent {
  @Input()
  registro: MemorandumResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = MEMORANDUM_TABS_ARRAY();

  constructor() {
  }

}
