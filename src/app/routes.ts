import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { EmployeeComponent } from './employee/employee.list.component';
import { EmployeeCreate } from './employee/employee.create.component';
import { EmployeeEdit } from './employee/employee.edit.component';

export const EmployeeRoutes: Routes = [
    {
        path: 'employee',
        component: EmployeeComponent
    },
    {
        path: 'employee/list',
        component: EmployeeComponent
    },
    {
        path: 'employee/create',
        component: EmployeeCreate
    },
    {
        path: 'employee/edit/:id',
        component: EmployeeEdit
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(EmployeeRoutes);