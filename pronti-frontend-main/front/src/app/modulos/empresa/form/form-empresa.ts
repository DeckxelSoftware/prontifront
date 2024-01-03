import {FormGroup, Validators} from '@angular/forms';
import {FormEmpresaEnum} from './form-empresa.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';
import {ActivoInactivo} from '../../../enums/activo-inactivo';
import {SiNoEnum} from '../../../enums/si-no.enum';


export const FORM_EMPRESA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre comercial',
      formControlName: FormEmpresaEnum.nombreComercial,
      placeholder: 'Ej: Manticore',
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
      type: fieldType.text,
      label: 'Razón social',
      formControlName: FormEmpresaEnum.razonSocial,
      placeholder: 'Ej: Manticore',
      initialValue: "",
      help: 'Ingrese la razón social',
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
      type: fieldType.text,
      label: 'RUC',
      formControlName: FormEmpresaEnum.rucEmpresa,
      placeholder: 'Ej: 1768..',
      initialValue: "",
      help: 'Ingrese el RUC',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Dirección de empresa',
      formControlName: FormEmpresaEnum.direccionEmpresa,
      placeholder: 'Ej: Calle ABC..',
      initialValue: "",
      help: 'Ingrese la dirección',
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
      type: fieldType.text,
      label: 'Teléfono',
      formControlName: FormEmpresaEnum.telefonoEmpresa,
      placeholder: 'Ej: 0223..',
      initialValue: "",
      help: 'Ingrese el teléfono',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Documento representante legal',
      formControlName: FormEmpresaEnum.documentoRepresentanteLegal,
      placeholder: 'Ej: 0223..',
      initialValue: "",
      help: 'Ingrese el documento del representante legal',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Nombre representante legal',
      formControlName: FormEmpresaEnum.nombreRepresentanteLegal,
      placeholder: 'Ej: Adrián..',
      initialValue: "",
      help: 'Ingrese el nombre del representante legal',
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
      type: fieldType.text,
      label: 'Nombre contador',
      formControlName: FormEmpresaEnum.nombreContador,
      placeholder: 'Ej: Cristian..',
      initialValue: "",
      help: 'Ingrese el nombre del contador',
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
      type: fieldType.text,
      label: 'RUC contador',
      formControlName: FormEmpresaEnum.rucContador,
      placeholder: 'Ej: 1768..',
      initialValue: "",
      help: 'Ingrese el RUC del contador',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Teléfono contador',
      formControlName: FormEmpresaEnum.telefonoContador,
      placeholder: 'Ej: 0223..',
      initialValue: "",
      help: 'Ingrese el teléfono del contador',
      patternMessage: REGEX_NUMEROS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_NUMEROS.regex),
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Correo empresa',
      formControlName: FormEmpresaEnum.correoEmpresa,
      placeholder: 'Ej: manticore@labs.com',
      initialValue: "",
      help: 'Ingrese el correo de la empresa',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.email,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Correo contador',
      formControlName: FormEmpresaEnum.correoContador,
      placeholder: 'Ej: contador@labs.com',
      initialValue: "",
      help: 'Ingrese el correo del contador',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.email,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

    {
      type: fieldType.text,
      label: 'Correo representate legal',
      formControlName: FormEmpresaEnum.correoRepresentanteLegal,
      placeholder: 'Ej: representante@labs.com',
      initialValue: "",
      help: 'Ingrese el correo del representante legal',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.email,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo Empresa',
      placeholder: 'Ej: Sociedad Anónima',
      help: 'Seleccione el tipo de empresa',
      formControlName: FormEmpresaEnum.tipoEmpresa,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.autoComplete,
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      autoComplete:{
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },
    {
      label: 'Obligado llevar contabilidad',
      formControlName: FormEmpresaEnum.obligadoLlevarContabilidad,
      type: fieldType.select,
      help: 'Seleccione si va llevar contabilidad',
      select:{
        filterBy:'obligadoLlevarContabilidad',
        dataKey:'obligadoLlevarContabilidad',
        filterPlaceholder:'SI/NO',
        optionLabel: 'nombre',
        options:[
          {
            obligadoLlevarContabilidad: SiNoEnum.SI,
            nombre: 'SI',
          },
          {
            obligadoLlevarContabilidad: SiNoEnum.NO,
            nombre: 'NO',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: SI / NO',
      column: '6',
      actualValue: '',
    },

    {
      label: 'Agente retención',
      formControlName: FormEmpresaEnum.agenteRetencion,
      type: fieldType.select,
      help: 'Seleccione si es agente de retención',
      select:{
        filterBy:'agenteRetencion',
        dataKey:'agenteRetencion',
        filterPlaceholder:'SI/NO',
        optionLabel: 'nombre',
        options:[
          {
            agenteRetencion: SiNoEnum.SI,
            nombre: 'SI',
          },
          {
            agenteRetencion: SiNoEnum.NO,
            nombre: 'NO',
          }
        ]
      },
      initialValue: "",
      validators: [
        Validators.required
      ],
      formGroup: new FormGroup({}),
      valid: false,
      placeholder: 'Ej: SI / NO',
      column: '6',
      actualValue: '',
    },
    {
      label: 'Clase contribuyente',
      placeholder: 'Ej: RIMPE',
      help: 'Seleccione la clase de contribuyente',
      formControlName: FormEmpresaEnum.claseContribuyente,
      initialValue: '',
      validators: [
        Validators.required
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

