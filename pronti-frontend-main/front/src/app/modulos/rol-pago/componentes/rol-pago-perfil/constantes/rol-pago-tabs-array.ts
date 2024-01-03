import {FormRolPagoEnum} from '../../../form/form-rol-pago.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const ROL_PAGO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "rol-pago-descripcion",
    label: "Rol Pago descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRolPagoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "rol-pago-datos-generales",
    label: "Rol Pago datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRolPagoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
