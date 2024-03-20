export interface Noticias {
  exito:   boolean;
  datos:   Dato[];
  mensaje: string;
}

export interface Dato {
  id:        string;
  fecha:     Date;
  titulo:    string;
  contenido: string;
  foto:      string;
}
