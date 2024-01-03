import {FormRegionEnum} from '../../../form/form-region.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const REGION_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "region-descripcion",
    label: "Region descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRegionEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "region-datos-generales",
    label: "Region datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRegionEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
