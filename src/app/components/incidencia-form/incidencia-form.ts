import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Incidencia, Prioridad, Estado } from '../../models/incidencia';

@Component({
  selector: 'app-incidencia-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './incidencia-form.html',
  styleUrl: './incidencia-form.css'
})
export class IncidenciaFormComponent implements OnChanges {
  @Input() incidencia: Incidencia | null = null;

  @Output() guardar = new EventEmitter<Omit<Incidencia, 'id' | 'codigo'> & { id?: number; codigo?: string }>();
  @Output() cancelar = new EventEmitter<void>();

  formulario = {
    titulo: '',
    prioridad: 'Media' as Prioridad,
    estado: 'Pendiente' as Estado,
    descripcion: '',
    fecha: new Date().toISOString().slice(0, 10),
    responsable: ''
  };

  ngOnChanges(): void {
    if (this.incidencia) {
      this.formulario = {
        titulo: this.incidencia.titulo,
        prioridad: this.incidencia.prioridad,
        estado: this.incidencia.estado,
        descripcion: this.incidencia.descripcion,
        fecha: this.incidencia.fecha,
        responsable: this.incidencia.responsable
      };
    } else {
      this.limpiar();
    }
  }

  limpiar(): void {
    this.formulario = {
      titulo: '',
      prioridad: 'Media',
      estado: 'Pendiente',
      descripcion: '',
      fecha: new Date().toISOString().slice(0, 10),
      responsable: ''
    };
  }

  enviar(): void {
    if (!this.formulario.titulo.trim() ||
        !this.formulario.descripcion.trim() ||
        !this.formulario.responsable.trim() ||
        !this.formulario.fecha) {
      return;
    }

    if (this.incidencia) {
      this.guardar.emit({
        ...this.formulario,
        id: this.incidencia.id,
        codigo: this.incidencia.codigo
      });
    } else {
      this.guardar.emit(this.formulario);
    }
  }
}