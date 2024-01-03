import {FormListaValoresDetalleEnum} from '../../../form/form-lista-valores-detalle.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const LISTA_VALORES_DETALLE_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "lista-valores-detalle-descripcion",
    label: "Lista Valores Detalle descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormListaValoresDetalleEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "lista-valores-detalle-datos-generales",
    label: "Lista Valores Detalle datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormListaValoresDetalleEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
