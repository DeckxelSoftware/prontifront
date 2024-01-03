import {Component, Input} from '@angular/core';
import {FacturaResponseDto} from '../../servicios/dto/factura.response-dto';
import {FACTURA_TABS_ARRAY} from './constantes/factura-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-factura-perfil',
  templateUrl: './factura-perfil.component.html',
  styleUrls: ['./factura-perfil.component.scss']
})
export class FacturaPerfilComponent {
  @Input()
  registro: FacturaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = FACTURA_TABS_ARRAY();

  constructor() {
  }

}
