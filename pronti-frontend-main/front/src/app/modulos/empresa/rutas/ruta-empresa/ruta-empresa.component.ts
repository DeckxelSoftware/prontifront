import {Component, OnInit} from '@angular/core';
import {HttpListaValoresTipoService} from '../../../../servicios/lista-valores-tipo/http-lista-valores-tipo.service';
import {ListaValoresTipoFindDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.find-dto';
import {ListaValoresEnum} from '../../../../constantes/lista-valores/lista-valores.enum';
import {ListaValoresTipoResponseDto} from '../../../../servicios/lista-valores-tipo/dto/lista-valores-tipo.response-dto';
import {SearchAutoCompleteInterface} from '../../../../componentes/forms/interfaces/form-field';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-ruta-empresa',
  templateUrl: './ruta-empresa.component.html',
  styleUrls: ['./ruta-empresa.component.scss']
})
export class RutaEmpresaComponent implements OnInit{


  items: MenuItem[] = [];
  home!: MenuItem;

  tiposEmpresaArray : any[] = [];
  constructor(private httpListaValorTipoService: HttpListaValoresTipoService) {
  }
  ngOnInit(): void {
    this.items = [
      {label:'Configuraciones', routerLink: '/configuraciones'},
      {label:'Empresa'},
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/'};
  }



  /*  buscarGeneroLibro(): void {
      const findDto: ListaValoresTipoFindDto = {
        busqueda: ListaValoresEnum.tipoEmpresa,
      }

      this.httpListaValorTipoService.find(findDto).subscribe(
        (data: [ListaValoresTipoResponseDto[], number]) => {
          console.log('data', data[0][0]);


          let arregloDatos = [];
          if (data[0][0].listaValorDetalleCollection) {
            arregloDatos = data[0][0].listaValorDetalleCollection;
            console.log('areglodAtos', arregloDatos);
          }
        })
      /!*    if (evento.field.autoComplete) {
            evento.field.autoComplete.suggestions = [
              {
                id: 1,
                nombre: 'Drama',
                descripcion: 'Libros de drama',
                codigoPrimario: 'GL1-1',
              },
              {
                id: 2,
                nombre: 'Terror',
                descripcion: 'Libros de terror',
                codigoPrimario: 'GL1-2',
              }
            ]
          }*!/
    }*/


}
