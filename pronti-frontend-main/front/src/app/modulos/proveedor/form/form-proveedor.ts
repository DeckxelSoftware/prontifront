import {FormGroup, Validators} from '@angular/forms';
import {FormProveedorEnum} from './form-proveedor.enum';
import {fieldType, FormField} from '../../../componentes/forms/interfaces/form-field';
import {ActivoInactivo} from '../../../enums/activo-inactivo';
import {REGEX_LETRAS_ESPACIOS} from '../../../constantes/form/regex/letras-espacios';
import {SiNoEnum} from '../../../enums/si-no.enum';
import {FormEmpresaEnum} from '../../empresa/form/form-empresa.enum';
import {REGEX_NUMEROS} from '../../../constantes/form/regex/numeros';
import {FormUsuarioEnum} from '../../usuario/form/form-usuario.enum';
import {REGEX_EMAIL} from '../../../constantes/form/regex/email';
import {REGEX_PASS} from '../../../constantes/form/regex/password';


export const FORM_PROVEEDOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.select,
      label: 'Nombre',
      formControlName: FormProveedorEnum.tipoProveedor,
      placeholder: 'Ej: ....',
      initialValue: "",
      help: 'Ingrese el nombre',
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
      type: fieldType.select,
      label: 'Crear datos desde cero?',
      formControlName: FormProveedorEnum.tipoProveedor,
      placeholder: 'Ej: ....',
      initialValue: "",
      help: 'Ingrese el nombre',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        // Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'value',
        filterPlaceholder: '0 = Inactivo, 1 = Activo',
        optionLabel: 'nombre',
        options: [
          {
            value: 1,
            label: 'Si',
          },
          {
            value: 0,
            label: 'No',
          }
        ]
      },
    },
  ]
  return arregloCampos;
}


export const FORM_PROVEEDOR_NATURAL_PASAPORTE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      type: fieldType.text,
      label: 'Nombre persona referencia',
      formControlName: FormProveedorEnum.nombrePersonaReferencia,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Contacto referencia',
      formControlName: FormProveedorEnum.contactoReferencia,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.autoComplete,
      label: 'Tipo cuenta contable',
      formControlName: FormProveedorEnum.tipoCuentaContable,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
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
      type: fieldType.autoComplete,
      label: 'Clase contribuyente',
      formControlName: FormProveedorEnum.claseContribuyente,
      placeholder: 'Ej: RIMPE',
      initialValue: "",
      help: 'Seleccione la clase de contribuyente',
      //patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
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
      type: fieldType.select,
      label: 'Obligado llevar contabilidad?',
      formControlName: FormProveedorEnum.obligadoLlevarContabilidad,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'obligadoLLevarContabilidad',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            obligadoLLevarContabilidad: SiNoEnum.SI,
            label: 'Si',
          },
          {
            obligadoLLevarContabilidad: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
    {
      type: fieldType.select,
      label: 'Agente de retención?',
      formControlName: FormProveedorEnum.agenteRetencion,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'agenteRetencion',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            agenteRetencion: SiNoEnum.SI,
            label: 'Si',
          },
          {
            agenteRetencion: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
  ]
  return arregloCampos;
}

