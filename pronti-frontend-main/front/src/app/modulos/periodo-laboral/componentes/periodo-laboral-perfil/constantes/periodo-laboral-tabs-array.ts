import {FormPeriodoLaboralEnum} from '../../../form/form-periodo-laboral.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PERIODO_LABORAL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "periodo-laboral-descripcion",
    label: "Periodo Laboral descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPeriodoLaboralEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "periodo-laboral-datos-generales",
    label: "Periodo Laboral datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPeriodoLaboralEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
