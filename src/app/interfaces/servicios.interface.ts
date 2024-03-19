export interface Servicios {
  exito:   boolean;
  datos:   Dato[];
  mensaje: string;
}

export interface Dato {
  id:          string;
  nombre:      string;
  descripcion: string;
  foto:        string;
}
