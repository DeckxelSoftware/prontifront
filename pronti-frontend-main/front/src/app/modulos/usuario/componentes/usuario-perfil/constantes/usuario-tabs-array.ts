import {FormUsuarioEnum} from '../../../form/form-usuario.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const USUARIO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "usuario-descripcion",
    label: "Roles del usuario",
    icon: "pi pi-user",
  },
  // {
  //   id: "usuario-datos-generales",
  //   label: "Usuario datos generales",
  //   icon: "pi pi-money-bill",
  //   data: [
  //     // {
  //     //   showingName: "Nombre",
  //     //   fieldName: FormUsuarioEnum.nombre,
  //     //   type: DataTabsArrayEnum.string,
  //     // },
  //   ],
  // },
];
