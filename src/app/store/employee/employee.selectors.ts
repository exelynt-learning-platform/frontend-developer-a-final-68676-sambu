import { createFeatureSelector, createSelector } from '@ngrx/store';
import { employeeAdapter } from './employee.reducer';
import { EmployeeState } from './employee.state';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employees');

const {
  selectAll,
  selectEntities
} = employeeAdapter.getSelectors();

export const selectAllEmployees =
  createSelector(
    selectEmployeeState,
    selectAll
  );

export const selectEmployeeEntities =
  createSelector(
    selectEmployeeState,
    selectEntities
  );

export const selectEmployeeLoading =
  createSelector(
    selectEmployeeState,
    (state) => state.loading
  );

export const selectEmployeeError =
  createSelector(
    selectEmployeeState,
    (state) => state.error
  );

export const selectSelectedEmployeeId =
  createSelector(
    selectEmployeeState,
    (state) => state.selectedEmployeeId
  );