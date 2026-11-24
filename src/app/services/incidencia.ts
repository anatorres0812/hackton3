import { Injectable } from '@angular/core';
import { Incidencia } from '../models/incidencia';

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {
  private readonly storageKey = 'gestion_incidencias';

  private iniciales: Incidencia[] = [
    {
      id: 1,
      codigo: 'INC-001',
      titulo: 'Falla de red Lab 04',
      prioridad: 'Alta',
      estado: 'En proceso',
      descripcion: 'Intermitencia en la conexión de red del laboratorio 04. Se requiere revisar el switch principal y los puntos de acceso.',
      fecha: '2026-11-23',
      responsable: 'Carlos Mendoza'
    },
    {
      id: 2,
      codigo: 'INC-002',
      titulo: 'Error acceso portal',
      prioridad: 'Media',
      estado: 'Pendiente',
      descripcion: 'Los usuarios reportan problemas al iniciar sesión en el portal institucional.',
      fecha: '2026-11-23',
      responsable: 'Ana Torres'
    },
    {
      id: 3,
      codigo: 'INC-003',
      titulo: 'Actualización Office',
      prioridad: 'Baja',
      estado: 'Resuelta',
      descripcion: 'Actualización de las aplicaciones Office en los equipos administrativos.',
      fecha: '2026-11-22',
      responsable: 'Luis Ramírez'
    }
  ];

  listar(): Incidencia[] {
    const datos = localStorage.getItem(this.storageKey);

    if (datos) {
      return JSON.parse(datos) as Incidencia[];
    }

    this.guardar(this.iniciales);
    return this.iniciales;
  }

  guardar(datos: Incidencia[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(datos));
  }

  registrar(datos: Omit<Incidencia, 'id' | 'codigo'>): void {
    const lista = this.listar();
    const siguiente = lista.length
      ? Math.max(...lista.map(item => item.id)) + 1
      : 1;

    const nueva: Incidencia = {
      ...datos,
      id: siguiente,
      codigo: `INC-${String(siguiente).padStart(3, '0')}`
    };

    this.guardar([nueva, ...lista]);
  }

  actualizar(datos: Incidencia): void {
    const lista = this.listar().map(item =>
      item.id === datos.id ? datos : item
    );

    this.guardar(lista);
  }

  eliminar(id: number): void {
    this.guardar(this.listar().filter(item => item.id !== id));
  }
}