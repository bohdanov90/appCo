import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  public getStats(page: number, limit: number): Observable<any> {
    return this.httpClient.get(
      'http://localhost:3001/api/users', { params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
      }
    );
  }

  public getCharts(id: number): Observable<any> {
    return this.httpClient.get(`http://localhost:3001/api/statistics/${id}`);
  }
}
