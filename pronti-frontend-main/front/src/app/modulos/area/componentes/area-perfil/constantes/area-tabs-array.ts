import {FormAreaEnum} from '../../../form/form-area.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const AREA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "area-descripcion",
    label: "Area descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormAreaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "area-datos-generales",
    label: "Area datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormAreaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
