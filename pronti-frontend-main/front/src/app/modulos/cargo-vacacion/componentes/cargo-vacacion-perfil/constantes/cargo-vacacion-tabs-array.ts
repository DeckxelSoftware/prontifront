import {FormCargoVacacionEnum} from '../../../form/form-cargo-vacacion.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CARGO_VACACION_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cargo-vacacion-descripcion",
    label: "Cargo Vacacion descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCargoVacacionEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cargo-vacacion-datos-generales",
    label: "Cargo Vacacion datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCargoVacacionEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
