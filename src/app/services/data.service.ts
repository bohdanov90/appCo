import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private chartsData$: Subject<any> = new Subject();
  private userFullName$: Subject<any> = new Subject();

  constructor() { }

  public getChartsData$(): Observable<any> {
    return this.chartsData$.asObservable();
  }
  public setChartsData(chartsData): void {
    this.chartsData$.next(chartsData);
  }

  public getUserFullName$(): Observable<any> {
    return this.userFullName$.asObservable();
  }
  public setUserFullName(userFullName): void {
    this.userFullName$.next(userFullName);
  }
}
