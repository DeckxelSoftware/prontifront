import {Component, Input} from '@angular/core';
import {ListaValoresDetalleResponseDto} from '../../servicios/dto/lista-valores-detalle.response-dto';
import {LISTA_VALORES_DETALLE_TABS_ARRAY} from './constantes/lista-valores-detalle-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-lista-valores-detalle-perfil',
  templateUrl: './lista-valores-detalle-perfil.component.html',
  styleUrls: ['./lista-valores-detalle-perfil.component.scss']
})
export class ListaValoresDetallePerfilComponent {
  @Input()
  registro: ListaValoresDetalleResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = LISTA_VALORES_DETALLE_TABS_ARRAY();

  constructor() {
  }

}
