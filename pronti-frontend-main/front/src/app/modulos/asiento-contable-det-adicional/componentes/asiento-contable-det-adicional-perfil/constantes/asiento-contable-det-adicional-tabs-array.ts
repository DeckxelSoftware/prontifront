import {FormAsientoContableDetAdicionalEnum} from '../../../form/form-asiento-contable-det-adicional.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';


export const ASIENTO_CONTABLE_DET_ADICIONAL_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "asiento-contable-det-adicional-descripcion",
    label: "Asiento Contable Det Adicional descripción",
    icon: "pi pi-home",
    data: [
      // {
      //   showingName: "Descripcion",
      //   fieldName: FormAsientoContableDetAdicionalEnum.descripcion,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  {
    id: "asiento-contable-det-adicional-datos-generales",
    label: "Asiento Contable Det Adicional datos generales",
    icon: "pi pi-money-bill",
    data: [
      // {
      //   showingName: "Nombre",
      //   fieldName: FormAsientoContableDetAdicionalEnum.nombre,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
];
