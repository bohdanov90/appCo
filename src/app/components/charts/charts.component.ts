import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IChartsDataDay } from '../../interfaces/chartsDataDay.interface';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
   public userFullName$: Observable<string>;

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

  private resetChartsConfigData(): void {
    this.dataService.chartsConfig.lineChartClicks[0].data = [];
    this.dataService.chartsConfig.lineChartPageViews[0].data = [];
    this.dataService.chartsConfig.lineChartLabels = [];
  }

  private setChartsConfigData(chartsData: IChartsDataDay[]): void {
    chartsData.map((chartsDataDay: IChartsDataDay) => {
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
