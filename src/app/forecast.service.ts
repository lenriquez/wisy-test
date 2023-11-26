import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForecastService {
  private readonly forecastingOptions = ['LWX', 'TOP'];

  constructor(private http: HttpClient) {}

  getForecast(id: string | null): Observable<any> {
    if (id == null || !this.forecastingOptions.includes(id)) {
      // First is use to unsubscribe after fist read
      return of(null).pipe(first());
    }

    const url = `https://api.weather.gov/gridpoints/${id}/31,80/forecast`;
    return this.http.get(url);
  }
}
