import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, User } from '../interfaces/interfaces';

import { of,Observable } from "rxjs";

import { map, catchError,tap } from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private endPoint: string= environment.baseURL;
  private _user!:User;


  get user(){
    return this._user;
  }


  constructor(private http: HttpClient) { }

  register(email:string, password:string, name:string){
    const url = `${this.endPoint}/new`;
    const body = { email, password,name};
    return this.http.post<AuthResponse>( url,body).pipe(
      tap(resp =>{
        console.log("register response"+resp);
        
        if (resp.ok)
        { 
          localStorage.setItem('token', resp.token!);
        }
        
      }),
      map( resp => resp),
      catchError( err => of(err.error.msg))
    );
       

  }

  login(email: string, password: string){
    const url = `${this.endPoint}`;
    const body = { email, password};
    return this.http.post<AuthResponse>(url,body)
    .pipe(
      tap(resp =>{
        console.log("login response");
        console.log(resp);
        console.log("login response");
        
        
        if (resp.ok)
        { 

          localStorage.setItem('token', resp.token!);
          
        }
      }),
      map( resp => resp),
      catchError( err => of(err.error.msg))
    );
  }

  tokenValidation(): Observable<boolean>{
    const url = `${this.endPoint}/renew`;
    //need token in header x-token
    const headers = new HttpHeaders().set("x-token", localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>(url, { headers:headers } )
    .pipe(
      map(
        resp => {
          localStorage.setItem('token', resp.token!);

          this._user = {
            name: resp.name,
            id: resp.id,
            email: resp.email
          }
          
          return resp.ok;
        }
      ),
      catchError(err => of(false))
    )
    ;


  }

  
  logout(){
    localStorage.clear();
  }
}
