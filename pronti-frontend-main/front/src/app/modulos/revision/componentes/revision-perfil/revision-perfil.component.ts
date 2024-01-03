import {Component, Input} from '@angular/core';
import {RevisionResponseDto} from '../../servicios/dto/revision.response-dto';
import {REVISION_TABS_ARRAY} from './constantes/revision-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-revision-perfil',
  templateUrl: './revision-perfil.component.html',
  styleUrls: ['./revision-perfil.component.scss']
})
export class RevisionPerfilComponent {
  @Input()
  registro: RevisionResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = REVISION_TABS_ARRAY();

  constructor() {
  }

}
