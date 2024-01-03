import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {
  AsientoContableCabeceraResponseDto
} from "../../../asiento-contable-cabecera/servicios/dto/asiento-contable-cabecera.response-dto";
import {TransaccionesServiceService} from "../../servicios/transacciones-service.service";

@Component({
  selector: 'app-card-asiento-contable-cabecera',
  templateUrl: './card-asiento-contable-cabecera.component.html',
  styleUrls: ['./card-asiento-contable-cabecera.component.scss']
})
export class CardAsientoContableCabeceraComponent implements OnInit {

  asientoContableCabecera: AsientoContableCabeceraResponseDto = {};

  mostrarCard = false;

  @Output()
  eventoClickCerrarAsientoContable = new EventEmitter<boolean>()

  constructor(
    private _transaccionesService: TransaccionesServiceService) {
  }

  ngOnInit(): void {
    this._transaccionesService.asientoContableCabeceraSubject$.subscribe(
      {
        next: asiento => {
         this.asientoContableCabecera = asiento;
        },
        error: err => {
          this.asientoContableCabecera = {};
          console.error('no existe asiento', err);
        }
      })
    setTimeout(() => {
      this.mostrarCard = true;
    }, 400);
    console.log(this.asientoContableCabecera);
  }

  diferenciaAsientoContable() {
    const totalDebito = this.asientoContableCabecera?.totalDebito || 0;
    const totalCredito = this.asientoContableCabecera?.totalCredito || 0;
    return (totalCredito - totalDebito).toFixed(2);
  }

  eventoCerrarAsientoContable() {
    this.eventoClickCerrarAsientoContable.emit(true);
  }
}
