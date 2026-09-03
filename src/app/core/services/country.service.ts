import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country';

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.API_URL);
  }
}