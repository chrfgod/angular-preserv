import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario.model';
import { environment } from '../environments/environment';
import { env } from 'process';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURLBase + "/api/usuarios"
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clienteId: string = environment.clienteId;
  clienteSecret: string = environment.clienteSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) {}

  obterToken(){
    const tokenString = localStorage.getItem('access_token');
    if (tokenString){
      const token = JSON.parse(tokenString).access_token
      return token;
    }
    return null;
  }

  logout(){
    localStorage.removeItem('access_token');
  }

  getUserAuthenticated(){
    const token = this.obterToken();
    if(token){
      const user = this.jwtHelper.decodeToken(token).user_name;
      return user;
    }
    return null;
  }

  isAuthenticated(): boolean{
    const token = this.obterToken();
    if(token){
      const expired = this.jwtHelper.isTokenExpired(token)
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any>{
    return this.http.post(this.apiURL, usuario);
  }

  logar(username: string, password: string): Observable<any>{
    const params = new HttpParams()
      .set('username', username).set('password', password).set('grant_type','password');
    const headers = {
      'Authorization' : 'Basic ' + btoa(`${this.clienteId}:${this.clienteSecret}`),
      'Content-Type' : 'application/x-www-form-urlencoded'
    }
    return this.http.post(this.tokenURL, params.toString(), {headers} );
  }
}
