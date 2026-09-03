import { TestBed } from '@angular/core/testing';

import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';

import { provideHttpClient } from '@angular/common/http';

import { CountryService } from './country.service';

import { Country } from '../models/country.model';

describe('CountryService', () => {

  let service: CountryService;
  let httpController: HttpTestingController;

  const API_URL =
    'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/country';

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        CountryService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(CountryService);

    httpController =
      TestBed.inject(HttpTestingController);

  });

  afterEach(() => {

    httpController.verify();

  });

  it('should be created', () => {

    expect(service).toBeTruthy();

  });

  it('should get countries', () => {

    const mockCountries: Country[] = [
      {
        id: '1',
        name: 'India'
      },
      {
        id: '2',
        name: 'United States'
      },
      {
        id: '3',
        name: 'United Kingdom'
      }
    ];

    service.getCountries().subscribe(
      countries => {

        expect(countries).toEqual(mockCountries);

      }
    );

    const request =
      httpController.expectOne(API_URL);

    expect(request.request.method).toBe('GET');

    request.flush(mockCountries);

  });

});