import {NgModule} from '@angular/core';
import {SisHabilitadoPipe} from './sis-habilitado.pipe';
import {ModalidadContratoPipe} from './modalidad-contrato.pipe';
import {EstadoArticuloPipe} from './estado-articulo.pipe';
import {TipoClientePipe} from './tipo-cliente.pipe';
import {SiNoPipe} from './si-no.pipe';
import {TipoCuentaPipe} from './tipo-cuenta.pipe';
import {TipoMovimientoPipe} from './tipo-movimiento.pipe';
import {EstadoContratoPipe} from './estado-contrato.pipe';
import {UltimoHistoricoContratoPipe} from './ultimo-historico-contrato.pipes';
import {TotalMoraPipe} from './total-mora.pipe';
import {GeneroPipe} from './genero.pipe';
import {EstadoFamiliarPipe} from './estado-familiar.pipe';
import {CodigoImpuestoPipe} from './codigo-impuesto.pipe';
import {CodigoPorcentajeIvaPipe} from './codigo-porcentaje-iva.pipe';
import {CodigoFormasPagoPipe} from './codigo-formas-pago.pipe';
import {FechaPipe} from './fecha.pipe';
import {EstadoChequePipe} from './estado-cheque.pipe';
import {TieneCuotasMoraPipe} from './tiene-cuotas-mora.pipe';
import {TipoTransaccionPipe} from './tipo-transaccion.pipe';
import {TipoAsientoContablePipe} from './tipo-asiento-contable.pipe';
import {FormaPagoPipe} from './forma-pago.pipe';
import {CalcularDescuentoPipe} from './calcular-descuento.pipe';
import {EstadoLicitacionPipe} from './estado-licitacion.pipe';
import {CodigoAuxiliarRubrosRolPipe} from './codigo-auxiliar-rubros-rol.pipe';
import {UnidadPipe} from './unidad.pipe';
import {SupervisorActivoPipe} from './supervisor-activo.pipe';
import {MesPipe} from './mes.pipe';
import {ModalidadDescuentoPipe} from './modalidad-descuento.pipe';
import {EstaPagadoPipe} from './esta-pagado.pipe';
import {EstadoPrestamoPipe} from './estado-prestamo.pipe';
import {ValorDetalleNovedadRolPipe} from "./valor-detalle-novedad-rol.pipe";
import {NumCuotasCobradasPipe} from "./num-cuotas-cobradas.pipe";
import {TipoDetallePagoPipe} from "./tipo-detalle-pago.pipe";
import {CantidadDiasEntreFechasPipe} from "./cantidad-dias-entre-fechas.pipe";
import {SaldoCuotaPipe} from "./saldo-cuota.pipe";
import {CuotasPorPagarPipe} from "./cuotas-por-pagar.pipe";
import {FechaEntregaVehiculoPipe} from "./fecha-entrega-vehiculo.pipe";
import {FechaAdjudicacionPipe} from "./fecha-adjudicacion.pipe";
import {PatioPipe} from "./patio.pipe";
import {CampoOrdenCompraPipe} from "./campo-orden-compra.pipe";
import {CuotaActualFechaPipe} from "./cuota-actual-fecha.pipe";
import { ObtenerCargasPipe } from './obtener-cargas.pipe';
import { CalcularDiasLaboradosPipe } from './calcular-dias-laborados.pipe';
import { ObtenerUtilidadPipe } from './obtener-utilidad.pipe';
import { GetCuentaBancariaEmpresaPipe } from './get-cuenta-bancaria-empresa.pipe';
import { NumCuotasCobradasCuentasPipe } from './num-cuotas-cobradas-cuentas.pipe';
import {TotalPagarFacturaExternaPipe} from "./total-pagar-factura-externa.pipe";


@NgModule({
  declarations: [
    SisHabilitadoPipe,
    ModalidadContratoPipe,
    EstadoArticuloPipe,
    TipoClientePipe,
    SiNoPipe,
    EstadoContratoPipe,
    TipoCuentaPipe,
    TipoMovimientoPipe,
    UltimoHistoricoContratoPipe,
    TotalMoraPipe,
    GeneroPipe,
    EstadoFamiliarPipe,
    CodigoImpuestoPipe,
    CodigoPorcentajeIvaPipe,
    CodigoFormasPagoPipe,
    FechaPipe,
    EstadoChequePipe,
    TieneCuotasMoraPipe,
    TipoTransaccionPipe,
    TipoAsientoContablePipe,
    FormaPagoPipe,
    CalcularDescuentoPipe,
    EstadoLicitacionPipe,
    CodigoAuxiliarRubrosRolPipe,
    UnidadPipe,
    SupervisorActivoPipe,
    MesPipe,
    ModalidadDescuentoPipe,
    EstaPagadoPipe,
    EstadoPrestamoPipe,
    ValorDetalleNovedadRolPipe,
    NumCuotasCobradasPipe,
    TipoDetallePagoPipe,
    CantidadDiasEntreFechasPipe,
    SaldoCuotaPipe,
    CuotasPorPagarPipe,
    FechaEntregaVehiculoPipe,
    FechaAdjudicacionPipe,
    PatioPipe,
    CampoOrdenCompraPipe,
    CuotaActualFechaPipe,
    ObtenerCargasPipe,
    CalcularDiasLaboradosPipe,
    ObtenerUtilidadPipe,
    GetCuentaBancariaEmpresaPipe,
    NumCuotasCobradasCuentasPipe,
    CuotaActualFechaPipe,
    TotalPagarFacturaExternaPipe
  ],
  imports: [],
  exports: [
    SisHabilitadoPipe,
    ModalidadContratoPipe,
    EstadoArticuloPipe,
    TipoClientePipe,
    EstadoContratoPipe,
    SiNoPipe,
    TipoCuentaPipe,
    TipoMovimientoPipe,
    UltimoHistoricoContratoPipe,
    TotalMoraPipe,
    GeneroPipe,
    EstadoFamiliarPipe,
    CodigoImpuestoPipe,
    CodigoPorcentajeIvaPipe,
    CodigoFormasPagoPipe,
    FechaPipe,
    EstadoChequePipe,
    TieneCuotasMoraPipe,
    TipoAsientoContablePipe,
    TipoTransaccionPipe,
    FormaPagoPipe,
    CalcularDescuentoPipe,
    EstadoLicitacionPipe,
    CodigoAuxiliarRubrosRolPipe,
    UnidadPipe,
    SupervisorActivoPipe,
    MesPipe,
    ModalidadDescuentoPipe,
    EstaPagadoPipe,
    EstadoPrestamoPipe,
    ValorDetalleNovedadRolPipe,
    NumCuotasCobradasPipe,
    TipoDetallePagoPipe,
    CantidadDiasEntreFechasPipe,
    SaldoCuotaPipe,
    CuotasPorPagarPipe,
    FechaEntregaVehiculoPipe,
    FechaAdjudicacionPipe,
    PatioPipe,
    CampoOrdenCompraPipe,
    CuotaActualFechaPipe,
    ObtenerCargasPipe,
    CalcularDiasLaboradosPipe,
    ObtenerUtilidadPipe,
    GetCuentaBancariaEmpresaPipe,
    CuotaActualFechaPipe,
    NumCuotasCobradasCuentasPipe,
    TotalPagarFacturaExternaPipe
  ]
})
export class PipesModule {
}
