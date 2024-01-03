import {FormFacturaEnum} from '../../../form/form-factura.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const FACTURA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "factura-descripcion",
    label: "Factura descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormFacturaEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "factura-datos-generales",
    label: "Factura datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormFacturaEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
