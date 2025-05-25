import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherServiceService {
  constructor(private http: HttpClient) {}

  getWeatherForCity(city: string): Observable<any> {
    const path = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=695ed9f29c4599b7544d0db5c211d499`;
    return this.http.get<any>(path).pipe(
      map((data) => ({
        name: data.name,
        main: {
          temp: data.main.temp,
          feels_like: data.main.feels_like,
          humidity: data.main.humidity,
        },
        weather: data.weather,
        image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
      })),
      delay(500),
      catchError(() => of({ error: 'Città non trovata o errore di rete' }))
    );
  }
}
