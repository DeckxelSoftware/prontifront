import {FormGroup, Validators} from '@angular/forms';
import {FormPeriodoLaboralEnum} from './form-periodo-laboral.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {SELECT_MESES} from '../../../constantes/form/select/meses-select';
import {ActivoInactivo} from "../../../enums/activo-inactivo";


export const FORM_PERIODO_LABORAL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Año',
      placeholder: 'Ej: 2022',
      help: 'Ingrese el año',
      formControlName: FormPeriodoLaboralEnum.anio,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.inputNumber,
      inputNumber: {
       min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',

    },

    {
      label: 'Mes',
      placeholder: 'Ej: Enero/Febrero...',
      help: 'Seleccione un mes',
      formControlName: FormPeriodoLaboralEnum.mes,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select:  SELECT_MESES(FormPeriodoLaboralEnum.mes)
    },


    {
      label: 'Fecha Inicio',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha inicio',
      formControlName: FormPeriodoLaboralEnum.fechaInicio,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },


    {
      label: 'Fecha Fin',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha fin',
      formControlName: FormPeriodoLaboralEnum.fechaFin,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Activo',
      formControlName: FormPeriodoLaboralEnum.activo,
      type: fieldType.select,
      help: 'Seleccione si esta activo o no',
      select:{
        filterBy:'activo',
        dataKey:'activo',
        filterPlaceholder:'I = Inactivo, A = Activo',
        optionLabel: 'nombre',
        options:[
          {
            activo:ActivoInactivo.Activo,
            nombre: 'Activo',
          },
          {
            activo:ActivoInactivo.Inactivo,
            nombre: 'Inactivo',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },
    // {
    //   type: fieldType.text,
    //   label: 'Nombre',
    //   formControlName: FormPeriodoLaboralEnum.nombre,
    //   placeholder: 'Ej: ....',
    //   initialValue: "",
    //   help: 'Ingrese el nombre',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     // Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    // },
  ]
  return arregloCampos;
}
