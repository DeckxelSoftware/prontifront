import {FormRolUsuarioEnum} from '../../../form/form-rol-usuario.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ROL_USUARIO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "rol-usuario-descripcion",
    label: "Rol Usuario descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRolUsuarioEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "rol-usuario-datos-generales",
    label: "Rol Usuario datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRolUsuarioEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
