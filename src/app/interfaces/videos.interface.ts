export interface Videos {
  exito:   boolean;
  datos:   Dato[];
  mensaje: string;
}

export interface Dato {
  id:          string;
  fecha:       Date;
  titulo:      string;
  descripcion: null | string;
  link:        string;
}
