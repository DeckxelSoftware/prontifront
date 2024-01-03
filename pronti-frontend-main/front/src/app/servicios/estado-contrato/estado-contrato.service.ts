import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {EstadoContratoModule} from './estado-contrato.module';
import {PlanResponseDto} from '../../modulos/plan/servicios/dto/plan.response-dto';
import {HistoricoPlanContratoResponseDto} from '../../modulos/historico-plan-contrato/servicios/dto/historico-plan-contrato.response-dto';
import {tipoCambioContrato} from '../../modulos/contrato/rutas/ruta-editar-contrato/ruta-editar-contrato.component';

@Injectable({
  providedIn: EstadoContratoModule
})
export class EstadoContratoService {

  plan = new BehaviorSubject<PlanResponseDto>({});
  fechaCobro = new BehaviorSubject<Date>(new Date());
  cambioDePlan = new BehaviorSubject<Boolean>(false);
  tipoCambio = new BehaviorSubject<tipoCambioContrato | false>(false);
  historicoPlanContrato = new BehaviorSubject<HistoricoPlanContratoResponseDto>({});
  descuentoPrimeraCuota = new BehaviorSubject<number>(0);
  descuentoInscripcion = new BehaviorSubject<number>(0);
  descuentoRecargo = new BehaviorSubject<number>(0);
  plazo = new BehaviorSubject<number>(0);
  tasaCambioContrato = new BehaviorSubject<number>(0) // para reactivacion 3% 5%

  // cuotasPasarUnificacion = new BehaviorSubject<{cuotasAPasar: number, montoAPasar: number}>({cuotasAPasar: 0, montoAPasar: 0})


  constructor() {
  }
}
