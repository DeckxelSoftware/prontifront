export interface AuthenticacionInterface {
  usuario?: UsuarioLoginInterface;
  jwt?: string;
  codigo?: string;
  mensaje?: string;
  permisos?: string[];
}

interface UsuarioLoginInterface {
  username: string;
  nombres: string;
  apellidos: string;
  correo: string;
  authorities: Authorities[];
}

interface Authorities {
  authority: string;
}
