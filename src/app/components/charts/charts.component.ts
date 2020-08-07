import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
   public userFullName$;

  constructor(
    public dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.dataService.getChartsData$().pipe(
      tap(() => this.resetChartsConfigData()),
      tap(chartsData => this.setChartsConfigData(chartsData)),
    ).subscribe();

    this.userFullName$ = this.dataService.getUserFullName$();
  }

  private resetChartsConfigData() {
    this.dataService.chartsConfig.lineChartClicks[0].data = [];
    this.dataService.chartsConfig.lineChartPageViews[0].data = [];
    this.dataService.chartsConfig.lineChartLabels = [];
  }

  private setChartsConfigData(chartsData) {
    chartsData.map(chartsDataDay => {
      this.dataService.chartsConfig.lineChartClicks[0].data = [
        ...this.dataService.chartsConfig.lineChartClicks[0].data,
        chartsDataDay.clicks
      ];
      this.dataService.chartsConfig.lineChartPageViews[0].data = [
        ...this.dataService.chartsConfig.lineChartPageViews[0].data,
        chartsDataDay.page_views
      ];
      this.dataService.chartsConfig.lineChartLabels = [
        ...this.dataService.chartsConfig.lineChartLabels,
        chartsDataDay.date
      ];
    });
  }
}
