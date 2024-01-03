import {FormAsientoContableCabeceraEnum} from '../../../form/form-asiento-contable-cabecera.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const ASIENTO_CONTABLE_CABECERA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "asiento-contable-cabecera-descripcion",
    label: "Asiento Contable Cabecera descripción",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Año",
        fieldName: FormAsientoContableCabeceraEnum.anio,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Mes periodo",
        fieldName: FormAsientoContableCabeceraEnum.mesPeriodo,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Total débito",
        fieldName: FormAsientoContableCabeceraEnum.totalDebito,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Total crédito",
        fieldName: FormAsientoContableCabeceraEnum.totalCredito,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Total saldo actual fecha",
        fieldName: FormAsientoContableCabeceraEnum.totalSaldoActualFecha,
        type: DataTabsArrayEnum.string,
      },

      // {
      //   showingName: "Asiento cerrado",
      //   fieldName: FormAsientoContableCabeceraEnum.asientoCerrado,
      //   type: DataTabsArrayEnum.string,
      // },
    ],
  },
  // {
  //   id: "asiento-contable-cabecera-datos-generales",
  //   label: "Asiento Contable Cabecera datos generales",
  //   icon: "pi pi-money-bill",
  //   data: [
  //     // {
  //     //   showingName: "Nombre",
  //     //   fieldName: FormAsientoContableCabeceraEnum.nombre,
  //     //   type: DataTabsArrayEnum.string,
  //     // },
  //   ],
  // },
];
