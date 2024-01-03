import {FormRubrosRolEnum} from '../../../form/form-rubros-rol.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const RUBROS_ROL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "rubros-rol-descripcion",
    label: "Rubros Rol descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRubrosRolEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "rubros-rol-datos-generales",
    label: "Rubros Rol datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRubrosRolEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
