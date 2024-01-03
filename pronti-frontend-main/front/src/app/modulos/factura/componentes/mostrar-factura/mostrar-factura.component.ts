import {Component, Input, OnInit} from '@angular/core';
import {FacturaResponseDto} from '../../servicios/dto/factura.response-dto';
import {FacturaInterface} from '../../interfaces/factura.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-mostrar-factura',
  templateUrl: './mostrar-factura.component.html',
  styleUrls: ['./mostrar-factura.component.scss']
})
export class MostrarFacturaComponent implements OnInit {
  @Input() factura!: FacturaResponseDto;
  @Input() mostrarBotonNotaCredito = true;
  jsonFactura!: FacturaInterface;

  constructor(
    public router: Router,
  ) {
  }

  ngOnInit(): void {
    if (this.factura.jsonFactura) {
      this.jsonFactura = JSON.parse(this.factura.jsonFactura);
    }
  }

  navegarANotaDeCredito(numeroDocumentoModificado: string) {
    this.router.navigate(['documentos-electronicos', 'nota-credito-modulo'], {queryParams: {numDocModificado: numeroDocumentoModificado}})

  }
}
