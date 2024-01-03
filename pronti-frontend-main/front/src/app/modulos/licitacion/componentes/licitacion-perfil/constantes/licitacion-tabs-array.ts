import {FormLicitacionEnum} from '../../../form/form-licitacion.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const LICITACION_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "licitacion-descripcion",
    label: "Licitacion descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormLicitacionEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "licitacion-datos-generales",
    label: "Licitacion datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormLicitacionEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
