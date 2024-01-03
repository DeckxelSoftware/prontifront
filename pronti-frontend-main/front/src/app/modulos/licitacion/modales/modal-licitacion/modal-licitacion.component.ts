import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ContratoResponseDto} from '../../../contrato/servicios/dto/contrato.response-dto';
import {ClienteResponseDto} from '../../../cliente/servicios/dto/cliente.response-dto';
import {PlanResponseDto} from '../../../plan/servicios/dto/plan.response-dto';
import {FormlyFieldConfig} from '@ngx-formly/core';
import {FormControl, FormGroup, ValidationErrors} from '@angular/forms';
import {TipoPlanEnum} from '../../../../enums/tipo-plan.enum';
import {ModalConfirmacionComponent} from '../../../../shared/modal-confirmacion/modal-confirmacion.component';
import {EstadoLicitacionEnum} from '../../../../enums/estado-licitacion.enum';
import * as dayjs from 'dayjs';
import {LicitacionCreateDto} from '../../servicios/dto/licitacion.create-dto';
import {SiNoEnum} from '../../../../enums/si-no.enum';
import {LicitacionTablaComponent} from '../../componentes/licitacion-tabla/licitacion-tabla.component';
import {LicitacionResponseDto} from '../../servicios/dto/licitacion.response-dto';
import {ActivoInactivo} from '../../../../enums/activo-inactivo';
import {EstadoContratoEnum} from '../../../../enums/estado-contrato.enum';
import {
  PORCENTAJE_PLAN_AUTO_CSD,
  PORCENTAJE_PLAN_AUTO_NO_CSD, PORCENTAJE_PLAN_PRONTI
} from '../../../../constantes/licitacion/porcentajes-licitacion';

@Component({
  selector: 'app-modal-licitacion',
  templateUrl: './modal-licitacion.component.html',
  styleUrls: ['./modal-licitacion.component.scss']
})
export class ModalLicitacionComponent implements OnInit {
  editar = false;
  mostrarTablaContratos = false;
  contratoSeleccionado: ContratoResponseDto = {};
  clienteSeleccionado: ClienteResponseDto = {};
  planSeleccionado: PlanResponseDto = {};
  formContrato = new FormGroup({});
  formPlan = new FormGroup({});
  formCliente = new FormGroup({});
  formLicitacion = new FormGroup({});
  tipoPlan!: TipoPlanEnum;
  modelPlan: PlanResponseDto = {};
  modelLicitacion: any = {
    fechaOferta: dayjs().format('YYYY-MM-DD')
  };
  modelCliente: any = {
    tipoCliente: '',
    apellidos: '',
    nombres: '',
    ciudad: '',
    correo: '',
    documentoIdentidad: '',
    fechaNacimiento: '',
    medioContacto1: '',
    pais: '',
    provincia: '',
    tipoDocumentoIdentidad: '',
    tipoMedioContacto1: '',
    username: ''

  };

