import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-weather',
  standalone: false,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
})
export class WeatherComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  countries = [
    {
      name: 'United Kingdom',
      cities: ['London', 'Warwick', 'Birmingham'],
    },
    {
      name: 'United States',
      cities: ['New York', 'Chicago', 'Washington'],
    },
    {
      name: 'Australia',
      cities: ['Sydney', 'Adelaide', 'Melbourne'],
    },
    {
      name: 'Pakistan',
      cities: ['Lahore', 'Karachi', 'Islamabad'],
    },
  ];

  countryControl = new FormControl('');
  cityControl = new FormControl('');
  cities$!: Observable<string[]>;

  constructor(private router: Router) {}

  ngOnInit() {
    // Aggiorna le città quando cambia il paese
    this.cities$ = this.countryControl.valueChanges.pipe(
      startWith(''),
      map((country: any) => {
        const found = this.countries.find((c) => c.name === country);
        return found ? found.cities : [];
      })
    );

    // Reset della città quando cambia il paese
    this.countryControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => this.cityControl.setValue(''));

    // Naviga quando cambia la città
    this.cityControl.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value) {
          this.router.navigate(['weather', value]);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
