
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class EmployeeService {
    public url:String= environment.apiURL;
    public employees: Array<any> = [];
    constructor(private _http: Http) { }

    getEmployees(): Observable<Response> {

        return this._http.get(`${this.url}/employee`)
            .map((res: any) => {
                return res.json();
            })
    }

    getEmployee(id: any): Observable<Response> {
        console.log("id:", id);
        return this._http.get(`${this.url}/employee/${id}`)
            .map((res: any) => {
                return res.json();
            })
    }

    createEmployee(employee: any): Observable<Response> {
        const data = JSON.stringify(employee);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        console.log('create Employee', data);
        return this._http.post(`${this.url}/employee`, data, {
            headers : headers
        });
    }

    deleteEmployee(id: Number): Observable<Response> {
        return this._http.delete(`${this.url}/employee/${id}`);
    }

    editEmployee(employee: any): Observable<Response> {
        const id = employee.id;
        const data = JSON.stringify(employee);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.put(`${this.url}/employee/${id}`, data, {
            headers: headers
        });
    }
}