import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessaoReponse } from '../../interface/sessao-reponse';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5000/';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  }

  public buscarSessao(): Observable<SessaoReponse>{
    return this.http.get<SessaoReponse>(this.baseUrl + 'BuscarSessao',this.httpOptions).pipe(resp => resp, error => error);
  }
}
