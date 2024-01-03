import {FormCuentaContableEnum} from '../../../form/form-cuenta-contable.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CUENTA_CONTABLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cuenta-contable-descripcion",
    label: "Cuenta Contable descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCuentaContableEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cuenta-contable-datos-generales",
    label: "Cuenta Contable datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCuentaContableEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
