import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

import { EmployeeService } from './employee.service'
import { Employee } from './employee'

@Component({
    selector: 'my-app',
    templateUrl: './employee.create.component.html'
})
export class EmployeeCreate {
    public employee: Employee = new Employee();

    constructor(public employeeService: EmployeeService, public router: Router) {
    }
    ngOnInit() {
       this.employee.status="Other";
       this.employee.team="Other";
    }

    onSubmit() {
        this.employeeService.createEmployee(this.employee)
            .subscribe((res: any) => {
                this.router.navigate(['/employee/list']);
            });
    }
}
