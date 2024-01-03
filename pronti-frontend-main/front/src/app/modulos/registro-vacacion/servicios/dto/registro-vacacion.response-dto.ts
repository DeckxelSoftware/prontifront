import {AbstractResponseDto} from "../../../../abstract/dto/abstract-response.dto";

export interface RegistroVacacionResponseDto extends AbstractResponseDto {
  // nombre?: string;

  fechaDesde?: string;
  fechaHasta?: string;
  diasTomados?: number;
  valorTomado?: number;
  estaPagado?: string;
  nombreApellidoResponsable?: string;
  fechaPago?: string;
  comprobantePago?: string;
  valorPagado?: number;
  idCargoVacacion?: number;
}
