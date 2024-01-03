import {Component, Input} from '@angular/core';
import {PreasambleaResponseDto} from '../../servicios/dto/preasamblea.response-dto';
import {PREASAMBLEA_TABS_ARRAY} from './constantes/preasamblea-tabs-array';
import {TabsArrays} from "../../../../componentes/profile/list-info/interface/tabs-array";

@Component({
  selector: 'app-preasamblea-perfil',
  templateUrl: './preasamblea-perfil.component.html',
  styleUrls: ['./preasamblea-perfil.component.scss']
})
export class PreasambleaPerfilComponent {
  @Input()
  registro: PreasambleaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PREASAMBLEA_TABS_ARRAY();

  constructor() {
  }

}
