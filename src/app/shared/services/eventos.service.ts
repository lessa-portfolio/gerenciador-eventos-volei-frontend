import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../../environments/environments';
import { IRachaPublico } from '../interfaces/IRachaPublico';
import { IDetalheEvento } from '../interfaces/IDetalhesEvento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  constructor(private http: HttpClient) {}

  public listarEventos(): Observable<IRachaPublico[]> {
    return this.http.get<IRachaPublico[]>(`${environment.apiUrl}/public/proximos-eventos`);
  }

  public buscarDetalhesEvento(eventoId: string): Observable<IDetalheEvento> {
    return this.http.get<IDetalheEvento>(`${environment.apiUrl}/public/detalhes-eventos/${eventoId}`);
  }

  public inscreverEmEvento(eventoId: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/atleta/inscrever/${eventoId}`, {});
  }

  public confirmarPagamento(eventoId: string): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}/atleta/confirmar/${eventoId}`, {});
  }
}
