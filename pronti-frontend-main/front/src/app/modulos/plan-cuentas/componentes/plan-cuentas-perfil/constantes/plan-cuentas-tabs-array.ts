import {FormPlanCuentasEnum} from '../../../form/form-plan-cuentas.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const PLAN_CUENTAS_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "plan-cuentas-descripcion",
    label: "Plan Cuentas descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormPlanCuentasEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "plan-cuentas-datos-generales",
    label: "Plan Cuentas datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormPlanCuentasEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
