import {FormDetalleNovedadRolPagoEnum} from '../../../form/form-detalle-novedad-rol-pago.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const DETALLE_NOVEDAD_ROL_PAGO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "detalle-novedad-rol-pago-descripcion",
    label: "Detalle Novedad Rol Pago descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormDetalleNovedadRolPagoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "detalle-novedad-rol-pago-datos-generales",
    label: "Detalle Novedad Rol Pago datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormDetalleNovedadRolPagoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
