import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { EmployeeService } from './employee.service'
import { MailDetailsService } from './../mailDetails/mailDetails.service';
import { MailDetails } from './../mailDetails/mailDetails';
import { Employee } from './../employee/employee';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';


@Component({
  selector: 'my-app',
  templateUrl: './employee.list.component.html'
})
export class EmployeeComponent {
  public employees: Array<Employee> = [];
  public to: String = '';
  public mailDetails: MailDetails = new MailDetails();
  public cc: String = 'one@two.com';
  public subject: String = 'Happy Birthday!';
  public bcc: String = 'one@two.com';
  public body: String = `Hi,%0D %0D
  Many more happy returns of the day.%0D %0D
  Thanks,%0D
  Eswar Ramisetti.`;

  public apiUrl = environment.apiURL;
  public envName = environment.envName;

  filter: Employee = new Employee();
  newEmployee: Employee = new Employee();

  constructor(public employeeService: EmployeeService, public mailDetailsService: MailDetailsService) {

  }

  ngOnInit() {
    this.filter.status = "Active";
    this.newEmployee.status = 'Active';
    this.loadEmployees();
    this.getEmailDetails();
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
        // this.employees = res.result;
        const results = res.result;
        results.forEach(obj => {
          let emp: Employee = new Employee();
          emp.id = obj.id;
          emp.firstName = obj.firstName;
          emp.lastName = obj.lastName;
          emp.DOB = obj.DOB;
          emp.clientEmail = obj.clientEmail;
          emp.email = obj.email;
          emp.status = obj.status;
          emp.team = obj.team;
          emp.sendEmail = true;
          this.employees.push(emp);
          //load email also
          this.addEmails(emp);
        });
      }
    );
  }

  addEmployee() {
    this.employeeService.createEmployee(this.newEmployee).subscribe(
      (res: any) => {
        if (res.status === 201) {
          this.newEmployee.sendEmail = true;
          this.employees.push(this.newEmployee);
        }
        console.log('Response of adding employee from server :: ', res.status);
      }
    );
  }

  addEmails(employee: Employee) {
    if (employee.sendEmail) {
      if (this.to) {
        this.to = this.to.concat(',');
      }
      this.to = this.to.concat(employee.email + ',');
      this.to = this.to.concat(employee.clientEmail);
    } else {
      this.to = this.to.replace(employee.email + ',', '');
      this.to = this.to.replace(employee.clientEmail + ',', '');
    }
  }

  getEmailDetails() {
    let that = this;
    this.mailDetailsService.getMailDetails().subscribe(
      (res: any) => {
        const result = res[0];
        this.mailDetails.cc = result.cc;
        this.mailDetails.bcc = result.bcc;
        this.mailDetails.subject = result.subject;
        this.mailDetails.body = result.body;
        this.mailDetails.mailBody = this.mailDetails.body.replace(/(?:\r\n|\r|\n)/g, '%0D');
      }
    );

  }

  saveEmailDetails() {
    console.log(this.mailDetails.body);
    this.mailDetailsService.saveMailDetails(this.mailDetails).subscribe(
      (res: any) => {
        if (res.status === 201) {
          this.getEmailDetails();
          console.log('Email Details Saved.');
        }
      }
    );
  }
}
