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
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private autenticacaoService: AutenticacaoService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: [null, Validators.required],
      senha: [null, Validators.required],
    });
  }

  public login(): void {
    if (this.loginForm?.valid) {
      const { username, senha } = this.loginForm.value;
      this.autenticacaoService.login(username, senha).subscribe({
        next: () => {
          const redirectTo = this.route.snapshot.queryParamMap.get('redirectTo') || '';
          this.router.navigate([redirectTo]);
        },
        error: (err) => console.error(err),
      });
    }
  }

  public redirectToCadastrar(): void {
    this.router.navigate(["/cadastro"]);
  }
}
