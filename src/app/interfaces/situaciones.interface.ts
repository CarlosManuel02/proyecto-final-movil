export interface Situaciones {
  exito:   boolean;
  datos:   DatoSituaciones[];
  mensaje: string;
}

export interface DatoSituaciones {
  id:          string;
  voluntario:  string;
  titulo:      string;
  descripcion: string;
  foto:        string;
  latitud:     string;
  longitud:    string;
  estado:      string;
  fecha:       Date;
}
