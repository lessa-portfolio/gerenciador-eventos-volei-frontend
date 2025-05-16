import { Component } from '@angular/core';
import { IDetalheEvento } from '../../shared/interfaces/IDetalhesEvento';
import { EventosService } from '../../shared/services/eventos.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormatarDataPipe } from '../../shared/pipes/formatar-data.pipe';
import { CommonModule } from '@angular/common';
import { AutenticacaoService } from '../../shared/services/autenticacao.service';
import { HeaderComponent } from "../../shared/components/header/header.component";

@Component({
  selector: 'app-detalhe-evento',
  standalone: true,
  imports: [CommonModule, FormatarDataPipe, HeaderComponent],
  templateUrl: './detalhe-evento.component.html',
  styleUrl: './detalhe-evento.component.scss',
})
export class DetalheEventoComponent {
  public detalheEvento!: IDetalheEvento;
  public statusUsuarioEvento:
    | 'nao-inscrito'
    | 'pendente'
    | 'confirmado'
    | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventosService: EventosService,
    private autenticacaoService: AutenticacaoService
  ) {}

  eventoId: string | null = null;

  ngOnInit(): void {
    this.eventoId = this.route.snapshot.paramMap.get('eventoId');

    this.atualizaDetalhesEvento();
  }

  private atualizaDetalhesEvento() {
    if (!this.eventoId) return;

    this.eventosService.buscarDetalhesEvento(this.eventoId).subscribe({
      next: (response: IDetalheEvento) => {
        this.detalheEvento = response;
        this.definirStatusDoUsuario();
      },
      error: (err) => console.error(err),
    });
  }

  private definirStatusDoUsuario(): void {
    if (!this.autenticacaoService.jwtValido()) {
      this.statusUsuarioEvento = null;
      return;
    }

    const username = this.autenticacaoService.getUsername();
    const inscricao = this.detalheEvento.inscritos.find(
      (i) => i.username === username
    );

    if (!inscricao) {
      this.statusUsuarioEvento = 'nao-inscrito';
    } else if (inscricao.status === 'pendente') {
      this.statusUsuarioEvento = 'pendente';
    } else if (inscricao.status === 'confirmado') {
      this.statusUsuarioEvento = 'confirmado';
    }
  }

  public aoClicarNoBotao(): void {
    if (!this.autenticacaoService.jwtValido()) {
      const urlAtual = this.router.url;
      this.router.navigate(['/login'], {
        queryParams: { redirectTo: urlAtual },
      });
      return;
    }

    if (!this.eventoId) return;

    if (this.statusUsuarioEvento === 'pendente') {
      this.eventosService.confirmarPagamento(this.eventoId).subscribe({
        next: () => {
          this.atualizaDetalhesEvento();
          this.definirStatusDoUsuario();
        },
        error: (err) => console.error(err),
      });
    } else {
      this.eventosService.inscreverEmEvento(this.eventoId).subscribe({
        next: () => {
          this.atualizaDetalhesEvento();
          this.definirStatusDoUsuario();
        },
        error: (err) => console.error(err),
      });
    }
  }
}
