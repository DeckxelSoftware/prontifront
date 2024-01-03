import {FormGroup, Validators} from '@angular/forms';
import {FormContratoEnum} from './form-contrato.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {DiaSemanaEnum} from '../../../constantes/form/select/enums/dia-semana.enum';


export const FORM_ITEM_ACCORDION_CONTRATO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.number,
      label: 'Número de contrato',
      formControlName: FormContratoEnum.numeroDeContrato,
      placeholder: 'Ej: 1292',
      initialValue: "",
      help: 'Ingrese el número de contrato',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.min(0),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },

    {
      label: 'Fecha inicio',
      placeholder: 'Ej: 10-30-2022',
      help: 'Ingrese una fecha de inicio',
      formControlName: FormContratoEnum.fechaInicio,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },

    {
      label: 'Fecha inicia cobro',
      placeholder: 'Ej: 10-30-2022',
      help: 'Ingrese una fecha de inicio de cobro',
      formControlName: FormContratoEnum.fechaIniciaCobro,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.date,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },



    {
      type: fieldType.number,
      label: 'Descuento inscripción',
      formControlName: FormContratoEnum.dsctoInscripcion,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el descuenta por inscripción',
      validators: [
        Validators.min(0),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },

    {
      type: fieldType.number,
      label: 'Descuento primera cuota',
      formControlName: FormContratoEnum.dsctoPrimeraCuota,
      placeholder: 'Ej: 12',
      initialValue: "",
      help: 'Ingrese el descuenta por primera cuota',
      validators: [
        Validators.min(0),
      ],
      number: {
        min: 0
      },
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },
    {
      label: 'Observación',
      placeholder: 'Ej: Observación',
      help: 'Ingrese la observación',
      formControlName: FormContratoEnum.observacion,
      initialValue: '',
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
      ],
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      type: fieldType.text,
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
