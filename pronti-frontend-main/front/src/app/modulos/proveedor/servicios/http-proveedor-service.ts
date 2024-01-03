import {Injectable} from '@angular/core';
import {ProveedorFindDto} from './dto/proveedor.find-dto';
import {ProveedorResponseDto} from './dto/proveedor.response-dto';
import {ProveedorCreateDto} from './dto/proveedor.create-dto';
import {ProveedorUpdateDto} from './dto/proveedor.update-dto';
import {HttpClient} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';
import {HttpUsuarioService} from '../../usuario/servicios/http-usuario-service';
import {HttpEmpresaService} from '../../empresa/servicios/http-empresa-service';
import {TipoProveedorEnum} from '../../../enums/tipo-proveedor.enum';
import {mergeMap, Observable, tap} from 'rxjs';

@Injectable()
export class HttpProveedorService
  extends AbstractHttpService<ProveedorFindDto, ProveedorResponseDto, ProveedorCreateDto, ProveedorUpdateDto> {
  constructor(private readonly _httpClient: HttpClient,
              private readonly httpUsuarioService: HttpUsuarioService,
              private readonly httpEmpresaService: HttpEmpresaService,
  ) {
    super(
      environment.url,
      {
        URLSection: '/proveedor',
        http: _httpClient
      }
    );
  }

  editarProveedor(proveedor: ProveedorUpdateDto):Observable<any> {
    return this.updateById(proveedor, proveedor.id)
      // .pipe(
      //   mergeMap(
      //     // @ts-ignore
      //     (proveedor) => {
      //       if (typeof proveedor.idEmpresa === 'object') {
      //         this.httpEmpresaService.updateById(proveedor.idEmpresa, proveedor.idEmpresa.id as number)
      //       }
      //       if (typeof proveedor.idUsuario === 'object') {
      //         this.httpEmpresaService.updateById(proveedor.idUsuario, proveedor.idUsuario.id as number)
      //       }
      //
      //     }
      //   )
      // )


  }
}

// if (typeof proveedor.idEmpresa === 'object') {
//   this.httpEmpresaService.updateById(proveedor.idEmpresa, proveedor.idEmpresa.id as number)
//     .subscribe(
//       {
//         next: res => {
//
//         },
//         error: err => {
//         }
//       }
//     )
// }
// if (typeof proveedor.idUsuario === 'object') {
//   this.httpEmpresaService.updateById(proveedor.idUsuario, proveedor.idUsuario.id as number)
//     .subscribe(
//       {
//         next: res => {
//
//         },
//         error: err => {
//         }
//       }
//     )
// }
