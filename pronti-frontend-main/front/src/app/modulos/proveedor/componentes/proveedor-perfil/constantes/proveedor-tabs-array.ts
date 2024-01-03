import {FormProveedorEnum} from '../../../form/form-proveedor.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PROVEEDOR_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "proveedor-descripcion",
    label: "Proveedor descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormProveedorEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "proveedor-datos-generales",
    label: "Proveedor datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormProveedorEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
