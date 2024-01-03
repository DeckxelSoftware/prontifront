import {FormSubgrupoContableEnum} from '../../../form/form-subgrupo-contable.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const SUBGRUPO_CONTABLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "subgrupo-contable-descripcion",
    label: "Subgrupo Contable descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormSubgrupoContableEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "subgrupo-contable-datos-generales",
    label: "Subgrupo Contable datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormSubgrupoContableEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
