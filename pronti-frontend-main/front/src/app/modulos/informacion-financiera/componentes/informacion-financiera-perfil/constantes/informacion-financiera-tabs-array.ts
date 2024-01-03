import {FormInformacionFinancieraEnum} from '../../../form/form-informacion-financiera.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const INFORMACION_FINANCIERA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "informacion-financiera-descripcion",
    label: "Informacion Financiera descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormInformacionFinancieraEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "informacion-financiera-datos-generales",
    label: "Informacion Financiera datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormInformacionFinancieraEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
