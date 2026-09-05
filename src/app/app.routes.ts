import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'employee-list',
    pathMatch: 'full'
  },

  {
    path: 'employee-list',
    loadComponent: () =>
      import(
        './features/employees/employee-list/employee-list'
      ).then(
        m => m.EmployeeListComponent
      )
  },

  {
    path: 'employee-form',
    loadComponent: () =>
      import(
        './features/employees/employee-form/employee-form'
      ).then(
        m => m.EmployeeFormComponent
      )
  },

  {
    path: 'employee-form/:id',
    loadComponent: () =>
      import(
        './features/employees/employee-form/employee-form'
      ).then(
        m => m.EmployeeFormComponent
      )
  },

  {
    path: 'employee-search',
    loadComponent: () =>
      import(
        './features/employees/employee-search/employee-search'
      ).then(
        m => m.EmployeeSearchComponent
      )
  }

];