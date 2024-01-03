import {FormRevisionEnum} from '../../../form/form-revision.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const REVISION_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "revision-descripcion",
    label: "Revision descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRevisionEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "revision-datos-generales",
    label: "Revision datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRevisionEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
