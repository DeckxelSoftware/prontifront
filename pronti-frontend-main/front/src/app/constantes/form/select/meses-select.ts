import {MesEnum} from '../../../enums/mes.enum';

export const SELECT_MESES = (campo: string) => {
  return {
    filterBy: campo,
    dataKey: campo,
    filterPlaceholder: 'Enero/Febrero',
    optionLabel: 'nombre',
    options: [
      {
        mes: MesEnum.Enero,
        nombre: 'Enero',
      },
      {
        mes: MesEnum.Febrero,
        nombre: 'Febrero',
      },
      {
        mes: MesEnum.Marzo,
        nombre: 'Marzo',
      },
      {
        mes: MesEnum.Abril,
        nombre: 'Abril',
      },
      {
        mes: MesEnum.Mayo,
        nombre: 'Mayo',
      },
      {
        mes: MesEnum.Junio,
        nombre: 'Junio',
      },
      {
        mes: MesEnum.Julio,
        nombre: 'Julio',
      },
      {
        mes: MesEnum.Agosto,
        nombre: 'Agosto',
      },

      {
        mes: MesEnum.Septiembre,
        nombre: 'Septiembre',
      },

      {
        mes: MesEnum.Octubre,
        nombre: 'Octubre',
      },

      {
        mes: MesEnum.Noviembre,
        nombre: 'Noviembre',
      },
      {
        mes: MesEnum.Diciembre,
        nombre: 'Diciembre',
      },
    ]
  };
}
