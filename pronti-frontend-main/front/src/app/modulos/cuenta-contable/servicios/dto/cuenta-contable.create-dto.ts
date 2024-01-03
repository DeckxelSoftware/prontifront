import {TipoCuentaEnum} from '../../../../enums/tipo-cuenta.enum';
import {TipoMovimientoEnum} from '../../../../enums/tipo-movimiento.enum';

export interface CuentaContableCreateDto {
  idPeriodoContable?: number;
  idAgencia?: number,
  idRubrosRol?: number,
  nombre: string;
  identificador: number;
  nivel: number;
  idNivel1: number;
  idNivel2: number;
  idNivel3: number;
  idNivel4: number;
  idNivel5: number;
  tipoCuenta: TipoCuentaEnum;
  movimiento: TipoMovimientoEnum;
  anteriorDebito: number;
  anteriorCredito: number;
  anteriorSaldo: number;
  eneroDebito: number;
  eneroCredito: number;
  eneroSaldo: number;
  febreroDebito: number;
  febreroCredito: number;
  febreroSaldo: number;
  marzoDebito: number;
  marzoCredito: number;
  marzoSaldo: number;
  abrilDebito: number;
  abrilCredito: number;
  abrilSaldo: number;
  mayoDebito: number;
  mayoCredito: number;
  mayoSaldo: number;
  junioDebito: number;
  junioCredito: number;
  junioSaldo: number;
  julioDebito: number;
  julioCredito: number;
  julioSaldo: number;
  agostoDebito: number;
  agostoCredito: number;
  agostoSaldo: number;
  septiembreDebito: number;
  septiembreCredito: number;
  septiembreSaldo: number;
  octubreDebito: number;
  octubreCredito: number;
  octubreSaldo: number;
  noviembreDebito: number;
  noviembreCredito: number;
  noviembreSaldo: number;
  diciembreDebito: number;
  diciembreCredito: number;
  diciembreSaldo: number;
  actualDebito: number;
  actualCredito: number;
  actualSaldo: number;
}
