import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidencia } from '../../models/incidencia';

@Component({
  selector: 'app-incidencia-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencia-list.html',
  styleUrl: './incidencia-list.css'
})
export class IncidenciaListComponent {
  @Input() incidencias: Incidencia[] = [];

  @Output() visualizar = new EventEmitter<Incidencia>();
  @Output() editar = new EventEmitter<Incidencia>();
  @Output() eliminar = new EventEmitter<Incidencia>();
}