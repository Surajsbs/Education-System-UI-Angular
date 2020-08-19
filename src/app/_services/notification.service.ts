import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { Notification } from '../_util/notification.service';
import { NotificationResponseModel } from '../_models/response/notification.response.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
    private response: any;
    dataChange: BehaviorSubject<NotificationResponseModel[]> = new BehaviorSubject<NotificationResponseModel[]>([]);
    dialogData: any;
    private url: string;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) { }


    get data(): NotificationResponseModel[] {
        return this.dataChange.value;
    }
  
    getDialogData() {
        return this.dialogData;
    }
   
    getNotifications(): void {
        this.url = environment.apiUrl + environment.notification.getNotifications;
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

    createNotification(notification: NotificationResponseModel): Observable<object> {
        this.url = environment.apiUrl + environment.notification.create;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(notification), { headers, observe: 'body' });
    }


    updateNotifications(notification: NotificationResponseModel): Observable<object> {
        this.url = environment.apiUrl + environment.notification.update;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(notification), { headers, observe: 'body' });
    }


    deleteNotification(id): any {
        this.url = environment.apiUrl + environment.notification.delete + '?notificationId=' + id;
        return this.http.get<any>(this.url, { observe: 'body' });
    }

}