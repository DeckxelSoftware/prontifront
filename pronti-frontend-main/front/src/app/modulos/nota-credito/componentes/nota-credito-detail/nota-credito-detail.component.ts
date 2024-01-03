import {Component, Input, OnInit} from '@angular/core';
import {NotaCreditoDetalleInterface} from '../../interfaces/nota-credito-detalle.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nota-credito-detail',
  templateUrl: './nota-credito-detail.component.html',
  styleUrls: ['./nota-credito-detail.component.scss']
})
export class NotaCreditoDetailComponent implements OnInit {

  @Input()
  jsonFactura!: NotaCreditoDetalleInterface;

  @Input()
  itNumeroDocumento = 0;

  constructor(private _router: Router) {
  }

  ngOnInit(): void {
    console.log(this.jsonFactura);
  }

  irAFactura(jsonFactura: NotaCreditoDetalleInterface) {
    //documentos-electronicos/factura-modulo/factura-gestion
    this._router.navigate(
      [
        'documentos-electronicos',
        'factura-modulo'],
        {
          queryParams: {
            itNumeroDocumento: `${this.itNumeroDocumento}`
          }
        });
  }
}
