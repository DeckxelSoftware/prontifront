import {Component, Input} from '@angular/core';
import {ConfiguracionGeneralResponseDto} from '../../servicios/dto/configuracion-general.response-dto';
import {CONFIGURACION_GENERAL_TABS_ARRAY} from './constantes/configuracion-general-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-configuracion-general-perfil',
  templateUrl: './configuracion-general-perfil.component.html',
  styleUrls: ['./configuracion-general-perfil.component.scss']
})
export class ConfiguracionGeneralPerfilComponent {
  @Input()
  registro: ConfiguracionGeneralResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CONFIGURACION_GENERAL_TABS_ARRAY();

  constructor() {
  }

}
