import {FormPrecioEnum} from '../../../form/form-precio.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PRECIO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "precio-descripcion",
    label: "Precio descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPrecioEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "precio-datos-generales",
    label: "Precio datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPrecioEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
