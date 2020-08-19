import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { ASCreateModel } from '../_models/as-create.model';
import { BehaviorSubject } from 'rxjs';
import { ASViewResponseModel } from '../_models/response/as-view.response.model';
import { Notification } from '../_util/notification.service';

@Injectable({ providedIn: 'root' })
export class ASService {
    
    private response: any;
    dataChange: BehaviorSubject<ASViewResponseModel[]> = new BehaviorSubject<ASViewResponseModel[]>([]);
    dialogData: any;
    private url: string;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) { }


    get data(): ASViewResponseModel[] {
        return this.dataChange.value;
    }
  
    getDialogData() {
        return this.dialogData;
    }

    getAssignmentSubmissionView() {
        
        this.notification.show();
        this.url = environment.apiUrl + environment.task.asView;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        this.http.get<any>(this.url, { headers, observe: 'body' })
              .subscribe(
                  data => { 
                    this.dataChange.next(data.result)
                  },
                  (error: HttpErrorResponse) => { console.log (error.name + ' ' + error.message) }
          );
          this.notification.hide();
    }
   

    createAssignment(assignment: ASCreateModel) {
        this.url = environment.apiUrl;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.url, JSON.stringify(assignment), { headers, observe: 'body' });
    }

}