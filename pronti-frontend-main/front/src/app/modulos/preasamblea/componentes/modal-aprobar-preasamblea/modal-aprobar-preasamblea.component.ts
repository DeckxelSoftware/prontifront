import {Component, Inject} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import * as dayjs from "dayjs";
import {EstadoPreasambleaEnum} from '../../../../enums/estado-preasamblea.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-modal-aprobar-preasamblea',
  templateUrl: './modal-aprobar-preasamblea.component.html',
  styleUrls: ['./modal-aprobar-preasamblea.component.scss']
})
export class ModalAprobarPreasambleaComponent  {

  formPlan = new FormGroup({})
  formCliente = new FormGroup({});
  formVendedor = new FormGroup({});
  formContrato = new FormGroup({});
  formPreasamblea = new FormGroup({});


  modelPlan: any = {
    planSeleccionado: '',
    precioPlanSeleccionado: '',
    plazoMesSeleccionado: '',
  }

  modelContrato: any = {
    numeroDeContrato: '',
    fechaInicio: '',
    estado: '',
    cuotasPagadas: '',
    cuotasEnMora: '',
  }

  modelCliente: any = {
    nombres: '',
    apellidos: '',
    documentoIdentidad: '',
    medioContacto1: '',
    nombreGrupo: ''
  };

  modelPreasamblea: any = {
    fechaPreasamblea: '',
    fechaLimite: '',
    estado: '',
    observaciones: ''
  }


  fieldsPlan: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'planSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plan',
          }
        },
        {
          className: 'col-6',
          key: 'precioPlanSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Monto',
          }
        },

        {
          className: 'col-6',
          key: 'plazoMesSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plazo',
          }
        },
      ]
    }
  ];


  fieldsCliente: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'nombres',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Nombres',
          }
        },
        {
          className: 'col-6',
          key: 'apellidos',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Apellidos',
          }
        },

        {
          className: 'col-6',
          key: 'documentoIdentidad',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Documento identidad',
          }
        },

        {
          className: 'col-6',
          key: 'medioContacto1',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Medio de contacto',
          }
        },
        {
          className: 'col-6',
          key: 'nombreGrupo',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Grupo',
          }
        },
      ]
    }
  ];


  fieldsContrato: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'numeroDeContrato',
          type: 'input',
          templateOptions: {
            type: 'number',
            min: 0,
            required: true,
            label: 'Número de contrato',
          }
        },
        {
          className: 'col-4',
          key: 'fechaInicio',
          type: 'input',
          templateOptions: {
            required: true,
            type: 'date',
            label: 'fechaInicio',
          },
          expressionProperties: {}
        },
        {
          className: 'col-4',
          key: 'cuotasPagadas',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Cuotas pagadas',
          }
        },

        {
          className: 'col-4',
          key: 'totalCuotasMora',
          type: 'input',
          templateOptions: {
            readonly: true,
            type: 'number',
            label: 'Cuotas s ',
          }
        },
      ]
    }
  ];

  fieldsPreasamblea: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-6',
          key: 'fechaPreasamblea',
          type: 'input',
          templateOptions: {
            type: 'date',
            label: 'Fecha preasamblea',
            required: true,
          }
        },
        {
          className: 'col-6',
          key: 'estado',
          type: 'select',
          templateOptions: {
            label: 'Estado',
            required: true,
            options: [
              {
                value: EstadoPreasambleaEnum.Aprobado,
                label: 'Aprobado'
              },

              {
                value: EstadoPreasambleaEnum.NoAprobado,
                label: 'No aprobado'
              },

              {
                value: EstadoPreasambleaEnum.AprobadoPorGerencia,
                label: 'Aprobado por gerencia'
              },
            ]
          }
        },

        {
          className: 'col-6',
          key: 'observaciones',
          type: 'input',
          templateOptions: {
            type: 'text',
            label: 'Observaciones',
          }
        },
      ]
    }
  ];

  constructor(public dialogRef: MatDialogRef<ModalAprobarPreasambleaComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }


  cancelarAprobarPreasamblea() {
    this.dialogRef.close();
  }

  validarBotonCrear() {
    return !this.formPreasamblea.valid;
  }

  async confirmarAprobarAsamblea() {
    this.modelPreasamblea.fechaLimite = dayjs(this.modelPreasamblea.fechaPreasamblea)
      .add(20, 'd').format('YYYY-MM-DD');
    const respuesta = await this.data.component.aprobarPreasamblea(this.modelPreasamblea);
    if (respuesta) {
      this.dialogRef.close()
    }
  }
}
