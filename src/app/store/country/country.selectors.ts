import {
  createFeatureSelector,
  createSelector
} from '@ngrx/store';

import { CountryState } from './country.reducer';

export const selectCountryState =
  createFeatureSelector<CountryState>('countries');

export const selectAllCountries =
  createSelector(
    selectCountryState,
    (state) => state.countries
  );

export const selectCountryLoading =
  createSelector(
    selectCountryState,
    (state) => state.loading
  );

export const selectCountryError =
  createSelector(
    selectCountryState,
    (state) => state.error
  );