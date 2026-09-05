import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit
} from '@angular/core';

import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { MatFormFieldModule }
  from '@angular/material/form-field';

import { MatInputModule }
  from '@angular/material/input';

import { MatSelectModule }
  from '@angular/material/select';

import { MatButtonModule }
  from '@angular/material/button';

import { MatProgressSpinnerModule }
  from '@angular/material/progress-spinner';

import { EmployeeService }
  from '../../../core/services/employee.service';

import { Employee }
  from '../../../core/models/employee.model';

@Component({
  selector: 'app-employee-form',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule
  ],

  templateUrl: './employee-form.html',

  styleUrl: './employee-form.css',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class EmployeeFormComponent
  implements OnInit {

  private fb = inject(FormBuilder);

  private employeeService =
    inject(EmployeeService);

  private route =
    inject(ActivatedRoute);

  private router =
    inject(Router);

  employeeId: string | null = null;

  isEditMode = false;

  isLoading = false;

  successMessage = '';

  errorMessage = '';

  // Fixed country values
  countries = [
    'India',
    'United States',
    'United Kingdom',
    'Canada',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'China',
    'Singapore'
  ];

  employeeForm = this.fb.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(3)
      ]
    ],

    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],

    mobile: [
      '',
      [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]
    ],

    country: [
      '',
      Validators.required
    ],

    state: [
      '',
      Validators.required
    ],

    district: [
      '',
      Validators.required
    ]

  });

  ngOnInit(): void {

    this.employeeId =
      this.route.snapshot.paramMap.get('id');

    if (this.employeeId) {

      this.isEditMode = true;

      this.loadEmployee();

    }

  }

  loadEmployee(): void {

    if (!this.employeeId) {
      return;
    }

    this.isLoading = true;

    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe({

        next: (employee: Employee) => {

          this.employeeForm.patchValue({

            name: employee.name,

            email: employee.email,

            mobile: employee.mobile,

            country: employee.country,

            state: employee.state,

            district: employee.district

          });

          this.isLoading = false;

        },

        error: () => {

          this.isLoading = false;

          this.errorMessage =
            'Unable to load employee.';

        }

      });

  }

  onSubmit(): void {

    this.successMessage = '';

    this.errorMessage = '';

    if (this.employeeForm.invalid) {

      this.employeeForm.markAllAsTouched();

      return;

    }

    const employee: Employee = {

      name: this.employeeForm.value.name!,

      email: this.employeeForm.value.email!,

      mobile: this.employeeForm.value.mobile!,

      country: this.employeeForm.value.country!,

      state: this.employeeForm.value.state!,

      district: this.employeeForm.value.district!

    };

    this.isLoading = true;

    if (this.isEditMode && this.employeeId) {

      this.employeeService
        .updateEmployee(
          this.employeeId,
          employee
        )
        .subscribe({

          next: () => {

            this.isLoading = false;

            this.successMessage =
              'Employee updated successfully!';

          },

          error: () => {

            this.isLoading = false;

            this.errorMessage =
              'Failed to update employee.';

          }

        });

      return;
    }

    this.employeeService
      .createEmployee(employee)
      .subscribe({

        next: () => {

          this.isLoading = false;

          this.successMessage =
            'Employee created successfully!';

          this.employeeForm.reset();

        },

        error: () => {

          this.isLoading = false;

          this.errorMessage =
            'Failed to create employee.';

        }

      });

  }

  resetForm(): void {

    this.employeeForm.reset();

    this.successMessage = '';

    this.errorMessage = '';

  }

}