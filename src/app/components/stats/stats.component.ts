import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { tap, switchMap } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { IStatsData } from 'src/app/interfaces/statsData.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit {
  public statsData: IStatsData;
  public displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public initialNumOfPages = 0;
  public initialResPerPage = 10;
  public pageSizeOptions = [10, 25, 50];
  public paginatorLength: number;

  constructor(
    private networkService: NetworkService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.loadStatsData().subscribe();

    this.paginator.page
      .pipe(switchMap(() => this.loadStatsData()))
      .subscribe();
  }

  public onTableRowClick(row: IUser): void {
    this.router.navigate([`/user/${row.id}`]);
  }

  private loadStatsData(): Observable<IStatsData> {
    return this.networkService.getStatsData(this.paginator.pageIndex + 1, this.paginator.pageSize).pipe(
      tap((statsData: IStatsData) => {
        this.displayedColumns = Object.keys(statsData.users[0]);
        this.statsData = statsData;
        this.paginatorLength = this.statsData.pages * this.paginator.pageSize;
      }),
    );
  }
}
