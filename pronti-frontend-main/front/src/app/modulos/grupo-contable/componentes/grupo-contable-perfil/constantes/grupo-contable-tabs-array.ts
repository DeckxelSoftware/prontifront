import {FormGrupoContableEnum} from '../../../form/form-grupo-contable.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const GRUPO_CONTABLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "grupo-contable-descripcion",
    label: "Grupo Contable descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormGrupoContableEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "grupo-contable-datos-generales",
    label: "Grupo Contable datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormGrupoContableEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
