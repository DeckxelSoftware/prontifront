import {FormRolPermisoEnum} from '../../../form/form-rol-permiso.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ROL_PERMISO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "rol-permiso-descripcion",
    label: "Rol Permiso descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRolPermisoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "rol-permiso-datos-generales",
    label: "Rol Permiso datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRolPermisoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
