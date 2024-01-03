import {FormConfiguracionGeneralEnum} from '../../../form/form-configuracion-general.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const CONFIGURACION_GENERAL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "configuracion-general-descripcion",
    label: "Configuracion General descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormConfiguracionGeneralEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "configuracion-general-datos-generales",
    label: "Configuracion General datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormConfiguracionGeneralEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
