import { Injectable } from '@angular/core';

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
}
