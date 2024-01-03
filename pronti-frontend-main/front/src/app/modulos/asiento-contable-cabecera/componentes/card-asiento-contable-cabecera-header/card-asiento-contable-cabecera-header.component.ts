import {Component, Input, OnInit} from '@angular/core';
import {AsientoContableCabeceraResponseDto} from "../../servicios/dto/asiento-contable-cabecera.response-dto";

@Component({
  selector: 'app-card-asiento-contable-cabecera-header',
  templateUrl: './card-asiento-contable-cabecera-header.component.html',
  styleUrls: ['./card-asiento-contable-cabecera-header.component.scss']
})
export class CardAsientoContableCabeceraHeaderComponent{

  @Input()
  registro!: AsientoContableCabeceraResponseDto
  constructor() { }


}
