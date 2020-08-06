import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'src/app/services/network.service';

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
  ) {}

  ngOnInit(): void {
    this.networkService.getStatsData(1, 10).subscribe(staticData => {
      console.log(staticData.users);
      this.displayedColumns = Object.keys(staticData.users[0]);
      return this.staticData = staticData;
    });
  }
}
