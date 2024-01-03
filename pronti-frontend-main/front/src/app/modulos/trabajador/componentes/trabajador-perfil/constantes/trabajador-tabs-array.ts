import {FormTrabajadorEnum} from '../../../form/form-trabajador.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';
import {FormUsuarioEnum} from '../../../../usuario/form/form-usuario.enum';


export const TRABAJADOR_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "trabajador-datos-usuario",
    label: "Datos generales",
    icon: "pi pi-user",
    data: [
      {
        showingName: "Usuario",
        fieldName: FormUsuarioEnum.username,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Correo",
        fieldName: FormUsuarioEnum.correo,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Fecha nacimiento",
        fieldName: FormUsuarioEnum.fechaNacimiento,
        type: DataTabsArrayEnum.date,
      },
      {
        showingName: "Tipo medio de contrato",
        fieldName: FormUsuarioEnum.tipoMedioContacto,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Medio de contrato",
        fieldName: FormUsuarioEnum.medioContacto,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Tipo documento de identidad",
        fieldName: FormUsuarioEnum.tipoDocumentoIdentidad,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Documento de identidad",
        fieldName: FormUsuarioEnum.documentoIdentidad,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "País",
        fieldName: FormUsuarioEnum.pais,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Provincia",
        fieldName: FormUsuarioEnum.provincia,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Ciudad",
        fieldName: FormUsuarioEnum.ciudad,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
];
