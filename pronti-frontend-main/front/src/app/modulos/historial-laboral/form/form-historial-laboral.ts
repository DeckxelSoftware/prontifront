import {AbstractControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {FormHistorialLaboralEnum} from './form-historial-laboral.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {SiNoEnum} from '../../../enums/si-no.enum';
import * as dayjs from "dayjs";

export const FORM_HISTORIAL_LABORAL: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Cargo',
      placeholder: 'Ej: Supervisor',
      help: 'Seleccione el cargo',
      formControlName: FormHistorialLaboralEnum.idCargo,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'División administrativa',
      placeholder: 'Ej: Comercial',
      help: 'Seleccione la división administrativa',
      formControlName: FormHistorialLaboralEnum.idDivisionAdministrativa,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombreDivision',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Agencia',
      placeholder: 'Ej: Matriz',
      help: 'Seleccione la agencia',
      formControlName: FormHistorialLaboralEnum.idAgencia,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      label: 'Tipo contrato',
      placeholder: 'Ej: Servicios',
      help: 'Seleccione el tipo de contrato',
      formControlName: FormHistorialLaboralEnum.tipoContrato,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Sueldo',
      formControlName: FormHistorialLaboralEnum.sueldo,
      placeholder: 'Ej: 600',
      initialValue: "",
      help: 'Ingrese el sueldo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.min(100)
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      inputNumber: {
        prefix: '$',
        min: 0,
        minFractionDigits: 2,
        maxFractionDigits: 2,
        allowEmpty: false
      }
    },
    {
      type: fieldType.date,
      label: 'Fecha ingreso',
      formControlName: FormHistorialLaboralEnum.fechaIngreso,
      placeholder: 'Ej: 07/06/2022',
      initialValue: "",
      help: 'Seleccione la fecha de ingreso',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        validadorFechaIgualODespuesDeFechaActual()
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
      formControlName: FormHistorialLaboralEnum.fechaFin,
      placeholder: 'Ej: 07/06/2022',
      initialValue: "",
      help: 'Seleccione la fecha de fin',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Duración',
      formControlName: FormHistorialLaboralEnum.duracion,
      placeholder: 'Ej: 1 año',
      initialValue: "",
      help: 'Ingrese la duración',
      disabled: true,
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Fue ascendido?',
      formControlName: FormHistorialLaboralEnum.fueAscendido,
      type: fieldType.select,
      help: 'Seleccione si fue ascendido',
      select: {
        filterBy: 'nombre',
        dataKey: 'fueAscendido',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            fueAscendido: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            fueAscendido: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Activo / Inactivo',
      column: '6',
      actualValue: '',
    },


    {
      label: 'Código sectorial',
      placeholder: 'Ej: A01010111210',
      help: 'Ingrese el código sectorial',
      formControlName: FormHistorialLaboralEnum.codigoSectorial,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },
  ]
  return arregloCampos;
}

export function validadorFechaIgualODespuesDeFechaActual(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const fechaActual = dayjs().format('YYYY/MM/DD');
    const diferenciaEntreFechas = dayjs(control.value).diff(fechaActual, 'days');
    const esFechaSeleccionadaValida = diferenciaEntreFechas >= 0;
    return esFechaSeleccionadaValida ? null : {validadorFechaIngreso: true};
  };
}
