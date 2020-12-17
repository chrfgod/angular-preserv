import { Injectable } from '@angular/core';
import { Cliente } from './clientes/cliente.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  apiURL: string = environment.apiURLBase + '/api/clientes';

  constructor(
    private http: HttpClient
  ) { }

  cadastrar(cliente: Cliente): Observable<Cliente> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.post<Cliente>(`${this.apiURL}`, cliente, {headers})
  }

  getClientes(): Observable<Cliente[]>{
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.get<Cliente[]>(this.apiURL, {headers});
  }

  getClienteById(id: number): Observable<Cliente> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.get<any>(`${this.apiURL}/${id}`, {headers});
  }

  atualizar(cliente: Cliente): Observable<any> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.put<Cliente>(`${this.apiURL}/${cliente.id}`, cliente, {headers})
  }

  deletar(cliente: Cliente): Observable<any> {
    const tokenString = localStorage.getItem('access_token');
    const token = JSON.parse(tokenString);
    const headers = {
      'Authorization' : 'Bearer ' + token.access_token
    }
    return this.http.delete<Cliente>(`${this.apiURL}/${cliente.id}`, {headers})
  }
  

}
