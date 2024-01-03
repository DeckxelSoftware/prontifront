import {FormEmpresaEnum} from '../../../form/form-empresa.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const EMPRESA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "empresa-descripcion",
    label: "Descripción",
    icon: "pi pi-home",
    data: [
      {
        showingName: "Dirección",
        fieldName: FormEmpresaEnum.direccionEmpresa,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Teléfono",
        fieldName: FormEmpresaEnum.telefonoEmpresa,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Correo",
        fieldName: FormEmpresaEnum.correoEmpresa,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Documento representante legal",
        fieldName: FormEmpresaEnum.documentoRepresentanteLegal,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Nombre representante legal",
        fieldName: FormEmpresaEnum.nombreRepresentanteLegal,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
  {
    id: "empresa-datos-generales",
    label: "Contador",
    icon: "pi pi-money-bill",
    data: [
      {
        showingName: "Contador",
        fieldName: FormEmpresaEnum.nombreContador,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Ruc Contador",
        fieldName: FormEmpresaEnum.rucContador,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Teléfono Contador",
        fieldName: FormEmpresaEnum.telefonoContador,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Correo Contador",
        fieldName: FormEmpresaEnum.correoContador,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
];
