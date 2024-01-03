import {FormGroup, Validators} from '@angular/forms';
import {FormArchivoEnum} from './form-archivo.enum';
import {fieldType, FormField, TipoArchivo} from '../../../componentes/forms/interfaces/form-field';
import {SELECT_DIAS_SEMANA} from '../../../constantes/form/select/dias-semana';
import {DiaSemanaEnum} from '../../../constantes/form/select/enums/dia-semana.enum';


export const FORM_ARCHIVO: () => (FormField[]) = () => {
  const arregloCampos: FormField[] = [

    // {
    //   label: 'Tipo de archivo',
    //   placeholder: 'Ej: Principal',
    //   help: 'Seleccione el tipo de archivo',
    //   formControlName: FormArchivoEnum.tipoArchivo,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: {
    //     filterBy: 'label',
    //     dataKey: 'tipoArchivo',
    //     filterPlaceholder: 'P/S',
    //     optionLabel: 'label',
    //     options: [
    //       {
    //         label:'Principal',
    //         tipoArchivo: 'P',
    //       },
    //       {
    //         label:'Secundario',
    //         tipoArchivo: 'S',
    //       },
    //     ]
    //   }
    // },
    // {
    //   label: 'Tipo de documento',
    //   placeholder: 'Ej: Imagen',
    //   help: 'Seleccione el tipo de documento',
    //   formControlName: FormArchivoEnum.tipoDocumento,
    //   initialValue: '',
    //   validators: [
    //     Validators.required,
    //   ],
    //   type: fieldType.select,
    //   formGroup: new FormGroup({}),
    //   valid: false,
    //   column: '6',
    //   actualValue: '',
    //   select: {
    //     filterBy: 'label',
    //     dataKey: 'tipoDocumento',
    //     filterPlaceholder: 'Imagen/Archivo',
    //     optionLabel: 'label',
    //     options: [
    //       {
    //         label:'Imagen',
    //         tipoDocumento: 'I',
    //       },
    //       {
    //         label:'Archivo',
    //         tipoDocumento: 'A',
    //       },
    //     ]
    //   }
    // },
    {
      label: 'Archivo',
      placeholder: 'Ej: File',
      help: 'Selecciona un archivo',
      formControlName: FormArchivoEnum.file,
      initialValue: '',
      validators: [
        Validators.required,
      ],
      type: fieldType.file,
      formGroup: new FormGroup({}),
      valid: false,
      column: '12',
      actualValue: '',
      file: {
        tamanioMaximoEnBytes: 1000000 * 2,
        accept: '',
        typo: TipoArchivo.Archivo
      }
    },
  ]
  return arregloCampos;
}
