import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { RegisterUserRequestModel } from '../_models/register.user.request.model';
import moment from 'moment';
import { RegisterUserResponseModel } from '../_models/response/register.user.response';
import { Notification } from '../_util/notification.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegistrationService {
    private response: any;
    dataChange: BehaviorSubject<RegisterUserResponseModel[]> = new BehaviorSubject<RegisterUserResponseModel[]>([]);
    dialogData: any;
    private url: string;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) { }


    get data(): RegisterUserResponseModel[] {
        return this.dataChange.value;
    }
  
    getDialogData() {
        return this.dialogData;
    }

    getRegisteredUsers(): void {
        this.url = environment.apiUrl + environment.user.getUsers;
        this.notification.show();
          this.http.get<any>(this.url)
              .subscribe(
                  data => { 
                    this.dataChange.next(data.result)
                  },
                  (error: HttpErrorResponse) => { console.log (error.name + ' ' + error.message) }
          );
          this.notification.hide();
    }   

    register(register: RegisterUserRequestModel) {
        this.url = environment.apiUrl + environment.user.create;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(
            this.url,
            JSON.stringify(register), 
            { headers: headers, observe: 'response' }
        );
    }

    deleteUser (mobileNumber: string, id: number): any {
        this.url = environment.apiUrl + environment.user.delete + '?mobileNumber=' + mobileNumber + '&id=' + id;
        return this.http.delete<any>(this.url, { observe: 'body' });
    }


    updateUser (user: RegisterUserResponseModel): void {
        this.url = environment.apiUrl + environment.user.update;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.post<RegisterUserResponseModel[]>(
            this.url,
            JSON.stringify(user), 
            { headers: headers, observe: 'response' })
        .subscribe(
          data => { this.validateRegisterResponse(data) },
          (error: HttpErrorResponse) => { console.log (error.name + ' ' + error.message) });
    }

    validateRegisterResponse(data) {
        if(data.status === 200) {
            if(data.body.status === 200) {
              this.notification.success(data.body.message);
            } else {
              this.notification.error(data.body.message);
            }
        } else{
          this.notification.error("Unable to register");
        }
    }

}