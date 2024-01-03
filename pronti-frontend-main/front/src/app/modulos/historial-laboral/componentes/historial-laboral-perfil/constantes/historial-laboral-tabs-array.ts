import {FormHistorialLaboralEnum} from '../../../form/form-historial-laboral.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const HISTORIAL_LABORAL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "historial-laboral-descripcion",
    label: "Historial Laboral descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormHistorialLaboralEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "historial-laboral-datos-generales",
    label: "Historial Laboral datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormHistorialLaboralEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
