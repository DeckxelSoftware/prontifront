import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {PlanResponseDto} from '../../modulos/plan/servicios/dto/plan.response-dto';
import {HttpPrecioService} from '../../modulos/precio/servicios/http-precio-service';
import {MessageService} from 'primeng/api';
import {PrecioResponseDto} from '../../modulos/precio/servicios/dto/precio.response-dto';
import {MENSAGE_TOAST} from '../../constantes/toaster/mensaje-toast';
import {
  HttpConfiguracionGeneralService
} from '../../modulos/configuracion-general/servicios/http-configuracion-general-service';
import {
  ConfiguracionGeneralResponseDto
} from '../../modulos/configuracion-general/servicios/dto/configuracion-general.response-dto';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modal-seleccionar-cuotas',
  templateUrl: './modal-seleccionar-cuotas.component.html',
  styleUrls: ['./modal-seleccionar-cuotas.component.scss']
})
export class ModalSeleccionarCuotasComponent implements OnInit {
  precios: PrecioResponseDto[] = [];
  datosConfiguracion: ConfiguracionGeneralResponseDto = {};
  cols: any[] = [];
  datosPlan: any = [];
  formGroupPlan = new FormGroup({});
  modelPlanSeleccionado: any = {};
  fieldsPlan: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'plan',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plan',
          }
        },
        {
          className: 'col-4',
          key: 'precioSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Monto',
          }
        },
        {
          className: 'col-4',
          key: 'plazoSeleccionado',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Plazo',
          }
        },
        {
          className: 'col-4',
          key: 'inscripcion',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'Inscripción',
          }
        },
        {
          className: 'col-4',
          key: 'cuotaSeleccionada',
          type: 'input',
          templateOptions: {
            readonly: true,
            label: 'cuota',
          }
        },
      ]
    }
  ]

  constructor(
    public httpConfiguracionGeneralService: HttpConfiguracionGeneralService,
    public dialogRef: MatDialogRef<ModalSeleccionarCuotasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {
      plan: PlanResponseDto,
    },
    public httpPrecioService: HttpPrecioService,
    public messageService: MessageService,
  ) {
  }

  async ngOnInit() {
    if (this.data.plan) {
      console.log(this.data.plan.modelo);
      this.modelPlanSeleccionado.plan = this.data.plan.modelo;
      this.iniciarColumnas(this.data.plan);
      this.datosPlan = this.generarDatosTabla(this.data.plan);
    } else {

      this.messageService.add({summary: 'Error', detail: 'No envía plan', severity: 'error'});
    }


  }

  obtnerPrecios(idPlan: number): Promise<PrecioResponseDto[]> {
    return new Promise((resolve, reject) => {
        this.httpPrecioService.find({idPlanId: idPlan})
          .subscribe(
            {
              next: res => {
                if (res[1] >= 1) {
                  resolve(res[0]);
                } else {
                  reject('No se encontraron precios para el plan seleccionado');
                }
              },
              error: err => {
                reject('Error consultando precios del plan');
              }
            }
          )
      }
    );

  }

  generarDatosTabla(plan: PlanResponseDto) {
    const datosCuotas: any[] = [];
    console.log('El plan al generar cuotas:', plan);
    const fila = {
      precio: this.data.plan.precio,
      inscripcion: this.data.plan.inscripcion,

    }
    for (let i = 12; i <= 84; i++) {
      // @ts-ignore
      if (plan[`cuotaMes${i}`]) {
        // @ts-ignore
        fila[`${i}`] = plan[`cuotaMes${i}`];
      }
    }
    datosCuotas.push(fila);
    return datosCuotas;
  }

  iniciarColumnas(plan: PlanResponseDto) {

    this.cols.push({field: 'precio', header: 'Precio'});
    const plazos = [];
    for (let j = 12; j <= 84; j += 12) {
      // @ts-ignore
      if (plan[`cuotaMes${j}`]) { // si existe la cuota se añade a las columnas
        plazos.push(j);
      }

    }
    for (let i = 0; i < plazos.length; i++) {
      this.cols.push({field: plazos[i] + '', header: plazos[i] + ''});
    }
    this.cols.push({field: 'inscripcion', header: 'Inscripción'})
  }

  seleccionCuota(cuota: any, inscripcion: any, precio: any, plazo: any) {
    this.formGroupPlan.get('plazoSeleccionado')?.setValue(Number(plazo))
    this.formGroupPlan.get('inscripcion')?.setValue(Number(inscripcion))
    this.formGroupPlan.get('cuotaSeleccionada')?.setValue(Number(cuota))
    this.formGroupPlan.get('precioSeleccionado')?.setValue(Number(precio))
  }

  cerrarModal() {
    this.modelPlanSeleccionado.idPlan = this.data.plan.id;
    this.dialogRef.close(this.modelPlanSeleccionado);
  }

  deshabilitarSeleccionarPlan() {
    if (this.modelPlanSeleccionado.plazoSeleccionado && this.modelPlanSeleccionado.inscripcion && this.modelPlanSeleccionado.cuotaSeleccionada && this.modelPlanSeleccionado.precioSeleccionado) {
      return false
    } else {
      return true;
    }

  }
}
