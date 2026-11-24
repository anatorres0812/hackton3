import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Incidencia, Prioridad, Estado } from '../../models/incidencia';
import { IncidenciaService } from '../../services/incidencia';
import { IncidenciaListComponent } from '../incidencia-list/incidencia-list';
import { IncidenciaFormComponent } from '../incidencia-form/incidencia-form';
import { IncidenciaDetailComponent } from '../incidencia-detail/incidencia-detail';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IncidenciaListComponent,
    IncidenciaFormComponent,
    IncidenciaDetailComponent
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  incidencias: Incidencia[] = [];
  busqueda = '';
  filtroPrioridad = '';
  filtroEstado = '';

  modalFormulario = false;
  modalDetalle = false;
  incidenciaSeleccionada: Incidencia | null = null;

  constructor(private servicio: IncidenciaService) {}

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.incidencias = this.servicio.listar();
  }

  get incidenciasFiltradas(): Incidencia[] {
    return this.incidencias.filter(item => {
      const texto = item.titulo.toLowerCase().includes(this.busqueda.toLowerCase()) ||
        item.codigo.toLowerCase().includes(this.busqueda.toLowerCase());

      const prioridad = !this.filtroPrioridad || item.prioridad === this.filtroPrioridad;
      const estado = !this.filtroEstado || item.estado === this.filtroEstado;

      return texto && prioridad && estado;
    });
  }

  get total(): number {
    return this.incidencias.length;
  }

  get pendientes(): number {
    return this.incidencias.filter(i => i.estado === 'Pendiente').length;
  }

  get proceso(): number {
    return this.incidencias.filter(i => i.estado === 'En proceso').length;
  }

  get resueltas(): number {
    return this.incidencias.filter(i => i.estado === 'Resuelta').length;
  }

  nueva(): void {
    this.incidenciaSeleccionada = null;
    this.modalFormulario = true;
  }

  editar(item: Incidencia): void {
    this.incidenciaSeleccionada = { ...item };
    this.modalFormulario = true;
  }

  visualizar(item: Incidencia): void {
    this.incidenciaSeleccionada = item;
    this.modalDetalle = true;
  }

  eliminar(item: Incidencia): void {
    if (confirm(`¿Estás segura de eliminar ${item.codigo} - ${item.titulo}?`)) {
      this.servicio.eliminar(item.id);
      this.cargar();
    }
  }

  guardar(datos: Omit<Incidencia, 'id' | 'codigo'> & { id?: number; codigo?: string }): void {
    if (datos.id !== undefined) {
      this.servicio.actualizar(datos as Incidencia);
    } else {
      const { titulo, prioridad, estado, descripcion, fecha, responsable } = datos;
      this.servicio.registrar({ titulo, prioridad, estado, descripcion, fecha, responsable });
    }

    this.cargar();
    this.cerrar();
  }

  cerrar(): void {
    this.modalFormulario = false;
    this.modalDetalle = false;
    this.incidenciaSeleccionada = null;
  }

  limpiarFiltros(): void {
    this.busqueda = '';
    this.filtroPrioridad = '';
    this.filtroEstado = '';
  }
}