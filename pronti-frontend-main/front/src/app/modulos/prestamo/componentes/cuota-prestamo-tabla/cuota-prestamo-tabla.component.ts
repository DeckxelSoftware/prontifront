import {Component, Input, OnInit} from '@angular/core';
import {AbonoPrestamoResponseDto} from "../../../abono-prestamo/servicios/dto/abono-prestamo.response-dto";
import {PrestamoResponseDto} from "../../servicios/dto/prestamo.response-dto";
import * as dayjs from "dayjs";

@Component({
  selector: 'app-cuota-prestamo-tabla',
  templateUrl: './cuota-prestamo-tabla.component.html',
  styleUrls: ['./cuota-prestamo-tabla.component.scss']
})
export class CuotaPrestamoTablaComponent implements OnInit {
  @Input() prestamo!: PrestamoResponseDto;
  cuotas!: AbonoPrestamoResponseDto[];

  constructor() {
  }

  ngOnInit() {
    this.armarArregloDeCuotas();
  }

  armarArregloDeCuotas() {
    // @ts-ignore
    if (this.prestamo.valor && this.prestamo.cuotas && this.prestamo.tasaInteres >= 0) {
      const valorCapital = +((this.prestamo.valor / this.prestamo.cuotas).toFixed(2));
// @ts-ignore
      const valorInteres = +((valorCapital * (this.prestamo.tasaInteres / 100)).toFixed(2));
      const valorCuota = valorInteres + valorCapital;
      this.cuotas = [];
      for (let i = 0; i < this.prestamo.cuotas; i++) {
        let saldo = +((this.prestamo.valor - (valorCapital * (i + 1))).toFixed(2));
        let valorCuotaParaEncerarSaldo = valorCuota
        let valorCapitalParaEncerarSaldo = valorCapital;
        if ((i + 1) === this.prestamo.cuotas) {
          if (saldo > 0) {
            valorCuotaParaEncerarSaldo += saldo;
            valorCapitalParaEncerarSaldo += saldo;
            saldo = 0;
          } else if (saldo < 0) {
            valorCuotaParaEncerarSaldo += saldo;
            valorCapitalParaEncerarSaldo += saldo;
            saldo = 0;
          }
        }
        const cuota: AbonoPrestamoResponseDto = {
          numeroPago: i + 1,
          fechaPago: dayjs().endOf('month').add(i, 'month').format('DD/MM/YYYY'),
          valorCuota: valorCuotaParaEncerarSaldo,
          valorCapital: valorCapitalParaEncerarSaldo,
          valorTasaInteres: valorInteres,
          saldo

        }
        this.cuotas.push({...cuota})
      }
    }
  }
}
