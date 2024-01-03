import {FormPerfilUsuarioEnum} from '../../../form/form-perfil-usuario.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PERFIL_USUARIO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "perfil-usuario-descripcion",
    label: "Perfil Usuario descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPerfilUsuarioEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "perfil-usuario-datos-generales",
    label: "Perfil Usuario datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPerfilUsuarioEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
