import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmployeeComponent } from './employee/employee.list.component';
import { EmployeeService } from './employee/employee.service';
import { EmployeeCreate } from './employee/employee.create.component';
import { EmployeeEdit } from './employee/employee.edit.component';
import { routing } from './routes';
import { EmployeeFilterPipe } from './common/employee.filter';

@NgModule({
  declarations: [ EmployeeComponent, EmployeeCreate, EmployeeEdit, EmployeeFilterPipe],
  imports: [BrowserModule, HttpModule, RouterModule, routing, FormsModule, ReactiveFormsModule],
  bootstrap: [EmployeeComponent],
  providers: [EmployeeService]
})
export class AppModule { }
