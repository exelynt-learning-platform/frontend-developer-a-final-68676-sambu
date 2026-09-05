import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-search',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './employee-search.html',

  styleUrl: './employee-search.css',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeSearchComponent {

  private fb = inject(FormBuilder);

  private employeeService =
    inject(EmployeeService);

  private router =
    inject(Router);

  employee: Employee | null = null;

  isLoading = false;

  errorMessage = '';

  searchForm = this.fb.group({

    id: [
      '',
      Validators.required
    ]

  });


  searchEmployee(): void {

    this.employee = null;

    this.errorMessage = '';

    if (this.searchForm.invalid) {

      this.searchForm.markAllAsTouched();

      return;

    }

    const id =
      this.searchForm.value.id!;

    this.isLoading = true;

    this.employeeService
      .getEmployeeById(id)
      .subscribe({

        next: (employee: Employee) => {

          this.employee = employee;

          this.isLoading = false;

        },

        error: () => {

          this.isLoading = false;

          this.errorMessage =
            'Employee not found.';

        }

      });

  }


  editEmployee(): void {

    if (!this.employee?.id) {
      return;
    }

    this.router.navigate([
      '/employee-form',
      this.employee.id
    ]);

  }


  resetSearch(): void {

    this.searchForm.reset();

    this.employee = null;

    this.errorMessage = '';

  }

}