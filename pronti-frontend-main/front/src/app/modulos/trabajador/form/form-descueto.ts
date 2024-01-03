import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {FormGroup, Validators} from '@angular/forms';
import {FORM_DESCUENTO_ENUM} from './form-descuento.enum';
import {SiNoEnum} from '../../../enums/si-no.enum';

export const FORM_DESCUENTO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Impuesto a la renta',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_DESCUENTO_ENUM.impuestoRenta,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'impuestoRenta',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            impuestoRenta: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            impuestoRenta: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },


    {
      label: 'Aporte IESS',
      placeholder: 'Ej: Si',
      help: 'Seleccione Si o No',
      formControlName: FORM_DESCUENTO_ENUM.aporteIess,
      initialValue: '',
      validators: [
        // Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'aporteIess',
        filterPlaceholder: 'Si/No',
        optionLabel: 'nombre',
        options: [
          {
            aporteIess: SiNoEnum.SI,
            nombre: 'Si',
          },
          {
            aporteIess: SiNoEnum.NO,
            nombre: 'No',
          }
        ]
      },
    },
  ]
  return arregloCampos;
}
