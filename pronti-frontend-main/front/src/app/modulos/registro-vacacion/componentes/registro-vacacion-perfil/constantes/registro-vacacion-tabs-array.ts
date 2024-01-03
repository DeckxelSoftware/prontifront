import {FormRegistroVacacionEnum} from '../../../form/form-registro-vacacion.enum';
import {TabsArrays} from "../../../../../componentes/profile/list-info/interface/tabs-array";


export const REGISTRO_VACACION_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "registro-vacacion-descripcion",
    label: "Registro Vacacion descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRegistroVacacionEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "registro-vacacion-datos-generales",
    label: "Registro Vacacion datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRegistroVacacionEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
