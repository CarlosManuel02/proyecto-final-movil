export interface Albergues {
  exito:   boolean;
  datos:   Dato[];
  mensaje: string;
}

export interface Dato {
  ciudad:      string;
  codigo:      string;
  edificio:    string;
  coordinador: string;
  telefono:    string;
  capacidad:   string;
  lat:         string;
  lng:         string;
}
