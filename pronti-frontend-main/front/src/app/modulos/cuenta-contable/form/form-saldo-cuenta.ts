import {fieldType, FormField} from "../../../componentes/forms/interfaces/form-field";
import {FormCuentaContableEnum} from "./form-cuenta-contable.enum";
import {FormGroup, Validators} from "@angular/forms";
import {TipoCuentaEnum} from "../../../enums/tipo-cuenta.enum";
import {TipoMovimientoEnum} from "../../../enums/tipo-movimiento.enum";

export const FORM_SALDO_CUENTA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Periodo contable',
      placeholder: 'Ej: 2020',
      help: 'Seleccione un periodo contable',
      formControlName: FormCuentaContableEnum.idPeriodoContable,
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
        field: 'detalle',
        inputId: 'id',
        suggestions: []
      }
    },
    {
      type: fieldType.text,
      label: 'Nombre',
      formControlName: FormCuentaContableEnum.nombre,
      placeholder: 'Ej: Bancos',
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
    {
      label: 'Tipo cuenta',
      formControlName: FormCuentaContableEnum.tipoCuenta,
      type: fieldType.select,
      help: 'Seleccione el tipo de cuenta',
      select: {
        filterBy: 'nombre',
        dataKey: 'tipoCuenta',
        filterPlaceholder: ' Acreedora / Deudora',
        optionLabel: 'nombre',
        options: [
          {
            tipoCuenta: TipoCuentaEnum.deudora,
            nombre: 'Deudora',
          },
          {
            tipoCuenta: TipoCuentaEnum.acreedora,
            nombre: 'Acreedora',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: Acreedora / Deudora',
      column: '6',
      actualValue: '',
    },
    // {
    //   label: 'Movimiento',
    //   formControlName: FormCuentaContableEnum.movimiento,
    //   type: fieldType.select,
    //   help: 'Seleccione el tipo de movimiento',
    //   select: {
    //     filterBy: 'nombre',
    //     dataKey: 'movimiento',
    //     filterPlaceholder: 'Mayor / Auxiliar',
    //     optionLabel: 'nombre',
    //     options: [
    //       {
    //         movimiento: TipoMovimientoEnum.mayor,
    //         nombre: 'Mayor',
    //       },
    //       {
    //         movimiento: TipoMovimientoEnum.auxiliar,
    //         nombre: 'Auxiliar',
    //       }
    //     ]
    //   },
    //   initialValue: "",
    //   validators: [
    //     Validators.required
    //   ],
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   placeholder: 'Ej: Mayor / Auxiliar',
    //   column: '6',
    //   actualValue: '',
    // },
    {
      label: '',
      placeholder: '',
      help: '',
      formControlName: '',
      initialValue: '',
      validators: [],
      type: fieldType.separator,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      separator: {
        html: `<div class="separador"></div>`
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Anterior débito',
      formControlName: FormCuentaContableEnum.anteriorDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el anterior débito',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: 0,
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Anterior crédito',
      formControlName: FormCuentaContableEnum.anteriorCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el anterior crédito',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: 0,
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Anterior saldo',
      formControlName: FormCuentaContableEnum.anteriorSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el anterior saldo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      disabled: true,
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito actual',
      formControlName: FormCuentaContableEnum.actualDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito actual',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito actual',
      formControlName: FormCuentaContableEnum.actualCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito  actual',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo actual',
      formControlName: FormCuentaContableEnum.actualSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo actual',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito enero',
      formControlName: FormCuentaContableEnum.eneroDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de enero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito enero',
      formControlName: FormCuentaContableEnum.eneroCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de enero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo enero',
      formControlName: FormCuentaContableEnum.eneroSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de enero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito febrero',
      formControlName: FormCuentaContableEnum.febreroDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de febrero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito febrero',
      formControlName: FormCuentaContableEnum.febreroCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de febrero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo febrero',
      formControlName: FormCuentaContableEnum.febreroSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de febrero',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito marzo',
      formControlName: FormCuentaContableEnum.marzoDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de marzo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito marzo',
      formControlName: FormCuentaContableEnum.marzoCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de marzo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo marzo',
      formControlName: FormCuentaContableEnum.marzoSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de marzo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito abril',
      formControlName: FormCuentaContableEnum.abrilDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de abril',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito abril',
      formControlName: FormCuentaContableEnum.abrilCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de abril',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo abril',
      formControlName: FormCuentaContableEnum.abrilSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de abril',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito mayo',
      formControlName: FormCuentaContableEnum.mayoDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de mayo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito mayo',
      formControlName: FormCuentaContableEnum.mayoCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de mayo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo mayo',
      formControlName: FormCuentaContableEnum.mayoSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de mayo',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito junio',
      formControlName: FormCuentaContableEnum.junioDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de junio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito junio',
      formControlName: FormCuentaContableEnum.junioCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de junio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo junio',
      formControlName: FormCuentaContableEnum.junioSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de junio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito julio',
      formControlName: FormCuentaContableEnum.julioDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de julio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito julio',
      formControlName: FormCuentaContableEnum.julioCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de julio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo julio',
      formControlName: FormCuentaContableEnum.julioSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de julio',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito agosto',
      formControlName: FormCuentaContableEnum.agostoDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de agosto',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito agosto',
      formControlName: FormCuentaContableEnum.agostoCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de agosto',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo agosto',
      formControlName: FormCuentaContableEnum.agostoSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de agosto',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito septiembre',
      formControlName: FormCuentaContableEnum.septiembreDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de septiembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito septiembre',
      formControlName: FormCuentaContableEnum.septiembreCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de septiembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo septiembre',
      formControlName: FormCuentaContableEnum.septiembreSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de septiembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    , {
      type: fieldType.inputNumber,
      label: 'Débito octubre',
      formControlName: FormCuentaContableEnum.octubreDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de octubre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito octubre',
      formControlName: FormCuentaContableEnum.octubreCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de octubre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo octubre',
      formControlName: FormCuentaContableEnum.octubreSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de octubre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito noviembre',
      formControlName: FormCuentaContableEnum.noviembreDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de noviembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito noviembre',
      formControlName: FormCuentaContableEnum.noviembreCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de noviembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo noviembre',
      formControlName: FormCuentaContableEnum.noviembreSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de noviembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }
    ,
    {
      type: fieldType.inputNumber,
      label: 'Débito diciembre',
      formControlName: FormCuentaContableEnum.diciembreDebito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el débito de diciembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Crédito diciembre',
      formControlName: FormCuentaContableEnum.diciembreCredito,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el crédito de diciembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    },
    {
      type: fieldType.inputNumber,
      label: 'Saldo diciembre',
      formControlName: FormCuentaContableEnum.diciembreSaldo,
      placeholder: 'Ej: 1000',
      initialValue: "",
      help: 'Ingrese el saldo de diciembre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '4',
      actualValue: '',
      disabled: true,
      inputNumber: {
        mode: 'decimal',

        suffix: '',
        prefix: '$',
        min: 0,
        allowEmpty: false,
        minFractionDigits: 2,
        maxFractionDigits: 4,
      }
    }


  ]
  return arregloCampos;
}
