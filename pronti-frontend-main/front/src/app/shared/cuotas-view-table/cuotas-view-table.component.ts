import {Component, OnDestroy, OnInit} from '@angular/core';
import {CuotaResponseDto} from '../../modulos/cuota/servicios/dto/cuota.response-dto';
import {CuotaViewTablaEmitsService} from './cuota-view-tabla-emits.service';
import { Subscription, Observable, BehaviorSubject } from 'rxjs';
import {STARTING_ROWS} from "../../constantes/tabla/starting-rows";

interface cuotaTablePrimeColumn {
  nombre: string; // Valor cuota
  field: string; //valorCuota
}

@Component({
  selector: 'app-cuotas-view-table',
  templateUrl: './cuotas-view-table.component.html',
  styleUrls: ['./cuotas-view-table.component.scss']
})
export class CuotasViewTableComponent implements OnInit, OnDestroy {
  cargando = false;
  columnas: cuotaTablePrimeColumn[] = [];
  cuotas: CuotaResponseDto[] = [];
  rows = 1;
  startingRows = STARTING_ROWS;
  mostrarTabla = false;
  labelSuperior = '';
  datoSuperior = '';



  // data const
  skip = 0;
  take = 5;
  tableData: CuotaResponseDto[] = [];
  totalRecords = 0;
  rowsPerPage = [1, 2, 3, 5, 10, 30];


  subscripciones: Subscription[] = [];

  constructor(public dataViewCuotasEmitters: CuotaViewTablaEmitsService) {
  }

  ngOnInit(): void {
    this.escucharColumnas();
    this.escucharCuotas();
    this.escucharLabelSuperiores();

    // setTimeout(() => {
    //   this.mostrarTabla = true;
    // }, 400)
  }

  ngOnDestroy() {
    this.subscripciones.forEach(sub => sub.unsubscribe());
  }

  paginarDatos(event: any) {
    this.skip = event.first;
    this.take = event.rows + event.first;
    this.tableData = this.cuotas.slice(event.first, event.rows + event.first);
  }

  escucharCuotas() {
    const subscripcion = this.dataViewCuotasEmitters.cuotas.subscribe(
      {
        next: (res) => {
          this.cargando = true;
          this.cuotas = res;
          this.rows = 1;
          this.totalRecords = this.cuotas.length;
          this.tableData = this.cuotas.slice(this.skip, this.take);
          console.log(res);
          setTimeout(() => {
            this.cargando = false;
          }, 400)
        },
        error: err => {
        }
      }
    );
    this.subscripciones.push(subscripcion);
  }

  escucharColumnas() {
    const subcripcion = this.dataViewCuotasEmitters.columnas.subscribe(
      {
        next: (cols) => {
          this.columnas = cols;
        },
        error: err => {
        }
      }
    );
    this.subscripciones.push(subcripcion);
  }

  escucharLabelSuperiores() {
    const subscripcionLabel = this.dataViewCuotasEmitters.labelSuperior.subscribe({
      next: (label) => {
        this.labelSuperior = label;
      },
      error: err => {
      }
    });

    const subscripcionValor = this.dataViewCuotasEmitters.datoSuperior.subscribe({
      next: (valor) => {
        this.datoSuperior = valor;
      }
    });


    this.subscripciones.push(subscripcionLabel, subscripcionValor);
  }
}
