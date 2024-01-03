import {FormGroup, Validators} from '@angular/forms';
import {FormClienteEnum} from './form-cliente.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {TipoClienteEnum} from '../../../enums/tipo-cliente.enum';


export const FORM_CLIENTE: (tipoCliente: string) => (FormField[]) = (tipoCliente: string) => {
  console.log('mirame', tipoCliente);
  let strTipoCliente = '';
  switch (tipoCliente) {
    case TipoClienteEnum.Natural:
      strTipoCliente = 'Natural'
      break;
    case TipoClienteEnum.Empresa:
      strTipoCliente = 'Empresa'
      break
    case TipoClienteEnum.Pasaporte:
      strTipoCliente = 'Pasaporte'
      break
  }
  const arregloCampos: FormField[] = [
    // {
    //   type: fieldType.text,
    //   label: 'Tipo cliente',
    //   formControlName: FormClienteEnum.TipoCliente,
    //   initialValue: strTipoCliente,
    //   help: 'Tipo de cliente',
    //   // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
    //   validators: [
    //     // Validators.required,
    //     // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: true,
    //   column: '6',
    //   actualValue: '',
    //   disabled: true,
    // },
    {
      label: 'Tipo cliente',
      formControlName: FormClienteEnum.TipoCliente,
      type: fieldType.select,
      help: 'Seleccionó',
      select: {
        filterBy: 'tipoCliente',
        dataKey: 'tipoCliente',
        filterPlaceholder: 'Natural, Empresa, Pasaporte',
        optionLabel: 'nombre',
        options: [
          {
            tipoCliente: TipoClienteEnum.Natural,
            nombre: 'Natural',
          },
          {
            tipoCliente: TipoClienteEnum.Empresa,
            nombre: 'Empresa',
          },
          {
            tipoCliente: TipoClienteEnum.Pasaporte,
            nombre: 'Pasaporte',
          }
        ]
      },
      initialValue: {
        tipoCliente: tipoCliente,
        nombre: strTipoCliente
      },
      validators: [],
      formGroup: new FormGroup({}),
      valid: true,
      disabled: true,
      placeholder: 'Ej: Natural / Empresa / Pasaporte',
      column: '6',
      actualValue: ''
    },


    {
      label: 'Usuario',
      placeholder: 'Ej: 1711111/Adrian/Eguez...',
      help: 'Busque por nombres, apellidos o número de identidad',
      formControlName: FormClienteEnum.Usuario,
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
        field: 'nombres',
        inputId: 'id',
        suggestions: []
      }
    },


  ];

  if (tipoCliente === TipoClienteEnum.Empresa) {
    console.log('quitale alguito ve');
    arregloCampos.push({
      label: 'Empresa',
      placeholder: 'Ej: Manticore/174323522001...',
      help: 'Busque por nombre comercial,razón social o ruc empresa',
      formControlName: FormClienteEnum.Empresa,
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
        field: 'nombreComercial',
        inputId: 'id',
        suggestions: []
      }
    })
  }
  return arregloCampos;
}
