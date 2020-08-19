import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { NoteResponseModel } from '../_models/response/note.response.model';
import { Notification } from '../_util/notification.service';
import { CommonService } from './common.service';
import { CommonUtil } from '../_util/common.util';
import { DateUtil } from '../_util/date.util';
import { AssignmentResponseModel } from '../_models/response/assignment.response.model';
import { AssignmentCreateModel } from '../_models/assignmentcreatemodel';

@Injectable({ providedIn: 'root' })
export class AssignmentService {
    private response: any;
    dataChange: BehaviorSubject<AssignmentResponseModel[]> = new BehaviorSubject<AssignmentResponseModel[]>([]);
    dialogData: any;
    private url: string;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) { }


    get data(): AssignmentResponseModel[] {
        return this.dataChange.value;
    }
  
    getDialogData() {
        return this.dialogData;
    }
   
    getAssignments(): void {
        this.url = environment.apiUrl + environment.task.getTasks;
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

    createAssignment(assignment): Observable<object> {
        this.url = environment.apiUrl + environment.task.create;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(assignment), { headers, observe: 'body' });
    }

    updateAssignment(assignment): Observable<object> {
        this.url = environment.apiUrl + environment.task.update;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(assignment), { headers, observe: 'body' });
    }


    deleteAssignment(id): any {
        this.url = environment.apiUrl + environment.task.delete + '?assignmentId=' + id;
        return this.http.get<any>(this.url, { observe: 'body' });
    }

    submitAssignment(assignment): Observable<object> {
        this.url = environment.apiUrl + environment.task.submitAssignment;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(assignment), { headers, observe: 'body' });
    }

}