  modelContrato: ContratoResponseDto = {
    numeroDeContrato: '',
    fechaInicio: '',
    fechaIniciaCobro: '',
    dsctoInscripcion: 0,
    dsctoPrimeraCuota: 0,
    observacion: '',
  }
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
            readonly: true,
            min: 0,
            label: 'Número de contrato',
          }
        },
        {
          className: 'col-4',
          key: 'plazoMesSeleccionado',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            label: 'Plazo',
          },
          expressionProperties: {}
        },
      ]
    }
  ]
  fieldsPlan: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'modelo',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            min: 0,
            label: 'Plan',
          }
        },

        {
          className: 'col-4',
          key: 'precio',
          type: 'input',
          templateOptions: {
            type: 'number',
            readonly: true,
            label: 'Monto',
          },

        },

      ]
    }
  ]
  fieldsCliente: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'nombres',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            min: 0,
            label: 'Nombres',
          }
        },

        {
          className: 'col-4',
          key: 'apellidos',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Apellidos',
          },

        },
        {
          className: 'col-4',
          key: 'documentoIdentidad',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Documento identidad',
          },
        },
        {
          className: 'col-4',
          key: 'medioContacto1',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: 'Medio de contacto',
          },
        },
      ]
    }
  ]
  fieldsLicitacion: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: 'row',
      fieldGroup: [
        {
          className: 'col-4',
          key: 'valorOferta',
          type: 'input',
          templateOptions: {
            type: 'number',
            required: true,
            min: 0,
            label: 'Valor oferta',
            blur: (field) => {
              this.modelLicitacion.estado = undefined;
              if (this.modelLicitacion.valorOferta > 0) {
                // @ts-ignore
                this.modelLicitacion.porcentajeOferta = ((this.modelLicitacion.valorOferta / this.modelPlan.precio) * 100).toFixed(4);
                this.formLicitacion.get('porcentajeOferta')?.setValue(this.modelLicitacion.porcentajeOferta);
                if (this.formLicitacion.valid) {
                  if (this.tipoPlan === TipoPlanEnum.moto) {
                    this.verificarParametrosPlanMoto()
                  } else if (this.tipoPlan === TipoPlanEnum.auto) {
                    this.verificarParametrosPlanAuto();
                  } else if (this.tipoPlan === TipoPlanEnum.pronti) {
                    this.verificarParametrosProntiPlan();
                  } else {
                    console.error('el contrato no tiene un tipo de plan conocido (auto, moto, pronti plan)');
                  }
                }
              }
            },

          },
          validators: {
            validation: [decimalValidator],
          }
        },

        {
          className: 'col-4',
          key: 'porcentajeOferta',
          type: 'input',
          templateOptions: {
            type: 'text',
            readonly: true,
            label: '% oferta',
          },

        },
        {
          className: 'col-4',
          key: 'fechaOferta',
          type: 'input',
          templateOptions: {
            type: 'date',
            required: true,
            label: 'Fecha oferta',
          },
        },
        {
          className: 'col-12',
          key: 'observacion',
          type: 'input',
          templateOptions: {
            type: 'text',
            required: false,
            label: 'Observaciones',
          },
        },
      ]
    }
  ]

  constructor(
    private dialogRef: MatDialogRef<ModalLicitacionComponent>,
    @Inject(MAT_DIALOG_DATA) public data:
      {
        componente: LicitacionTablaComponent,
        registro: LicitacionResponseDto,// enviar si se está editando
      },
    public matDialog: MatDialog,
  ) {
  }

  ngOnInit() {
    if (this.data.registro) {
      this.editar = true;
      this.contratoSeleccionado = this.data.registro.idContrato as ContratoResponseDto;
      this.setearValoresEnFormularios();
      this.setearValoresEnFormLicitacion();
      this.verificarTipoDePlan();
    }
  }

  recibirContratoSeleccionado(contrato: ContratoResponseDto) {
    this.contratoSeleccionado = contrato;
    this.mostrarTablaContratos = false;
    this.setearValoresEnFormularios();
    this.verificarTipoDePlan();
  }


  setearValoresEnFormularios() {
    this.setearValoresEnFormPlan();
    this.setearValoresEnFormContrato();
    this.setearValoresEnFormCliente();
    // this.setearValoresEnFormVendedor() Descomentar cuando el back envíe los datos del vendedor
  }

  setearValoresEnFormPlan() {
    // @ts-ignore
    this.modelPlan = {...this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan};

  }

  setearValoresEnFormContrato() {
    // @ts-ignore
    this.modelContrato = this.contratoSeleccionado;
  }

  setearValoresEnFormCliente() {
    this.modelCliente = {...this.contratoSeleccionado.idClienteEnGrupo.idCliente, ...this.contratoSeleccionado.idClienteEnGrupo.idCliente.idUsuario}
  }

  setearValoresEnFormLicitacion() {
    this.modelLicitacion = {...this.data.registro}
  }

  cambiarMostrarTablaContrato() {
    this.mostrarTablaContratos = !this.mostrarTablaContratos;
    if (this.mostrarTablaContratos) {
      this.resetCamposLicitacion();
      this.contratoSeleccionado = {};
    }
  }

  resetCamposLicitacion() {
    this.formLicitacion.get('valorOferta')?.reset();
    this.formLicitacion.get('porcentajeOferta')?.reset();
    this.formLicitacion.get('fechaOferta')?.reset();
    this.formLicitacion.get('observaciones')?.reset();
  }

  verificarTipoDePlan() {
    const esPlanMoto = this.modelPlan?.modelo?.toLowerCase().includes('moto');
    const esPlanAuto = this.modelPlan?.modelo?.toLowerCase().includes('auto');
    const esProntiPlan = this.modelPlan?.modelo?.toLowerCase().includes('pronti');
    if (esPlanMoto) {
      this.tipoPlan = TipoPlanEnum.moto;
    } else if (esPlanAuto) {
      this.tipoPlan = TipoPlanEnum.auto;
    } else if (esProntiPlan) {
      this.tipoPlan = TipoPlanEnum.pronti;
    } else {
      console.error('No se pudo definir un tipo de plan');
    }

  }

  abrirModalNoCumpleCondiciones() {
    const dialogRef$ = this.matDialog.open(ModalConfirmacionComponent, {
      disableClose: true,
      data: {
        titulo: 'Información',
        html: '<div class="text-center"><p>No cumple con los parametros de oferta.</p><p>¿Aprobado por la gerencia?</p></div>',
        mostrarBotonAceptar: true,
        mostrarBotonCancelar: true,
        textoBotonAceptar: 'SI',
        textoBotonCancelar: 'NO'
      }
    })
    dialogRef$.afterClosed()
      .subscribe(
        {
          next: res => {
            if (res) {
              this.modelLicitacion.estado = EstadoLicitacionEnum.aprobadoPorGerencia;
            } else {
              this.modelLicitacion.estado = EstadoLicitacionEnum.noAplica;
            }
          }
        }
      )
  }

  verificarParametrosPlanMoto() {
    const minimoCuotasMoto = 6;
    // @ts-ignore
    const cumpleMinimoCuotasPagadas = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalCuotasCobradas >= minimoCuotasMoto;
    // @ts-ignore
    const valorCuota = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).cuotaCollection.at(-1).valorCuota;

    const cumpleOfertaMinima = this.modelLicitacion.valorOferta >= valorCuota;

    if (cumpleMinimoCuotasPagadas && cumpleOfertaMinima) {
      this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
    } else {
      this.abrirModalNoCumpleCondiciones();
    }
  }

  verificarParametrosPlanAuto() {
    if (this.contratoSeleccionado.estado === EstadoContratoEnum.CesionDerechos) {
      // @ts-ignore
      const porcentajePagado = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalMontoCobrado / this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio;
      if (porcentajePagado >= PORCENTAJE_PLAN_AUTO_CSD) {
        // @ts-ignore
        const valorCuota = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).cuotaCollection.at(-1).valorCuota;
        if (this.modelLicitacion.valorOferta >= valorCuota) {
          this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
        } else {
          this.abrirModalNoCumpleCondiciones();
        }
      } else {
        // @ts-ignore
        const ofertaMinima = (this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio * PORCENTAJE_PLAN_AUTO_CSD) - this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalMontoCobrado;
        if (this.modelLicitacion.valorOferta >= ofertaMinima) {
          this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
        } else {
          this.abrirModalNoCumpleCondiciones();
        }
      }
    } else {
      // @ts-ignore
      const porcentajePagado = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalMontoCobrado / this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio;
      if (porcentajePagado >= PORCENTAJE_PLAN_AUTO_NO_CSD) {
        // @ts-ignore
        const valorCuota = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).cuotaCollection.at(-1).valorCuota;
        if (this.modelLicitacion.valorOferta >= valorCuota) {
          this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
        } else {
          this.abrirModalNoCumpleCondiciones();
        }
      } else {
        // @ts-ignore
        const valorOfertaTeorico = (this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio * PORCENTAJE_PLAN_AUTO_NO_CSD);
        const cumpleMinimoOferta = this.modelLicitacion.valorOferta >= valorOfertaTeorico;
        const minimoCuotasAuto = 5;
        // @ts-ignore
        const cumpleMinimoCuotasPagadas = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalCuotasCobradas >= minimoCuotasAuto
        if (cumpleMinimoOferta && cumpleMinimoCuotasPagadas) {
          this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
        } else {
          this.abrirModalNoCumpleCondiciones();
        }
      }


    }
  }

  verificarParametrosProntiPlan() {
    // @ts-ignore
    const porcentajePagado = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalMontoCobrado / this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio;
    if (porcentajePagado >= PORCENTAJE_PLAN_PRONTI) {
      // @ts-ignore
      const valorCuota = this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).cuotaCollection.at(-1).valorCuota;
      if (this.modelLicitacion.valorOferta >= valorCuota) {
        this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
      } else {
        this.abrirModalNoCumpleCondiciones();
      }
    } else {
      // @ts-ignore
      const ofertaMinima = (this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).idPlan.precio * PORCENTAJE_PLAN_PRONTI) - this.contratoSeleccionado.historicoPlanContratoCollection.at(-1).totalMontoCobrado;
      if (this.modelLicitacion.valorOferta >= ofertaMinima) {
        this.modelLicitacion.estado = EstadoLicitacionEnum.siAplica;
      } else {
        this.abrirModalNoCumpleCondiciones();
      }
    }

  }

  cancelar() {
    this.dialogRef.close(false);
  }

  crearEditar() {

    const licitacion: LicitacionCreateDto = {
      sisHabilitado: ActivoInactivo.Activo,
      idContrato: this.contratoSeleccionado.id as number,
      valorOferta: this.modelLicitacion.valorOferta,
      porcentajeOferta: +this.modelLicitacion.porcentajeOferta,
      fechaOferta: this.modelLicitacion.fechaOferta,
      observacion: this.modelLicitacion.observacion,
      estado: this.modelLicitacion.estado,
      planSeleccionado: this.modelPlan.modelo as string,
      precioPlan: this.modelPlan.precio as number,
      // @ts-ignore
      totalMontoCobrado: this.modelContrato.historicoPlanContratoCollection.at(-1).totalMontoCobrado,
      aprobadoPorGerencia: this.modelLicitacion.estado === EstadoLicitacionEnum.aprobadoPorGerencia ? SiNoEnum.SI : SiNoEnum.NO,
    }
    if (this.editar) {
      this.data.componente.editarLicitacion(licitacion, this.data.registro.id as number);
    } else {
      this.data.componente.crearLicitacion(licitacion);
    }
  }


}

export function decimalValidator(control: FormControl): ValidationErrors | null {
  if (control.value) {
    return +control.value.toFixed(4) == +control.value ? null : {'decimal': true};
  } else {
    return null;
  }
}
