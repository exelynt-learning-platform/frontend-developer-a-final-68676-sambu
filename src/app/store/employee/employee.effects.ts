import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';

import { EmployeeService } from '../../core/services/employee.service';
import * as EmployeeActions from './employee.actions';

@Injectable()
export class EmployeeEffects {

  private actions$ = inject(Actions);
  private employeeService = inject(EmployeeService);

  loadEmployees$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployees),

      mergeMap(() =>
        this.employeeService.getEmployees().pipe(

          map((employees) =>
            EmployeeActions.loadEmployeesSuccess({
              employees
            })
          ),

          catchError((error) =>
            of(
              EmployeeActions.loadEmployeesFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  loadEmployeeById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.loadEmployeeById),

      mergeMap(({ id }) =>
        this.employeeService.getEmployeeById(id).pipe(

          map((employee) =>
            EmployeeActions.loadEmployeeByIdSuccess({
              employee
            })
          ),

          catchError(() =>
            of(
              EmployeeActions.loadEmployeeByIdFailure({
                error: 'Employee not found'
              })
            )
          )
        )
      )
    )
  );

  addEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.addEmployee),

      mergeMap(({ employee }) =>
        this.employeeService.createEmployee(employee).pipe(

          map((createdEmployee) =>
            EmployeeActions.addEmployeeSuccess({
              employee: createdEmployee
            })
          ),

          catchError((error) =>
            of(
              EmployeeActions.addEmployeeFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  updateEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.updateEmployee),

      mergeMap(({ id, employee }) =>
        this.employeeService.updateEmployee(id, employee).pipe(

          map((updatedEmployee) =>
            EmployeeActions.updateEmployeeSuccess({
              employee: updatedEmployee
            })
          ),

          catchError((error) =>
            of(
              EmployeeActions.updateEmployeeFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  deleteEmployee$ = createEffect(() =>
    this.actions$.pipe(
      ofType(EmployeeActions.deleteEmployee),

      mergeMap(({ id }) =>
        this.employeeService.deleteEmployee(id).pipe(

          map(() =>
            EmployeeActions.deleteEmployeeSuccess({
              id
            })
          ),

          catchError((error) =>
            of(
              EmployeeActions.deleteEmployeeFailure({
                error: this.getErrorMessage(error)
              })
            )
          )
        )
      )
    )
  );

  private getErrorMessage(error: any): string {
    return error?.error?.message ||
      error?.message ||
      'Something went wrong. Please try again.';
  }
}