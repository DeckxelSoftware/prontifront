import {FormAbonoPrestamoEnum} from '../../../form/form-abono-prestamo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ABONO_PRESTAMO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "abono-prestamo-descripcion",
    label: "Abono Prestamo descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormAbonoPrestamoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "abono-prestamo-datos-generales",
    label: "Abono Prestamo datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormAbonoPrestamoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
