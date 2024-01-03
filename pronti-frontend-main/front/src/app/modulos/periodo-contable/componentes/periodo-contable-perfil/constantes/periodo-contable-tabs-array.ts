import {FormPeriodoContableEnum} from '../../../form/form-periodo-contable.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PERIODO_CONTABLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "periodo-contable-descripcion",
    label: "Periodo Contable descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPeriodoContableEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "periodo-contable-datos-generales",
    label: "Periodo Contable datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPeriodoContableEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
