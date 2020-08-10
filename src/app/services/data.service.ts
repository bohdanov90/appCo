import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public chartsConfig = {
    lineChartClicks: [{
      data: [],
      pointBorderWidth: 3,
      pointHoverBorderWidth: 10,
    }],
    lineChartPageViews: [{
      data: [],
      pointBorderWidth: 3,
      pointHoverBorderWidth: 10,
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
            fontColor: '#CCCCCC',
          },
        }],
        yAxes : [{
          gridLines : {
            color : '#F1F1F1'
          },
          ticks: {
            fontColor: '#CCCCCC',
          },
        }],
      },
    },
    lineChartColors: [{
      borderColor: '#3A80BA',
      fill: false,
      spanGaps: true,
    }],
    lineChartLegend: false,
    lineChartPlugins: [],
    lineChartType: 'line',
  };
}
