import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public chartsConfig = {
    lineChartClicks: [{
      data: [],
    }],
    lineChartPageViews: [{
      data: [],
    }],
    lineChartLabels: [],
    lineChartOptions: {
      responsive: true,
      scales : {
        xAxes : [{
          gridLines : {
            display : false
          },
          ticks: {
            fontColor: 'grey',
          },
        }],
        yAxes : [{
          gridLines : {
            color : 'grey'
          },
          ticks: {
            fontColor: 'grey',
          },
        }],
      },
    },
    lineChartColors: [{
      borderColor: 'blue',
      fill: false,
      spanGaps: true,
    }],
    lineChartLegend: false,
    lineChartPlugins: [],
    lineChartType: 'line',
  };
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
