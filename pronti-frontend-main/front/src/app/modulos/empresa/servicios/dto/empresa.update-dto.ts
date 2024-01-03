export interface EmpresaUpdateDto {
  id?: number;
  nombreComercial?: string;
  razonSocial?: string;
  rucEmpresa?: string;
  direccionEmpresa?: string;
  telefonoEmpresa?: string;
  documentoRepresentanteLegal?: string;
  nombreRepresentanteLegal?: string;
  nombreContador?: string;
  rucContador?: string;
  telefonoContador?: string;
  correoEmpresa?: string;
  correoContador?: string;
  correoRepresentanteLegal?: string;
  tipoEmpresa?: string;
  claseContribuyente?: string;
  obligadoLlevarContabilidad?: string;
  agenteRetencion?: string;
}
