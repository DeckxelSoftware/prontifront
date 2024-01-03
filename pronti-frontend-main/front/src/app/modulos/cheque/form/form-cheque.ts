import {FormGroup, Validators} from '@angular/forms';
import {FormChequeEnum} from './form-cheque.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {EstadoChequeEnum} from '../../../enums/estado-cheque.enum';


export const FORM_CHEQUE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Chequera',
      placeholder: 'Ej: chequera ...',
      help: 'Seleccione la chequera',
      formControlName: FormChequeEnum.idChequera,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      autoComplete: {
        field: 'nombre',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.number,
      label: 'Número de cheque',
      formControlName: FormChequeEnum.numeroCheque,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el número de cheque',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      number: {
        min: 0
      }
    },
    {
      label: 'Estado',
      formControlName: FormChequeEnum.estadoCheque,
      type: fieldType.select,
      help: 'Seleccione si esta habilitado o no',
      select: {
        filterBy: 'nombre',
        dataKey: 'estadoCheque',
        filterPlaceholder: 'Libre, Usado, Cobrado, Anulado',
        optionLabel: 'nombre',
        options: [
          {
            estadoCheque: EstadoChequeEnum.libre,
            nombre: 'Libre',
          },
          {
            estadoCheque: EstadoChequeEnum.usado,
            nombre: 'Usado',
          },
          {
            estadoCheque: EstadoChequeEnum.cobrado,
            nombre: 'Cobrado',
          },
          {
            estadoCheque: EstadoChequeEnum.anulado,
            nombre: 'Anulado',
          }
        ]
      },
      initialValue: "",
      validators: [],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Libre / Usado',
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
