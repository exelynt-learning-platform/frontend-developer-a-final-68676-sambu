import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

import { EmployeeListComponent }
  from './employee-list';

describe('EmployeeListComponent', () => {

  let component: EmployeeListComponent;
  let fixture: ComponentFixture<EmployeeListComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        EmployeeListComponent
      ],

      providers: [

        provideMockStore({
          initialState: {
            employees: {
              ids: [],
              entities: {},
              loading: false,
              error: null,
              selectedEmployeeId: null
            }
          }
        }),

        provideRouter([])

      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        EmployeeListComponent
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});