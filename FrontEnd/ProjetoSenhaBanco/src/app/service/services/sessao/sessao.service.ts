import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessaoRequest } from '../../interface/sessao-request';
import { Observable } from 'rxjs';
import { SessaoReponse } from '../../interface/sessao-reponse';

@Injectable({
  providedIn: 'root'
})
export class SessaoService {

  constructor(private http: HttpClient) { }

  baseUrl: string = '';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  }

  public buscarSessao(sessaoData:SessaoRequest): Observable<SessaoReponse>{
    return this.http.post<SessaoReponse>(this.baseUrl, sessaoData,this.httpOptions).pipe(resp => resp, error => error);
  }
}
