export interface UsuarioCreateDto {
  username?: string;
  password?: string;
  nombres: string;
  apellidos: string;
  fechaNacimiento?: Date;
  correo: string;


  tipoMedioContacto1?: string;
  medioContacto1?: string;
  tipoDocumentoIdentidad: string;
  documentoIdentidad: string;
  pais?: string;
  provincia: string;
  ciudad: string;
  direccion?: string;

}
