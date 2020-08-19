import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable, BehaviorSubject } from 'rxjs';
import { NoteResponseModel } from '../_models/response/note.response.model';
import { Notification } from '../_util/notification.service';

@Injectable({ providedIn: 'root' })
export class NoteService {
    private response: any;
    dataChange: BehaviorSubject<NoteResponseModel[]> = new BehaviorSubject<NoteResponseModel[]>([]);
    dialogData: any;
    private url: string;

    constructor(
        private http: HttpClient,
        private notification: Notification
    ) { }


    get data(): NoteResponseModel[] {
        return this.dataChange.value;
    }
  
    getDialogData() {
        return this.dialogData;
    }
   
    getNotes(): void {
        this.url = environment.apiUrl + environment.note.getNotes;
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

    createNote(note): Observable<object> {
        this.url = environment.apiUrl + environment.note.create;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(note), { headers, observe: 'body' });
    }


    updateNote(note: NoteResponseModel): Observable<object> {
        this.url = environment.apiUrl + environment.note.update;
        let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<object>(this.url, JSON.stringify(note), { headers, observe: 'body' });
    }


    deleteNote(id): any {
        this.url = environment.apiUrl + environment.note.delete + '?noteId=' + id;
        return this.http.get<any>(this.url, { observe: 'body' });
    }

}