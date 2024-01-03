import {FormHistoricoPlanContratoEnum} from '../../../form/form-historico-plan-contrato.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const HISTORICO_PLAN_CONTRATO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "historico-estado-contrato-descripcion",
    label: "Historico Plan Contrato descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormHistoricoPlanContratoEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "historico-estado-contrato-datos-generales",
    label: "Historico Plan Contrato datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormHistoricoPlanContratoEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
