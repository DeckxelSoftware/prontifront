import {FormGroup, Validators} from '@angular/forms';
import {FormCargoEnum} from './form-cargo.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormListaValoresDetalleEnum} from '../../lista-valores-detalle/form/form-lista-valores-detalle.enum';


export const FORM_CARGO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormCargoEnum.nombre,
      placeholder: 'Ej: Supervisor',
      initialValue: "",
      help: 'Ingrese el nombre',
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
    // {
    //   type: fieldType.inputNumber,
    //   label: 'Sueldo',
    //   formControlName: FormCargoEnum.sueldo,
    //   placeholder: 'Ej: 600',
    //   initialValue: "",
    //   help: 'Ingrese el sueldo',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   inputNumber: {
    //     prefix: '$',
    //     minFractionDigits: 2,
    //     maxFractionDigits: 2
    //   }
    // },
    {
      label: 'Area',
      placeholder: 'Ej: Comercial',
      help: 'Seleccione la area',
      formControlName: FormCargoEnum.idArea,
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
  ]
  return arregloCampos;
}
