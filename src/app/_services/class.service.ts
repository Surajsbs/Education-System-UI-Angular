import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { ClassCreateModel } from '../_models/class.create.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ClassService {
    private url: string;
    constructor(private http: HttpClient) { }

   

    createClass(classModel): Observable<object> {
        this.url = environment.apiUrl + environment.class.create;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.url, JSON.stringify(classModel), { headers, observe: 'body' });
    }

}