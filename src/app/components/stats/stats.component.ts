import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { DataService } from '../../services/data.service';
import { tap, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IStatsData } from 'src/app/interfaces/statsData.interface';
import { IUser } from 'src/app/interfaces/user.interface';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit, AfterViewInit {
  public statsData: IStatsData;
  public displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public initialNumOfPages = 0;
  public initialResPerPage = 10;
  public pageSizeOptions = [10, 20, 30, 40, 50];

  constructor(
    private networkService: NetworkService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.loadStatsData().subscribe();

    this.paginator.page.pipe(
      switchMap(() => this.loadStatsData()),
    ).subscribe();
  }

  public onRowClick(row: IUser): void {
    this.dataService.setUserFullName(`${row.first_name} ${row.last_name}`);

    this.networkService.getChartsData(row.id).pipe(
      tap(chartsData => this.dataService.setChartsData(chartsData.data)),
    ).subscribe();
  }

  private loadStatsData(): Observable<IStatsData> {
    return this.networkService.getStatsData(this.paginator.pageIndex + 1, this.paginator.pageSize).pipe(
      tap(statsData => {
        this.displayedColumns = Object.keys(statsData.users[0]);
        this.statsData = statsData;
      }),
    );
  }
}
