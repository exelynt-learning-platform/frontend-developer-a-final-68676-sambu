import { EntityState } from '@ngrx/entity';
import { Employee } from '../../core/models/employee.model';

export interface EmployeeState extends EntityState<Employee> {
  loading: boolean;
  error: string | null;
  selectedEmployeeId: string | null;
}