import {
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import {
  ActivatedRoute,
  provideRouter
} from '@angular/router';

import { EmployeeFormComponent }
  from './employee-form';

describe('EmployeeFormComponent', () => {

  let component: EmployeeFormComponent;
  let fixture: ComponentFixture<EmployeeFormComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({

      imports: [
        EmployeeFormComponent
      ],

      providers: [

        provideRouter([]),

        {
          provide: ActivatedRoute,

          useValue: {

            snapshot: {

              paramMap: {

                get: () => null

              }

            }

          }

        }

      ]

    }).compileComponents();

    fixture =
      TestBed.createComponent(
        EmployeeFormComponent
      );

    component =
      fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();

  });

});