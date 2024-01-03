import {DiaSemanaEnum} from './enums/dia-semana.enum';

export const SELECT_DIAS_SEMANA = {
  filterBy: 'diaSemana',
  dataKey: 'diaSemana',
  filterPlaceholder: 'Lun/Mar',
  optionLabel: 'nombre',
  options: [
    {
      diaSemana: DiaSemanaEnum.Lunes,
      nombre: DiaSemanaEnum.Lunes,
    },
    {
      diaSemana: DiaSemanaEnum.Martes,
      nombre: DiaSemanaEnum.Martes,
    },
    {
      diaSemana: DiaSemanaEnum.Miercoles,
      nombre: DiaSemanaEnum.Miercoles,
    },
    {
      diaSemana: DiaSemanaEnum.Jueves,
      nombre: DiaSemanaEnum.Jueves,
    },
    {
      diaSemana: DiaSemanaEnum.Viernes,
      nombre: DiaSemanaEnum.Viernes,
    },
    {
      diaSemana: DiaSemanaEnum.Sabado,
      nombre: DiaSemanaEnum.Sabado,
    },
    {
      diaSemana: DiaSemanaEnum.Domingo,
      nombre: DiaSemanaEnum.Domingo,
    }
  ]
};
