import {FormCargoEnum} from '../../../form/form-cargo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CARGO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cargo-descripcion",
    label: "Cargo descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCargoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cargo-datos-generales",
    label: "Cargo datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCargoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
