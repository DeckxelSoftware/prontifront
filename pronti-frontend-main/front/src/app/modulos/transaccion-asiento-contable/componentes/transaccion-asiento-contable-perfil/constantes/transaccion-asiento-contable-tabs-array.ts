import {FormTransaccionAsientoContableEnum} from '../../../form/form-transaccion-asiento-contable.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const TRANSACCION_ASIENTO_CONTABLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "transaccion-asiento-contable-descripcion",
    label: "Transaccion Asiento Contable descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormTransaccionAsientoContableEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "transaccion-asiento-contable-datos-generales",
    label: "Transaccion Asiento Contable datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormTransaccionAsientoContableEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
