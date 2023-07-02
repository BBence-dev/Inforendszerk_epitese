import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

const baseUrl = 'http://localhost:8080/api/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  // Az összes User lekérése
  getAll(): Observable<User[]> {
    return this.http.get<User[]>(baseUrl);
  }

  // Egy User lekérése az azonosító alapján
  get(id: any): Observable<User> {
    return this.http.get<User>(`${baseUrl}/${id}`);
  }

  // Új User létrehozása
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // User frissítése az azonosító alapján
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // User törlése az azonosító alapján
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // Az összes User törlése
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // Cím alapján történő User keresése
  findByTitle(title: any): Observable<User[]> {
    return this.http.get<User[]>(`${baseUrl}?title=${title}`);
  }
}
