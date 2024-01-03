import {FormGrupoEnum} from '../../../form/form-grupo.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const GRUPO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "grupo-descripcion",
    label: "Grupo descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormGrupoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "grupo-datos-generales",
    label: "Grupo datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormGrupoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
