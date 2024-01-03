import {ActivoInactivo} from '../../../enums/activo-inactivo';

export const SELECT_SIS_HABILITADO = {
  filterBy: 'sisHabilitado',
  dataKey: 'sisHabilitado',
  filterPlaceholder: '0 = Inactivo, 1 = Activo',
  optionLabel: 'nombre',
  options: [
    {
      sisHabilitado: ActivoInactivo.Activo,
      nombre: 'Activo',
    },
    {
      sisHabilitado: ActivoInactivo.Inactivo,
      nombre: 'Inactivo',
    }
  ]
};
