import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  Validators,
} from '@angular/forms';

import { AutenticacaoService } from '../../shared/services/autenticacao.service';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.scss',
})
export class CadastroComponent {
  public cadastroForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      username: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  public cadastrar(): void {
    if (this.cadastroForm?.valid) {
      const { email, username, senha } = this.cadastroForm.value;
      this.autenticacaoService.cadastrar(email, username, senha).subscribe({
        next: () => {
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '';
          this.router.navigate([redirectTo]);
        },
        error: (err) => console.error(err),
      });
    }
  }

  public redirectToLogin(): void {
    this.router.navigate(["/login"]);
  }
}
