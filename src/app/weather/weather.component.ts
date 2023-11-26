import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForecastService } from '../forecast.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent {
  @ViewChild('canvas') canvas: ElementRef | undefined;

  public title = '';
  private titleDictionary: any;

  constructor(
    private forecastService: ForecastService,
    private route: ActivatedRoute,
    private router: Router,
    private zone: NgZone
  ) {}

  ngOnInit() {
    this.titleDictionary = {
      LWX: 'District of Columbia Forecast',
      TOP: 'Kansas Forecast',
    };
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const keys: string = params.get('id') || '';
          this.title = this.titleDictionary[keys];
          return this.forecastService.getForecast(params.get('id'));
        })
      )
      .subscribe((e) => {
        if (e == null) {
          this.router.navigate(['/404']);
        }

        const config = this.initializeChart(e);

        // Prevent unwanted change detection
        this.zone.runOutsideAngular(
          () => new Chart(this.canvas?.nativeElement, config)
        );
      });
  }

  initializeChart(resp: any): any {
    const labels = resp.properties.periods.map((e: any) => e.name);
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Temperature',
          data: resp.properties.periods.map((e: any) => e.temperature),
          fill: true,
          borderColor: 'rgb(21, 40, 255)',
          tension: 0.5,
        },
      ],
    };

    return {
      type: 'line' as ChartType,
      data: data,
      options: {
        transitions: {
          show: {
            animations: {
              x: {
                from: 0,
              },
              y: {
                from: 0,
              },
            },
          },
          hide: {
            animations: {
              x: {
                to: 0,
              },
              y: {
                to: 0,
              },
            },
          },
        },
      },
    };
  }
}
