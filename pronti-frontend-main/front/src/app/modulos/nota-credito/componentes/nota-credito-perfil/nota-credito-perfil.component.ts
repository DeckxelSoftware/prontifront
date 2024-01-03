import {Component, Input} from '@angular/core';
import {NotaCreditoResponseDto} from '../../servicios/dto/nota-credito.response-dto';
import {NOTA_CREDITO_TABS_ARRAY} from './constantes/nota-credito-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-nota-credito-perfil',
  templateUrl: './nota-credito-perfil.component.html',
  styleUrls: ['./nota-credito-perfil.component.scss']
})
export class NotaCreditoPerfilComponent {
  @Input()
  registro: NotaCreditoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = NOTA_CREDITO_TABS_ARRAY();

  constructor() {
  }

}
