import {FormSupervisorEnum} from '../../../form/form-supervisor.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const SUPERVISOR_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "supervisor-descripcion",
    label: "Supervisor descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormSupervisorEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "supervisor-datos-generales",
    label: "Supervisor datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormSupervisorEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
