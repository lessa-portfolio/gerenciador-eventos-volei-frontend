import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AutenticacaoService } from '../services/autenticacao.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const autenticacaoService = inject(AutenticacaoService);
  const token = autenticacaoService.getToken();

  if (token && !req.url.includes('/public/')) {
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    });
    return next(authReq);
  }

  return next(req);
};
