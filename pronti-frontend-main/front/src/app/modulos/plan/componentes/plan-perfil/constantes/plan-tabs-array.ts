import {FormPlanEnum} from '../../../form/form-plan.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PLAN_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "plan-descripcion",
    label: "Plan descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPlanEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "plan-datos-generales",
    label: "Plan datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPlanEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
