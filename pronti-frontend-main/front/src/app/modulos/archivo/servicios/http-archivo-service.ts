import {Injectable} from '@angular/core';
import {ArchivoFindDto} from './dto/archivo.find-dto';
import {ArchivoResponseDto} from './dto/archivo.response-dto';
import {ArchivoCreateDto} from './dto/archivo.create-dto';
import {ArchivoUpdateDto} from './dto/archivo.update-dto';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AbstractHttpService} from '../../../abstract/http/abstract-http.service';
import {environment} from '../../../../environments/environment';
import {TipoDocumento} from '../constantes/tipo-documento';
import {TipoArchivo} from '../constantes/tipo-archivo';
import {Observable} from 'rxjs';


@Injectable()
export class HttpArchivoService
  extends AbstractHttpService<ArchivoFindDto, ArchivoResponseDto, ArchivoCreateDto, ArchivoUpdateDto> {

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: `Bearer ${localStorage.getItem('jwt')}`
  //   })
  // }

  constructor(private readonly _httpClient: HttpClient) {
    super(
      environment.url,
      {
        URLSection: '/archivo',
        http: _httpClient
      }
    );
  }

  crearArchivo(file: any, idTabla: string, nombreTabla: string, tipoArchivo: TipoArchivo, tipoDocumento: TipoDocumento, sisHabilitado: string): Observable<ArchivoResponseDto> {
    const formData = new FormData();
    formData.append('idTabla', idTabla);
    formData.append('nombreTabla', nombreTabla);
    formData.append('sisHabilitado', sisHabilitado);
    formData.append('tipoArchivo', tipoArchivo);
    formData.append('tipoDocumento', tipoDocumento);
    formData.append('uploadFile', file);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      })
    }

    return this._httpClient.post(`${this.URL + this.parameters.URLSection}`, formData, httpOptions)
  }

  editarArchivo(id: string, datosActualizar: ArchivoUpdateDto): Observable<ArchivoResponseDto> {
    const formData = new FormData();
    formData.append('idTabla', datosActualizar.idTabla);
    formData.append('nombreTabla', datosActualizar.nombreTabla);
    formData.append('sisHabilitado', datosActualizar.sisHabilitado);
    formData.append('tipoArchivo', datosActualizar.tipoArchivo);
    formData.append('tipoDocumento', datosActualizar.tipoDocumento);
    formData.append('uploadFile', datosActualizar.file);
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${localStorage.getItem('jwt')}`
      })
    }

    return this._httpClient.put(`${this.URL + this.parameters.URLSection}/${id}`, formData, httpOptions)
  }
}
