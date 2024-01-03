import {Component, Input} from '@angular/core';
import {CargaFamiliarResponseDto} from '../../servicios/dto/carga-familiar.response-dto';
import {CARGA_FAMILIAR_TABS_ARRAY} from './constantes/carga-familiar-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-carga-familiar-perfil',
  templateUrl: './carga-familiar-perfil.component.html',
  styleUrls: ['./carga-familiar-perfil.component.scss']
})
export class CargaFamiliarPerfilComponent {
  @Input()
  registro: CargaFamiliarResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CARGA_FAMILIAR_TABS_ARRAY();

  constructor() {
  }

}
