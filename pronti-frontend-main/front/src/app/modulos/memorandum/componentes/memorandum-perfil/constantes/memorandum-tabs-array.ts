import {FormMemorandumEnum} from '../../../form/form-memorandum.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const MEMORANDUM_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "memorandum-descripcion",
    label: "Memorandum descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormMemorandumEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "memorandum-datos-generales",
    label: "Memorandum datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormMemorandumEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
