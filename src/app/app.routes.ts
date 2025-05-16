import { Routes } from '@angular/router';

import { ProximosEventosComponent } from './pages/proximos-eventos/proximos-eventos.component';
import { DetalheEventoComponent } from './pages/detalhe-evento/detalhe-evento.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';

export const routes: Routes = [
  {
    path: 'proximos-eventos',
    component: ProximosEventosComponent,
  },
  {
    path: 'evento/:eventoId',
    component: DetalheEventoComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'cadastro',
    component: CadastroComponent,
  },
  {
    path: '**',
    redirectTo: 'proximos-eventos',
  },
];
