export interface UsuarioUpdateDto {

  // nombre?: string;
  id?: number;
  nombres?: string;
  apellidos?: string;
  fechaNacimiento?: Date;

  tipoMedioContacto1?: string;
  medioContacto1?: string;
  tipoDocumentoIdentidad?: string;
  pais?: string;
  provincia?: string;
  ciudad?: string;
}
