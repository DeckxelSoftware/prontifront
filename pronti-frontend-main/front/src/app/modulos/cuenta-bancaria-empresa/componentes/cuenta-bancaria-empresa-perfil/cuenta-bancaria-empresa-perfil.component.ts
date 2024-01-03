import {Component, Input} from '@angular/core';
import {CuentaBancariaEmpresaResponseDto} from '../../servicios/dto/cuenta-bancaria-empresa.response-dto';
import {CUENTA_BANCARIA_EMPRESA_TABS_ARRAY} from './constantes/cuenta-bancaria-empresa-tabs-array';
import {TabsArrays} from '../../../../componentes/profile/list-info/interface/tabs-array';

@Component({
  selector: 'app-cuenta-bancaria-empresa-perfil',
  templateUrl: './cuenta-bancaria-empresa-perfil.component.html',
  styleUrls: ['./cuenta-bancaria-empresa-perfil.component.scss']
})
export class CuentaBancariaEmpresaPerfilComponent {
  @Input()
  registro: CuentaBancariaEmpresaResponseDto = {};
  @Input()
  tabsArray: TabsArrays[] = CUENTA_BANCARIA_EMPRESA_TABS_ARRAY();

  constructor() {
  }

}
