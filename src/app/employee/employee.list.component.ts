import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from './employee.service'
import { Employee } from './../employee/employee';
import 'rxjs/add/operator/map';


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
  newEmployee: Employee = new Employee();


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
        // const results = res.result;
        // results.forEach(obj => {
        //   let emp:Employee = new Employee();
        //   emp.id = obj.id;
        //   emp.firstName = obj.firstName;
        //   emp.lastName =  obj.lastName;
        //   emp.DOB = obj.DOB;
        //   emp.clientEmail = obj.clientEmail;
        //   emp.email =  obj.email;
        //   emp.status = obj.status;
        //   emp.team = obj.team;
        //   this.employees.push(emp);
        // });
      }
    );
  }

  addEmployee() {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (res:any) => {
        console.log(res.status);
        this.employees.push(this.newEmployee);
      }
    );
  }


}
