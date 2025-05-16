import { Component, OnInit } from '@angular/core';

import { IRachaPublico } from '../../shared/interfaces/IRachaPublico';
import { CommonModule } from '@angular/common';
import { FormatarDataPipe } from '../../shared/pipes/formatar-data.pipe';
import { Router } from '@angular/router';
import { EventosService } from '../../shared/services/eventos.service';
import { HeaderComponent } from '../../shared/components/header/header.component';

@Component({
  selector: 'app-proximos-eventos',
  standalone: true,
  imports: [CommonModule, FormatarDataPipe, HeaderComponent],
  templateUrl: './proximos-eventos.component.html',
  styleUrl: './proximos-eventos.component.scss',
})
export class ProximosEventosComponent implements OnInit {
  public eventos!: IRachaPublico[];

  constructor(private router: Router, private eventosService: EventosService) {}

  ngOnInit(): void {
    this.eventosService.listarEventos().subscribe({
      next: (response: IRachaPublico[]) => (this.eventos = response),
      error: (err) => console.error(err),
    });
  }

  public redirectToEvent(id: string): void {
    this.router.navigate(['/evento', id]);
  }
}
