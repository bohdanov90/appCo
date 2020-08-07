import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public lineChartClicks = [{
    data: [],
  }];
  public lineChartPageViews = [{
    data: [],
  }];
  public lineChartLabels = [];
  public lineChartOptions = {
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
  };
  public lineChartColors = [{
    borderColor: 'blue',
    fill: false,
    spanGaps: true,
  }];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';

  public userFullName$;

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.dataService.getChartsData$().subscribe(chartsData => {
      this.lineChartClicks[0].data = [];
      this.lineChartPageViews[0].data = [];
      this.lineChartLabels = [];
      chartsData.map(chartsDataDay => {
        this.lineChartClicks[0].data = [...this.lineChartClicks[0].data, chartsDataDay.clicks];
        this.lineChartPageViews[0].data = [...this.lineChartPageViews[0].data, chartsDataDay.page_views];
        this.lineChartLabels = [...this.lineChartLabels, chartsDataDay.date];
      });
    });
    this.userFullName$ = this.dataService.getUserFullName$();
  }
}
