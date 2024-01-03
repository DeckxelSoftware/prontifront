import {FormItemCobroPagoEnum} from '../../../form/form-item-cobro-pago.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ITEM_COBRO_PAGO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "item-cobro-pago-descripcion",
    label: "Item Cobro Pago descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormItemCobroPagoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "item-cobro-pago-datos-generales",
    label: "Item Cobro Pago datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormItemCobroPagoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
