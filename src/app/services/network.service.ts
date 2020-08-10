import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { IStatsData } from '../interfaces/statsData.interface';
import { IChartsData } from '../interfaces/chartsData.interface';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  constructor(
    private httpClient: HttpClient,
  ) {}

  public getStatsData(page: number, limit: number): Observable<IStatsData> {
    return this.httpClient.get<IStatsData>(
      'http://localhost:3001/api/users', {
        params: new HttpParams()
          .set('page', page.toString())
          .set('limit', limit.toString()),
      }
    ).pipe(
      catchError((err: Error) => {
        console.log('An error occurred:', err.message);
        return of(null);
      }),
    );
  }

  public getChartsData(id: number): Observable<IChartsData> {
    return this.httpClient.get<IChartsData>(`http://localhost:3001/api/statistics/${id}`).pipe(
      catchError((err: Error) => {
        console.log('An error occurred:', err.message);
        return of(null);
      }),
    );
  }
}
