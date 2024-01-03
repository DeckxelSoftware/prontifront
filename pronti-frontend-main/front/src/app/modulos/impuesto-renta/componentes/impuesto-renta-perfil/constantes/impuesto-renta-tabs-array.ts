import {FormImpuestoRentaEnum} from '../../../form/form-impuesto-renta.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const IMPUESTO_RENTA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "impuesto-renta-descripcion",
    label: "Impuesto Renta descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormImpuestoRentaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "impuesto-renta-datos-generales",
    label: "Impuesto Renta datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormImpuestoRentaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
