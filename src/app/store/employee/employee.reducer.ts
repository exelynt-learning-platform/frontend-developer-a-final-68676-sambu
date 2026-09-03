import { createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import { Employee } from '../../core/models/employee.model';
import * as EmployeeActions from './employee.actions';
import { EmployeeState } from './employee.state';

export const employeeAdapter =
  createEntityAdapter<Employee>();

export const initialState: EmployeeState =
  employeeAdapter.getInitialState({
    loading: false,
    error: null,
    selectedEmployeeId: null
  });

export const employeeReducer = createReducer(
  initialState,

  on(EmployeeActions.loadEmployees, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    EmployeeActions.loadEmployeesSuccess,
    (state, { employees }) =>
      employeeAdapter.setAll(employees, {
        ...state,
        loading: false,
        error: null
      })
  ),

  on(
    EmployeeActions.loadEmployeesFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(
    EmployeeActions.loadEmployeeById,
    (state) => ({
      ...state,
      loading: true,
      error: null
    })
  ),

  on(
    EmployeeActions.loadEmployeeByIdSuccess,
    (state, { employee }) =>
      employeeAdapter.upsertOne(employee, {
        ...state,
        loading: false,
        selectedEmployeeId: employee.id ?? null
      })
  ),

  on(
    EmployeeActions.loadEmployeeByIdFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(EmployeeActions.addEmployee, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    EmployeeActions.addEmployeeSuccess,
    (state, { employee }) =>
      employeeAdapter.addOne(employee, {
        ...state,
        loading: false
      })
  ),

  on(
    EmployeeActions.addEmployeeFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(EmployeeActions.updateEmployee, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    EmployeeActions.updateEmployeeSuccess,
    (state, { employee }) =>
      employeeAdapter.upsertOne(employee, {
        ...state,
        loading: false
      })
  ),

  on(
    EmployeeActions.updateEmployeeFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  ),

  on(EmployeeActions.deleteEmployee, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    EmployeeActions.deleteEmployeeSuccess,
    (state, { id }) =>
      employeeAdapter.removeOne(id, {
        ...state,
        loading: false
      })
  ),

  on(
    EmployeeActions.deleteEmployeeFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error
    })
  )
);