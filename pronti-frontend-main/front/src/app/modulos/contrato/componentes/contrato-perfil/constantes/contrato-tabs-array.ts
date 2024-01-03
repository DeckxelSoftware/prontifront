import {FormContratoEnum} from '../../../form/form-contrato.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CONTRATO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "contrato-descripcion",
    label: "Contrato descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormContratoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "contrato-datos-generales",
    label: "Contrato datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormContratoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
