import {FormGroup, Validators} from '@angular/forms';
import {FormPeriodoContableEnum} from './form-periodo-contable.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {ActivoInactivo} from '../../../enums/activo-inactivo';


export const FORM_PERIODO_CONTABLE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.date,
      label: 'Fecha inicio',
      formControlName: FormPeriodoContableEnum.fechaInicio,
      placeholder: 'Ej: 01/05/2022',
      initialValue: "",
      help: 'Ingrese la fecha de inicio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.date,
      label: 'Fecha fin',
      formControlName: FormPeriodoContableEnum.fechaFin,
      placeholder: 'Ej: 31/05/2022',
      initialValue: "",
      help: 'Ingrese la fecha de fin',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.number,
      label: 'Año',
      formControlName: FormPeriodoContableEnum.anio,
      placeholder: 'Ej: 2022',
      initialValue: "",
      help: 'Ingrese el año',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(1980),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 1980,
      }
    },
    {
      label: 'Periodo actual',
      formControlName: FormPeriodoContableEnum.esPeriodoActual,
      type: fieldType.select,
      help: 'Seleccione si es periodo actual o no',
      select: {
        filterBy: 'nombre',
        dataKey: 'esPeriodoActual',
        filterPlaceholder: 'Si, No',
        optionLabel: 'nombre',
        options: [
          {
            esPeriodoActual: ActivoInactivo.Activo,
            nombre: 'Si',
          },
          {
            esPeriodoActual: ActivoInactivo.Inactivo,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Si / No',
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
