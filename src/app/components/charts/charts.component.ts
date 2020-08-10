import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { tap, filter, map, share } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IChartsDataDay } from '../../interfaces/chartsDataDay.interface';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from '../../services/network.service';
import { IUser } from '../../interfaces/user.interface';
import { IStatsData } from 'src/app/interfaces/statsData.interface';
import { IChartsData } from '../../interfaces/chartsData.interface';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
  public userFullName$: Observable<string>;
  public id = this.activatedRoute.snapshot.params.id;

  constructor(
    public dataService: DataService,
    private activatedRoute: ActivatedRoute,
    private networkService: NetworkService,
  ) {}

  ngOnInit(): void {
    this.displayCharts().subscribe();
    this.userFullName$ = this.getUserFullName();
  }

  private getUserFullName(): Observable<string> {
    return this.networkService.getStatsData(1, 1000).pipe(
      map((response: IStatsData) => response.users),
      map((users: IUser[]) => users.filter((user: IUser) => user.id === +this.id)),
      map((user: IUser[]) => user[0]),
      map((user: IUser) => `${user.first_name} ${user.last_name}`),
      share(),
    );
  }

  private displayCharts(): Observable<IChartsDataDay[]> {
    return this.networkService.getChartsData(+this.id).pipe(
      map((chartsData: IChartsData) => chartsData.data),
      filter((chartsData: IChartsDataDay[]) => !!chartsData),
      tap(() => this.resetChartsConfigData()),
      tap((chartsData: IChartsDataDay[]) => this.setChartsConfigData(chartsData)),
    );
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