export const FORM_PROVEEDOR_EMPRESA: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
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
    {
      label: 'Obligado llevar contabilidad',
      formControlName: FormEmpresaEnum.obligadoLlevarContabilidad,
      type: fieldType.select,
      help: 'Seleccione si va llevar contabilidad',
      select: {
        filterBy: 'obligadoLlevarContabilidad',
        dataKey: 'obligadoLlevarContabilidad',
        filterPlaceholder: 'SI/NO',
        optionLabel: 'nombre',
        options: [
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
      select: {
        filterBy: 'agenteRetencion',
        dataKey: 'agenteRetencion',
        filterPlaceholder: 'SI/NO',
        optionLabel: 'nombre',
        options: [
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
      label: 'Nombre persona referencia',
      formControlName: FormProveedorEnum.nombrePersonaReferencia,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Contacto referencia',
      formControlName: FormProveedorEnum.contactoReferencia,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },

  ]
  return arregloCampos;
}


export const FORM_EMPRESA_PROVEEDOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

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
      autoComplete: {
        field: 'nombre',
        inputId: 'nombre',
        suggestions: []
      }
    },


  ]

  return arregloCampos;
}
export const FORM_USUARIO_PROVEEDOR: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [
    {
      label: 'Tipo documento de identidad',
      placeholder: 'Ej: Cédula',
      help: 'Seleccione el tipo de documento de identidad',
      formControlName: FormUsuarioEnum.tipoDocumentoIdentidad,
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
      type: fieldType.text,
      label: 'Documento de identidad',
      formControlName: FormUsuarioEnum.documentoIdentidad,
      placeholder: 'Ej: 1712...',
      initialValue: "",
      help: 'Ingrese el documento de identidad',
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_NUMEROS.regex)
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      patternMessage: REGEX_NUMEROS.mensaje,
    },
    {
      type: fieldType.text,
      label: 'Nombres',
      formControlName: FormUsuarioEnum.nombres,
      placeholder: 'Ej: Cristian ...',
      initialValue: "",
      help: 'Ingrese los nombres',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Apellidos',
      formControlName: FormUsuarioEnum.apellidos,
      placeholder: 'Ej: Lara ...',
      initialValue: "",
      help: 'Ingrese los apellidos',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // CLASE CONTRIBUYENTE
    {
      type: fieldType.autoComplete,
      label: 'Clase contribuyente',
      formControlName: FormProveedorEnum.claseContribuyente,
      placeholder: 'Ej: RIMPE',
      initialValue: "",
      help: 'Seleccione la clase de contribuyente',
      //patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
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
    // OBLIGADO LLEVAR CONTABILIDAD
    {
      type: fieldType.select,
      label: 'Obligado llevar contabilidad?',
      formControlName: FormProveedorEnum.obligadoLlevarContabilidad,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'obligadoLLevarContabilidad',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            obligadoLLevarContabilidad: SiNoEnum.SI,
            label: 'Si',
          },
          {
            obligadoLLevarContabilidad: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
    // AGENTE RETENCION
    {
      type: fieldType.select,
      label: 'Agente de retención?',
      formControlName: FormProveedorEnum.agenteRetencion,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'agenteRetencion',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            agenteRetencion: SiNoEnum.SI,
            label: 'Si',
          },
          {
            agenteRetencion: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
    {
      type: fieldType.text,
      label: 'Dirección',
      formControlName: FormUsuarioEnum.direccion,
      placeholder: 'Ej: Av. 10 de agosto y...',
      initialValue: "",
      help: 'Ingrese la dirección del usuario',
      validators: [
        // Validators.required,
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Tipo medio de contacto',
      placeholder: 'Ej: Tipo medio contacto',
      help: 'Seleccione el tipo de medio de contacto',
      formControlName: FormUsuarioEnum.tipoMedioContacto,
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
      type: fieldType.text,
      label: 'Medio de contacto',
      formControlName: FormUsuarioEnum.medioContacto,
      placeholder: 'Ej: medio de contacto ...',
      initialValue: "",
      help: 'Ingrese el medio de contacto',
      validators: [
        Validators.required,
        Validators.maxLength(255),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      type: fieldType.text,
      label: 'Correo',
      formControlName: FormUsuarioEnum.correo,
      placeholder: 'Ej: cristian@mail.com',
      initialValue: "",
      help: 'Ingrese el correo',
      patternMessage: REGEX_EMAIL.mensaje,
      validators: [
        Validators.required,
        Validators.maxLength(255),
        Validators.pattern(REGEX_EMAIL.regex),

      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    {
      label: 'Provincia',
      placeholder: 'Ej: Pichincha',
      help: 'Seleccione una provincia',
      formControlName: FormUsuarioEnum.provincia,
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
      label: 'Ciudad',
      placeholder: 'Ej: Quito',
      help: 'Seleccione una ciudad',
      formControlName: FormUsuarioEnum.ciudad,
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
    // NOMBRE PERSONA REFERENCIA
    {
      type: fieldType.text,
      label: 'Nombre persona referencia',
      formControlName: FormProveedorEnum.nombrePersonaReferencia,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // CONTACTO DE REFERENCIA
    {
      type: fieldType.text,
      label: 'Contacto referencia',
      formControlName: FormProveedorEnum.contactoReferencia,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}


export const FORM_USUARIO_PROVEEDOR_AUTOCOMPLETE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Usuario',
      placeholder: 'Ej: Cristian ...',
      help: 'Seleccione un usuario',
      formControlName: FormProveedorEnum.idUsuario,
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
        field: 'nombresCompletos',
        inputId: 'id',
        suggestions: []
      }
    },
    // CLASE CONTRIBUYENTE
    {
      type: fieldType.autoComplete,
      label: 'Clase contribuyente',
      formControlName: FormProveedorEnum.claseContribuyente,
      placeholder: 'Ej: RIMPE',
      initialValue: "",
      help: 'Seleccione la clase de contribuyente',
      //patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
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
    // OBLIGADO LLEVAR CONTABILIDAD
    {
      type: fieldType.select,
      label: 'Obligado llevar contabilidad?',
      formControlName: FormProveedorEnum.obligadoLlevarContabilidad,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'obligadoLLevarContabilidad',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            obligadoLLevarContabilidad: SiNoEnum.SI,
            label: 'Si',
          },
          {
            obligadoLLevarContabilidad: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
    // AGENTE RETENCION
    {
      type: fieldType.select,
      label: 'Agente de retención?',
      formControlName: FormProveedorEnum.agenteRetencion,
      placeholder: 'Ej: Si',
      initialValue: "",
      help: 'Seleccione si o no',
      // patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        // Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
      select: {
        filterBy: 'label',
        dataKey: 'agenteRetencion',
        filterPlaceholder: 'Si/No',
        optionLabel: 'label',
        options: [
          {
            agenteRetencion: SiNoEnum.SI,
            label: 'Si',
          },
          {
            agenteRetencion: SiNoEnum.NO,
            label: 'No',
          }
        ]
      },
    },
    // NOMBRE PERSONA REFERENCIA
    {
      type: fieldType.text,
      label: 'Nombre persona referencia',
      formControlName: FormProveedorEnum.nombrePersonaReferencia,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // CONTACTO DE REFERENCIA
    {
      type: fieldType.text,
      label: 'Contacto referencia',
      formControlName: FormProveedorEnum.contactoReferencia,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}

export const FORM_EMPRESA_PROVEEDOR_AUTOCOMPLETE: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    {
      label: 'Empresa',
      placeholder: 'Ej: Empresa ...',
      help: 'Seleccione una empresa',
      formControlName: FormProveedorEnum.idEmpresa,
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
        field: 'razonSocial',
        inputId: 'id',
        suggestions: []
      }
    },
    // NOMBRE PERSONA REFERENCIA
    {
      type: fieldType.text,
      label: 'Nombre persona referencia',
      formControlName: FormProveedorEnum.nombrePersonaReferencia,
      placeholder: 'Ej: Cristian...',
      initialValue: "",
      help: 'Ingrese el nombre',
      patternMessage: REGEX_LETRAS_ESPACIOS.mensaje,
      validators: [
        Validators.required,
        Validators.pattern(REGEX_LETRAS_ESPACIOS.regex),
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
    // CONTACTO DE REFERENCIA
    {
      type: fieldType.text,
      label: 'Contacto referencia',
      formControlName: FormProveedorEnum.contactoReferencia,
      placeholder: 'Ej: contacto...',
      initialValue: "",
      help: 'Ingrese el contacto',
      validators: [
        Validators.required,
      ],
      formGroup: new FormGroup({}),
      valid: false,
      column: '6',
      actualValue: '',
    },
  ]
  return arregloCampos;
}
