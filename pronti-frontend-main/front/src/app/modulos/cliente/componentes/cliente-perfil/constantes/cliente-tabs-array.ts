import {FormClienteEnum} from '../../../form/form-cliente.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const CLIENTE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "datos-usuario",
    label: "Datos de usuario",
    icon: "pi pi-user",
    data: [
      {
        showingName: "Datos de usuario",
        fieldName: FormClienteEnum.Usuario,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
  {
    id: "datos-empresa",
    label: "Empresa",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormClienteEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
