import {FormArticuloEnum} from '../../../form/form-articulo.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const ARTICULO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "articulo-descripcion",
    label: "Observación",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Observación del artículo",
        fieldName: FormArticuloEnum.observacion,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
  /* {
     id: "articulo-datos-generales",
     label: "Articulo datos generales",
     icon: "pi pi-money-bill",
     data: [
       // {
       //   showingName: "Nombre",
       //   fieldName: FormArticuloEnum.nombre,
       //   type: DataTabsArrayEnum.string,
       // },
     ],
   },*/
];
