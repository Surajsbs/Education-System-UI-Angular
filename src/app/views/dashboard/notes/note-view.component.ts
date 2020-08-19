import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataSource} from '@angular/cdk/collections';
import {BehaviorSubject, fromEvent, merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { Notification } from '../../../_util/notification.service';
import { CommonService } from '../../../_services/common.service';
import { LoadClassesResponse } from '../../../_models/response/laod.class.response';
import { NgbModalRef, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DateUtil } from '../../../_util/date.util';
import { CommonUtil } from '../../../_util/common.util';
import { NoteService } from '../../../_services/note.service';
import { NoteResponseModel } from '../../../_models/response/note.response.model';


@Component({
  selector: 'app-dashboard',
  templateUrl: './note-view.component.html',
  styleUrls: ['./note-view.component.css']
})

export class NoteViewComponent implements OnInit {
  displayedColumns = ['Title', 'Description', 'StartDate', 'EndDate', 'CreationDate', 'View', 'Edit', 'Delete'];
  private noteDatabase: NoteService | null;
  dataSource: NoteDataSource | null;
  private response: any;
  private userClass: LoadClassesResponse;
  private className: any;
  private classFee; any;
  private modalRef: NgbModalRef;
  private note: NoteResponseModel;
  private classes: LoadClassesResponse[];
  private classDurations: string[];
  private feesStatus: string[];
  private types: string[];

  constructor(
      public httpClient: HttpClient,
      private notification: Notification,
      private noteService: NoteService,
      private commonService: CommonService,
      private modalService: NgbModal,
      private dateUtil: DateUtil,
      private commonUtil: CommonUtil
  ) {
      this.types = this.commonUtil.noteTypes;
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter',  {static: true}) filter: ElementRef;

  ngOnInit() {
    this.notification.show();
    this.loadData();
    this.commonService.fetchClasses().then(data=>this.classes = data);
    this.classDurations = this.commonUtil.classDuration;
    this.feesStatus = this.commonUtil.feesStatus;
    this.notification.hide();
  }

  // refresh() {
  //     this.loadData();
  // }

  viewNote(viewNoteModel, note: NoteResponseModel) {
      this.note = note;
      this.fetchClass(note.classId);
      this.modalService.open(viewNoteModel, {backdrop: 'static' });
  }

  async fetchClass(classId) {
      this.notification.show();
      try {
          this.response = await this.commonService.fetchClass(classId).toPromise();
          if(this.response.status === 200) {
              this.userClass = this.response.result;
              this.classFee = this.response.result.classFee;
              this.className = this.response.result.className;
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
          this.notification.hide();
          this.notification.error("Unable to load class");
      }
      this.notification.hide();
  }


  editNote(editNoteModel, note: NoteResponseModel) {
      this.note = note;
      this.modalRef = this.modalService.open(editNoteModel, {backdrop: 'static', size: 'xl' });
  }

  deleteNote(deleteNoteModel, note) {
      this.note = note;
      this.modalRef = this.modalService.open(deleteNoteModel, {backdrop: 'static', size: 'sm' });
  }

  onChangeFetchClass (classId) {
      this.fetchClass(classId);
  }

  submit(note: NoteResponseModel) {
      note.startDate = this.dateUtil.format(note.startDate);
      note.endDate = this.dateUtil.format(note.endDate);
      note.creationDate = this.dateUtil.format(note.creationDate);
      this.update(note);
      this.modalRef.close();
  }

  async update(note: NoteResponseModel) {
      this.notification.show();
      try {
          this.response = await this.noteService.updateNote(note).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
              this.notification.error("Unable to update user");
      }
      this.notification.hide();
  }

  confirmDelete(note) {
      this.notification.show();
      this.cnfDelete(note.noteId);
      this.modalRef.close();
      this.loadData();
      this.notification.hide();
  }

  async cnfDelete(id: number) {
      this.notification.show();
      try {
          this.response = await this.noteService.deleteNote(id).toPromise();
          if(this.response.status === 200) {
              this.notification.success(this.response.message);
          } else {
              this.notification.error(this.response.message);
          }
      } catch (err) {
              this.notification.error("Unable to delete note");
      }
      this.notification.hide();
  }

  public loadData() {
      this.notification.show();
      this.noteDatabase = new NoteService(this.httpClient, this.notification);
      this.dataSource = new NoteDataSource(this.noteDatabase, this.paginator, this.sort);
      fromEvent(this.filter.nativeElement, 'keyup')
          .subscribe(() => {
            if (!this.dataSource) {
              return;
            }
            this.dataSource.filter = this.filter.nativeElement.value;
      });
      this.notification.hide();
  }
} 


export class NoteDataSource extends DataSource<NoteResponseModel> {
  _filterChange = new BehaviorSubject('');

  get filter(): string {
    return this._filterChange.value;
  }

  set filter(filter: string) {
    this._filterChange.next(filter);
  }

  filteredData: NoteResponseModel[] = [];
  renderedData: NoteResponseModel[] = [];

  constructor(public noteData: NoteService,
              public _paginator: MatPaginator,
              public _sort: MatSort) {
    super();
    this._filterChange.subscribe(() => this._paginator.pageIndex = 0);
  }

  connect(): Observable<NoteResponseModel[]> {
    const displayDataChanges = [
      this.noteData.dataChange,
      this._sort.sortChange,
      this._filterChange,
      this._paginator.page
    ];

    this.noteData.getNotes();

    return merge(...displayDataChanges).pipe(map( () => {
      // Filter data
      this.filteredData = this.noteData.data.slice().filter((note: NoteResponseModel) => {
        const searchStr = (note.title + note.description + note.startDate + note.endDate + note.creationDate).toLowerCase();
        return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
      });

      // Sort filtered data
      const sortedData = this.sortData(this.filteredData.slice());

      // Grab the page's slice of the filtered sorted data.
      const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
      this.renderedData = sortedData.splice(startIndex, this._paginator.pageSize);
      return this.renderedData;
    }
    ));
  }

  disconnect() {}


  /** Returns a sorted copy of the database data. */
  sortData(data: NoteResponseModel[]): NoteResponseModel[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      


      switch (this._sort.active) {
        case 'Title': [propertyA, propertyB] = [a.title, b.title]; break;
        case 'Description': [propertyA, propertyB] = [a.description, b.description]; break;
        case 'StartDate': [propertyA, propertyB] = [a.startDate, b.startDate]; break;
        case 'EndDate': [propertyA, propertyB] = [a.endDate, b.endDate]; break;
        case 'CreationDate': [propertyA, propertyB] = [a.creationDate, b.creationDate]; break;
      }

      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

      return (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1);
    });
  }
}

