import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserModel } from '../_models/usermodel';
import { HttpHeaders }    from '@angular/common/http';
import { environment } from "../../environments/environment";
import { CredentialModel } from '../_models/credentialmodel';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;
    private url: string;

    constructor(private http: HttpClient) {
        this.refresh();
    }

    refresh() {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(sessionStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): UserModel {
        this.refresh();
        return this.currentUserSubject.value;
    }

    login(credential: CredentialModel): Observable<HttpResponse<any>> {
        this.url = environment.apiUrl + environment.login;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(
            this.url, 
            JSON.stringify(credential), 
            { headers: headers, observe: 'body' }
        );
    }

    logout() {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}