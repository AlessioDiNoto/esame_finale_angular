import { ActivatedRoute } from '@angular/router';
import { WeatherServiceService } from '../weather-service/weather-service.service';
import { Component, OnInit } from '@angular/core';
import { concatMap, filter, map, Observable, tap } from 'rxjs';

@Component({
  selector: 'app-weather-report',
  standalone: false,
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss'],
})
export class WeatherReportComponent implements OnInit {
  data$!: Observable<any>;
  today: Date = new Date();

  constructor(
    private weatherService: WeatherServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.data$ = this.route.params.pipe(
      map((params) => params['locationName']),
      filter((name) => !!name),
      concatMap((name) => this.weatherService.getWeatherForCity(name))
    );
  }
}
