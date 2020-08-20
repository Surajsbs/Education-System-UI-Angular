import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Notification } from '../_util/notification.service';
import { forkJoin, Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable({ providedIn: 'root' })
export class DashboardWidgetService {
    private activeUsers: number;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) {}

    getCount(): Observable<any> {  
        // this.http.get<any>(environment.apiUrl + environment.widget.user.getSuspendedUsers, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.note.getSuspendedNotes, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.assignment.getSuspendedAssignments, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.as.getSuspendedASs, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.notification.getSuspendedNotifications, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.as.getActiveASs, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.as.getInActiveASs, { observe: 'body' }),
        // this.http.get<any>(environment.apiUrl + environment.widget.as.getCreatedASs, { observe: 'body' }),

        return forkJoin([
            this.http.get<any>(environment.apiUrl + environment.widget.user.getActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.user.getInactive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.user.getRegistered, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.note.getActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.note.getInActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.note.getCreated, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.assignment.getActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.assignment.getInActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.assignment.getCreated, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.notification.getActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.notification.getInActive, { observe: 'body' }),
            this.http.get<any>(environment.apiUrl + environment.widget.notification.getCreated, { observe: 'body' })
        ]);
    }



    // getActiveUsers(): number {
    //     let activeUsers = 0;
    //     this.url = environment.apiUrl + environment.widget.user.getActiveUsers;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeUsers = data.result } );
    //     return activeUsers;
    // }

    // getInActiveUsers(): number {
    //     let InActiveUsers = 0;
    //     this.url = environment.apiUrl + environment.widget.user.InAactiveUsers;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { InActiveUsers = data.result } );
    //     return InActiveUsers;
    // }

    // getRegistredUsers(): number {
    //     let registredUsers = 0;
    //     this.url = environment.apiUrl + environment.widget.user.getRegistredUsers;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { registredUsers = data.result } );
    //     return registredUsers;
    // }

    // getSuspendedUsers(): number {
    //     let suspendedUsers = 0;
    //     this.url = environment.apiUrl + environment.widget.user.getSuspendedUsers;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { suspendedUsers = data.result } );
    //     return suspendedUsers;
    // }

    // getActiveNotes(): number {
    //     let activeNotes = 0;
    //     this.url = environment.apiUrl + environment.widget.note.getActiveNotes;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeNotes = data.result } );
    //     return activeNotes;
    // }

    // getInActiveNotes(): number {
    //     let inActiveNotes = 0;
    //     this.url = environment.apiUrl + environment.widget.note.getInActiveNotes;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { inActiveNotes = data.result } );
    //     return inActiveNotes;
    // }

    // getCreatedNotes(): number {
    //     let createdNotes = 0;
    //     this.url = environment.apiUrl + environment.widget.note.getCreatedNotes;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { createdNotes = data.result } );
    //     return createdNotes;
    // }

    // getSuspendedNotes(): number {
    //     let suspendedNotes = 0;
    //     this.url = environment.apiUrl + environment.widget.note.getSuspendedNotes;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { suspendedNotes = data.result } );
    //     return suspendedNotes;
    // }

    // getActiveAssignments(): number {
    //     let activeAssignments = 0;
    //     this.url = environment.apiUrl + environment.widget.assignment.getActiveAssignments;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeAssignments = data.result } );
    //     return activeAssignments;
    // }

    // getInActiveAssignments(): number {
    //     let activeAssignments = 0;
    //     this.url = environment.apiUrl + environment.widget.assignment.getInActiveAssignments;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeAssignments = data.result } );
    //     return activeAssignments;
    // }

    // getCreatedAssignments(): number {
    //     let createdAssignments = 0;
    //     this.url = environment.apiUrl + environment.widget.assignment.getCreatedAssignments;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { createdAssignments = data.result } );
    //     return createdAssignments;
    // }

    // getSuspendedAssignments(): number {
    //     let suspendedAssignments = 0;
    //     this.url = environment.apiUrl + environment.widget.assignment.getSuspendedAssignments;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { suspendedAssignments = data.result } );
    //     return suspendedAssignments;
    // }

    // getActiveASs(): number {
    //     let activeASs = 0;
    //     this.url = environment.apiUrl + environment.widget.as.getActiveASs;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeASs = data.result } );
    //     return activeASs;
    // }

    // getInActiveASs(): number {
    //     let inActiveASs = 0;
    //     this.url = environment.apiUrl + environment.widget.as.getInActiveASs;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { inActiveASs = data.result } );
    //     return inActiveASs;
    // }

    // getCreatedASs(): number {
    //     let createdASs = 0;
    //     this.url = environment.apiUrl + environment.widget.as.getCreatedASs;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { createdASs = data.result } );
    //     return createdASs;
    // }

    // getSuspendedASs(): number {
    //     let suspendedASs = 0;
    //     this.url = environment.apiUrl + environment.widget.as.getSuspendedASs;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { suspendedASs = data.result } );
    //     return suspendedASs;
    // }

    // getActiveNotifications(): number {
    //     let activeNotifications = 0;
    //     this.url = environment.apiUrl + environment.widget.notification.getActiveNotifications;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { activeNotifications = data.result } );
    //     return activeNotifications;
    // }

    // getInActiveNotifications(): number {
    //     let inActiveNotifications = 0;
    //     this.url = environment.apiUrl + environment.widget.notification.getInActiveNotifications;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { inActiveNotifications = data.result } );
    //     return inActiveNotifications;
    // }

    // getCreatedNotifications(): number {
    //     let createdNotifications = 0;
    //     this.url = environment.apiUrl + environment.widget.notification.getCreatedNotifications;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { createdNotifications = data.result } );
    //     return createdNotifications;
    // }

    // getSuspendedNotifications(): number {
    //     let suspendedNotifications = 0;
    //     this.url = environment.apiUrl + environment.widget.notification.getSuspendedNotifications;
    //     const promise = this.http.get<any>(this.url, { observe: 'body' }).toPromise();
    //     promise.then(data=> { suspendedNotifications = data.result } );
    //     return suspendedNotifications;
    // }

}