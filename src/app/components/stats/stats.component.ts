import { Component, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { tap, switchMap, takeUntil } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subject } from 'rxjs';
import { IStatsData } from 'src/app/interfaces/statsData.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements AfterViewInit, OnDestroy {
  public statsData: IStatsData;
  public displayedColumns: string[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  public initialNumOfPages = 0;
  public initialResPerPage = 10;
  public pageSizeOptions = [10, 25, 50];
  public paginatorLength: number;

  private onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private networkService: NetworkService,
    private router: Router,
  ) {}

  ngAfterViewInit(): void {
    this.loadStatsData().subscribe();

    this.paginator.page.pipe(
      switchMap(() => this.loadStatsData()),
      takeUntil(this.onDestroy$),
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
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
      takeUntil(this.onDestroy$),
    );
  }
}
