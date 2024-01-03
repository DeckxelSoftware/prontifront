import {FormOrdenDeCompraEnum} from '../../../form/form-orden-de-compra.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const ORDEN_DE_COMPRA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "orden-de-compra-descripcion",
    label: "Vehículo",
    icon: "pi pi-car",
    data: [
      {
        showingName: "Placa",
        fieldName: FormOrdenDeCompraEnum.placa,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Chasis",
        fieldName: FormOrdenDeCompraEnum.chasis,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Marca",
        fieldName: FormOrdenDeCompraEnum.marca,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Año",
        fieldName: FormOrdenDeCompraEnum.anio,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Motor",
        fieldName: FormOrdenDeCompraEnum.motor,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Valor sin IVA",
        fieldName: FormOrdenDeCompraEnum.valorSinIva,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Valor total",
        fieldName: FormOrdenDeCompraEnum.valorTotal,
        type: DataTabsArrayEnum.string,
      },

      {
        showingName: "Tipo vehículo",
        fieldName: FormOrdenDeCompraEnum.tipoVehiculo,
        type: DataTabsArrayEnum.string,
      },
    ],

  },
  // {
  //   id: "orden-de-compra-datos-generales",
  //   label: "Orden De Compra datos generales",
  //   icon: "pi pi-money-bill",
  //   data: [
  //     // {
  //     //   showingName: "Nombre",
  //     //   fieldName: FormOrdenDeCompraEnum.nombre,
  //     //   type: DataTabsArrayEnum.string,
  //     // },
  //   ],
  // },
];
