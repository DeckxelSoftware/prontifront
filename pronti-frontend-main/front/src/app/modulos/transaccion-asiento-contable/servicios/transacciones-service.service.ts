import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {
  AsientoContableCabeceraResponseDto
} from "../../asiento-contable-cabecera/servicios/dto/asiento-contable-cabecera.response-dto";

@Injectable()
export class TransaccionesServiceService {

  asientoContableCabeceraSubject$ = new BehaviorSubject<AsientoContableCabeceraResponseDto>({})

  constructor() {

  }
}
