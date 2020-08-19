import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { LoadClassesResponse } from '../_models/response/laod.class.response';
import { Observable } from 'rxjs';
import { Notification } from "../_util/notification.service";

@Injectable({ providedIn: 'root' })
export class CommonService {
    private classes: LoadClassesResponse[] = [];
    private url: string;
    private response: any;
    
    constructor(
        private http: HttpClient,
        private notification: Notification    
    ) { }

    loadClasses(): Observable<object>  {
        this.url = environment.apiUrl + environment.class.getClasses;
        return this.http.get<object>(this.url, { observe: 'body' });
    }

    fetchUsers(classId): Observable<object>  {
        this.url = environment.apiUrl + environment.user.getUsersByClassId + '?classId=' + classId;
        return this.http.get<object>(this.url, { observe: 'body' });
    }

    fetchClass(classId): Observable<any>   {
        this.url = environment.apiUrl + environment.class.getClass + '?classId='+classId;
        return this.http.get<any>(this.url, { observe: 'body' });
    }

    fetchAssignmentsByClass(classId): Observable<object>  {
        this.url = environment.apiUrl + environment.task.getTaskByClassId + '?classId=' + classId;
        return this.http.get<object>(this.url, { observe: 'body' });
    }

    async fetchClasses()  {
        try {
            this.response = await this.loadClasses().toPromise();
            if(this.response.status === 200) {
                this.classes = this.response.result;
            } else {
                this.notification.error(this.response.message);
            }
        } catch (err) {
            this.notification.error(err);
        }
        return this.classes;
    }

    fetchUsersByClassAndAssignment (assignmentId, classId): Observable<object> {
        this.url = environment.apiUrl + environment.task.getUsersByClassAndAssignment + '?assignmentId=' + assignmentId + '&classId=' + classId;
        return this.http.get<object>(this.url, { observe: 'body' });
    }
}