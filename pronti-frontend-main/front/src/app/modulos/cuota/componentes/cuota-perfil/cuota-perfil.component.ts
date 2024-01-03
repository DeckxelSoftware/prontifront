import {Component, Input} from '@angular/core';
import {CuotaResponseDto} from '../../servicios/dto/cuota.response-dto';
import {CUOTA_TABS_ARRAY} from './constantes/cuota-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cuota-perfil',
  templateUrl: './cuota-perfil.component.html',
  styleUrls: ['./cuota-perfil.component.scss']
})
export class CuotaPerfilComponent {
  @Input()
  registro: CuotaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CUOTA_TABS_ARRAY();

  constructor() {
  }

}
