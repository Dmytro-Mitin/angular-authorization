import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthorizationService {

  private _loginUrl = "http://localhost:3000/admin";
  private _usersUrl = "http://localhost:3000/users";
  users = []


  constructor (private http: HttpClient, private _router: Router) {}

  loginUser(user) {
      return this.http.post<any>(this._loginUrl, user);
  }

  logoutUser(){
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token')
  }

  getUsers(): Observable<any>{
      return this.http.get<any>(this._usersUrl);
  }

  deleteUser(id: string): Observable<{}> {
    const url = this._usersUrl+'/'+id;
    return this.http.delete(url);
  }

  addUser(name, position, imgurl): Observable<any> {
    return this.http.post(this._usersUrl, {name, position, imgurl});      
  }

}
