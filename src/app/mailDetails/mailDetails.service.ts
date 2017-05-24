import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from './../../environments/environment';

@Injectable()
export class MailDetailsService {
    public url: String = environment.apiURL;
    constructor(private _http: Http) { }

    getMailDetails(): Observable<Response> {
        return this._http.get(`${this.url}/mailDetails`)
            .map((res: any) => {
                return res.json();
            })
    }

    saveMailDetails(mailDetails: any): Observable<Response> {
        const data = JSON.stringify(mailDetails);
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(`${this.url}/mailDetails`, data, {
            headers: headers
        });
    }
}