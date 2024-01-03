import {Component, Input} from '@angular/core';
import {InformacionFinancieraResponseDto} from '../../servicios/dto/informacion-financiera.response-dto';
import {INFORMACION_FINANCIERA_TABS_ARRAY} from './constantes/informacion-financiera-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-informacion-financiera-perfil',
  templateUrl: './informacion-financiera-perfil.component.html',
  styleUrls: ['./informacion-financiera-perfil.component.scss']
})
export class InformacionFinancieraPerfilComponent {
  @Input()
  registro: InformacionFinancieraResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = INFORMACION_FINANCIERA_TABS_ARRAY();

  constructor() {
  }

}
