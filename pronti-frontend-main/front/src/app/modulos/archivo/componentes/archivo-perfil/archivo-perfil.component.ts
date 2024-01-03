import {Component, Input} from '@angular/core';
import {ArchivoResponseDto} from '../../servicios/dto/archivo.response-dto';
import {ARCHIVO_TABS_ARRAY} from './constantes/archivo-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-archivo-perfil',
  templateUrl: './archivo-perfil.component.html',
  styleUrls: ['./archivo-perfil.component.scss']
})
export class ArchivoPerfilComponent {
  @Input()
  registro: ArchivoResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = ARCHIVO_TABS_ARRAY();

  constructor() {
  }

}
