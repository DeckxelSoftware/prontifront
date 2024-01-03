import {FormNotaCreditoEnum} from '../../../form/form-nota-credito.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const NOTA_CREDITO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "nota-credito-descripcion",
    label: "Nota Credito descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormNotaCreditoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "nota-credito-datos-generales",
    label: "Nota Credito datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormNotaCreditoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
