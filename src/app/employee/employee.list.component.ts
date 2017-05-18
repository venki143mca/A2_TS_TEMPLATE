import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from './employee.service'
import { Employee } from './../employee/employee';
import 'rxjs/add/operator/map'

@Component({
  selector: 'my-app',
  templateUrl: './employee.list.component.html'
})
export class EmployeeComponent {
  public employees: Array<Employee> = [];
  public to: String = 'one@two.com';
  public cc: String = 'one@two.com';
  public subject: String = 'Happy Birthday!';
  public bcc: String = 'one@two.com';
  public body: String = `Hi,%0D %0D
  Many more happy returns of the day.%0D %0D
  Thanks,%0D
  Eswar Ramisetti.`;

  filter: Employee = new Employee();

  
  constructor(public employeeService: EmployeeService) {

  }

  ngOnInit() {
    this.filter.status = "Active";
   this.loadEmployees();
  }

  deleteEmployee(id: Number) {
    this.employeeService.deleteEmployee(id)
      .subscribe((res: any) => {
        this.employees.forEach(
          (emp: Employee, index) => {
            if (emp.id === id) {
              delete this.employees[index];
            }
          }
        );
      });
  }

  editEmployee(id: Number) {
    this.employees.forEach(
      (emp: Employee, index) => {
        if (emp.id === id) {
          emp.editMode = true;
        }
      }
    );
  }

  cancelEmployee(id: Number) {
    this.employees.forEach(
      (emp: Employee, index) => {
        if (emp.id === id) {
          emp.editMode = false;
          this.loadEmployees();
        }
      }
    );
  }

  saveEmployee(id: Number) {
    this.employees.forEach(
      (emp: Employee, index) => {
        if (emp.id === id) {
          this.employeeService.editEmployee(emp)
            .subscribe(
            (res: any) => {
              emp.editMode = false;
            }
            );
        }
      }
    );
  }

  loadEmployees() {
    let that = this;
    this.employeeService.getEmployees().subscribe(
      (res: any) => {
        this.employees = res.result;
      }
    );
  }


}
