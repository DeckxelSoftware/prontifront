import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {CuotaResponseDto} from '../../modulos/cuota/servicios/dto/cuota.response-dto';

export interface cuotaTablePrimeColumn {
  nombre: string; // Valor cuota
  field: string; //valorCuota
}

@Injectable({
  providedIn: 'root'
})
export class CuotaViewTablaEmitsService {

  columnas = new BehaviorSubject<cuotaTablePrimeColumn[]>([]);
  cuotas = new BehaviorSubject<CuotaResponseDto[]>([]);
  labelSuperior = new BehaviorSubject('');
  datoSuperior = new BehaviorSubject('');

  labelSuperior2 = new BehaviorSubject('');
  datoSuperior2 = new BehaviorSubject('');

  constructor() { }
}
