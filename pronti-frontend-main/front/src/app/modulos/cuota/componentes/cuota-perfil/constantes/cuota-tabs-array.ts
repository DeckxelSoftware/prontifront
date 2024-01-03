import {FormCuotaEnum} from '../../../form/form-cuota.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CUOTA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cuota-descripcion",
    label: "Cuota descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCuotaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cuota-datos-generales",
    label: "Cuota datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCuotaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
