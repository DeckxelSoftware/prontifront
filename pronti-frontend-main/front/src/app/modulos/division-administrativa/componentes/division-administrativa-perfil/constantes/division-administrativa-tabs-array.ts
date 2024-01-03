import {FormDivisionAdministrativaEnum} from '../../../form/form-division-administrativa.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const DIVISION_ADMINISTRATIVA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "division-administrativa-descripcion",
    label: "Division Administrativa descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormDivisionAdministrativaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "division-administrativa-datos-generales",
    label: "Division Administrativa datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormDivisionAdministrativaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
