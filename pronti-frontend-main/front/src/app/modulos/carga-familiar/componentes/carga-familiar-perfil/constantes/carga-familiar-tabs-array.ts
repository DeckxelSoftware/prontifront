import {FormCargaFamiliarEnum} from '../../../form/form-carga-familiar.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CARGA_FAMILIAR_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "carga-familiar-descripcion",
    label: "Carga Familiar descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormCargaFamiliarEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "carga-familiar-datos-generales",
    label: "Carga Familiar datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormCargaFamiliarEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
