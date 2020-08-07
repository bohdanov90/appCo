import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';
import { DataService } from '../../services/data.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  public data$;
  public staticData;
  public displayedColumns;

  constructor(
    private networkService: NetworkService,
    private dataService: DataService,
  ) {}

  ngOnInit(): void {
    this.networkService.getStatsData(1, 10).subscribe(staticData => {
      this.displayedColumns = Object.keys(staticData.users[0]);
      this.staticData = staticData;
    });
  }

  public onRowClick(row): void {
    this.dataService.setUserFullName(`${row.first_name} ${row.last_name}`);
    this.networkService.getChartsData(row.id).pipe(
      tap(chartsData => this.dataService.setChartsData(chartsData.data)),
    ).subscribe();
  }
}
