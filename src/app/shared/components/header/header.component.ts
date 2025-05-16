import { Component } from '@angular/core';
import { AutenticacaoService } from '../../services/autenticacao.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public autenticado: boolean = false;

  constructor(
    private autenticacaoService: AutenticacaoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.autenticado = this.autenticacaoService.jwtValido();
  }

  logout(): void {
    this.autenticacaoService.logout();
    this.autenticado = false;
    window.location.reload();
  }

  irParaLogin(): void {
    this.router.navigate(['/login']);
  }

  irParaEventos(): void {
    this.router.navigate(['']);
  }
}
