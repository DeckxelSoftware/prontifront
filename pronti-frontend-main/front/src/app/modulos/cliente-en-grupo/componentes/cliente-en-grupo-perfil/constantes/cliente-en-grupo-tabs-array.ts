import {FormClienteEnGrupoEnum} from '../../../form/form-cliente-en-grupo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CLIENTE_EN_GRUPO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "cliente-en-grupo-descripcion",
    label: "Cliente En Grupo descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormClienteEnGrupoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "cliente-en-grupo-datos-generales",
    label: "Cliente En Grupo datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormClienteEnGrupoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
