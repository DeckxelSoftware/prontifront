import {FormGroup, Validators} from '@angular/forms';
import {FormPreasambleaEnum} from './form-preasamblea.enum';
import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {EstadoPreasambleaEnum} from '../../../enums/estado-preasamblea.enum';


export const FORM_PREASAMBLEA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Fecha preasamblea',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha de preasamblea',
      formControlName: FormPreasambleaEnum.fechaPreasamblea,
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
      label: 'Estado',
      placeholder: 'Ej: Aprobado, No aprobado',
      help: 'Seleccione el estado de la preasamblea',
      formControlName: FormPreasambleaEnum.estado,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.select,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'nombre',
        dataKey: 'estado',
        filterPlaceholder: 'No',
        optionLabel: 'nombre',
        options: [
          {
            estado: EstadoPreasambleaEnum.Aprobado,
            nombre: 'Aprobado',
          },
          {
            estado: EstadoPreasambleaEnum.NoAprobado,
            nombre: 'No aprobado',
          },
          {
            estado: EstadoPreasambleaEnum.AprobadoPorGerencia,
            nombre: 'Aprobado por gerencia',
          }
        ]
      }
    },
    {
      label: 'Fecha límite',
      placeholder: 'Ej: mm-dd-yyyy',
      help: 'Ingrese una fecha de límite',
      formControlName: FormPreasambleaEnum.fechaLimite,
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
      type: fieldType.text,
      label: 'Observaciones',
      formControlName: FormPreasambleaEnum.observaciones,
      placeholder: 'Ej: Observaciones',
      initialValue: "",
      help: 'Ingrese las observaciones',
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
  ]
  return arregloCampos;
}
