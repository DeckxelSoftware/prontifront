import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";
import {DataTabsArrayEnum} from "../../../../../componentes/profile/list-info/enum/data-tabs-array.enum";

export const SOLICITUD_PRESTAMO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "prestamo-descripcion",
    label: "Descripción",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Responsable",
        fieldName: 'nombreApellidoResponsable',
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
