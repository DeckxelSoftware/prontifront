import {Component, Input} from '@angular/core';
import {ProveedorResponseDto} from '../../servicios/dto/proveedor.response-dto';
import {PROVEEDOR_TABS_ARRAY} from './constantes/proveedor-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-proveedor-perfil',
  templateUrl: './proveedor-perfil.component.html',
  styleUrls: ['./proveedor-perfil.component.scss']
})
export class ProveedorPerfilComponent {
  @Input()
  registro: ProveedorResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = PROVEEDOR_TABS_ARRAY();

  constructor() {
  }

}
