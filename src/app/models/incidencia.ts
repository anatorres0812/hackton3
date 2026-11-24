export type Prioridad = 'Alta' | 'Media' | 'Baja';
export type Estado = 'Pendiente' | 'En proceso' | 'Resuelta';

export interface Incidencia {
  id: number;
  codigo: string;
  titulo: string;
  prioridad: Prioridad;
  estado: Estado;
  descripcion: string;
  fecha: string;
  responsable: string;
}