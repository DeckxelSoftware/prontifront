import {FormLibroBibliotecaEnum} from '../../../form/form-libro-biblioteca.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const LIBRO_BIBLIOTECA_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "libro-biblioteca-descripcion",
    label: "Descripción",
    icon: "pi pi-plus",
    data: [
      {
        showingName: "Descripción",
        fieldName: FormLibroBibliotecaEnum.descripcion,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
  {
    id: "libro-biblioteca-datos-generales",
    label: "Información general",
    icon: "pi pi-list"
    ,
    data: [
      {
        showingName: "Nombre",
        fieldName: FormLibroBibliotecaEnum.nombre,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "Genero Libro",
        fieldName: FormLibroBibliotecaEnum.generoLibro,
        type: DataTabsArrayEnum.string,
      },
      {
        showingName: "ISBN",
        fieldName: FormLibroBibliotecaEnum.isbn,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
];
