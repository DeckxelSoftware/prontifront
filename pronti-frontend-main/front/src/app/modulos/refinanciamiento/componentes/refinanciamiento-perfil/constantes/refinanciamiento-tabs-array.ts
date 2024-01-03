import {FormRefinanciamientoEnum} from '../../../form/form-refinanciamiento.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const REFINANCIAMIENTO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "refinanciamiento-descripcion",
    label: "Refinanciamiento descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormRefinanciamientoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "refinanciamiento-datos-generales",
    label: "Refinanciamiento datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormRefinanciamientoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
