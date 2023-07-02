import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Dvd } from '../models/dvd.model';

const baseUrl = 'http://localhost:8080/api/dvds';

@Injectable({
  providedIn: 'root'
})
export class DvdService {

  constructor(private http: HttpClient) { }

  // Az összes Dvd lekérése
  getAll(): Observable<Dvd[]> {
    return this.http.get<Dvd[]>(baseUrl);
  }

  // Egy Dvd lekérése az azonosító alapján
  get(id: any): Observable<Dvd> {
    return this.http.get<Dvd>(`${baseUrl}/${id}`);
  }

  // Új Dvd létrehozása
  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  // Dvd frissítése az azonosító alapján
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  // Dvd törlése az azonosító alapján
  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  // Az összes Dvd törlése
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  // Cím alapján történő Dvd keresése
  findByTitle(title: any): Observable<Dvd[]> {
    return this.http.get<Dvd[]>(`${baseUrl}?title=${title}`);
  }
}
