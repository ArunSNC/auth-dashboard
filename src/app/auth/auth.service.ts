import { register } from './register.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { login } from './login.interface'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  registerUser(data:any): Observable<register[]> {

    return this.http.post<register[]>('http://localhost:5000/api/users/register-user',data)
  }


  loginUser(data:any): Observable<login[]>{

    return this.http.post<login[]>('http://localhost:5000/api/users/login-user',data)
  }
}
