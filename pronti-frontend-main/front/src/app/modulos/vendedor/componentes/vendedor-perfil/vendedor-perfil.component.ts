import {Component, Input} from '@angular/core';
import {VendedorResponseDto} from '../../servicios/dto/vendedor.response-dto';
import {VENDEDOR_TABS_ARRAY} from './constantes/vendedor-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-vendedor-perfil',
  templateUrl: './vendedor-perfil.component.html',
  styleUrls: ['./vendedor-perfil.component.scss']
})
export class VendedorPerfilComponent {
  @Input()
  registro: VendedorResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = VENDEDOR_TABS_ARRAY();

  constructor() {
  }

}
