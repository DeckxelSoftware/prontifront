import {FormVendedorEnum} from '../../../form/form-vendedor.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const VENDEDOR_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "vendedor-descripcion",
    label: "Vendedor descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormVendedorEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "vendedor-datos-generales",
    label: "Vendedor datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormVendedorEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
