import {FormArchivoEnum} from '../../../form/form-archivo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ARCHIVO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "archivo-descripcion",
    label: "Archivo descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormArchivoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "archivo-datos-generales",
    label: "Archivo datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormArchivoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
