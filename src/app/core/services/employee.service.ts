import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private http = inject(HttpClient);

  private readonly API_URL =
    'https://669b3f09276e45187d34eb4e.mockapi.io/api/v1/employee';


  // GET all employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.API_URL);
  }


  // GET employee by ID
  getEmployeeById(id: string): Observable<Employee> {
    return this.http.get<Employee>(
      `${this.API_URL}/${id}`
    );
  }


  // POST create employee
  createEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(
      this.API_URL,
      employee
    );
  }


  // PUT update employee
  updateEmployee(
    id: string,
    employee: Employee
  ): Observable<Employee> {

    return this.http.put<Employee>(
      `${this.API_URL}/${id}`,
      employee
    );
  }


  // DELETE employee
  deleteEmployee(id: string): Observable<void> {
    return this.http.delete<void>(
      `${this.API_URL}/${id}`
    );
  }

}