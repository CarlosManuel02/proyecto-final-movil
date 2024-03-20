export interface Medidas {
  exito:   boolean;
  datos:   Datomedida[];
  mensaje: string;
}

export interface Datomedida {
  id:          string;
  titulo:      string;
  descripcion: string;
  foto:        string;
}
