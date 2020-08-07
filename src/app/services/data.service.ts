import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { IChartsDataDay } from '../interfaces/chartsDataDay.interface';

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
  private chartsData$: Subject<IChartsDataDay[]> = new Subject();
  private userFullName$: Subject<string> = new Subject();

  constructor() {}

  public getChartsData$(): Observable<IChartsDataDay[]> {
    return this.chartsData$.asObservable();
  }
  public setChartsData(chartsData: IChartsDataDay[]): void {
    this.chartsData$.next(chartsData);
  }

  public getUserFullName$(): Observable<string> {
    return this.userFullName$.asObservable();
  }
  public setUserFullName(userFullName: string): void {
    this.userFullName$.next(userFullName);
  }
}
