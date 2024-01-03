import {Injectable} from "@angular/core";
import {ContratoResponseDto} from "./dto/contrato.response-dto";
import {ContratoCesionDerechoStorageInterface} from '../interfaces/contrato-cesion-derecho-storage.interface';
import {BehaviorSubject} from 'rxjs';


@Injectable()
export class StorageCesionDerechosService {

  CONTRATOS_CESION_DERECHOS_STORAGE = 'contratos-cesion-derechos';

  contratoCesionDerechos: ContratoResponseDto = {};
  contratoCesionDerechosAConfirmar: ContratoCesionDerechoStorageInterface = {};

  arrayContratosCesionDerechos: ContratoCesionDerechoStorageInterface[] = [];

  vaConfirmar = new BehaviorSubject<boolean>(false);

  constructor() {
  }


  addContratoCesionDerecho(contrato: ContratoCesionDerechoStorageInterface) {
    const existeLocalStorage = localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE);

    if (existeLocalStorage) {
      const arregloContratos = JSON.parse(localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE) || '');
      if (typeof arregloContratos === 'object') {
        this.arrayContratosCesionDerechos = [...arregloContratos];
      }

      localStorage.removeItem(this.CONTRATOS_CESION_DERECHOS_STORAGE);
      this.arrayContratosCesionDerechos.unshift(contrato);
      localStorage.setItem(this.CONTRATOS_CESION_DERECHOS_STORAGE, JSON.stringify(this.arrayContratosCesionDerechos));
    } else {

      this.arrayContratosCesionDerechos.push(contrato);
      localStorage.setItem(this.CONTRATOS_CESION_DERECHOS_STORAGE, JSON.stringify(this.arrayContratosCesionDerechos));

    }
  }

  verificarArregloLocalStorage(): boolean {
    const storage = localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE);
    if (!storage) {
      return false;
    }

    if (JSON.parse(storage || '')) {
      const arreglo = JSON.parse(storage || '');
      if (typeof arreglo === 'object') {
        return true;
      }else {
        return false;
      }
    }else {
      return false
    }
  }

  deleteContratoCesionDerecho(idContrato: number) {
    this.arrayContratosCesionDerechos = JSON.parse(localStorage.getItem(this.CONTRATOS_CESION_DERECHOS_STORAGE) || '');
    const indiceEliminar = this.arrayContratosCesionDerechos.findIndex(contrato => contrato.modelContratoActual.id === idContrato);
    console.log('xdxd', indiceEliminar);
    this.arrayContratosCesionDerechos.splice(indiceEliminar, 1);
    localStorage.removeItem(this.CONTRATOS_CESION_DERECHOS_STORAGE);
    localStorage.setItem(this.CONTRATOS_CESION_DERECHOS_STORAGE, JSON.stringify(this.arrayContratosCesionDerechos));
  }

  seleccionarContratoCesionDerechoAConfirmar(contrato: ContratoCesionDerechoStorageInterface) {
    this.contratoCesionDerechosAConfirmar = contrato;
  }
}
