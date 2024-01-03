import {Component, Input} from '@angular/core';
import {EmpresaResponseDto} from '../../servicios/dto/empresa.response-dto';
import {EMPRESA_TABS_ARRAY} from './constantes/empresa-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-empresa-perfil',
  templateUrl: './empresa-perfil.component.html',
  styleUrls: ['./empresa-perfil.component.scss']
})
export class EmpresaPerfilComponent {
  @Input()
  registro: EmpresaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = EMPRESA_TABS_ARRAY();

  constructor() {
  }

}
