import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../../interface/login-request';
import { Observable } from 'rxjs';
import { LoginReponse } from '../../interface/login-reponse';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  baseUrl: string = 'http://localhost:5000/Autenticar';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  }

  public autenticar(loginData: LoginData): Observable<LoginReponse> {
    return this.http.post<LoginReponse>(this.baseUrl, loginData, this.httpOptions).pipe((resp) => resp, (error) => error);
  }
}

