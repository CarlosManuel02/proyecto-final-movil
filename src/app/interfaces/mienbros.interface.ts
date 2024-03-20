export interface Miembros {
  exito:   boolean;
  datos:   Dato[];
  mensaje: string;
}

export interface Dato {
  id:     string;
  foto:   string;
  nombre: string;
  cargo:  string;
}
