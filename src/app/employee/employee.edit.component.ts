import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Employee } from './employee';
import { EmployeeService } from './employee.service'
/**This component is not in use as of now. because Angular routing is not working. */
@Component({
    selector: 'my-app',
    template: `<h1>Edit {{id}}
        {{employee.firstName}}
        {{employee.lastName}}
        {{employee.DOB}}
        {{employee.team}}
    </h1>`
})
export class EmployeeEdit {
    public id: Number;
    public employee: Employee = new Employee();

    constructor(public router: Router,
        public route: ActivatedRoute,
        public employeeService: EmployeeService) {
    }

    ngOnInit(): any {
        this.route.params.subscribe(params => {
            this.id = params['id'];
            console.log(this.id);
            this.getEmployee(this.id);
        });

    }

    public getEmployee(id: any) {
        console.log('clicked get Employee');
        let that = this;
        this.employeeService.getEmployee(id).subscribe(
            (res: any) => {
                console.log(res);
                this.employee = res;
            }
        );
    }
}

