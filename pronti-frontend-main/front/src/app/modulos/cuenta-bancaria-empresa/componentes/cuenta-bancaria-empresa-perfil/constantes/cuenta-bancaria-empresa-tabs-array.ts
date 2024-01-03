import {FormCuentaBancariaEmpresaEnum} from '../../../form/form-cuenta-bancaria-empresa.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const CUENTA_BANCARIA_EMPRESA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cuenta-bancaria-empresa-descripcion",
    label: "Empresa",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCuentaBancariaEmpresaEnum.empresa,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cuenta-bancaria-empresa-datos-generales",
    label: "Banco",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCuentaBancariaEmpresaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
