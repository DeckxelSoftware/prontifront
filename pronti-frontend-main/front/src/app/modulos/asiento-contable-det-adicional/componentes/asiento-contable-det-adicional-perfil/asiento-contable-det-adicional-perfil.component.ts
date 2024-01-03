import {Component, Input} from '@angular/core';
import {AsientoContableDetAdicionalResponseDto} from '../../servicios/dto/asiento-contable-det-adicional.response-dto';
import {ASIENTO_CONTABLE_DET_ADICIONAL_TABS_ARRAY} from './constantes/asiento-contable-det-adicional-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-asiento-contable-det-adicional-perfil',
  templateUrl: './asiento-contable-det-adicional-perfil.component.html',
  styleUrls: ['./asiento-contable-det-adicional-perfil.component.scss']
})
export class AsientoContableDetAdicionalPerfilComponent {
  @Input()
  registro: AsientoContableDetAdicionalResponseDto = {
    llave: '',
    valor: ''
  };
  @Input()
  tabsArray: TabsArrays[] = ASIENTO_CONTABLE_DET_ADICIONAL_TABS_ARRAY();

  constructor() {
  }

}
