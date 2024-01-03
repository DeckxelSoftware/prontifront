import {FormPrestamoEnum} from '../../../form/form-prestamo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const PRESTAMO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "prestamo-descripcion",
    label: "Prestamo descripción",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Concepto",
        fieldName: 'concepto',
        type: DataTabsArrayEnum.string,
      }
    ],
  },
  // {
  //   id: "prestamo-datos-generales",
  //   label: "Prestamo datos generales",
  //   icon: "pi pi-money-bill",
  //   data: [
  //     // {
  //     //   showingName: "Nombre",
  //     //   fieldName: FormPrestamoEnum.nombre,
  //     //   type: DataTabsArrayEnum.string,
  //     // },
  //   ],
  // },
];
