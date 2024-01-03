import {FormAutorLibroEnum} from '../../../form/form-autor-libro.enum';
import {TabsArrays} from '../../../../../componentes/profile/list-info/interface/tabs-array';
import {DataTabsArrayEnum} from '../../../../../componentes/profile/list-info/enum/data-tabs-array.enum';


export const AUTOR_LIBRO_TABS_ARRAY: () => TabsArrays[] = () => [
  {
    id: "autor-libro-descripcion",
    label: "Descripción biografía",
    icon: "pi pi-book",
    data: [
      {
        showingName: "Biografía",
        fieldName: FormAutorLibroEnum.biografia,
        type: DataTabsArrayEnum.string,
      },
    ],
  },
  {
    id: "autor-libro-datos-generales",
    label: "Biografía",
    icon: "pi pi-file-pdf"
    ,
    data: [
      {
        showingName: "PDF",
        fieldName: `sisArchivo`,
        type: DataTabsArrayEnum.file,
      },
    ],
  },
];
