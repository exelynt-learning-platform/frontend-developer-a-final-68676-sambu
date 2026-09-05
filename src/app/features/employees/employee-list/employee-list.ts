import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';


import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import * as EmployeeActions from '../../../store/employee/employee.actions';

import {
  selectAllEmployees,
  selectEmployeeError,
  selectEmployeeLoading
} from '../../../store/employee/employee.selectors';

@Component({
  selector: 'app-employee-list',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './employee-list.html',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeListComponent implements OnInit {

  private store = inject(Store);
  private router = inject(Router);

  employees$ = this.store.select(selectAllEmployees);
  loading$ = this.store.select(selectEmployeeLoading);
  error$ = this.store.select(selectEmployeeError);

  displayedColumns = [
    'id',
    'name',
    'email',
    'mobile',
    'country',
    'actions'
  ];

  ngOnInit(): void {
    this.store.dispatch(
      EmployeeActions.loadEmployees()
    );
  }

  deleteEmployee(id: string): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this employee?'
    );

    if (confirmed) {
      this.store.dispatch(
        EmployeeActions.deleteEmployee({ id })
      );
    }
  }
}