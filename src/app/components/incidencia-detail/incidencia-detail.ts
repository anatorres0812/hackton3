import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Incidencia } from '../../models/incidencia';

@Component({
  selector: 'app-incidencia-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './incidencia-detail.html',
  styleUrl: './incidencia-detail.css'
})
export class IncidenciaDetailComponent {
  @Input() incidencia: Incidencia | null = null;
}